import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { VITE_API_URL_ADMIN, VITE_API_URL_PUBLIC } from "$env/static/private";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  const headers = {
    Authorization: `Bearer ${cookies.get("token")}`,
  };

  const [itemsRes, catRes] = await Promise.all([
    fetch(`${VITE_API_URL_PUBLIC}/menu/items`, { headers }),
    fetch(`${VITE_API_URL_PUBLIC}/menu/categories`, { headers }),
  ]);

  if (!itemsRes.ok) {
    const error = await itemsRes.text();
    return fail(400, { error: error || "Failed to load items" });
  }

  if (!catRes.ok) {
    const error = await catRes.text();
    return fail(400, { error: error || "Failed to load categories" });
  }

  const itemsData: MenuItem[] = await itemsRes.json();
  const categoriesData: Category[] = await catRes.json();

  return {
    items: itemsData,
    categories: categoriesData,
    title: "Menu Items | Digital Menu",
  };
};

export const actions: Actions = {
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
};
