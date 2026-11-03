// ── Email template builders ─────────────────────────────────────────────────

// All styles inline: Gmail and Apple Mail on mobile strip <head><style>. Dark warm ground,
// one gold accent, Georgia serif. Matches the drip template in scripts/drip_emails.py.
const GOLD = "#d4af37";
const S = {
  body: "margin:0 0 17px;font-family:Georgia,'Times New Roman',serif;font-size:17px;line-height:1.66;color:#d9d2c2;",
  h2: "margin:0 0 20px;font-family:Georgia,serif;font-size:27px;line-height:1.28;font-weight:normal;color:#f0ead8;",
  h3: "margin:0 0 14px;font-family:Georgia,serif;font-size:21px;line-height:1.3;font-weight:normal;color:#f0ead8;",
  eyebrow: "margin:0 0 13px;font-family:Georgia,serif;font-size:11px;letter-spacing:0.28em;text-transform:uppercase;color:#c99a3a;",
  card: `background:#13100a;border:1px solid #2f2614;border-top:2px solid ${GOLD};border-radius:3px;padding:28px 30px;margin:28px 0;`,
  btn: `display:block;background:${GOLD};color:#0a0805;font-family:Georgia,serif;font-weight:bold;letter-spacing:0.09em;text-transform:uppercase;font-size:15px;line-height:1.3;padding:16px 22px;text-decoration:none;border-radius:2px;text-align:center;margin-top:4px;`,
};

const P = (t) => `<p style="${S.body}">${t}</p>`;
const H2 = (t) => `<h2 style="${S.h2}">${t}</h2>`;

function card({ eyebrow, title, body, cta, img }) {
  let imgHtml = "";
  if (img) {
    const w = img.w || 520;
    const align = img.w ? "margin:0 auto 22px;" : "margin:0 0 22px;";
    imgHtml = `<img src="${img.src}" alt="${img.alt || ""}" width="${w}" style="width:${img.w ? w + "px" : "100%"};max-width:100%;height:auto;display:block;${align}border:1px solid #2f2614;border-radius:2px;" />`;
  }
  const bodyHtml = (Array.isArray(body) ? body : [body]).map(P).join("");
  const ctaHtml = cta ? `<a href="${cta.href}" style="${S.btn}">${cta.label}</a>` : "";
  return `<div style="${S.card}">${imgHtml}<p style="${S.eyebrow}">${eyebrow}</p><h3 style="${S.h3}">${title}</h3>${bodyHtml}${ctaHtml}</div>`;
}

function readItem(href, title, blurb, thumb) {
  const text =
    `<span style="display:block;font-family:Georgia,serif;font-size:17px;line-height:1.4;color:#e7dfca;">${title}</span>`
    + `<span style="display:block;font-family:Georgia,serif;font-size:14px;line-height:1.55;color:#9a9484;margin-top:6px;">${blurb}</span>`;
  const inner = thumb
    ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>`
      + `<td width="96" valign="top" style="padding:0 16px 0 0;"><img src="${thumb}" alt="" width="96" style="width:96px;max-width:96px;height:auto;display:block;border:1px solid #2f2614;border-radius:2px;" /></td>`
      + `<td valign="top">${text}</td></tr></table>`
    : text;
  return `<a href="${href}" style="display:block;text-decoration:none;border-top:1px solid #241c0e;padding:18px 0;">${inner}</a>`;
}

function readList(heading, items) {
  return `<p style="${S.eyebrow}margin:40px 0 4px;">${heading}</p>${items.join("")}`;
}

function ornament() {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:34px 0;"><tr>`
    + `<td style="border-bottom:1px solid #2f2614;">&nbsp;</td>`
    + `<td style="padding:0 14px;font-family:Georgia,serif;color:#c99a3a;font-size:16px;line-height:1;">&#9697;</td>`
    + `<td style="border-bottom:1px solid #2f2614;">&nbsp;</td></tr></table>`;
}

function social(label, url) {
  return `<a href="${url}" style="display:inline-block;font-family:Georgia,serif;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:#c99a3a;text-decoration:none;border:1px solid #4a3d1c;padding:9px 16px;margin:0 3px 6px;border-radius:2px;">${label}</a>`;
}

function shell(inner, footerNote, heroImg) {
  const hero = heroImg
    ? `<tr><td style="padding:0;"><img src="${heroImg}" alt="Hidden Epoch" width="600" style="width:100%;max-width:100%;height:auto;display:block;border:0;" /></td></tr>`
    : "";
  const socials = social("YouTube", "https://www.youtube.com/@HiddenEpochHistory")
    + social("Instagram", "https://www.instagram.com/hiddenepochh")
    + social("TikTok", "https://www.tiktok.com/@HiddenEpochH");
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="dark" />
<meta name="supported-color-schemes" content="dark" />
</head>
<body style="margin:0;padding:0;background:#070502;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#070502;width:100%;">
<tr><td align="center" style="padding:0;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;margin:0 auto;background:#0a0805;">
<tr><td align="center" style="padding:42px 24px 28px;background:#0d0a06;border-bottom:1px solid #2a2212;">
<img src="https://hiddenepoch.com/assets/logo-mark.jpg" width="64" height="64" alt="Hidden Epoch" style="width:64px;height:64px;border-radius:50%;display:block;border:1px solid #6b5a22;margin:0 auto;" />
<div style="font-family:Georgia,serif;font-weight:bold;color:#d4af37;letter-spacing:0.28em;font-size:23px;margin-top:16px;">HIDDEN EPOCH</div>
<div style="font-family:Georgia,serif;font-style:italic;color:#8a8372;letter-spacing:0.04em;font-size:13px;margin-top:7px;">The record they edited</div>
</td></tr>
${hero}
<tr><td style="padding:36px 30px 22px;">${inner}</td></tr>
<tr><td align="center" style="padding:26px 28px 38px;background:#0d0a06;border-top:1px solid #2a2212;">
<div style="margin:0 0 18px;">${socials}</div>
<p style="margin:0 0 7px;font-family:Georgia,serif;font-size:12px;line-height:1.5;color:#6f6a5c;">${footerNote}</p>
<p style="margin:0 0 12px;"><a href="https://hiddenepoch.com" style="color:#b99a3a;font-family:Georgia,serif;font-size:12px;text-decoration:none;">hiddenepoch.com</a></p>
<p style="margin:0;font-family:Georgia,serif;font-size:11px;color:#4f4a3f;">&#169; 2026 Hidden Epoch</p>
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;
}

function leadMagnetEmail() {
  const inner =
    H2("Your field guide is ready.") +
    P("You asked for the books they removed. Here they are.") +
    card({
      eyebrow: "The Field Guide, Vol. I",
      title: "7 Books the Vatican Doesn't Want You Reading, plus one bonus",
      body: "Real translations from R.H. Charles, Mordecai Noah, the Berlin Codex, and the Nag Hammadi Library. Each book documented with the council that removed it, the year, and what was too specific for the canon. The bonus is the Apocalypse of Peter, the source of every image of hell you have ever been shown.",
      img: { src: "https://hiddenepoch.com/assets/lead-magnet-cover.jpg", alt: "The field guide cover", w: 232 },
      cta: { href: "https://hiddenepoch.com/downloads/7-books-vatican-doesnt-want-you-reading.pdf", label: "Download the field guide" },
    }) +
    card({
      eyebrow: "The One-Page Timeline",
      title: "Books Cut From Your Bible: Who Cut Them, and When",
      body: "Twelve cuts on one page, from Marcion in 144 AD to the Bible Society in 1826. The council, the year, and the words they used to bury each book. Print it. Pin it next to your Bible.",
      img: { src: "https://hiddenepoch.com/assets/cut-books-timeline-preview.jpg", alt: "The one-page timeline of cut books", w: 232 },
      cta: { href: "https://hiddenepoch.com/downloads/books-cut-from-your-bible-timeline.pdf", label: "Download the timeline" },
    }) +
    P("Read it on the train, on your phone, on your laptop. It is yours. Save it.") +
    ornament() +
    readList("What to read next", [
      readItem(
        "https://www.etsy.com/listing/4597922785?utm_source=email&utm_medium=welcome_email&utm_campaign=lead_magnet&utm_content=watchers",
        "Two Hundred Angels Came Down on Mount Hermon. This Chart Names Their Chiefs.",
        "One printable chart, under $2. Azazel taught swords. Kokabel taught the stars. Semjaza led them all. Every chief Watcher who fell and the forbidden craft he handed to mankind.",
        "https://hiddenepoch.com/assets/welcome/watchers-chart.jpg"
      ),
      readItem(
        "https://www.etsy.com/listing/4595169146?utm_source=email&utm_medium=welcome_email&utm_campaign=lead_magnet",
        "Read the Book They Cut First: The Book of Enoch",
        "The 200 Watchers, the oath on Mount Hermon, the giants. The book Jude quotes word for word and your Bible leaves out. Illustrated PDF, Ethiopian edition. Under $5.",
        "https://hiddenepoch.com/assets/welcome/enoch-cover-banned.jpg"
      ),
      readItem(
        "https://hiddenepoch.com/canon",
        "The Full Edition: All 14 Books Removed From Your Bible",
        "The seven you just got plus seven more, with full annotated texts and Hidden Epoch commentary on which council removed each one and why.",
        "https://hiddenepoch.com/canon/cover-card.jpg"
      ),
      readItem(
        "https://hiddenepoch.com/archive/sumerian-flood-predates-genesis/",
        "The Sumerian Flood Predates Genesis by 1,500 Years",
        "Clay tablets in the British Museum named the flood survivor 1,500 years before Moses was born.",
        "https://hiddenepoch.com/archive/sumerian-flood-predates-genesis/cover.jpg"
      ),
    ]);
  return shell(
    inner,
    "You downloaded the field guide at hiddenepoch.com/lost-books",
    "https://hiddenepoch.com/assets/lead-magnet-banner.jpg"
  ).trim();
}

function newsletterWelcomeEmail() {
  const inner =
    H2("You're in. Read this first.") +
    P("Welcome to the Inner Circle. You will hear from us when something we dig up is too important to leave to the algorithm.") +
    P("Before you go anywhere else on the site, start with this one. It is the investigation everything else on Hidden Epoch is built around.") +
    card({
      eyebrow: "Featured Investigation",
      title: "The Sumerian Flood Predates Genesis by 1,500 Years",
      body: [
        "The story of a global flood, a chosen survivor, and an ark of animals was not written by Moses. It was written on clay tablets in southern Iraq fifteen centuries before the Bible existed, and the Sumerian version names the survivor, the city he came from, and the gods who tipped him off.",
        "The tablets are in the British Museum. The translation is settled. The implication is the part nobody teaches.",
      ],
      cta: { href: "https://hiddenepoch.com/archive/sumerian-flood-predates-genesis/", label: "Read the investigation" },
    }) +
    ornament() +
    readList("Then read these", [
      readItem(
        "https://hiddenepoch.com/archive/garden-of-eden-coordinates/",
        "The Bible Gave Exact Coordinates for Eden, and a Smithsonian Archaeologist Found It Underwater",
        "200 feet down in the Persian Gulf, the four-river junction Genesis describes still exists. The Sumerians left maps.",
        "https://hiddenepoch.com/archive/garden-of-eden-coordinates/cover.jpg"
      ),
      readItem(
        "https://hiddenepoch.com/archive/tarim-basin-mummies/",
        "The Tarim Basin Mummies: Blonde, Caucasian, and 4,000 Years Old in Western China",
        "A 2021 DNA study said they came from a population that should not exist. The mainstream still has not explained them.",
        "https://hiddenepoch.com/archive/tarim-basin-mummies/cover.jpg"
      ),
      readItem(
        "https://hiddenepoch.com/archive/giants-after-the-flood/",
        "Giants After the Flood: The Iron Bed the Bible Measured in Public",
        "Deuteronomy gives the dimensions. The bed was 13 feet long. The owner survived a flood that was supposed to wipe his kind out.",
        "https://hiddenepoch.com/archive/giants-after-the-flood/cover.jpg"
      ),
    ]);
  return shell(
    inner,
    "You joined Hidden Epoch at hiddenepoch.com",
    "https://hiddenepoch.com/archive/sumerian-flood-predates-genesis/cover.jpg"
  ).trim();
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
      // 422 = already subscribed, treat as success
      if (contactRes.status !== 422) {
        return {
          statusCode: 400,
          headers: { "Access-Control-Allow-Origin": "*" },
          body: JSON.stringify({ error: err.message || "Subscription failed" }),
        };
      }
    }

    // 2. Send welcome email, different content per signup source.
    // Every capture surface except the plain "newsletter" join promises the free
    // field-guide PDF (lost-books, exit popup, blog archive blocks, /books page),
    // so anything that is not an explicit newsletter signup gets the lead magnet.
    const isLeadMagnet = source !== "newsletter";
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
        reply_to: "foztunc97@gmail.com",
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
