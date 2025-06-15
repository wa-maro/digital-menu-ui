import { VITE_API_URL_CUSTOMER } from "$env/static/private";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request, cookies, fetch }) => {
  const { item, quantity }: { item: MenuItem; quantity: number } =
    await request.json();

  const newCartItem = {
    itemId: item._id,
    // customization: {},
    quantity: quantity,
    price: item.price,
  };

  const res = await fetch(`${VITE_API_URL_CUSTOMER}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies.get("token")}`,
    },
    body: JSON.stringify(newCartItem),
  });

  if (!res.ok) {
    const error = await res.text();
    return new Response(JSON.stringify({ success: false, error: error }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 201,
  });
};
