import { VITE_API_URL_ADMIN, VITE_API_URL_PUBLIC } from "$env/static/private";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  const catRes = await fetch(`${VITE_API_URL_PUBLIC}/menu/categories`, {
    headers: {
      Authorization: `Bearer ${cookies.get("token")}`,
    },
  });

  const categoriesData = await catRes.json();

  return {
    categories: categoriesData ?? [],
  };
};

export const actions: Actions = {
  default: async ({ fetch, cookies, request }) => {
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
};
