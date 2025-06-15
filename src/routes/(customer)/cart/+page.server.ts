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

    const res = await fetch(`${VITE_API_URL_CUSTOMER}/cart/${itemId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    });

    if (!res.ok) {
      const error = await res.text();
      return { success: false, error };
    }

    return { success: true };
  },

  clearCart: async ({ cookies }) => {
    const res = await fetch(`${VITE_API_URL_CUSTOMER}/cart`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    });

    if (!res.ok) {
      const error = await res.text();
      return { success: false, error };
    }

    return { success: true };
  },
};
