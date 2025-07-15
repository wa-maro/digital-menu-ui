import { VITE_API_URL_ADMIN } from "$env/static/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  try {
    const cartRes = await fetch(`${VITE_API_URL_ADMIN}/carts`, {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    });

    if (!cartRes.ok) {
      const error = cartRes.text();
      return { success: false, error: error };
    }

    const cartData: UserCart[] = await cartRes.json();

    return { carts: cartData };
  } catch (error) {
    console.log(error);

    return { success: false, error: error };
  }
};
