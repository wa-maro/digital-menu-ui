import { VITE_API_URL_ADMIN } from "$env/static/private";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  const restaurantRes = await fetch(`${VITE_API_URL_ADMIN}/restaurant`, {
    headers: {
      Authorization: `Bearer ${cookies.get("token")}`,
    },
  });

  const restaurantData: Restaurant = await restaurantRes.json();

  return {
    restaurant: restaurantData,
    title: "Restaurant Settings",
  };
};

export const actions: Actions = {
  default: async ({ cookies, fetch, request }) => {
    const formData = await request.formData();

    const name = formData.get("name")?.toString();
    const tagline = formData.get("tagline")?.toString();
    const description = formData.get("description")?.toString() ?? "";
    const brandLogo = formData.get("brandLogo")?.toString() ?? "";
    const workingDays = formData.get("workingDays")?.toString() ?? "";

    const days = workingDays.split(",");

    const restaurantRes = await fetch(`${VITE_API_URL_ADMIN}/restaurant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
      body: JSON.stringify({
        name,
        tagline,
        description,
        brandLogo,
        workingDays: days,
      }),
    });

    if (!restaurantRes.ok) {
      const errorText = await restaurantRes.text();
      return fail(400, { success: false, error: errorText });
    }

    return { success: true };
  },
};
