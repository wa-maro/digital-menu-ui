import { VITE_API_URL_ADMIN } from "$env/static/private";
import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, cookies, params }) => {
  const id = params.id;

  const orderRes = await fetch(`${VITE_API_URL_ADMIN}/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${cookies.get("token")}`,
    },
  });

  if (!orderRes.ok) {
    const error = await orderRes.text();
    return { success: false, error: error };
  }

  const orderData: any = await orderRes.json();

  return { order: orderData };
};

export const actions: Actions = {
  updateStatus: async ({ fetch, params, cookies, request }) => {
    const id = params.id;
    const formData = await request.formData();
    const status = formData.get("status")?.toString() || "";

    if (!status) throw new Error("Status can not be empty");

    const orderRes = await fetch(
      `${VITE_API_URL_ADMIN}/orders/${id}/update-status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!orderRes.ok) {
      const error = await orderRes.text();
      return { success: false, error: error };
    }

    throw redirect(303, `/admin/orders/${id}`);
  },

  processCancellation: async ({ cookies, fetch, request, params }) => {
    const id = params.id;
    const formData = await request.formData();
    const status = formData.get("status")?.toString() || "";

    if (!status) throw new Error("Status can not be empty");

    const orderRes = await fetch(
      `${VITE_API_URL_ADMIN}/orders/${id}/process-cancellation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
        body: JSON.stringify({ status }),
      }
    );

    if (!orderRes.ok) {
      const error = await orderRes.text();
      return { success: false, error: error };
    }

    throw redirect(303, `/admin/orders/${id}`);
  },

  manualPaymentConfirm: async ({ cookies, fetch, params }) => {
    const id = params.id;

    const orderRes = await fetch(
      `${VITE_API_URL_ADMIN}/payments/confirm-manual-payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
        body: JSON.stringify({ orderId: id }),
      }
    );

    if (!orderRes.ok) {
      const error = await orderRes.text();
      return { success: false, error: error };
    }

    throw redirect(303, `/admin/orders/${id}`);
  },
};
