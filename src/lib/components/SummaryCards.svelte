<script lang="ts">
  import { Receipt, DollarSign, Utensils, Users } from "lucide-svelte";

  const stats = [
    {
      title: "Total Orders",
      value: "1,320",
      icon: Receipt,
      color: "bg-blue-100 text-[#044974]",
    },
    {
      title: "Revenue",
      value: "$5,450",
      icon: DollarSign,
      color: "bg-green-100 text-green-800",
    },
    {
      title: "Menu Items",
      value: "78",
      icon: Utensils,
      color: "bg-yellow-100 text-yellow-800",
    },
    {
      title: "Active Users",
      value: "213",
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
