<script lang="ts">
  import { goto } from "$app/navigation";
  export let recentOrders: RecentOrder[];

  type StatusStyles = Record<OrderStatus, string>;

  const statusStyles: StatusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-cyan-100 text-cyan-800",
    preparing: "bg-blue-100 text-blue-800",
    ready: "bg-orange-100 text-orange-800",
    out_for_delivery: "bg-indigo-100 text-indigo-800",
    delivered: "bg-green-100 text-green-800",
    picked: "bg-purple-100 text-purple-800",
    completed: "bg-gray-100 text-gray-800",
    cancel_request: "bg-yellow-50 text-yellow-600 border border-yellow-300",
    cancelled: "bg-red-100 text-red-800",
    rejected_cancel_request: "bg-pink-100 text-pink-800",
    failed: "bg-red-200 text-red-900",
  };

  const viewOrder = (id: string) => {
    goto(`/admin/orders/${id}`);
  };

  const formatStatus = (status: OrderStatus) => {
    return status
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
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
          <td class="px-4 py-2.5">{order.user.fullName || order.user.email}</td>
          <td class="px-4 py-2.5">{Number(order.total).toFixed(2)}</td>
          <td class="px-4 py-2.5">
            <span
              class={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${statusStyles[order.status]}`}
            >
              {formatStatus(order.status)}
            </span>
          </td>
          <td class="px-4 py-2.5">{order.createdAt}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
