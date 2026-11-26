/**
 * Vercel 24/7 Serverless Endpoint: https://flik.in/api/webhooks/instagram
 * Handles Meta Webhook Verification (GET) & HMAC-SHA256 Verified `comments` events (POST).
 */

const crypto = require("crypto");
const { verifyMetaSignature, processWebhookPayload } = require("./_ig_core");

async function readRawBody(req) {
  if (Buffer.isBuffer(req.body)) return req.body;
  if (typeof req.body === "string") return Buffer.from(req.body, "utf8");
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

async function handler(req, res) {
  if (req.method === "GET") {
    const mode = req.query["hub.mode"];
    const token = String(req.query["hub.verify_token"] || "");
    const challenge = String(req.query["hub.challenge"] || "");
    const expectedToken = String(process.env.META_VERIFY_TOKEN || "flik_ig_webhook_2026");

    if (mode === "subscribe") {
      const a = Buffer.from(token, "utf8");
      const b = Buffer.from(expectedToken, "utf8");
      if (a.length === b.length && a.length > 0 && crypto.timingSafeEqual(a, b)) {
        res.setHeader("Content-Type", "text/plain");
        return res.status(200).send(challenge);
      }
      return res.status(403).json({ status: "error", error: "Invalid verify_token" });
    }

    return res.status(200).json({
      status: "active",
      service: "flik-instagram-auto-dm",
      configured: {
        app_secret: Boolean(process.env.META_APP_SECRET),
        access_token: Boolean(process.env.IG_ACCESS_TOKEN),
        account_id: Boolean(process.env.IG_ACCOUNT_ID),
      },
    });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ status: "error", error: "Method not allowed" });
  }

  const rawBody = await readRawBody(req);
  const sigHeader = req.headers["x-hub-signature-256"] || req.headers["X-Hub-Signature-256"];
  const appSecret = process.env.META_APP_SECRET || "";

  if (!verifyMetaSignature(rawBody, sigHeader, appSecret)) {
    return res.status(403).json({ status: "error", error: "Invalid X-Hub-Signature-256 or missing META_APP_SECRET" });
  }

  let payload;
  try {
    payload = JSON.parse(rawBody.toString("utf8"));
  } catch (_) {
    return res.status(400).json({ status: "error", error: "Invalid JSON payload" });
  }

  const result = await processWebhookPayload(payload, process.env, fetch);
  return res.status(200).json(result);
}

handler.config = {
  api: {
    bodyParser: false,
  },
};

module.exports = handler;
