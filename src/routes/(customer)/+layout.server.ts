import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

const publicRoutePatterns = [
  /^\/$/,
  /^\/menu\/?$/,
  /^\/menu\/items\/[^/]+$/,
  /^\/cart\/?$/,
];

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const user = locals.user;
  const path = url.pathname;

  const isPublicRoute = publicRoutePatterns.some((pattern) =>
    pattern.test(path)
  );

  if (!user || user.role !== "customer") {
    if (!isPublicRoute)
      throw redirect(303, `/auth/login?redirectTo=${encodeURIComponent(path)}`);
  }

  return {
    user,
  };
};
