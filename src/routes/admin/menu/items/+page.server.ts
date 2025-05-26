import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  const res = await fetch("http://localhost:3000/menu/items", {
    headers: {
      Authorization: `Bearer ${cookies.get("token")}`,
    },
  });

  if (!res.ok) {
    const error = res.text();
    return fail(400, { error: error || "Request Failed" });
  }

  const data: LoadResult<any> = await res.json();

  return { data };
};

export const actions: Actions = {
  create: async ({ fetch, cookies, request }) => {
    const formData = await request.formData();

    const name = formData.get("name")?.toString() || "";
    const description = formData.get("description")?.toString() || "";
    const price = parseFloat(formData.get("price")?.toString() || "0");
    const available = formData.get("available")?.toString() === "true";
    const imageUrl = formData.get("imageUrl")?.toString() || "";
    const category = formData.get("category")?.toString() || "";

    const token = cookies.get("token");

    const res = await fetch(`http://127.0.0.1:3000/menu/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
        price,
        available,
        imageUrl,
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
    const token = cookies.get("token");

    const res = await fetch(`http://localhost:3000/menu/items/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const error = await res.text();
      return fail(400, { error: error || "Request Failed" });
    }

    throw redirect(303, "/admin/menu/items");
  },
};
