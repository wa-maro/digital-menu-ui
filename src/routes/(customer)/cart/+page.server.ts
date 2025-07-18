import { VITE_API_URL_CUSTOMER } from "$env/static/private";
import type { PageServerLoad } from "./$types";
import { type Actions } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  try {
    const res = await fetch(`${VITE_API_URL_CUSTOMER}/cart`, {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    });

    if (!res.ok) {
      return {};
    }
    const data = await res.json();

    return { data };
  } catch (error) {
    return {};
  }
};

export const actions: Actions = {
  removeItem: async ({ cookies, request }) => {
    const formData = await request.formData();
    const itemId = formData.get("itemId");

    if (!itemId || typeof itemId !== "string") {
      return { success: false, error: "Invalid item ID" };
    }

    const cartRes = await fetch(
      `${VITE_API_URL_CUSTOMER}/cart/remove-item/${itemId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      }
    );

    if (!cartRes.ok) {
      const error = await cartRes.text();
      return { success: false, error };
    }

    return { success: true };
  },

  clearCart: async ({ cookies }) => {
    const cartRes = await fetch(`${VITE_API_URL_CUSTOMER}/cart/clear`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    });

    if (!cartRes.ok) {
      const error = await cartRes.text();
      return { success: false, error };
    }

    return { success: true };
  },
};
