import { VITE_API_URL_ADMIN } from "$env/static/private";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  const [summaryMetricsRes] = await Promise.all([
    fetch(`${VITE_API_URL_ADMIN}/dashboard/summary-metrics`, {
      headers: {
        Authorization: `Bearer ${cookies.get("token")}`,
      },
    }),
  ]);

  if (!summaryMetricsRes.ok) {
    throw new Error("Failed to load dashboard data");
  }

  const summaryMetrics: DashboardSummary = await summaryMetricsRes.json();

  return {
    summaryMetrics,
  };
};
