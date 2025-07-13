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
  mediaUpload: async ({ fetch, cookies, request }) => {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return fail(400, { error: "No file uploaded" });
    }

    const uploadForm = new FormData();
    uploadForm.append("file", file);

    const uploadRes = await fetch(`${VITE_API_URL_ADMIN}/media/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
      body: uploadForm,
    });

    if (!uploadRes.ok) {
      const errorText = await uploadRes.text();
      return fail(400, { error: errorText || "Upload Failed" });
    }

    const uploadedData: MediaUploadResponse = await uploadRes.json();

    return { uploadedData };
  },

  mediaCreation: async ({ fetch, cookies, request }) => {
    const formData = await request.formData();

    const url = formData.get("url")?.toString() || "";
    const name = formData.get("name")?.toString() || "";
    const category = formData.get("category")?.toString() || "";
    const linkedMenuItemIds =
      formData.get("linkedMenuItemIds")?.toString() || "";

    const linkedIdsArray = linkedMenuItemIds
      ? linkedMenuItemIds
          .split(",")
          .map((id) => id.trim())
          .filter(Boolean)
      : [];

    if (!url) return fail(400, { error: "Please upload an image first" });
    if (!name && !category)
      return fail(400, { error: "Name and Category are required fields" });

    const createdRes = await fetch(`${VITE_API_URL_ADMIN}/media/creation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
      body: JSON.stringify({
        name,
        url,
        category,
        linkedMenuItemIds: linkedIdsArray,
      }),
    });

    if (!createdRes.ok) {
      const errorText = await createdRes.text();
      return fail(400, { error: errorText || "Media creation failed" });
    }

    throw redirect(303, "/admin/media");
  },
};
