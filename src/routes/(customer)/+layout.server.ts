import type { LayoutServerLoad } from "./$types";
import { VITE_API_URL } from "$env/static/private";

export const load: LayoutServerLoad = async ({ fetch, cookies }) => {
  const token = cookies.get("token");

  if (!token) return { customer: null };

  try {
    const res = await fetch(`${VITE_API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) return { customer: null };

    const customer = await res.json();
    return { customer };
  } catch {
    return { customer: null };
  }
};
