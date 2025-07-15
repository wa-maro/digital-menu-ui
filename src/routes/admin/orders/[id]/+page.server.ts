import { VITE_API_URL_ADMIN } from "$env/static/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, cookies, params }) => {
  const id = params.id;

  const orderRes = await fetch(`${VITE_API_URL_ADMIN}/orders/${id}`, {
    headers: {
      Authorization: `Bearer ${cookies.get("token")}`,
    },
  });

  if (!orderRes.ok) {
    const error = orderRes.text();
    return { success: false, error: error };
  }

  const orderData: any = await orderRes.json();

  return { order: orderData };
};
