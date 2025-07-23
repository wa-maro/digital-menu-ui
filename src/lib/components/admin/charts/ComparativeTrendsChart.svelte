<script lang="ts">
  import { onMount } from "svelte";
  import { BarChartGrouped } from "@carbon/charts-svelte";
  import type { BarChartOptions, ScaleTypes } from "@carbon/charts/interfaces";
  import { PUBLIC_API_URL } from "$env/static/public";

  let type: "month" | "week" = "month";
  let method = "cash"; // optional

  let chartData: any[] = [];
  let loading = true;

  let currentLabel = "";
  let previousLabel = "";
  let summaryChange = {
    revenue: "",
    orders: "",
    revenuePercent: 0,
    orderPercent: 0,
  };

  async function fetchData() {
    const params = new URLSearchParams({ type });
    if (method && type === "week") {
      params.append("method", method);
    }

    const res = await fetch(
      `${PUBLIC_API_URL}/admin/dashboard/comparative-trends?${params}`
    );
    const json = await res.json();

    currentLabel = json.current.label;
    previousLabel = json.previous.label;

    summaryChange = {
      revenue: json.change.direction.revenue,
      orders: json.change.direction.orders,
      revenuePercent: json.change.revenuePercent,
      orderPercent: json.change.orderPercent,
    };

    chartData = [
      { group: currentLabel, key: "Revenue", value: json.current.totalRevenue },
      { group: currentLabel, key: "Orders", value: json.current.orderCount },
      {
        group: previousLabel,
        key: "Revenue",
        value: json.previous.totalRevenue,
      },
      { group: previousLabel, key: "Orders", value: json.previous.orderCount },
    ];

    loading = false;
  }

  const chartOptions: BarChartOptions = {
    title: "Comparative Trends",
    axes: {
      left: {
        title: "Value",
        mapsTo: "value",
        scaleType: "linear" as ScaleTypes.LABELS,
      },
      bottom: {
        title: "Metric",
        mapsTo: "key",
        scaleType: "labels" as ScaleTypes.LABELS,
      },
    },
    height: "400px",
    legend: {
      alignment: "center",
    },
    toolbar: {
      enabled: false,
    },
  };

  onMount(() => fetchData());
</script>

<!-- Filter Panel -->
<div class="flex flex-wrap gap-4 mb-4">
  <select bind:value={type} class="w-44 px-2 py-1 border rounded text-sm">
    <option value="month">Compare Month</option>
    <option value="week">Compare Week</option>
  </select>

  <select bind:value={method} class="w-40 px-2 py-1 border rounded text-sm">
    <option value="cash">Cash</option>
    <option value="mobile_money">Mobile Money</option>
  </select>
</div>

<!-- Chart -->
{#if loading}
  <div class="animate-pulse space-y-4">
    <div class="h-6 bg-gray-200 rounded w-1/3"></div>
    <div class="h-[300px] bg-gray-100 rounded-md"></div>
  </div>
{:else}
  <BarChartGrouped data={chartData} options={chartOptions} />
{/if}

<!-- Summary (optional) -->
<div class="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
  <div class="p-3 bg-gray-50 rounded border">
    <div class="font-semibold mb-1">Revenue Change</div>
    <div>
      {summaryChange.revenuePercent}%
      <span
        class={summaryChange.revenue === "up"
          ? "text-green-600"
          : summaryChange.revenue === "down"
            ? "text-red-600"
            : "text-gray-500"}
      >
        ({summaryChange.revenue})
      </span>
    </div>
  </div>
  <div class="p-3 bg-gray-50 rounded border">
    <div class="font-semibold mb-1">Order Count Change</div>
    <div>
      {summaryChange.orderPercent}%
      <span
        class={summaryChange.orders === "up"
          ? "text-green-600"
          : summaryChange.orders === "down"
            ? "text-red-600"
            : "text-gray-500"}
      >
        ({summaryChange.orders})
      </span>
    </div>
  </div>
</div>
