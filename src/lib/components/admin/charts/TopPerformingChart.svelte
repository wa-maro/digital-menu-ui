<script lang="ts">
  import { onMount } from "svelte";
  import { BarChartSimple } from "@carbon/charts-svelte";
  import type { BarChartOptions, ScaleTypes } from "@carbon/charts/interfaces";

  let type: "day" | "week" = "day";
  let sortBy: "revenue" | "orders" = "revenue";
  let method = "cash";
  let startDate = "2025-07-01";
  let endDate = "2025-07-31";

  let visibleGroup: "both" | "revenue" | "orders" = "both";

  let chartData: any[] = [];
  let loading = true;

  async function fetchData() {
    const params = new URLSearchParams({
      type,
      sortBy,
      startDate,
      endDate,
    });

    if (method) {
      params.append("method", method);
    }

    const res = await fetch(
      `http://127.0.0.1:3000/admin/dashboard/top-performing?${params}`
    );
    const json = await res.json();

    chartData = [];

    json.forEach((item: any) => {
      if (visibleGroup === "both" || visibleGroup === "revenue") {
        chartData.push({
          group: "Revenue",
          key: item.label,
          value: item.totalRevenue,
        });
      }
      if (visibleGroup === "both" || visibleGroup === "orders") {
        chartData.push({
          group: "Orders",
          key: item.label,
          value: item.orderCount,
        });
      }
    });

    loading = false;
  }

  const chartOptions: BarChartOptions = {
    title: "Top-Performing Periods",
    axes: {
      left: {
        title: "Value",
        mapsTo: "value",
        scaleType: "linear" as ScaleTypes.LABELS,
      },
      bottom: {
        title: type === "day" ? "Date" : "Week",
        mapsTo: "key",
        scaleType: "labels" as ScaleTypes.LABELS,
      },
    },
    height: "400px",
    bars: {
      spacingFactor: 0.5,
    },
    legend: {
      alignment: "center",
    },
  };

  onMount(() => fetchData());
</script>

<!-- Filter Panel -->
<div class="flex flex-wrap gap-4 mb-4">
  <select bind:value={type} class="w-20 px-2 py-1 border rounded text-sm">
    <option value="day">By Day</option>
    <option value="week">By Week</option>
  </select>

  <select bind:value={sortBy} class="w-36 px-2 py-1 border rounded text-sm">
    <option value="revenue">Sort by Revenue</option>
    <option value="orders">Sort by Orders</option>
  </select>

  <select bind:value={method} class="w-20 px-2 py-1 border rounded text-sm">
    <option value="cash">Cash</option>
    <option value="mobile_money">Mobile Money</option>
  </select>

  <input
    type="date"
    bind:value={startDate}
    class="w-36 px-2 py-1 border rounded text-sm"
  />
  <input
    type="date"
    bind:value={endDate}
    class="w-36 px-2 py-1 border rounded text-sm"
  />
</div>

<!-- Chart -->
{#if loading}
  <div class="animate-pulse space-y-4">
    <div class="h-6 bg-gray-200 rounded w-1/3"></div>
    <div class="h-[300px] bg-gray-100 rounded-md"></div>
  </div>
{:else}
  <BarChartSimple data={chartData} options={chartOptions} />
{/if}
