import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { VITE_API_URL_ADMIN, VITE_API_URL_PUBLIC } from "$env/static/private";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  const headers = {
    Authorization: `Bearer ${cookies.get("token")}`,
  };

  const [mediaRes, catRes] = await Promise.all([
    fetch(`${VITE_API_URL_ADMIN}/media`, { headers }),
    fetch(`${VITE_API_URL_PUBLIC}/menu/categories`, { headers }),
  ]);

  if (!mediaRes.ok) {
    const error = await mediaRes.text();
    return fail(300, { error: error || "Failed to load media" });
  }

  if (!catRes.ok) {
    const error = await catRes.text();
    return fail(300, { error: error || "Failed to load media" });
  }

  const mediaData: MediaResponse = await mediaRes.json();
  const catData: Category[] = await catRes.json();

  return {
    media: mediaData,
    categories: catData,
  };
};
