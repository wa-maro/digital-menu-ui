<script lang="ts">
  import { goto } from "$app/navigation";
  import { formatRelativeDate } from "$lib/utils/formatter";
  import { statusBadgeClass } from "$lib/utils/order-status";
  export let recentOrders: RecentOrder[];

  const viewOrder = (id: string) => {
    goto(`/admin/orders/${id}`);
  };
</script>

<div class="bg-white p-4 pb-6 rounded-2xl shadow-sm mt-6 overflow-x-auto">
  <h2 class="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h2>
  <table class="min-w-full bg-white rounded-xl shadow overflow-hidden">
    <thead class="bg-gray-100 text-gray-600 text-sm uppercase">
      <tr>
        <th class="px-4 py-2.5 text-left">Customer</th>
        <th class="px-4 py-2.5 text-left">Total (TZS)</th>
        <th class="px-4 py-2.5 text-left">Status</th>
        <th class="px-4 py-2.5 text-left">Date</th>
      </tr>
    </thead>
    <tbody class="text-gray-700 divide-y divide-gray-200">
      {#each recentOrders as order}
        <tr
          on:click={() => viewOrder(order._id)}
          class="cursor-pointer hover:bg-gray-100 transition"
        >
          <td class="px-4 py-2.5">{order.user.email}</td>
          <td class="px-4 py-2.5">{Number(order.total).toFixed(2)}</td>
          <td class="px-4 py-2.5">
            <span
              class={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${statusBadgeClass(order.status)}`}
            >
              {order.status.replace(/_/g, " ")}
            </span>
          </td>
          <td class="px-4 py-2.5"
            >{formatRelativeDate(order.createdAt || "")}</td
          >
        </tr>
      {/each}
    </tbody>
  </table>
</div>
