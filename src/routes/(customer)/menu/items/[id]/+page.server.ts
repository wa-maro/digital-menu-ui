import type { PageServerLoad } from "./$types";
import { VITE_API_URL_PUBLIC } from "$env/static/private";
import { fail } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ fetch, params }) => {
  const id = params.id;

  try {
    // fetch menu items
    const itemsRes = await fetch(`${VITE_API_URL_PUBLIC}/menu/items/${id}`);
    if (!itemsRes.ok) {
      return {};
    }
    const itemData = await itemsRes.json();

    return {
      item: itemData || [],
    };
  } catch (error) {
    return fail(400, { error: error || "Request Failed" });
  }
};
