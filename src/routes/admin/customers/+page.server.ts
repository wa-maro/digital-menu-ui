import { VITE_API_URL_ADMIN } from "$env/static/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  const customersRes = await fetch(`${VITE_API_URL_ADMIN}/customers`, {
    headers: {
      Authorization: `Bearer ${cookies.get("token")}`,
    },
  });

  if (!customersRes.ok) {
    const error = customersRes.text();
    return { success: false, error: error };
  }

  const customersData: User[] = await customersRes.json();

  return { customers: customersData, title: "Customers" };
};
