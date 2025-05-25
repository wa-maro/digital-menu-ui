import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  const user = locals.user;

  if (!user || (user.role !== "manager" && user.role !== "admin")) {
    throw redirect(303, "/auth/login");
  }

  return {
    user,
  };
}
