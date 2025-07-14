import { VITE_API_URL_ADMIN, VITE_API_URL_PUBLIC } from "$env/static/private";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  const res = await fetch(`${VITE_API_URL_PUBLIC}/menu/categories`, {
    headers: {
      Authorization: `Bearer ${cookies.get("token")}`,
    },
  });
  if (!res.ok) throw new Error("Failed to load categories");
  const categories: Category[] = await res.json();

  return { categories };
};

export const actions: Actions = {
  createMedia: async ({ fetch, cookies, request }) => {
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

    const uploadRes = await fetch(`${VITE_API_URL_ADMIN}/media/creation`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
      body: uploadForm,
    });

    if (!uploadRes.ok) {
      const errorText = await uploadRes.text();
      return fail(400, { error: errorText || "Media creation failed" });
    }

    throw redirect(303, "/admin/media");
  },
};
