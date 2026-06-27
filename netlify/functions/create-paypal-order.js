//create-paypal-order.js

//imports from.env
const PAYPAL_BASE_URL =
  process.env.PAYPAL_BASE_URL || "https://api-m.sandbox.paypal.com";

//gets the access token
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

//creates a new payment dependning on the tournamen selected
exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { tournamentSelect } = JSON.parse(event.body);

    const priceMap = {
      "Prep Cup (6/12-14)": "235.00",
      "Girls Harrow Invite (6/19-21)": "235.00",
      "Boys Harrow Invite (6/26-28)": "235.00",
      "Summer Meltdown (7/17-19)": "235.00",
      "CCM Summer Invite (8/1-3)": "235.00",
      "Girls Militia Cup (8/7-9)": "235.00",
      "Boys Militia Cup (8/14-16)": "235.00",
    };

    const amount = priceMap[tournamentSelect] || "235.00";


    const accessToken = await getAccessToken();

    //this renders and talks to paypal API to generate payment box
    const response = await fetch(`${PAYPAL_BASE_URL}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            description: tournamentSelect,
            amount: {
              currency_code: "USD",
              value: amount,
            },
          },
        ],
      }),
    });

    const order = await response.json();

    if (!response.ok) {
      throw new Error(order.message || "Could not create PayPal order");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ id: order.id }),
    };
  } catch (error) {
    console.error("Create PayPal order error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};