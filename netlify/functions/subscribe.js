exports.handler = async (event) => {
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

  const apiKey = process.env.MAILERLITE_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server configuration error" }) };
  }

  try {
    const response = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok || response.status === 200 || response.status === 201) {
      return {
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ success: true }),
      };
    }

    const err = await response.json();
    return {
      statusCode: 400,
      body: JSON.stringify({ error: err.message || "Subscription failed" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Network error" }),
    };
  }
};
