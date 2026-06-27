const PAYPAL_BASE_URL = process.env.PAYPAL_BASE_URL || "https://api-m.sandbox.paypal.com";
const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "https://script.google.com/macros/s/AKfycbySeZUUoM0ozt9rE4eiBMzH3BXaexFmZdAZ3OcDTFbYxiUfEuUSgVEb2iAl8CFRQiUSTA/exec";

//gets the acess token with the URL
async function getAccessToken() {
  const auth = Buffer.from(
    `${process.env.PAYPAL_CLIENT_ID}:${process.env.PAYPAL_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch(`${PAYPAL_BASE_URL}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error_description || "Could not get PayPal access token");
  }

  return data.access_token;
}

//helps submit it
exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const formData = JSON.parse(event.body);
    const { orderID } = formData;

    if (!orderID) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Missing PayPal order ID" }),
      };
    }

    // 1. CAPTURE THE PAYPAL ORDER
    const accessToken = await getAccessToken();
    const captureResponse = await fetch(
      `${PAYPAL_BASE_URL}/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const captureData = await captureResponse.json();

    if (!captureResponse.ok) {
      throw new Error(captureData.message || "PayPal capture failed");
    }

    if (captureData.status !== "COMPLETED") {
      throw new Error("Payment was not completed");
    }

    // 2. CONSTRUCT EXACT PAYLOAD FORMAT FOR GOOGLE SCRIPT
    // We add the order ID metadata back into the object, then serialize it 
    // exactly like event.body was sent in your working function.
    const combinedData = {
      ...formData,
      paypalOrderID: orderID,
      paypalStatus: captureData.status,
    };

    const payloadBody = JSON.stringify(combinedData);
    console.log("Forwarding body:", payloadBody); // Exactly like your original log

    // 3. EXECUTE EXACT GOOGLE APPS SCRIPT SUBMISSION LOGIC
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: payloadBody,
      redirect: "follow",
    });

    const text = await response.text();
    console.log("Google response status:", response.status); // Exactly like your original log
    console.log("Google raw response:", text);               // Exactly like your original log

    // Try to parse, but return the non-JSON error shape exactly if it fails
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      // If Google returns non-JSON, we break gracefully without throwing a hard 500 error
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          result: "error", 
          error: "Google returned non-JSON: " + text.slice(0, 300) 
        }),
      };
    }

    // Return the exact successful JSON output from Google back to the frontend
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    };

  } catch (error) {
    console.error("Capture and Submission Error:", error.message);

    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        result: "error", 
        error: error.message 
      }),
    };
  }
};