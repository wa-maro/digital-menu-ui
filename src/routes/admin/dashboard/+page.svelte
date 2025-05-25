<script>
  import QuickActionsPanel from "$lib/components/QuickActionsPanel.svelte";
  import RecentOrdersTable from "$lib/components/RecentOrdersTable.svelte";
  import SummaryCards from "$lib/components/SummaryCards.svelte";
</script>

<div class="p-4 space-y-6">
  <SummaryCards />
  <QuickActionsPanel />
  <RecentOrdersTable />
</div>
