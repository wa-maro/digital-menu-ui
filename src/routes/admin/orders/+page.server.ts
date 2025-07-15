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
      const error = ordersRes.text();
      return { success: false, error: error };
    }

    const ordersData: any[] = await ordersRes.json();

    return {
      orders: ordersData,
    };
  } catch (error) {
    return { success: false, error: error };
  }
};
