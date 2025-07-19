import { VITE_API_URL_ADMIN } from "$env/static/private";
import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, cookies, params }) => {
  const id = params.id;

  const paymentRes = await fetch(`${VITE_API_URL_ADMIN}/payments/${id}`, {
    headers: {
      Authorization: `Bearer ${cookies.get("token")}`,
    },
  });

  if (!paymentRes.ok) {
    const error = await paymentRes.text();
    return { success: false, error: error };
  }

  const paymentData: Payment = await paymentRes.json();

  return {
    payment: paymentData,
    title: "Payments | Digital Menu",
  };
};

export const actions: Actions = {
  manualPaymentConfirm: async ({ cookies, fetch, request }) => {
    const formData = await request.formData();
    const orderId = formData.get("orderId")?.toString() ?? "";

    const orderRes = await fetch(
      `${VITE_API_URL_ADMIN}/payments/confirm-manual-payment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
        body: JSON.stringify({ orderId: orderId }),
      }
    );

    if (!orderRes.ok) {
      const error = await orderRes.text();
      return { success: false, error: error };
    }

    throw redirect(303, `/admin/orders/${orderId}`);
  },
};
