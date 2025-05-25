<script lang="ts">
  import { goto } from "$app/navigation";

  type OrderItem = {
    id: string;
    customer: string;
    status: "pending" | "preparing" | "ready" | "completed";
    total: number;
    time: string;
  };

  const orders: OrderItem[] = [
    {
      id: "ORD-00123",
      customer: "John Doe",
      status: "pending",
      total: 24.99,
      time: "2 mins ago",
    },
    {
      id: "ORD-00122",
      customer: "Sarah Lee",
      status: "preparing",
      total: 42.1,
      time: "5 mins ago",
    },
    {
      id: "ORD-00121",
      customer: "Mike Chen",
      status: "ready",
      total: 18.5,
      time: "10 mins ago",
    },
  ];

  type StatusStyles = {
    pending: string;
    preparing: string;
    ready: string;
    delivered: string;
    completed: string;
  };

  const statusStyles: StatusStyles = {
    pending: "bg-yellow-100 text-yellow-800",
    preparing: "bg-blue-100 text-blue-800",
    ready: "bg-orange-100 text-orange-800",
    delivered: "bg-green-100 text-green-800",
    completed: "bg-gray-100 text-gray-800",
  };

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
        <th class="px-4 py-2.5 text-left">Total</th>
        <th class="px-4 py-2.5 text-left">Status</th>
        <th class="px-4 py-2.5 text-left">Date</th>
      </tr>
    </thead>
    <tbody class="text-gray-700 divide-y divide-gray-200">
      {#each orders as order}
        <tr
          on:click={() => viewOrder(order.id)}
          class="cursor-pointer hover:bg-gray-100 transition"
        >
          <td class="px-4 py-2.5">{order.customer}</td>
          <td class="px-4 py-2.5">${Number(order.total).toFixed(2)}</td>
          <td class="px-4 py-2.5">
            <span
              class={`inline-block px-2 py-1 text-xs font-semibold rounded-full
              ${statusStyles[order.status]}`}
            >
              {order.status}
            </span>
          </td>
          <td class="px-4 py-2.5">{order.time}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
