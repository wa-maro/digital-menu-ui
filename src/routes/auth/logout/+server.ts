import { redirect, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ cookies }) => {
  const role = cookies.get("role");

  // Remove session cookies
  cookies.delete("token", { path: "/" });
  cookies.delete("role", { path: "/" });

  if (role === "admin" || role === "admin") throw redirect(303, "/auth/login");

  throw redirect(303, "/menu");
};
