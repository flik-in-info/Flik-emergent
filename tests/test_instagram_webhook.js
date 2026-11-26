/**
 * Node.js test suite for Vercel Serverless Instagram Webhook & Data Deletion handlers.
 * Run with: node --test tests/test_instagram_webhook.js
 */

const test = require("node:test");
const assert = require("node:assert/strict");
const crypto = require("node:crypto");
const { Readable } = require("node:stream");

const instagramHandler = require("../frontend/api/webhooks/instagram");
const dataDeletionHandler = require("../frontend/api/webhooks/data-deletion");
const core = require("../frontend/api/webhooks/_ig_core");

function makeMockRes() {
  const res = {
    statusCode: 200,
    headers: {},
    body: null,
    setHeader(k, v) {
      this.headers[k.toLowerCase()] = v;
      return this;
    },
    status(code) {
      this.statusCode = code;
      return this;
    },
    send(val) {
      this.body = val;
      return this;
    },
    json(val) {
      this.body = val;
      return this;
    },
  };
  return res;
}

function makeRawPostReq(rawStr, headers = {}) {
  const stream = Readable.from([Buffer.from(rawStr, "utf8")]);
  stream.method = "POST";
  stream.headers = headers;
  stream.query = {};
  return stream;
}

test("Meta GET hub verification challenge returns plain text challenge", async () => {
  process.env.META_VERIFY_TOKEN = "flik_ig_verify_test";
  const reqOk = {
    method: "GET",
    query: {
      "hub.mode": "subscribe",
      "hub.verify_token": "flik_ig_verify_test",
      "hub.challenge": "5544332211",
    },
    headers: {},
  };
  const resOk = makeMockRes();
  await instagramHandler(reqOk, resOk);
  assert.equal(resOk.statusCode, 200);
  assert.equal(resOk.headers["content-type"], "text/plain");
  assert.equal(resOk.body, "5544332211");

  const reqBad = {
    method: "GET",
    query: { "hub.mode": "subscribe", "hub.verify_token": "nope", "hub.challenge": "123" },
    headers: {},
  };
  const resBad = makeMockRes();
  await instagramHandler(reqBad, resBad);
  assert.equal(resBad.statusCode, 403);
});

test("POST rejects invalid or missing HMAC-SHA256 signature", async () => {
  process.env.META_APP_SECRET = "secret_abc_123";
  const req = makeRawPostReq(JSON.stringify({ object: "instagram", entry: [] }), {
    "x-hub-signature-256": "sha256=badhash",
  });
  const res = makeMockRes();
  await instagramHandler(req, res);
  assert.equal(res.statusCode, 403);
});

test("Raw-body HMAC signature succeeds with Unicode/emojis and dispatches DM + reply", async () => {
  process.env.META_APP_SECRET = "secret_abc_123";
  process.env.IG_ACCESS_TOKEN = "IG_live_token_sample";
  process.env.IG_ACCOUNT_ID = "17841451437737461";
  process.env.IG_USERNAME = "_flik.in_";

  const payloadObj = {
    object: "instagram",
    entry: [
      {
        id: "17841451437737461",
        changes: [
          {
            field: "comments",
            value: {
              id: "c_vercel_100",
              text: "DEMO 🙌",
              from: { id: "445566", username: "priya_architect" },
              media: { id: "m_1", media_product_type: "REELS" },
            },
          },
        ],
      },
    ],
  };

  const rawBody = JSON.stringify(payloadObj);
  const sig = "sha256=" + crypto.createHmac("sha256", "secret_abc_123").update(rawBody, "utf8").digest("hex");
  assert.equal(core.verifyMetaSignature(Buffer.from(rawBody, "utf8"), sig, "secret_abc_123"), true);

  const calls = [];
  const mockFetch = async (url, opts) => {
    calls.push({ url, method: opts.method, body: opts.body ? JSON.parse(opts.body) : null });
    if (url.includes("/conversations")) return { status: 200, json: async () => ({ data: [] }) };
    if (url.includes("/replies") && opts.method === "GET") return { status: 200, json: async () => ({ data: [] }) };
    if (url.includes("/445566")) return { status: 200, json: async () => ({ name: "Priya Kapoor", username: "priya_architect" }) };
    if (url.endsWith("/messages")) return { status: 200, json: async () => ({ message_id: "mid_99" }) };
    if (url.endsWith("/replies") && opts.method === "POST") return { status: 200, json: async () => ({ id: "rep_99" }) };
    return { status: 200, json: async () => ({}) };
  };

  const result = await core.processWebhookPayload(payloadObj, process.env, mockFetch);
  const r0 = result.results[0];
  assert.equal(r0.dm_status, "sent");
  assert.equal(r0.public_reply_status, "posted");
  assert.match(r0.dm_message, /^Hi Priya, thanks for commenting DEMO/);
  assert.match(r0.dm_message, /https:\/\/youtu\.be\/m-g_WFJeNzw\?si=AIXDhYjOZluzkDHO/);
  assert.equal(r0.public_reply_text, "@priya_architect Thanks for commenting! Please check your DM.");
  assert.ok(calls.some((c) => c.url.includes("graph.instagram.com/v22.0/")));

  // Verify raw POST handler signature path on instagramHandler
  const origFetch = global.fetch;
  global.fetch = mockFetch;
  try {
    const reqSigned = makeRawPostReq(
      JSON.stringify({ object: "instagram", entry: [] }),
      {
        "x-hub-signature-256":
          "sha256=" +
          crypto
            .createHmac("sha256", "secret_abc_123")
            .update('{"object":"instagram","entry":[]}', "utf8")
            .digest("hex"),
      }
    );
    const resSigned = makeMockRes();
    await instagramHandler(reqSigned, resSigned);
    assert.equal(resSigned.statusCode, 200);
    assert.equal(resSigned.body.status, "ok");
  } finally {
    global.fetch = origFetch;
  }
});

test("Env blacklist and live Meta conversation check skip duplicate DMs cleanly", async () => {
  const mockFetch = async (url, opts) => {
    assert.notEqual(opts.method === "POST" && url.endsWith("/messages"), true, "Must never DM blacklisted or live-thread user");
    if (url.includes("/conversations")) return { status: 200, json: async () => ({ data: [{ id: "t_existing" }] }) };
    if (url.includes("/replies") && opts.method === "GET") return { status: 200, json: async () => ({ data: [] }) };
    if (url.endsWith("/replies") && opts.method === "POST") return { status: 200, json: async () => ({ id: "rep_bl" }) };
    return { status: 200, json: async () => ({}) };
  };

  const resEnv = await core.handleCommentEvent(
    {
      id: "c_hist_1",
      text: "DEMO",
      from: { id: "123123", username: "prior_lead_handle" },
    },
    { IG_ACCESS_TOKEN: "IG_test", IG_ACCOUNT_ID: "17841451437737461", IG_BLACKLIST_HANDLES: "prior_lead_handle" },
    mockFetch
  );
  assert.equal(resEnv.dm_status, "skipped_duplicate");

  const resLive = await core.handleCommentEvent(
    {
      id: "c_live_thread_1",
      text: "DEMO",
      from: { id: "998877", username: "already_messaged_live" },
    },
    { IG_ACCESS_TOKEN: "IG_test", IG_ACCOUNT_ID: "17841451437737461" },
    mockFetch
  );
  assert.equal(resLive.dm_status, "skipped_duplicate");
  assert.equal(resLive.dedupe_reason, "live_meta_thread_exists");
});

test("Data deletion endpoint validates signed_request and returns privacy URL", async () => {
  process.env.META_APP_SECRET = "secret_del";
  const payloadB64 = Buffer.from(JSON.stringify({ user_id: "u123" }), "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const sigB64 = crypto
    .createHmac("sha256", "secret_del")
    .update(payloadB64)
    .digest("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const req = { method: "POST", body: { signed_request: `${sigB64}.${payloadB64}` }, query: {}, headers: {} };
  const res = makeMockRes();
  await dataDeletionHandler(req, res);
  assert.equal(res.statusCode, 200);
  assert.equal(res.body.url, "https://flik.in/privacy-policy");
  assert.match(res.body.confirmation_code, /^FLIK-DEL-/);
});
