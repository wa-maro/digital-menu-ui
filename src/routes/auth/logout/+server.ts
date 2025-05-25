import { redirect, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ cookies }) => {
  // Remove session cookies
  cookies.delete("token", { path: "/" });
  cookies.delete("role", { path: "/" });

  // Redirect to login page
  throw redirect(303, "/auth/login");
};
