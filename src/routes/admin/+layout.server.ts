import { VITE_API_URL_ADMIN } from "$env/static/private";
import { redirect } from "@sveltejs/kit";

export async function load({ locals, url }) {
  const user = locals.user;
  const path = url.pathname;

  if (!user || (user.role !== "manager" && user.role !== "admin")) {
    throw redirect(303, `/auth/login?redirectTo=${encodeURIComponent(path)}`);
  }

  const adminData: User = await getAdminData(user.token);

  return {
    user,
    adminData,
    title: null,
  };
}

async function getAdminData(token: string) {
  const userRes = await fetch(`${VITE_API_URL_ADMIN}/me/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await userRes.json();
}
