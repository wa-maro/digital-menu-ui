import type { PageServerLoad } from "./$types";
import { VITE_API_URL_PUBLIC } from "$env/static/private";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ fetch }) => {
  try {
    // fetch menu items
    const itemsRes = await fetch(`${VITE_API_URL_PUBLIC}/menu/items`);
    if (!itemsRes.ok) {
      const error = await itemsRes.text();
      return fail(400, { error: error || "Request Failed" });
    }
    const itemsData = await itemsRes.json();

    // Fetch categories
    const catRes = await fetch(`${VITE_API_URL_PUBLIC}/menu/categories`);
    if (!catRes.ok) {
      const error = await catRes.text();
      return fail(400, { error: error || "Request Failed" });
    }
    const categoriesData = await catRes.json();

    return {
      items: itemsData || [],
      categories: categoriesData || [],
    };
  } catch (error) {
    return fail(400, { error: error || "Request Failed" });
  }
};
