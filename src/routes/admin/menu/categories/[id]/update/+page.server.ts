import { VITE_API_URL_ADMIN } from "$env/static/private";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, cookies, params }) => {
  const token = cookies.get("token");
  const id = params.id;

  const res = await fetch(`${VITE_API_URL_ADMIN}/menu/categories/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const error = await res.text();
    return fail(400, { error: error || "Failed to load category" });
  }

  const categoryData: Category = await res.json();
  return { category: categoryData };
};

export const actions: Actions = {
  default: async ({ fetch, cookies, request, params }) => {
    const id = params.id;

    const formData = await request.formData();
    const name = formData.get("name")?.toString() || "";
    const description = formData.get("description")?.toString() || "";

    const token = cookies.get("token");

    const res = await fetch(`${VITE_API_URL_ADMIN}/menu/categories/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name ?? null,
        description: description ?? null,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      return fail(400, { error: error || "Request Failed" });
    }

    throw redirect(303, "/admin/menu/categories");
  },
};
