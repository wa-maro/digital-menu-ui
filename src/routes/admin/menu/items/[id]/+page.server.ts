import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
import { VITE_API_URL_ADMIN } from "$env/static/private";

export const load: PageServerLoad = async ({ fetch, cookies, params }) => {
  const id = params.id;

  try {
    const res = await fetch(`${VITE_API_URL_ADMIN}/menu/items/${id}`, {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    });
    if (!res.ok) {
      return {};
    }
    const item = await res.json();

    return {
      item: item,
    };
  } catch (error) {
    return fail(400, { error: error || "Request Failed" });
  }
};
