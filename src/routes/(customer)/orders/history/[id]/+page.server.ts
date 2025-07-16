import { VITE_API_URL_CUSTOMER } from "$env/static/private";
import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, fetch, params }) => {
  const id = params.id;

  try {
    const res = await fetch(`${VITE_API_URL_CUSTOMER}/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    });

    if (!res.ok) {
      const error = await res.text();
      return { success: false, error };
    }

    const data: Order = await res.json();

    return {
      success: true,
      order: data,
    };
  } catch (error) {
    console.error("Error loading orders:", error);
    return {
      success: false,
      error: "Failed to load orders",
    };
  }
};

export const actions: Actions = {
  requestCancellation: async ({ fetch, params, cookies }) => {
    const id = params.id;

    const orderRes = await fetch(
      `${VITE_API_URL_CUSTOMER}/orders/${id}/request-to-cancel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      }
    );

    if (!orderRes.ok) {
      const error = await orderRes.text();
      return { success: false, error: error };
    }

    throw redirect(303, `/orders/history/${id}`);
  },
};
