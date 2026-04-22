exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let email;
  try {
    const body = JSON.parse(event.body || "{}");
    email = body.email;
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  if (!email || !email.includes("@")) {
    return { statusCode: 400, body: JSON.stringify({ error: "Valid email required" }) };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server configuration error" }) };
  }

  const AUDIENCE_ID = "3b01a591-ab63-4933-8603-58e80ad68b32";

  try {
    // 1. Add contact to Hidden Epoch Inner Circle audience
    const contactRes = await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, unsubscribed: false }),
    });

    if (!contactRes.ok) {
      const err = await contactRes.json().catch(() => ({}));
      // 422 = already subscribed — treat as success
      if (contactRes.status !== 422) {
        return {
          statusCode: 400,
          headers: { "Access-Control-Allow-Origin": "*" },
          body: JSON.stringify({ error: err.message || "Subscription failed" }),
        };
      }
    }

    // 2. Send welcome email
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Hidden Epoch <noreply@hiddenepoch.com>",
        to: [email],
        subject: "You're in. The first investigation is waiting.",
        html: `
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
  .body h2 { font-family: Georgia, serif; font-size: 26px; color: #f0ead8; margin: 0 0 24px; line-height: 1.3; font-weight: normal; }
  .body p { font-size: 17px; color: #c8c2b4; line-height: 1.8; margin: 0 0 20px; }
  .divider { height: 1px; background: rgba(212,175,55,0.15); margin: 36px 0; }
  .cta { text-align: center; margin: 40px 0; }
  .cta a { display: inline-block; background: #D4AF37; color: #000000; font-family: Georgia, serif; font-size: 13px; letter-spacing: 0.15em; text-transform: uppercase; padding: 16px 40px; text-decoration: none; font-weight: bold; }
  .topics { background: #111111; border: 1px solid rgba(212,175,55,0.1); padding: 32px 40px; margin: 32px 0; }
  .topics h3 { font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #D4AF37; margin: 0 0 20px; }
  .topic { display: flex; gap: 16px; margin-bottom: 16px; }
  .topic-num { font-size: 18px; color: rgba(212,175,55,0.3); font-family: Georgia, serif; min-width: 28px; }
  .topic-text { font-size: 15px; color: #c8c2b4; line-height: 1.5; }
  .footer { border-top: 1px solid rgba(212,175,55,0.12); padding: 36px 48px; text-align: center; }
  .footer p { font-size: 12px; color: rgba(200,194,180,0.4); margin: 0 0 8px; }
  .footer a { color: rgba(212,175,55,0.5); }
  .socials { margin: 20px 0; }
  .socials a { font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(212,175,55,0.6); margin: 0 12px; text-decoration: none; }
</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <img src="https://hiddenepoch.com/assets/logo.jpeg" alt="Hidden Epoch" />
    <h1>Hidden Epoch</h1>
  </div>

  <div class="body">
    <h2>Welcome to the Inner Circle.</h2>
    <p>You're now receiving investigations that don't make it into textbooks, classrooms, or the mainstream. The kind of history that gets buried — and then denied.</p>
    <p>Here's what we're digging into right now:</p>

    <div class="topics">
      <h3>Current Investigations</h3>
      <div class="topic">
        <span class="topic-num">01</span>
        <span class="topic-text">The Bible gave exact coordinates for Eden. A Smithsonian archaeologist found it 200 feet underwater in the Persian Gulf.</span>
      </div>
      <div class="topic">
        <span class="topic-num">02</span>
        <span class="topic-text">The Sumerians wrote Noah's flood story in 2100 BC. Genesis didn't exist for another 1,500 years.</span>
      </div>
      <div class="topic">
        <span class="topic-num">03</span>
        <span class="topic-text">Mummies found in western China with blonde hair and Caucasian features. A 2021 DNA study said they came from nowhere.</span>
      </div>
    </div>

    <div class="cta">
      <a href="https://hiddenepoch.com/archive/">Read the Full Investigations →</a>
    </div>

    <div class="divider"></div>

    <p>Follow us on the platforms where we drop new discoveries daily:</p>

    <div class="socials">
      <a href="https://www.youtube.com/@HiddenEpochHistory">YouTube</a>
      <a href="https://www.instagram.com/hiddenepochh">Instagram</a>
      <a href="https://www.tiktok.com/@HiddenEpochH">TikTok</a>
    </div>
  </div>

  <div class="footer">
    <p>You're receiving this because you joined Hidden Epoch at hiddenepoch.com</p>
    <p><a href="https://hiddenepoch.com">hiddenepoch.com</a></p>
    <p style="margin-top:12px;">© 2026 Hidden Epoch. All rights reserved.</p>
  </div>
</div>
</body>
</html>
        `.trim(),
      }),
    });

    return {
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "Network error" }),
    };
  }
};
