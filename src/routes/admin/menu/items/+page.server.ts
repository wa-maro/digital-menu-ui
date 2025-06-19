import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { VITE_API_URL_ADMIN, VITE_API_URL_PUBLIC } from "$env/static/private";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  // fetch menu items
  const itemsRes = await fetch(`${VITE_API_URL_PUBLIC}/menu/items`, {
    headers: {
      Authorization: `Bearer ${cookies.get("token")}`,
    },
  });
  if (!itemsRes.ok) return {};
  const itemsData = await itemsRes.json();

  // Fetch categories
  const catRes = await fetch(`${VITE_API_URL_PUBLIC}/menu/categories`, {
    headers: {
      Authorization: `Bearer ${cookies.get("token")}`,
    },
  });
  if (!catRes.ok) {
    const error = await catRes.text();
    return fail(400, { error: error || "Request Failed" });
  }
  const categoriesData = await catRes.json();

  return {
    items: itemsData ?? [],
    categories: categoriesData ?? [],
  };
};

export const actions: Actions = {
  create: async ({ fetch, cookies, request }) => {
    const formData = await request.formData();

    const name = formData.get("name")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const price = parseFloat(formData.get("price")?.toString() || "0");
    const available = formData.get("available")?.toString() === "on";
    const imageURL = formData.get("imageURL")?.toString() || "";
    const category = formData.get("category")?.toString() || "";

    const res = await fetch(`${VITE_API_URL_ADMIN}/menu/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
      body: JSON.stringify({
        name,
        description,
        price,
        available,
        imageURL,
        category,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      return fail(400, { error: error || "Request Failed" });
    }

    throw redirect(303, "/admin/menu/items");
  },

  delete: async ({ fetch, cookies, request }) => {
    const formData = await request.formData();
    const _id = formData.get("_id")?.toString() || "";

    const res = await fetch(`${VITE_API_URL_ADMIN}/menu/items/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    });

    if (!res.ok) {
      const error = await res.text();
      return fail(400, { error: error || "Request Failed" });
    }

    throw redirect(303, "/admin/menu/items");
  },

  update: async ({ fetch, cookies, request }) => {
    const formData = await request.formData();

    const name = formData.get("name")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const price = parseFloat(formData.get("price")?.toString() || "0");
    const available = formData.get("available")?.toString() === "on";
    const imageURL = formData.get("imageURL")?.toString() || "";
    const category = formData.get("category")?.toString() || "";
    const _id = formData.get("_id")?.toString() || "";

    const res = await fetch(`${VITE_API_URL_ADMIN}/menu/items/${_id}`, {
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

    throw redirect(303, "/admin/menu/items");
  },
};
