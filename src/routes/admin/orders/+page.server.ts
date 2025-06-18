import { VITE_API_URL_ADMIN } from "$env/static/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, cookies, url }) => {
  const search = url.searchParams.get("search") || "";
  const page = Number(url.searchParams.get("page") || "1");
  const limit = Number(url.searchParams.get("limit") || "10");
  const sortBy = url.searchParams.get("sortBy") || "createdAt";
  const order = url.searchParams.get("order") || "desc";

  const params = new URLSearchParams({
    search,
    page: page.toString(),
    limit: limit.toString(),
    sortBy,
    order,
  });

  try {
    const res = await fetch(`${VITE_API_URL_ADMIN}/orders/all?${params}`, {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    });

    if (!res.ok) {
      const error = res.text();
      return { success: false, error: error };
    }

    const orders: any[] = await res.json();

    return {
      orders,
      page,
      limit,
      search,
      sortBy,
      order,
    };
  } catch (error) {
    console.log(error);

    return { success: false, error: error };
  }
};
