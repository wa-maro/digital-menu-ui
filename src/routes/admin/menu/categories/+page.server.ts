import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { VITE_API_URL_ADMIN, VITE_API_URL_PUBLIC } from "$env/static/private";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  try {
    const res = await fetch(`${VITE_API_URL_PUBLIC}/menu/categories`, {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    });

    if (!res.ok) {
      const error = res.text();
      return fail(400, { error: error || "Request Failed" });
    }

    const data: LoadResult<Category> = await res.json();

    return { data: data ?? {} };
  } catch (error) {
    return fail(400, { error: error || "Request Failed" });
  }
};

export const actions: Actions = {
  delete: async ({ fetch, cookies, request }) => {
    const formData = await request.formData();
    const _id = formData.get("_id")?.toString() || "";
    const token = cookies.get("token");

    const res = await fetch(`${VITE_API_URL_ADMIN}/menu/categories/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.text();
      return fail(400, { error: error || "Request Failed" });
    }

    throw redirect(303, "/admin/menu/categories");
  },

  create: async ({ fetch, cookies, request }) => {
    const formData = await request.formData();
    const name = formData.get("name")?.toString() || "";
    const description = formData.get("description")?.toString() || "";

    const token = cookies.get("token");

    const res = await fetch(`${VITE_API_URL_ADMIN}/menu/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name, description }),
    });

    if (!res.ok) {
      const error = await res.text();
      return fail(400, { error: error || "Request Failed" });
    }

    throw redirect(303, "/admin/menu/categories");
  },

  update: async ({ fetch, cookies, request }) => {
    const formData = await request.formData();
    const name = formData.get("name")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const _id = formData.get("_id")?.toString() || "";

    const token = cookies.get("token");

    const res = await fetch(`${VITE_API_URL_ADMIN}/menu/categories/${_id}`, {
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
