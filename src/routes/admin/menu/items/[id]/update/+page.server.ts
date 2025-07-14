import { VITE_API_URL_ADMIN, VITE_API_URL_PUBLIC } from "$env/static/private";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, cookies, params }) => {
  const id = params.id;
  const headers = {
    Authorization: `Bearer ${cookies.get("token")}`,
  };

  const [catRes, itemRes, mediaRes] = await Promise.all([
    fetch(`${VITE_API_URL_PUBLIC}/menu/categories`, { headers }),
    fetch(`${VITE_API_URL_PUBLIC}/menu/items/${id}`, { headers }),
    fetch(`${VITE_API_URL_PUBLIC}/media`, { headers }),
  ]);

  if (!catRes.ok) {
    const error = await catRes.text();
    return fail(400, { error: error || "Failed to load categories" });
  }

  if (!itemRes.ok) {
    const error = await itemRes.text();
    return fail(400, { error: error || "Failed to load item" });
  }

  if (!mediaRes.ok) {
    const error = await mediaRes.text();
    return fail(400, { error: error || "Failed to load categories" });
  }

  const categoriesData: Category[] = await catRes.json();
  const itemData: MenuItem = await itemRes.json();
  const mediaData: MediaResponse = await mediaRes.json();

  return {
    categories: categoriesData,
    item: itemData,
    media: mediaData,
  };
};

export const actions: Actions = {
  default: async ({ fetch, cookies, request, params }) => {
    const id = params.id;
    const formData = await request.formData();

    const name = formData.get("name")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const price = parseFloat(formData.get("price")?.toString() || "0");
    const available = formData.get("available")?.toString() === "on";
    const imageURL = formData.get("imageURL")?.toString() || "";
    const category = formData.get("category")?.toString() || "";

    const res = await fetch(`${VITE_API_URL_ADMIN}/menu/items/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name ?? null,
        description: description ?? null,
        price: price ?? null,
        available: available,
        category: category ?? null,
        imageURL: imageURL ?? null,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      return fail(400, { error: error || "Request Failed" });
    }

    throw redirect(303, `/admin/menu/items/${id}`);
  },
};
