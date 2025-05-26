import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

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
