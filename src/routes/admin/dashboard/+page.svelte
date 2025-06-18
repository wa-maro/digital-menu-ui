<script>
  import QuickActionsPanel from "$lib/components/admin/dashboard/QuickActionsPanel.svelte";
  import RecentOrdersTable from "$lib/components/admin/dashboard/RecentOrdersTable.svelte";
  import SummaryCards from "$lib/components/admin/dashboard/SummaryCards.svelte";
</script>

<div class="p-4 space-y-6">
  <SummaryCards />
  <QuickActionsPanel />
  <RecentOrdersTable />
</div>
