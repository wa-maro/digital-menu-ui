import { fail, type Cookies } from "@sveltejs/kit";
import type { PageServerLoad, RouteParams } from "../$types";
import { VITE_API_URL } from "$env/static/private";

export const load: PageServerLoad = async ({ fetch, cookies, params }) => {
  const id = params.id;

  try {
    const res = await fetch(`${VITE_API_URL}/menu/items/${id}`, {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    });
    if (!res.ok) {
      const error = await res.text();
      return fail(400, { error: error || "Request Failed" });
    }
    const item = await res.json();

    return {
      item: item,
    };
  } catch (error) {
    return fail(400, { error: error || "Request Failed" });
  }
};
