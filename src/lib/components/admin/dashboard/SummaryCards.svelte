<script lang="ts">
  import { Receipt, Utensils, Users, HandCoinsIcon } from "lucide-svelte";
  export let summaryMetrics: DashboardSummary;

  const stats = [
    {
      title: "Total Orders",
      value: summaryMetrics.totalOrders,
      icon: Receipt,
      color: "bg-blue-100 text-[#044974]",
    },
    {
      title: "Revenue",
      value: summaryMetrics.totalRevenue,
      icon: HandCoinsIcon,
      color: "bg-green-100 text-green-800",
    },
    {
      title: "Menu Items",
      value: summaryMetrics.totalMenuItems,
      icon: Utensils,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Active Users",
      value: summaryMetrics.activeUsers,
      icon: Users,
      color: "bg-purple-100 text-purple-800",
    },
  ];
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  {#each stats as stat}
    <div
      class="flex items-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition"
    >
      <div class={`p-3 rounded-xl ${stat.color}`}>
        <svelte:component this={stat.icon} class="w-6 h-6" />
      </div>
      <div class="ml-4">
        <p class="text-sm text-gray-500">{stat.title}</p>
        <p class="text-xl font-semibold text-gray-900">{stat.value}</p>
      </div>
    </div>
  {/each}
</div>
