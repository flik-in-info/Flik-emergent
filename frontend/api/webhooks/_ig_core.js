/**
 * Flik Explorer — Official Meta Instagram Graph API Webhook Core (Vercel 24/7).
 * Handles HMAC verification, unified graph.instagram.com / graph.facebook.com routing,
 * multi-layer duplicate DM prevention, Private Reply DM, and nested public replies.
 */

const crypto = require("crypto");

const GRAPH_API_VERSION = "v22.0";
const DEFAULT_YOUTUBE_LINK = "https://youtu.be/m-g_WFJeNzw?si=AIXDhYjOZluzkDHO";
const DEFAULT_KEYWORDS = [
  "demo", "price", "cost", "detail", "details", "info",
  "brochure", "walkthrough", "ديمو", "تفاصيل", "سعر",
];

const DEFAULT_DM_TEMPLATE =
  "Hi [Name], thanks for commenting DEMO 🙌\n\n" +
  "Here's the full walkthrough of Flik Explorer on a sample project: towers, live availability, " +
  "flats in 3D, the view from any floor at any time of day, amenities and location, all on one screen:\n" +
  "▶️ [YouTube link]\n\n" +
  "This is what your sales team would show buyers in the experience centre, and send to NRI and remote " +
  "buyers, before the project is built.\n\n" +
  "If you'd like to see it on your own project, let's set up a 20-minute call. When suits you this week " +
  "or next? Share a day and time and I'll send the invite.";

const DEFAULT_PUBLIC_REPLY_SENT = "@[Handle] Thanks for commenting! Please check your DM.";
const DEFAULT_PUBLIC_REPLY_RESTRICTED =
  "@[Handle] Thanks for commenting! Your account settings block message requests — " +
  "please send us a quick DM first so we can share the Flik Explorer walkthrough link with you.";

const API_PROVIDERS = {
  instagram: {
    baseUrl: `https://graph.instagram.com/${GRAPH_API_VERSION}`,
    defaultNode: "me",
    includePlatformParam: false,
  },
  facebook: {
    baseUrl: `https://graph.facebook.com/${GRAPH_API_VERSION}`,
    defaultNode: null,
    includePlatformParam: true,
  },
};

// Warm-instance bounded caches to guard against immediate webhook retries.
const warmHandledComments = new Set();
const warmContactedSenders = new Set();

function trackBounded(setRef, key, maxSize = 1000) {
  if (!key) return;
  if (setRef.size >= maxSize) {
    const oldest = setRef.values().next().value;
    if (oldest !== undefined) setRef.delete(oldest);
  }
  setRef.add(key);
}

/**
 * Constant-time verification of Meta's X-Hub-Signature-256 header against raw request bytes.
 */
function verifyMetaSignature(rawBodyBuffer, signatureHeader, appSecret) {
  if (!appSecret || !signatureHeader || typeof signatureHeader !== "string") return false;
  if (!signatureHeader.startsWith("sha256=")) return false;

  const expectedHex = crypto
    .createHmac("sha256", String(appSecret))
    .update(Buffer.isBuffer(rawBodyBuffer) ? rawBodyBuffer : Buffer.from(String(rawBodyBuffer || ""), "utf8"))
    .digest("hex");
  const expected = Buffer.from(`sha256=${expectedHex}`, "utf8");
  const provided = Buffer.from(signatureHeader.trim(), "utf8");
  if (expected.length !== provided.length) return false;
  return crypto.timingSafeEqual(expected, provided);
}

function resolveGraphProvider(token, apiMode = "auto", accountId = "") {
  const cleanToken = String(token || "").trim();
  const cleanId = String(accountId || "").trim();
  let mode = String(apiMode || "auto").trim().toLowerCase();
  if (mode !== "instagram" && mode !== "facebook") {
    mode = cleanToken.startsWith("IG") || !cleanId ? "instagram" : "facebook";
  }
  const spec = API_PROVIDERS[mode];
  return {
    mode,
    baseUrl: spec.baseUrl,
    targetNode: cleanId || spec.defaultNode,
    includePlatformParam: spec.includePlatformParam,
    token: cleanToken,
  };
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function matchKeyword(text, keywordsCsv) {
  if (!text || typeof text !== "string") return "";
  const rawKws = String(keywordsCsv || "")
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
  const keywords = rawKws.length ? rawKws : DEFAULT_KEYWORDS;
  const lower = text.toLowerCase();

  for (const kw of keywords) {
    const kwLower = kw.toLowerCase();
    const isAscii = /^[\x00-\x7F]+$/.test(kwLower);
    if (isAscii) {
      if (new RegExp(`\\b${escapeRegExp(kwLower)}\\b`, "i").test(lower)) return kw;
    } else if (lower.includes(kwLower)) {
      return kw;
    }
  }
  return "";
}

function sanitizeFirstName(rawName, fallback = "there") {
  const trimmed = String(rawName || "").trim();
  if (!trimmed) return fallback;
  const firstToken = trimmed.split(/\s+/)[0];
  return /^[A-Za-z]{2,20}$/.test(firstToken)
    ? firstToken.charAt(0).toUpperCase() + firstToken.slice(1).toLowerCase()
    : fallback;
}

function buildDmMessage(firstName, matchedKeyword, env = {}) {
  const template = env.IG_DM_TEMPLATE || DEFAULT_DM_TEMPLATE;
  const ytLink = env.IG_YOUTUBE_LINK || DEFAULT_YOUTUBE_LINK;
  const cleanName = sanitizeFirstName(firstName, "there");
  let msg = template.replace(/\[Name\]/g, cleanName).replace(/\[YouTube link\]/g, ytLink);
  if (matchedKeyword && matchedKeyword.toLowerCase() !== "demo") {
    msg = msg.replace("thanks for commenting DEMO", "thanks for commenting");
  }
  return msg;
}

function buildPublicReply(username, dmSent, env = {}) {
  const cleanHandle = String(username || "").trim().replace(/^@+/, "");
  const tpl = dmSent
    ? env.IG_PUBLIC_REPLY_DM_SENT || DEFAULT_PUBLIC_REPLY_SENT
    : env.IG_PUBLIC_REPLY_RESTRICTED || DEFAULT_PUBLIC_REPLY_RESTRICTED;
  if (cleanHandle) return tpl.replace(/\[Handle\]/g, cleanHandle);
  return tpl.replace(/@\[Handle\]\s*/g, "").trim();
}

async function graphRequest(fetchImpl, method, url, token, bodyObj = null) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;
  const opts = { method, headers };
  if (bodyObj !== null && method !== "GET") {
    opts.body = JSON.stringify(bodyObj);
  }
  try {
    const resp = await fetchImpl(url, opts);
    let data;
    try {
      data = await resp.json();
    } catch (_) {
      data = {};
    }
    return { status: resp.status, data };
  } catch (err) {
    return { status: 0, data: { error: { message: err.message || String(err) } } };
  }
}

async function hasLiveConversationOrReply(provider, commentId, senderId, ownUsername, fetchImpl) {
  // Check existing thread with commenter IGSID.
  let threadExists = false;
  if (senderId && provider.targetNode) {
    const params = new URLSearchParams({ user_id: String(senderId), fields: "id" });
    if (provider.includePlatformParam) params.set("platform", "instagram");
    const convUrl = `${provider.baseUrl}/${provider.targetNode}/conversations?${params.toString()}`;
    const convRes = await graphRequest(fetchImpl, "GET", convUrl, provider.token);
    if (convRes.status >= 200 && convRes.status < 300 && Array.isArray(convRes.data?.data) && convRes.data.data.length > 0) {
      threadExists = true;
    }
  }

  // Check if our own account already replied to this specific comment ID.
  let alreadyRepliedComment = false;
  if (commentId) {
    const repUrl = `${provider.baseUrl}/${commentId}/replies?fields=id,from,username`;
    const repRes = await graphRequest(fetchImpl, "GET", repUrl, provider.token);
    if (repRes.status >= 200 && repRes.status < 300 && Array.isArray(repRes.data?.data)) {
      alreadyRepliedComment = repRes.data.data.some((r) => {
        const u = String(r.from?.username || r.username || "").trim().toLowerCase();
        return u && u === ownUsername;
      });
    }
  }

  return { threadExists, alreadyRepliedComment };
}

async function fetchCommenterFirstName(provider, senderId, fetchImpl) {
  if (!senderId) return "there";
  const url = `${provider.baseUrl}/${senderId}?fields=name,username`;
  const res = await graphRequest(fetchImpl, "GET", url, provider.token);
  if (res.status >= 200 && res.status < 300 && res.data) {
    return sanitizeFirstName(res.data.name || "", "there");
  }
  return "there";
}

async function notifyIntegrations(env, eventRecord, fetchImpl) {
  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID && eventRecord.dm_status === "sent") {
    const tgText =
      `🔥 *Instagram Auto-DM Sent*\n` +
      `Lead: \`@${eventRecord.sender_username || eventRecord.sender_id}\`\n` +
      `Comment: _${String(eventRecord.comment_text || "").slice(0, 100)}_\n` +
      `Public Reply: ${eventRecord.public_reply_status}`;
    await graphRequest(
      fetchImpl,
      "POST",
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      "",
      { chat_id: env.TELEGRAM_CHAT_ID, text: tgText, parse_mode: "Markdown" }
    ).catch(() => {});
  }

  if (env.LEADENGINE_SYNC_URL && env.LEADENGINE_SYNC_SECRET) {
    await fetchImpl(env.LEADENGINE_SYNC_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-LeadEngine-Sync-Secret": env.LEADENGINE_SYNC_SECRET,
      },
      body: JSON.stringify(eventRecord),
    }).catch(() => {});
  }
}

function getConfiguredBlacklist(env = {}) {
  const raw = String(env.IG_BLACKLIST_HANDLES || "").trim();
  if (!raw) return new Set();
  return new Set(
    raw
      .split(",")
      .map((h) => h.trim().replace(/^@+/, "").toLowerCase())
      .filter(Boolean)
  );
}

async function handleCommentEvent(value, env = process.env, fetchImpl = fetch) {
  if (env.IG_AUTO_DM_ENABLED === "0") {
    return { status: "ignored", reason: "auto_dm_disabled" };
  }

  const commentId = String(value?.id || "").trim();
  if (!commentId) return { status: "ignored", reason: "missing_comment_id" };
  if (value?.parent_id) return { status: "ignored", reason: "nested_reply_ignored", comment_id: commentId };

  const senderId = String(value?.from?.id || "").trim();
  const senderUsername = String(value?.from?.username || "").trim();
  const handleLower = senderUsername.replace(/^@+/, "").toLowerCase();
  const ownId = String(env.IG_ACCOUNT_ID || "").trim();
  const ownUsername = String(env.IG_USERNAME || "_flik.in_").replace(/^@+/, "").toLowerCase();

  if ((ownId && senderId === ownId) || (handleLower && handleLower === ownUsername)) {
    return { status: "ignored", reason: "self_comment", comment_id: commentId };
  }

  if (warmHandledComments.has(commentId)) {
    return { status: "skipped", reason: "warm_cache_comment_seen", comment_id: commentId };
  }

  const commentText = String(value?.text || "");
  const matchedKw = matchKeyword(commentText, env.IG_KEYWORDS || "");
  if (!matchedKw) {
    return { status: "ignored", reason: "no_keyword_match", comment_id: commentId };
  }

  const provider = resolveGraphProvider(env.IG_ACCESS_TOKEN, env.IG_API_MODE || "auto", ownId);
  if (!provider.token) {
    return { status: "error", reason: "missing_ig_access_token", comment_id: commentId };
  }

  const envBlacklist = getConfiguredBlacklist(env);
  let alreadyContacted = Boolean(
    (handleLower && envBlacklist.has(handleLower)) ||
    (handleLower && warmContactedSenders.has(handleLower)) ||
    (senderId && warmContactedSenders.has(senderId))
  );
  let dedupeReason = alreadyContacted ? "blacklist_or_warm_sender" : "";

  const liveCheck = await hasLiveConversationOrReply(provider, commentId, senderId, ownUsername, fetchImpl);
  if (liveCheck.alreadyRepliedComment) {
    trackBounded(warmHandledComments, commentId);
    return { status: "skipped", reason: "live_comment_already_replied", comment_id: commentId };
  }
  if (!alreadyContacted && liveCheck.threadExists) {
    alreadyContacted = true;
    dedupeReason = "live_meta_thread_exists";
  }

  let dmStatus = alreadyContacted ? "skipped_duplicate" : "pending";
  let dmMessage = "";
  let dmSent = false;

  if (!alreadyContacted) {
    const firstName = await fetchCommenterFirstName(provider, senderId, fetchImpl);
    dmMessage = buildDmMessage(firstName, matchedKw, env);
    if (!provider.targetNode) {
      dmStatus = "error_missing_account_id";
    } else {
      const dmUrl = `${provider.baseUrl}/${provider.targetNode}/messages`;
      const dmRes = await graphRequest(fetchImpl, "POST", dmUrl, provider.token, {
        recipient: { comment_id: commentId },
        message: { text: dmMessage },
      });
      if (dmRes.status >= 200 && dmRes.status < 300 && !dmRes.data?.error) {
        dmStatus = "sent";
        dmSent = true;
      } else {
        dmStatus = `failed_${dmRes.status}`;
      }
    }
  }

  const publicReplyText = buildPublicReply(senderUsername, dmSent || alreadyContacted, env);
  const repUrl = `${provider.baseUrl}/${commentId}/replies`;
  const repRes = await graphRequest(fetchImpl, "POST", repUrl, provider.token, {
    message: publicReplyText,
  });
  const publicReplyStatus = repRes.status >= 200 && repRes.status < 300 ? "posted" : `failed_${repRes.status}`;

  trackBounded(warmHandledComments, commentId);
  if (dmSent) {
    if (handleLower) trackBounded(warmContactedSenders, handleLower);
    if (senderId) trackBounded(warmContactedSenders, senderId);
  }

  const record = {
    comment_id: commentId,
    media_id: String(value?.media?.id || ""),
    sender_id: senderId,
    sender_username: senderUsername,
    comment_text: commentText,
    matched_keyword: matchedKw,
    dm_status: dmStatus,
    dm_message: dmMessage,
    public_reply_status: publicReplyStatus,
    public_reply_text: publicReplyText,
  };

  await notifyIntegrations(env, record, fetchImpl);

  return {
    status: "processed",
    ...record,
    already_contacted: alreadyContacted,
    dedupe_reason: dedupeReason,
  };
}

async function processWebhookPayload(payload, env = process.env, fetchImpl = fetch) {
  if (!payload || typeof payload !== "object") {
    return { status: "ignored", reason: "invalid_payload", results: [] };
  }
  if (payload.object && payload.object !== "instagram") {
    return { status: "ignored", reason: `unsupported_object:${payload.object}`, results: [] };
  }

  const results = [];
  for (const entry of payload.entry || []) {
    for (const change of entry.changes || []) {
      if (change.field !== "comments") {
        results.push({ status: "ignored", reason: `field:${change.field}` });
        continue;
      }
      const res = await handleCommentEvent(change.value || {}, env, fetchImpl);
      results.push(res);
    }
  }
  return { status: "ok", processed_count: results.length, results };
}

module.exports = {
  DEFAULT_KEYWORDS,
  DEFAULT_YOUTUBE_LINK,
  getConfiguredBlacklist,
  verifyMetaSignature,
  resolveGraphProvider,
  matchKeyword,
  sanitizeFirstName,
  buildDmMessage,
  buildPublicReply,
  handleCommentEvent,
  processWebhookPayload,
};
