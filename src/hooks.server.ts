import { redirect, type Handle } from "@sveltejs/kit";

const publicUnauthPaths = ["/auth/login", "/auth/register"];

export const handle: Handle = async ({ event, resolve }) => {
  // Read from cookies
  const token = event.cookies.get("token");
  const role = event.cookies.get("role");
  const path = event.url.pathname;

  // Save to event.locals so it’s available in +layout.server.ts
  event.locals.user = token && role ? { token, role } : null;

  if (token && publicUnauthPaths.includes(path)) {
    if (role === "manager" || role === "admin")
      throw redirect(303, "/admin/dashboard");

    if (role === "customer") throw redirect(303, "/menu");

    throw redirect(303, "/");
  }

  // Proceed with request
  return resolve(event);
};
