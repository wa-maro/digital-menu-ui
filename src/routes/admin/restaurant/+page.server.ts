import { VITE_API_URL_ADMIN } from "$env/static/private";
import { fail, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { DailyHours, DayOfWeek } from "$lib/constants/week-days";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  const restaurantRes = await fetch(`${VITE_API_URL_ADMIN}/restaurant`, {
    headers: {
      Authorization: `Bearer ${cookies.get("token")}`,
    },
  });

  const restaurantData: Restaurant = await restaurantRes.json();

  return {
    restaurant: restaurantData,
    title: "Restaurant Settings",
  };
};

export const actions: Actions = {
  default: async ({ cookies, fetch, request }) => {
    const formData = await request.formData();

    const name = formData.get("name")?.toString();
    const tagline = formData.get("tagline")?.toString();
    const description = formData.get("description")?.toString() ?? "";
    const brandLogo = formData.get("brandLogo")?.toString() ?? "";

    const workingDaysRaw = formData.get("workingDays")?.toString() ?? "";
    const workingDays = workingDaysRaw.split(",");

    const workingHoursRaw = formData.get("workingHours")?.toString() ?? "";
    let workingHours: Partial<Record<DayOfWeek, DailyHours>> = {};
    if (workingDaysRaw) workingHours = JSON.parse(workingHoursRaw);

    const restaurantRes = await fetch(`${VITE_API_URL_ADMIN}/restaurant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
      body: JSON.stringify({
        name,
        tagline,
        description,
        brandLogo,
        workingDays,
        workingHours,
      }),
    });

    if (!restaurantRes.ok) {
      const errorText = await restaurantRes.text();
      return fail(400, { success: false, error: errorText });
    }

    return { success: true };
  },
};
