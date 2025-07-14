import { VITE_API_URL_ADMIN, VITE_API_URL_PUBLIC } from "$env/static/private";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, cookies, params }) => {
  const id = params.id;
  const headers = { Authorization: `Bearer ${cookies.get("token")}` };

  const [catRes, mediaRes] = await Promise.all([
    fetch(`${VITE_API_URL_PUBLIC}/menu/categories`, { headers }),
    fetch(`${VITE_API_URL_ADMIN}/media/${id}`, { headers }),
  ]);

  if (!catRes.ok) throw new Error("Failed to load categories");
  if (!mediaRes.ok) throw new Error("Failed to load media");

  const categories: Category[] = await catRes.json();
  const media: MediaItem = await mediaRes.json();

  return { media, categories };
};

export const actions: Actions = {
  updateMedia: async ({ fetch, cookies, request, params }) => {
    const id = params.id;
    const formData = await request.formData();

    const file = formData.get("file");
    const displayName = formData.get("displayName")?.toString() || "";
    const category = formData.get("category")?.toString() || "";

    if (!file || !(file instanceof File))
      return fail(400, { error: "No file uploaded" });

    if (!displayName || !category)
      return fail(400, { error: "Name and Category are required fields" });

    const uploadForm = new FormData();
    uploadForm.append("file", file);
    uploadForm.append("displayName", displayName);
    uploadForm.append("category", category);

    const updatedRes = await fetch(`${VITE_API_URL_ADMIN}/media/${id}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
      body: uploadForm,
    });

    if (!updatedRes.ok) {
      const errorText = await updatedRes.text();
      return fail(400, { error: errorText || "Media updation failed" });
    }

    throw redirect(303, `/admin/media/${id}`);
  },
};
