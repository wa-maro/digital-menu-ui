import { fail, redirect, type Actions } from "@sveltejs/kit";
import { VITE_API_URL_PUBLIC } from "$env/static/private";

export const actions: Actions = {
  default: async ({ request, cookies, fetch }) => {
    const formData = await request.formData();
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const fullName = formData.get("fullName")?.toString() || "";

    const res = await fetch(`${VITE_API_URL_PUBLIC}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fullName, email, password }),
    });

    if (!res.ok) {
      const error = await res.text();
      return fail(400, { error: error || "Registration failed" });
    }

    const { accessToken, role } = await res.json();

    // Save session data
    cookies.set("token", accessToken, { path: "/", httpOnly: true });
    cookies.set("role", role, { path: "/", httpOnly: true });

    if (accessToken && role === "customer") throw redirect(303, "/menu");

    if (accessToken && (role === "admin" || role === "manager"))
      throw redirect(303, "/admin/dashboard");

    throw redirect(303, "/");
  },
};
