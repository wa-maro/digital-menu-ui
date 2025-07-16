<script>
  import QuickActionsPanel from "$lib/components/admin/dashboard/QuickActionsPanel.svelte";
  import RecentOrdersTable from "$lib/components/admin/dashboard/RecentOrdersTable.svelte";
  import SummaryCards from "$lib/components/admin/dashboard/SummaryCards.svelte";

  export let data;
  const { summaryMetrics, recentOrders } = data;
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<div class="p-4 space-y-6">
  <SummaryCards {summaryMetrics} />
  <QuickActionsPanel />
  <RecentOrdersTable {recentOrders} />
</div>
