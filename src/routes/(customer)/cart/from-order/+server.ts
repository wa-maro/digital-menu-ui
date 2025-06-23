import { VITE_API_URL_CUSTOMER } from "$env/static/private";
import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { orderId, merge } = await request.json();
  const token = cookies.get("token");

  if (!token) return new Response("Unauthorized", { status: 401 });

  try {
    const res = await fetch(
      `${VITE_API_URL_CUSTOMER}/cart/from-order/${orderId}/?merge=${merge}`,
      {
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      }
    );

    if (!res.ok)
      return json({ status: 400, message: "Failed to update cart." });

    let cart = await res.json();

    return json({ success: true, cart });
  } catch (err) {
    console.error("Failed to sync cart from order:", err);
    return new Response("Failed to sync cart", { status: 500 });
  }
};
