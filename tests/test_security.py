import os
import json
import pytest
from unittest.mock import AsyncMock, patch, MagicMock
from fastapi.testclient import TestClient

# Configure test environment
os.environ["MONGO_URL"] = "mongodb://localhost:27017"
os.environ["DB_NAME"] = "flik_test_db"
os.environ["FLIK_ADMIN_SECRET"] = "flik_test_secret_key_2026"
os.environ["ENABLE_API_DOCS"] = "false"

from backend.server import app, sanitize_text, ADMIN_SECRET_KEY, lead_rate_limiter, global_rate_limiter

client = TestClient(app)


def setup_function():
    # Reset in-memory rate limiters before each test
    lead_rate_limiter.requests.clear()
    global_rate_limiter.requests.clear()


def test_api_health():
    """Verify health endpoint responds with security headers"""
    response = client.get("/api/")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"
    # Verify enterprise security headers
    assert "strict-transport-security" in response.headers
    assert response.headers["x-content-type-options"] == "nosniff"
    assert response.headers["x-frame-options"] == "DENY"
    assert response.headers["x-xss-protection"] == "1; mode=block"
    assert "frame-ancestors 'none'" in response.headers["content-security-policy"]


def test_leads_endpoint_unauthorized_rejection():
    """Verify GET /api/leads is strictly protected against unauthorized access"""
    # 1. No credentials
    response = client.get("/api/leads")
    assert response.status_code == 401
    assert "Unauthorized" in response.json()["detail"]

    # 2. Invalid Bearer token
    response = client.get("/api/leads", headers={"Authorization": "Bearer invalid_hacker_token"})
    assert response.status_code == 401

    # 3. Invalid X-Admin-Key
    response = client.get("/api/leads", headers={"X-Admin-Key": "wrong_key"})
    assert response.status_code == 401


def test_leads_endpoint_authorized_access():
    """Verify GET /api/leads succeeds with valid administrative secret"""
    mock_cursor = MagicMock()
    mock_cursor.sort.return_value.to_list = AsyncMock(return_value=[
        {
            "id": "12345",
            "name": "Tanmay Singh",
            "email": "tanmay@flik.in",
            "company": "Flik",
            "project": "Demo",
            "message": "Hi",
            "source": "closing_cta",
            "created_at": "2026-11-20T10:00:00+00:00"
        }
    ])
    mock_leads_collection = MagicMock()
    mock_leads_collection.find.return_value = mock_cursor

    with patch("backend.server.db") as mock_db:
        mock_db.leads = mock_leads_collection
        response = client.get("/api/leads", headers={"X-Admin-Key": "flik_test_secret_key_2026"})
        assert response.status_code == 200
        data = response.json()
        assert len(data) == 1
        assert data[0]["name"] == "Tanmay Singh"


def test_status_endpoint_protected():
    """Verify GET /api/status requires admin credentials"""
    res_unauth = client.get("/api/status")
    assert res_unauth.status_code == 401

    mock_cursor = MagicMock()
    mock_cursor.to_list = AsyncMock(return_value=[
        {"id": "s1", "client_name": "TestClient", "timestamp": "2026-11-20T10:00:00+00:00"}
    ])
    mock_status_collection = MagicMock()
    mock_status_collection.find.return_value = mock_cursor

    with patch("backend.server.db") as mock_db:
        mock_db.status_checks = mock_status_collection
        res_auth = client.get("/api/status", headers={"Authorization": "Bearer flik_test_secret_key_2026"})
        assert res_auth.status_code == 200
        assert len(res_auth.json()) == 1


def test_lead_rate_limiting():
    """Verify submission rate limiter blocks automated lead flooding (anti-DDoS)"""
    payload = {
        "name": "Tanmay Singh",
        "email": "tanmay@flik.in",
        "company": "Flik",
        "project": "Tower Demo",
        "message": "Testing security rate limiter"
    }

    mock_leads_collection = MagicMock()
    mock_leads_collection.insert_one = AsyncMock(return_value=True)

    with patch("backend.server.db") as mock_db:
        mock_db.leads = mock_leads_collection
        # First 5 submissions within 10 minutes should be processed
        for i in range(5):
            res = client.post("/api/leads", json=payload, headers={"X-Forwarded-For": "198.51.100.1"})
            assert res.status_code == 201

        # 6th submission must be rejected with 429 Too Many Requests
        blocked_res = client.post("/api/leads", json=payload, headers={"X-Forwarded-For": "198.51.100.1"})
        assert blocked_res.status_code == 429
        assert "limit reached" in blocked_res.json()["detail"].lower()
        assert "retry-after" in blocked_res.headers


def test_payload_size_limit():
    """Verify that requests exceeding 64KB are rejected to prevent memory exhaustion"""
    huge_data = "A" * 70000
    response = client.post("/api/leads", content=huge_data, headers={"Content-Type": "application/json"})
    assert response.status_code == 413
    assert "Payload too large" in response.json()["detail"]


def test_input_sanitization():
    """Verify that XSS and NoSQL injection payloads are neutralized"""
    xss_input = "<script>alert('pwned')</script>John Doe<style>body{color:red}</style>"
    cleaned = sanitize_text(xss_input)
    assert "<script>" not in cleaned
    assert "alert" in cleaned or "John Doe" in cleaned
    assert "<style>" not in cleaned

    # Dangerous URI schemes
    uri_input = "javascript:alert(1) hello"
    assert "javascript:" not in sanitize_text(uri_input).lower()

    # NoSQL operator prefix
    nosql_input = "$where this.password == 1"
    assert not sanitize_text(nosql_input).startswith("$")


def test_swagger_and_openapi_hidden_in_production():
    """Verify that /docs, /redoc, and /openapi.json are disabled in production"""
    assert client.get("/docs").status_code == 404
    assert client.get("/redoc").status_code == 404
    assert client.get("/openapi.json").status_code == 404


def test_vercel_config_security():
    """Verify vercel.json contains anti-clickjacking frame-ancestors and attack redirects"""
    vercel_path = os.path.join(os.path.dirname(__file__), "..", "frontend", "vercel.json")
    with open(vercel_path, "r", encoding="utf-8") as f:
        config = json.load(f)

    # Check headers
    all_headers = []
    for h_rule in config.get("headers", []):
        for h in h_rule.get("headers", []):
            all_headers.append(h)

    csp = next((h["value"] for h in all_headers if h["key"] == "Content-Security-Policy"), "")
    assert "frame-ancestors 'self'" in csp
    assert "upgrade-insecure-requests" in csp

    # Check reconnaissance redirects
    redirect_sources = [r["source"] for r in config.get("redirects", [])]
    assert any("env" in s for s in redirect_sources)
    assert any("wp-admin" in s for s in redirect_sources)
    assert any("phpmyadmin" in s for s in redirect_sources)
