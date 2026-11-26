/**
 * Meta App Data Deletion Request Callback: https://flik.in/api/webhooks/data-deletion
 * Satisfies Meta App Review / Live Mode Data Deletion URL requirements.
 */

const crypto = require("crypto");

function parseSignedRequest(signedRequest, appSecret) {
  if (!signedRequest || !signedRequest.includes(".")) return null;
  const [encodedSig, payload] = signedRequest.split(".", 2);
  if (appSecret) {
    const expected = crypto
      .createHmac("sha256", appSecret)
      .update(payload)
      .digest("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
    const a = Buffer.from(encodedSig, "utf8");
    const b = Buffer.from(expected, "utf8");
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  }
  const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
  return JSON.parse(Buffer.from(normalized, "base64").toString("utf8"));
}

module.exports = async function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json({
      status: "active",
      policy_url: "https://flik.in/privacy-policy",
      contact: "Contact@flik.in",
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const signedReq = req.body?.signed_request || "";
  const data = parseSignedRequest(signedReq, process.env.META_APP_SECRET || "");
  if (process.env.META_APP_SECRET && !data) {
    return res.status(403).json({ error: "Invalid signed_request" });
  }

  const confirmationCode = `FLIK-DEL-${crypto.randomBytes(6).toString("hex").toUpperCase()}`;
  return res.status(200).json({
    url: "https://flik.in/privacy-policy",
    confirmation_code: confirmationCode,
  });
};
