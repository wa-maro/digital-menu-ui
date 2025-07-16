import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { VITE_API_URL_ADMIN, VITE_API_URL_PUBLIC } from "$env/static/private";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  const headers = {
    Authorization: `Bearer ${cookies.get("token")}`,
  };

  const [mediaRes, catRes] = await Promise.all([
    fetch(`${VITE_API_URL_PUBLIC}/media`, { headers }),
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
    title: "Media | Digital Menu",
  };
};

export const actions: Actions = {
  delete: async ({ fetch, cookies, request }) => {
    const formData = await request.formData();
    const _id = formData.get("_id")?.toString() || "";
    const token = cookies.get("token");

    const res = await fetch(`${VITE_API_URL_ADMIN}/media/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.text();
      return fail(400, { error: error || "Request Failed" });
    }

    throw redirect(303, "/admin/media");
  },
};
