<script lang="ts">
  import { onMount } from "svelte";
  import { LineChart, ScaleTypes } from "@carbon/charts-svelte";
  import type { LineChartOptions } from "@carbon/charts/interfaces";

  let mode: "month" | "week" = "month";
  let selectedMonth = "2025-07";
  let selectedWeek = "2025-W29";
  let method = "cash";

  let chartData: ChartData[] = [];
  let loading = true;

  async function fetchChartData() {
    const query =
      mode === "month"
        ? `month=${selectedMonth}&method=${method}`
        : `week=${selectedWeek}&method=${method}`;

    const res = await fetch(
      `http://127.0.0.1:3000/admin/dashboard/revenue-insights?${query}`
    );
    const json = await res.json();

    // Map to Carbon Charts format
    chartData = [];

    json.labels.forEach((label: string, i: number) => {
      chartData.push(
        { group: "Revenue", date: label, value: json.revenue[i] },
        { group: "Orders", date: label, value: json.orders[i] }
      );
    });

    loading = false;
  }

  const chartOptions: LineChartOptions = {
    title: "Revenue & Orders",
    axes: {
      bottom: {
        title: mode === "month" ? "Week" : "Day",
        mapsTo: "date",
        scaleType: "labels" as ScaleTypes.LABELS,
      },
      left: {
        title: "Amount / Count",
        mapsTo: "value",
        scaleType: "linear" as ScaleTypes.LABELS,
      },
    },
    curve: "curveMonotoneX",
    height: "400px",
  };

  onMount(() => fetchChartData());
</script>

<div class="flex flex-wrap items-center gap-4 mb-4">
  <select bind:value={mode} class="w-24 border px-2 py-1 rounded text-sm">
    <option value="month">Month</option>
    <option value="week">Week</option>
  </select>

  {#if mode === "month"}
    <input
      type="month"
      bind:value={selectedMonth}
      class="border px-2 py-1 rounded text-sm"
    />
  {:else}
    <input
      type="week"
      bind:value={selectedWeek}
      class="border px-2 py-1 rounded text-sm"
    />
  {/if}

  <select bind:value={method} class="w-32 border px-2 py-1 rounded text-sm">
    <option value="cash">Cash</option>
    <option value="mobile_money">Mobile Money</option>
  </select>
</div>

{#if loading}
  <div class="animate-pulse space-y-4">
    <div class="h-6 bg-gray-200 rounded w-1/3"></div>
    <div class="h-[300px] bg-gray-100 rounded-md"></div>
  </div>
{:else}
  <LineChart data={chartData} options={chartOptions} />
{/if}
