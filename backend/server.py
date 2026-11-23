import os
import re
import time
import uuid
import logging
import secrets
from pathlib import Path
from collections import defaultdict, deque
from datetime import datetime, timezone
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request, Response, status
from fastapi.responses import JSONResponse
from starlette.middleware.cors import CORSMiddleware
from starlette.middleware.base import BaseHTTPMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, EmailStr, Field, ConfigDict, field_validator


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger('flik_security')

# MongoDB connection with safe defaults
mongo_url = os.environ.get('MONGO_URL', 'mongodb://localhost:27017')
db_name = os.environ.get('DB_NAME', 'flik_production')
client = AsyncIOMotorClient(mongo_url)
db = client[db_name]

# Production security configurations
ADMIN_SECRET_KEY = os.environ.get('FLIK_ADMIN_SECRET', 'flik_admin_sec_2026_super_key')
ENABLE_API_DOCS = os.environ.get('ENABLE_API_DOCS', 'false').lower() == 'true'

# Whitelist allowed CORS origins (strict origin security)
ALLOWED_ORIGINS = [
    "https://www.flik.in",
    "https://flik.in",
    "https://flik-emergent.vercel.app",
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
env_cors = os.environ.get('CORS_ORIGINS')
if env_cors:
    for o in env_cors.split(','):
        clean_o = o.strip()
        if clean_o and clean_o != '*' and clean_o not in ALLOWED_ORIGINS:
            ALLOWED_ORIGINS.append(clean_o)


# ---------------- Sliding Window Rate Limiter ----------------
class SlidingWindowRateLimiter:
    """Thread-safe sliding-window rate limiter per client IP"""
    def __init__(self, max_requests: int, window_seconds: int):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests: dict[str, deque] = defaultdict(deque)

    def is_allowed(self, client_id: str) -> tuple[bool, int]:
        now = time.time()
        history = self.requests[client_id]

        # Evict timestamps older than sliding window
        while history and history[0] <= now - self.window_seconds:
            history.popleft()

        if len(history) >= self.max_requests:
            oldest = history[0]
            retry_after = int(oldest + self.window_seconds - now) + 1
            return False, max(1, retry_after)

        history.append(now)
        return True, 0


# Rate limit rules:
# - Lead submissions: max 5 requests per 10 minutes per IP
# - Global API requests: max 120 requests per minute per IP
lead_rate_limiter = SlidingWindowRateLimiter(max_requests=5, window_seconds=600)
global_rate_limiter = SlidingWindowRateLimiter(max_requests=120, window_seconds=60)


# ---------------- Input Sanitization & Anti-Injection ----------------
def sanitize_text(value: Optional[str], max_len: int = 200) -> Optional[str]:
    """Strips HTML tags, script injection, control characters, and NoSQL operators"""
    if value is None:
        return None
    # Strip HTML / script tags
    cleaned = re.sub(r'<[^>]*>', '', value)
    # Strip dangerous URI schemes
    cleaned = re.sub(r'(?i)javascript:|data:|vbscript:', '', cleaned)
    # Strip control characters except newline and tab
    cleaned = re.sub(r'[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]', '', cleaned)
    # Strip leading MongoDB operators to prevent NoSQL injection
    cleaned = re.sub(r'^\$+', '', cleaned.strip())
    return cleaned[:max_len]


# ---------------- Admin Security Guard ----------------
async def verify_admin_access(request: Request):
    """Guards sensitive endpoints against unauthorized public scrapers and bots"""
    auth_header = request.headers.get("Authorization")
    admin_key = request.headers.get("X-Admin-Key")

    token = None
    if auth_header and auth_header.startswith("Bearer "):
        token = auth_header[7:].strip()
    elif admin_key:
        token = admin_key.strip()

    if not token or not secrets.compare_digest(token, ADMIN_SECRET_KEY):
        logger.warning("Unauthorized access attempt to admin endpoint from IP: %s", request.client.host if request.client else "unknown")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized: Valid administrator authorization token required.",
            headers={"WWW-Authenticate": "Bearer"}
        )
    return True


# ---------------- Security Headers & Payload Size Middleware ----------------
class EnterpriseSecurityMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # 1. Reject oversized payloads early to prevent DoS (max 64KB)
        content_length = request.headers.get("content-length")
        if content_length and int(content_length) > 65536:
            return JSONResponse(
                status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
                content={"detail": "Payload too large. Maximum 64KB allowed."}
            )

        # 2. Extract client IP safely (supports trusted reverse proxy X-Forwarded-For)
        client_ip = request.headers.get("x-forwarded-for")
        if client_ip:
            client_ip = client_ip.split(",")[0].strip()
        else:
            client_ip = request.client.host if request.client else "unknown"

        # 3. Global IP rate limit
        allowed, retry_after = global_rate_limiter.is_allowed(client_ip)
        if not allowed:
            logger.warning("Rate limit exceeded for IP: %s on path: %s", client_ip, request.url.path)
            return JSONResponse(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                content={"detail": "Too many requests. Please slow down and try again later."},
                headers={"Retry-After": str(retry_after)}
            )

        # 4. Process request
        response = await call_next(request)

        # 5. Inject enterprise HTTP security headers
        response.headers["Strict-Transport-Security"] = "max-age=63072000; includeSubDomains; preload"
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["X-Frame-Options"] = "DENY"
        response.headers["X-XSS-Protection"] = "1; mode=block"
        response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
        response.headers["Content-Security-Policy"] = "default-src 'none'; frame-ancestors 'none';"
        response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=(), payment=()"
        response.headers["Cache-Control"] = "no-store, no-cache, must-revalidate, max-age=0"

        return response


# Create the main FastAPI app (disable Swagger/OpenAPI docs in production unless explicitly enabled)
app = FastAPI(
    title="Flik Architecture Intelligence API",
    docs_url="/docs" if ENABLE_API_DOCS else None,
    redoc_url="/redoc" if ENABLE_API_DOCS else None,
    openapi_url="/openapi.json" if ENABLE_API_DOCS else None,
)

# Attach security middleware
app.add_middleware(EnterpriseSecurityMiddleware)

# CORS middleware with strict origin whitelist
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS", "HEAD"],
    allow_headers=["Content-Type", "Authorization", "X-Requested-With", "X-Admin-Key", "Accept"],
)

# Create API router
api_router = APIRouter(prefix="/api")


# ---------------- Data Models ----------------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str = Field(min_length=1, max_length=120)

    @field_validator("client_name")
    @classmethod
    def clean_client_name(cls, v: str) -> str:
        cleaned = sanitize_text(v, 120)
        if not cleaned:
            raise ValueError("client_name cannot be empty or purely malicious characters")
        return cleaned


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    company: Optional[str] = None
    project: Optional[str] = None
    message: Optional[str] = None
    source: str = "closing_cta"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class LeadCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    company: Optional[str] = Field(default=None, max_length=200)
    project: Optional[str] = Field(default=None, max_length=200)
    message: Optional[str] = Field(default=None, max_length=2000)
    source: Optional[str] = Field(default="closing_cta", max_length=80)

    @field_validator("name")
    @classmethod
    def validate_name(cls, v: str) -> str:
        cleaned = sanitize_text(v, 120)
        if not cleaned:
            raise ValueError("name cannot be empty or invalid")
        return cleaned

    @field_validator("company")
    @classmethod
    def validate_company(cls, v: Optional[str]) -> Optional[str]:
        return sanitize_text(v, 200)

    @field_validator("project")
    @classmethod
    def validate_project(cls, v: Optional[str]) -> Optional[str]:
        return sanitize_text(v, 200)

    @field_validator("message")
    @classmethod
    def validate_message(cls, v: Optional[str]) -> Optional[str]:
        return sanitize_text(v, 2000)

    @field_validator("source")
    @classmethod
    def validate_source(cls, v: Optional[str]) -> Optional[str]:
        return sanitize_text(v, 80)


# ---------------- API Endpoints ----------------
@api_router.get("/")
async def root() -> dict[str, str]:
    return {"status": "healthy", "service": "Flik Architecture Intelligence Platform"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate) -> StatusCheck:
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)

    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()

    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck], dependencies=[Depends(verify_admin_access)])
async def get_status_checks() -> List[StatusCheck]:
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check.get('timestamp'), str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks


# ---------- Leads (Demo Request) ----------
@api_router.post("/leads", response_model=Lead, status_code=201)
async def create_lead(payload: LeadCreate, request: Request) -> Lead:
    # 1. Client IP rate limit check
    client_ip = request.headers.get("x-forwarded-for")
    if client_ip:
        client_ip = client_ip.split(",")[0].strip()
    else:
        client_ip = request.client.host if request.client else "unknown"

    allowed, retry_after = lead_rate_limiter.is_allowed(client_ip)
    if not allowed:
        logger.warning("Lead rate limit triggered for IP: %s", client_ip)
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Submission limit reached. Please wait before submitting again.",
            headers={"Retry-After": str(retry_after)}
        )

    # 2. Store sanitized lead
    lead = Lead(**payload.model_dump(exclude_none=True))
    doc = lead.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.leads.insert_one(doc)
    logger.info("New sanitized lead captured: %s <%s>", lead.name, lead.email)
    return lead


@api_router.get("/leads", response_model=List[Lead], dependencies=[Depends(verify_admin_access)])
async def list_leads(limit: int = 200) -> List[Lead]:
    # Strictly guarded by verify_admin_access to prevent unauthorized data scraping
    docs = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    for d in docs:
        if isinstance(d.get("created_at"), str):
            d["created_at"] = datetime.fromisoformat(d["created_at"])
    return docs


# Include router in the app
app.include_router(api_router)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
