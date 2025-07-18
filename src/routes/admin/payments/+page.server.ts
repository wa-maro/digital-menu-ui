import { VITE_API_URL_ADMIN } from "$env/static/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  const paymentsRes = await fetch(`${VITE_API_URL_ADMIN}/payments`, {
    headers: {
      Authorization: `Bearer ${cookies.get("token")}`,
    },
  });

  if (!paymentsRes.ok) {
    const error = await paymentsRes.text();
    return { success: false, error: error };
  }

  const paymentsData: Payment[] = await paymentsRes.json();

  return {
    payments: paymentsData,
    title: "Payments | Digital Menu",
  };
};
