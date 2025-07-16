import { VITE_API_URL_ADMIN } from "$env/static/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  try {
    const ordersRes = await fetch(`${VITE_API_URL_ADMIN}/orders/all`, {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    });

    if (!ordersRes.ok) {
      const error = await ordersRes.text();
      return { success: false, error: error };
    }

    const ordersData: Order[] = await ordersRes.json();

    return {
      orders: ordersData,
      title: "Orders | Digital Menu",
    };
  } catch (error) {
    return { success: false, error: error };
  }
};
