import { fail, redirect, type Actions } from "@sveltejs/kit";
import { VITE_API_URL } from "$env/static/private";

export const actions: Actions = {
  default: async ({ request, cookies, fetch, url }) => {
    const formData = await request.formData();
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    const res = await fetch(`${VITE_API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) {
      const error = await res.text();
      return fail(400, { email, error: error || "Invalid login credentials" });
    }

    const { accessToken, role } = await res.json();

    // // Save session data
    cookies.set("token", accessToken, { path: "/", httpOnly: true });
    cookies.set("role", role, { path: "/", httpOnly: true });

    const redirectTo = url.searchParams.get("redirect");
    if (redirectTo) throw redirect(303, redirectTo);

    if (accessToken && role === "customer") throw redirect(303, "/menu");
    if (accessToken && (role === "admin" || role === "manager"))
      throw redirect(303, "/admin/dashboard");

    throw redirect(303, "/");
  },
};
