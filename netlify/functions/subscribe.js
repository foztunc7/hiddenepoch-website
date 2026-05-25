// ── Email template builders ─────────────────────────────────────────────────

const sharedStyles = `
  body { margin: 0; padding: 0; background: #000000; font-family: Georgia, serif; }
  .wrap { max-width: 600px; margin: 0 auto; background: #000000; }
  .header { background: #000000; border-bottom: 1px solid rgba(212,175,55,0.3); padding: 40px 48px; text-align: center; }
  .header img { width: 64px; height: 64px; border-radius: 50%; border: 1px solid rgba(212,175,55,0.4); }
  .header h1 { font-family: Georgia, serif; font-size: 13px; letter-spacing: 0.3em; text-transform: uppercase; color: #D4AF37; margin: 20px 0 0; }
  .body { padding: 52px 48px; }
  .body h2 { font-family: Georgia, serif; font-size: 26px; color: #f0ead8; margin: 0 0 20px; line-height: 1.35; font-weight: normal; }
  .body p { font-size: 16px; color: #c8c2b4; line-height: 1.75; margin: 0 0 20px; }
  .lead { background: #0d0a06; border: 1px solid rgba(212,175,55,0.25); padding: 32px 36px; margin: 28px 0 36px; }
  .lead-tag { font-family: Georgia, serif; font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #D4AF37; margin: 0 0 14px; }
  .lead h3 { font-family: Georgia, serif; font-size: 22px; color: #f0ead8; margin: 0 0 16px; line-height: 1.3; font-weight: normal; }
  .lead p { font-size: 15px; color: #c8c2b4; line-height: 1.7; margin: 0 0 22px; }
  .lead a { display: inline-block; background: #D4AF37; color: #000000; font-family: Georgia, serif; font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; padding: 13px 28px; text-decoration: none; font-weight: bold; }
  .more h3 { font-family: Georgia, serif; font-size: 12px; letter-spacing: 0.28em; text-transform: uppercase; color: #D4AF37; margin: 36px 0 18px; }
  .more-item { border-top: 1px solid rgba(212,175,55,0.1); padding: 18px 0; }
  .more-item a { font-family: Georgia, serif; font-size: 16px; color: #f0ead8; line-height: 1.4; text-decoration: none; display: block; }
  .more-item a:hover { color: #D4AF37; }
  .more-item span { display: block; font-size: 13px; color: rgba(200,194,180,0.65); margin-top: 6px; line-height: 1.55; }
  .divider { height: 1px; background: rgba(212,175,55,0.15); margin: 40px 0 32px; }
  .footer { border-top: 1px solid rgba(212,175,55,0.12); padding: 32px 48px; text-align: center; }
  .footer p { font-size: 12px; color: rgba(200,194,180,0.4); margin: 0 0 8px; }
  .footer a { color: rgba(212,175,55,0.5); }
  .socials { margin: 18px 0; }
  .socials a { font-size: 12px; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(212,175,55,0.6); margin: 0 10px; text-decoration: none; }
`;

function leadMagnetEmail() {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>${sharedStyles}</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <img src="https://hiddenepoch.com/assets/logo.jpeg" alt="Hidden Epoch" />
    <h1>Hidden Epoch</h1>
  </div>

  <div class="body">
    <h2>Your field guide is ready.</h2>
    <p>You asked for the books they removed. Here they are.</p>

    <div class="lead">
      <p class="lead-tag">Download · Field Guide · Vol. I</p>
      <h3>7 Books the Vatican Doesn't Want You Reading + 1 Bonus</h3>
      <p>Real translations from R.H. Charles, Mordecai Noah, the Berlin Codex, the Nag Hammadi Library. Each book documented with the council that removed it, the year, and what was too specific for the canon. Plus one bonus: the Apocalypse of Peter, the actual source of every image of hell you've ever been shown.</p>
      <a href="https://hiddenepoch.com/downloads/7-books-vatican-doesnt-want-you-reading.pdf">Download the PDF →</a>
    </div>

    <p>Read it on the train, on your phone, on your laptop. It is yours. Save it.</p>

    <div class="more">
      <h3>What's Next</h3>
      <div class="more-item">
        <a href="https://hiddenepoch.com/canon">
          The Full Edition — All 14 Books Removed From Your Bible
          <span>The seven you just got plus seven more: Apocalypse of Adam, Book of the Watchers, Apocryphon of John, Apocalypse of Paul, Gospel of Judas, Acts of Thomas, Apocryphon of James. With full annotated texts and Hidden Epoch commentary. $27.</span>
        </a>
      </div>
      <div class="more-item">
        <a href="https://hiddenepoch.com/archive/sumerian-flood-predates-genesis/">
          The Sumerian Flood Predates Genesis by 1,500 Years
          <span>While you're here. Clay tablets in the British Museum named the flood survivor 1,500 years before Moses was born.</span>
        </a>
      </div>
    </div>

    <div class="divider"></div>

    <p>New investigations drop daily. Pick whichever you actually use:</p>

    <div class="socials">
      <a href="https://www.youtube.com/@HiddenEpochHistory">YouTube</a>
      <a href="https://www.instagram.com/hiddenepochh">Instagram</a>
      <a href="https://www.tiktok.com/@HiddenEpochH">TikTok</a>
    </div>
  </div>

  <div class="footer">
    <p>You're receiving this because you downloaded our field guide at hiddenepoch.com/lost-books</p>
    <p><a href="https://hiddenepoch.com">hiddenepoch.com</a></p>
    <p style="margin-top:12px;">© 2026 Hidden Epoch. All rights reserved.</p>
  </div>
</div>
</body>
</html>
  `.trim();
}

function newsletterWelcomeEmail() {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<style>${sharedStyles}</style>
</head>
<body>
<div class="wrap">
  <div class="header">
    <img src="https://hiddenepoch.com/assets/logo.jpeg" alt="Hidden Epoch" />
    <h1>Hidden Epoch</h1>
  </div>

  <div class="body">
    <h2>You're in. Read this first.</h2>
    <p>Welcome to the Inner Circle. You'll hear from us when something we dig up is too important to leave to the algorithm.</p>
    <p>Before you go anywhere else on the site, start with this one. It's the investigation everything else on Hidden Epoch is built around:</p>

    <div class="lead">
      <p class="lead-tag">Start here · Featured Investigation</p>
      <h3>The Sumerian Flood Predates Genesis by 1,500 Years.</h3>
      <p>The story of a global flood, a chosen survivor, and an ark of animals wasn't written by Moses. It was written on clay tablets in southern Iraq fifteen centuries before the Bible existed — and the Sumerian version names the survivor, the city he came from, and the gods who tipped him off.</p>
      <p>The tablets are in the British Museum. The translation is settled. The implication is the part nobody teaches.</p>
      <a href="https://hiddenepoch.com/archive/sumerian-flood-predates-genesis/">Read the Investigation →</a>
    </div>

    <div class="more">
      <h3>Then Read These</h3>
      <div class="more-item">
        <a href="https://hiddenepoch.com/archive/garden-of-eden-coordinates/">
          The Bible Gave Exact Coordinates for Eden — and a Smithsonian Archaeologist Found It Underwater
          <span>200 feet down in the Persian Gulf, the four-river junction Genesis describes still exists. The Sumerians left maps.</span>
        </a>
      </div>
      <div class="more-item">
        <a href="https://hiddenepoch.com/archive/tarim-basin-mummies/">
          The Tarim Basin Mummies: Blonde, Caucasian, and 4,000 Years Old in Western China
          <span>A 2021 DNA study said they came from a population that "shouldn't exist." The mainstream still hasn't explained them.</span>
        </a>
      </div>
      <div class="more-item">
        <a href="https://hiddenepoch.com/archive/giants-after-the-flood/">
          Giants After the Flood: The Iron Bed the Bible Measured in Public
          <span>Deuteronomy gives the dimensions. The bed was 13 feet long. The owner survived a flood that was supposed to wipe his kind out.</span>
        </a>
      </div>
    </div>

    <div class="divider"></div>

    <p>New investigations drop daily on YouTube, Instagram, and TikTok. Pick whichever you actually use:</p>

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
  `.trim();
}

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
  let source;
  try {
    const body = JSON.parse(event.body || "{}");
    email = body.email;
    source = body.source || "newsletter"; // newsletter | lead_magnet
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

    // 2. Send welcome email — different content per signup source
    const isLeadMagnet = source === "lead_magnet";
    const subject = isLeadMagnet
      ? "Your free field guide: 7 Books the Vatican Doesn't Want You Reading"
      : "Start here: the Sumerian flood predates Genesis by 1,500 years.";

    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Hidden Epoch <noreply@hiddenepoch.com>",
        to: [email],
        subject,
        html: (isLeadMagnet ? leadMagnetEmail() : newsletterWelcomeEmail()),
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
