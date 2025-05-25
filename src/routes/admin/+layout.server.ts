import { redirect } from "@sveltejs/kit";

export async function load({ locals }) {
  if (!locals.user || locals.user.role !== "manager") {
    throw redirect(303, "/auth/login");
  }

  return {
    user: locals.user,
  };
}
