import { VITE_API_URL_PUBLIC } from "$env/static/private";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, cookies, params }) => {
  const id = params.id;

  const mediaRes = await fetch(`${VITE_API_URL_PUBLIC}/media/${id}`, {
    headers: {
      Authorization: `Bearer ${cookies.get("token")}`,
    },
  });

  if (!mediaRes.ok) {
    const error = await mediaRes.text();
    return fail(300, { error: error || "Failed to load media" });
  }

  const mediaData: MediaItem = await mediaRes.json();

  return { media: mediaData };
};
