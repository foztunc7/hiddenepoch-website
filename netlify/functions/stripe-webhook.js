/**
 * stripe-webhook.js — Stripe webhook handler for canon PDF fulfillment.
 *
 * Listens for `checkout.session.completed`. On a successful $27.99 payment:
 *   1. Verifies the Stripe signature (rejects forged calls)
 *   2. Extracts buyer email from the checkout session
 *   3. Sends the PDF download link via Resend
 *
 * Required env vars:
 *   STRIPE_WEBHOOK_SECRET — `whsec_...` from Stripe Dashboard → Webhooks → Signing secret
 *   RESEND_API_KEY        — already set for the newsletter subscribe function
 *
 * The PDF lives at /private/canon/dl-h1dd3n-canon-v1-2026-private/TheHiddenCanon.pdf
 * (Netlify static asset, obscure path. URL-sharing is the risk; upgrade to signed
 * tokens later if abuse appears.)
 */

const crypto = require("crypto");

const DOWNLOAD_URL =
  "https://hiddenepoch.com/private/canon/dl-h1dd3n-canon-v1-2026-private/TheHiddenCanon.pdf";

/**
 * Stripe sends the signature as a header:
 *   stripe-signature: t=<timestamp>,v1=<hmacSha256>,v0=<legacy>
 * We compute HMAC-SHA256 over `${timestamp}.${rawBody}` using STRIPE_WEBHOOK_SECRET
 * and compare to the v1 entry.
 */
function verifyStripeSignature(rawBody, header, secret) {
  if (!header || !secret) return false;
  const parts = header.split(",").reduce((acc, kv) => {
    const [k, v] = kv.split("=");
    if (!acc[k]) acc[k] = [];
    acc[k].push(v);
    return acc;
  }, {});
  const timestamp = (parts.t || [])[0];
  const v1Sigs = parts.v1 || [];
  if (!timestamp || v1Sigs.length === 0) return false;

  // Reject events older than 5 minutes (replay-attack defense).
  const tsNum = parseInt(timestamp, 10);
  if (Math.abs(Date.now() / 1000 - tsNum) > 300) return false;

  const signedPayload = `${timestamp}.${rawBody}`;
  const expected = crypto
    .createHmac("sha256", secret)
    .update(signedPayload, "utf8")
    .digest("hex");

  // Timing-safe compare against ANY of the provided v1 signatures.
  return v1Sigs.some((sig) => {
    try {
      return (
        sig.length === expected.length &&
        crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))
      );
    } catch {
      return false;
    }
  });
}

async function sendFulfillmentEmail(email, customerName) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY missing");
  }
  const subject = "Your copy of The Hidden Canon (download inside)";
  const greeting = customerName
    ? `Thank you, ${customerName}.`
    : "Thank you for your order.";

  const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>
  body { margin: 0; padding: 0; background: #000000; font-family: Georgia, serif; }
  .wrap { max-width: 600px; margin: 0 auto; background: #000000; }
  .header { background: #000000; border-bottom: 1px solid rgba(212,175,55,0.3); padding: 40px 48px; text-align: center; }
  .header img { width: 64px; height: 64px; border-radius: 50%; border: 1px solid rgba(212,175,55,0.4); }
  .header h1 { font-family: Georgia, serif; font-size: 13px; letter-spacing: 0.3em; text-transform: uppercase; color: #D4AF37; margin: 20px 0 0; }
  .body { padding: 52px 48px; }
  .body h2 { font-family: Georgia, serif; font-size: 26px; color: #f0ead8; margin: 0 0 20px; line-height: 1.35; font-weight: normal; }
  .body p { font-size: 16px; color: #c8c2b4; line-height: 1.75; margin: 0 0 20px; }
  .download-box { background: #0d0a06; border: 1px solid rgba(212,175,55,0.4); padding: 36px; margin: 32px 0; text-align: center; }
  .download-box h3 { font-family: Georgia, serif; font-size: 20px; color: #f0ead8; margin: 0 0 18px; font-weight: normal; }
  .download-box a { display: inline-block; background: #D4AF37; color: #000000; font-family: Georgia, serif; font-size: 13px; letter-spacing: 0.18em; text-transform: uppercase; padding: 16px 36px; text-decoration: none; font-weight: bold; }
  .download-box .meta { font-size: 12px; color: rgba(200,194,180,0.6); margin: 18px 0 0; font-family: Georgia, serif; letter-spacing: 0.05em; }
  .footer { border-top: 1px solid rgba(212,175,55,0.12); padding: 32px 48px; text-align: center; }
  .footer p { font-size: 12px; color: rgba(200,194,180,0.4); margin: 0 0 8px; }
  .footer a { color: rgba(212,175,55,0.5); }
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <img src="https://hiddenepoch.com/assets/logo.jpeg" alt="Hidden Epoch" />
    <h1>The Hidden Canon</h1>
  </div>

  <div class="body">
    <h2>${greeting}</h2>
    <p>Your copy of The Hidden Canon is ready. 90 pages, 14 books the early church cut, hid, or condemned, with manuscript IDs and the political reasons each was excluded.</p>

    <div class="download-box">
      <h3>Download your PDF</h3>
      <a href="${DOWNLOAD_URL}">Download The Hidden Canon</a>
      <p class="meta">PDF · 6.5 MB · Personal license · DRM-free</p>
    </div>

    <p>The download link does not expire. Save the file to your device. If you lose access, reply to this email and we will resend.</p>

    <p>The full series of investigations this PDF draws from lives at <a href="https://hiddenepoch.com/archive/" style="color:#D4AF37;">hiddenepoch.com/archive</a>.</p>
  </div>

  <div class="footer">
    <p>You're receiving this because you purchased The Hidden Canon at hiddenepoch.com</p>
    <p><a href="https://hiddenepoch.com">hiddenepoch.com</a></p>
    <p style="margin-top:12px;">© 2026 Hidden Epoch. All rights reserved.</p>
  </div>
</div>
</body>
</html>`.trim();

  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Hidden Epoch <noreply@hiddenepoch.com>",
      to: [email],
      subject,
      html,
    }),
  });
  if (!r.ok) {
    const errBody = await r.text().catch(() => "");
    throw new Error(`Resend API ${r.status}: ${errBody.slice(0, 200)}`);
  }
}

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("STRIPE_WEBHOOK_SECRET not configured");
    return { statusCode: 500, body: "Server misconfigured" };
  }

  const rawBody = event.body || "";
  const sigHeader =
    event.headers["stripe-signature"] || event.headers["Stripe-Signature"];

  if (!verifyStripeSignature(rawBody, sigHeader, secret)) {
    console.error("Stripe signature verification failed");
    return { statusCode: 400, body: "Invalid signature" };
  }

  let evt;
  try {
    evt = JSON.parse(rawBody);
  } catch {
    return { statusCode: 400, body: "Invalid JSON" };
  }

  if (evt.type !== "checkout.session.completed") {
    // Acknowledge unrelated events without action.
    return { statusCode: 200, body: "Ignored event type" };
  }

  const session = evt.data && evt.data.object ? evt.data.object : {};
  const email =
    (session.customer_details && session.customer_details.email) ||
    session.customer_email;
  const name =
    (session.customer_details && session.customer_details.name) || null;

  if (!email) {
    console.error("checkout.session.completed missing email:", session.id);
    return { statusCode: 200, body: "No email on session — manual followup required" };
  }

  try {
    await sendFulfillmentEmail(email, name);
    console.log(`Fulfillment email sent to ${email} for session ${session.id}`);
    return { statusCode: 200, body: "Fulfillment email sent" };
  } catch (err) {
    console.error("Fulfillment email failed:", err.message);
    // Return 500 so Stripe retries the webhook (it auto-retries up to 3 days).
    return { statusCode: 500, body: `Fulfillment failed: ${err.message}` };
  }
};
