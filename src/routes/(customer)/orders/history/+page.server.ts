import { VITE_API_URL_CUSTOMER } from "$env/static/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ cookies, fetch }) => {
  try {
    const res = await fetch(`${VITE_API_URL_CUSTOMER}/orders`, {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    });

    if (!res.ok) {
      const error = await res.text();
      return { success: false, error };
    }

    const data = await res.json();

    return {
      data,
    };
  } catch (error) {
    console.log(error);
  }
};
