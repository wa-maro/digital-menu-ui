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

  try {
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

    const cartData = await res.json();

    return new Response(JSON.stringify({ success: true, cart: cartData }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error while adding item to cart:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Server error" }),
      {
        status: 500,
      }
    );
  }
};

export const PATCH: RequestHandler = async ({ request, cookies }) => {
  const { quantity, id } = await request.json();

  try {
    const res = await fetch(`${VITE_API_URL_CUSTOMER}/cart/update-quantity`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
      body: JSON.stringify({ itemId: id, quantity: Number(quantity) }),
    });

    if (!res.ok) {
      return new Response("Failed to update cart.", { status: 400 });
    }

    return new Response("Successful", { status: 200 });
  } catch (error) {
    return new Response("Error updating cart", { status: 500 });
  }
};
