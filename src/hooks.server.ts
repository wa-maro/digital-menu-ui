import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  // Read from cookies
  const token = event.cookies.get("token");
  const role = event.cookies.get("role");

  // Save to event.locals so it’s available in +layout.server.ts
  event.locals.user = token && role ? { token, role } : null;

  // Proceed with request
  return resolve(event);
};
