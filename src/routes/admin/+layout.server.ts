import { redirect } from "@sveltejs/kit";

export async function load({ locals, url }) {
  const user = locals.user;
  const path = url.pathname;

  if (!user || (user.role !== "manager" && user.role !== "admin")) {
    throw redirect(303, `/auth/login?redirectTo=${encodeURIComponent(path)}`);
  }

  return {
    user,
    title: null,
  };
}
