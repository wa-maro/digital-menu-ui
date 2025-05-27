<script>
  import QuickActionsPanel from "$lib/components/dashboard/QuickActionsPanel.svelte";
  import RecentOrdersTable from "$lib/components/dashboard/RecentOrdersTable.svelte";
  import SummaryCards from "$lib/components/dashboard/SummaryCards.svelte";
</script>

<div class="p-4 space-y-6">
  <SummaryCards />
  <QuickActionsPanel />
  <RecentOrdersTable />
</div>
