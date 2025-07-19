import { VITE_API_URL_ADMIN } from "$env/static/private";
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
