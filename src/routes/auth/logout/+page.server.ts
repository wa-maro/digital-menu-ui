import { fail, redirect, type Actions } from "@sveltejs/kit";
import { VITE_API_URL_PUBLIC } from "$env/static/private";

export const actions: Actions = {
  default: async ({ cookies }) => {
    const token = cookies.get("token");
    const role = cookies.get("role");

    if (!token) {
      cookies.delete("token", { path: "/" });
      cookies.delete("role", { path: "/" });
      throw redirect(303, "/");
    }

    try {
      const res = await fetch(`${VITE_API_URL_PUBLIC}/auth/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cookies.get("token")}`,
        },
      });

      if (!res.ok) {
        const error = await res.text();
        return fail(400, { error: error || "Logout API failed" });
      }
    } catch (error) {
      console.error("Logout request failed", error);
    }

    // Remove session cookies
    cookies.delete("token", { path: "/" });
    cookies.delete("role", { path: "/" });

    if (role === "manager" || role === "admin")
      throw redirect(303, "/auth/login");

    if (role === "customer") throw redirect(303, "/menu");

    throw redirect(303, "/");
  },
};
