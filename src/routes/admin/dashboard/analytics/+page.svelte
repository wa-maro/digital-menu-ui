<script lang="ts">
  import ComparativeTrendsChart from "$lib/components/admin/charts/ComparativeTrendsChart.svelte";
  import RevenueOrdersChart from "$lib/components/admin/charts/RevenueOrdersChart.svelte";
  import TopPerformingChart from "$lib/components/admin/charts/TopPerformingChart.svelte";

  let selectedChart = "revenue";

  function handleChange(
    event: Event & { currentTarget: EventTarget & HTMLSelectElement }
  ) {
    selectedChart = event.currentTarget.value;
  }
</script>

<div class="py-4">
  <div class="flex justify-between items-center p-4 px-8 mb-8">
    <h2 class="text-xl font-semibold">Sales Insights</h2>

    <select
      id="chartSelector"
      class="border border-gray-300 rounded px-3 py-2 w-48"
      value={selectedChart}
      on:change={handleChange}
    >
      <option value="all" selected>All Charts</option>
      <option value="revenue">Revenue & Orders</option>
      <option value="top">Top Performing</option>
      <option value="comparative">Comparative Trends</option>
    </select>
  </div>

  {#if selectedChart === "all" || selectedChart === "revenue"}
    <div class="bg-white rounded shadow max-w-4xl mx-auto p-4 mb-12">
      <RevenueOrdersChart />
    </div>
  {/if}

  {#if selectedChart === "all" || selectedChart === "top"}
    <div class="bg-white rounded shadow max-w-4xl mx-auto p-4 mb-12">
      <TopPerformingChart />
    </div>
  {/if}

  {#if selectedChart === "all" || selectedChart === "comparative"}
    <div class="bg-white rounded shadow max-w-4xl mx-auto p-4">
      <ComparativeTrendsChart />
    </div>
  {/if}
</div>
