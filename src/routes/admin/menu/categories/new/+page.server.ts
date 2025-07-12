import { VITE_API_URL_ADMIN } from "$env/static/private";
import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";

export const actions: Actions = {
  default: async ({ fetch, cookies, request }) => {
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

    if (!res.ok) return {};

    throw redirect(303, "/admin/menu/categories");
  },
};
