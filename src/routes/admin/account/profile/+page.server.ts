import { VITE_API_URL_ADMIN } from "$env/static/private";
import { type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  const userRes = await fetch(`${VITE_API_URL_ADMIN}/me/profile`, {
    headers: {
      Authorization: `Bearer ${cookies.get("token")}`,
    },
  });

  if (!userRes.ok) {
    const error = await userRes.text();
    return { success: false, error };
  }

  const userData: any = await userRes.json();

  return { user: userData };
};

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();

    const fullName = formData.get("fullName")?.toString() ?? "";
    const phoneNumber = formData.get("phoneNumber")?.toString() ?? "";
    const dateOfBirth = formData.get("dateOfBirth")?.toString() ?? "";
    const address = formData.get("address")?.toString() ?? "";

    if (!fullName) {
      return;
    }

    const profile = { fullName, phoneNumber, dateOfBirth, address };

    const res = await fetch(`${VITE_API_URL_ADMIN}/me/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
      body: JSON.stringify(profile),
    });

    if (!res.ok) {
      const error = await res.text();
      return { success: false, error };
    }

    return profile;
  },
};
