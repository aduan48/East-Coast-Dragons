exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbySeZUUoM0ozt9rE4eiBMzH3BXaexFmZdAZ3OcDTFbYxiUfEuUSgVEb2iAl8CFRQiUSTA/exec";

  try {
    console.log("Forwarding body:", event.body); // Log what we're sending

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: event.body,
      redirect: "follow",
    });

    const text = await response.text();
    console.log("Google response status:", response.status); // Log status
    console.log("Google raw response:", text);               // Log raw reply

    // Try to parse, but return raw text if it fails
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      // Google returned non-JSON (HTML error page, empty string, etc.)
      return {
        statusCode: 200,
        body: JSON.stringify({ result: "error", error: "Google returned non-JSON: " + text.slice(0, 300) }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    };

  } catch (err) {
    console.log("Fetch itself failed:", err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ result: "error", error: err.message }),
    };
  }
};