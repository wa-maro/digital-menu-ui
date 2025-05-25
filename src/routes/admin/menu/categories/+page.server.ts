import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export interface LoadResult {
  user: {
    token: string;
    role: string;
  };
  data: Category[];
}

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  const res = await fetch("http://localhost:3000/menu/categories", {
    headers: {
      Authorization: `Bearer ${cookies.get("token")}`,
    },
  });

  if (!res.ok) {
    const error = res.text();
    return fail(400, { error: error || "Request Failed" });
  }

  const data: LoadResult = await res.json();

  return { data };
};
