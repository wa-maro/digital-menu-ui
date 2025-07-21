<script lang="ts">
  import ComparativeTrendsChart from "$lib/components/admin/charts/ComparativeTrendsChart.svelte";
  import RevenueOrdersChart from "$lib/components/admin/charts/RevenueOrdersChart.svelte";
  import TopPerformingChart from "$lib/components/admin/charts/TopPerformingChart.svelte";
</script>

<div class="py-4">
  <h2 class="text-xl font-semibold mb-6 ms-4">Sales Insights</h2>

  <div class="bg-white rounded shadow max-w-4xl mx-auto p-4 px-8 mb-12">
    <RevenueOrdersChart />
  </div>

  <div class="bg-white rounded shadow max-w-4xl mx-auto p-4 px-8 mb-12">
    <TopPerformingChart />
  </div>

  <div class="bg-white rounded shadow max-w-4xl mx-auto p-4 px-8">
    <ComparativeTrendsChart />
  </div>
</div>
