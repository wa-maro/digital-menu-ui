<script lang="ts">
  type OrderItem = {
    id: string;
    customer: string;
    status: "Pending" | "Preparing" | "Ready";
    total: string;
    time: string;
  };

  const orders: OrderItem[] = [
    {
      id: "ORD-00123",
      customer: "John Doe",
      status: "Pending",
      total: "$24.99",
      time: "2 mins ago",
    },
    {
      id: "ORD-00122",
      customer: "Sarah Lee",
      status: "Preparing",
      total: "$42.10",
      time: "5 mins ago",
    },
    {
      id: "ORD-00121",
      customer: "Mike Chen",
      status: "Ready",
      total: "$18.50",
      time: "10 mins ago",
    },
  ];

  type StatusStyles = {
    Pending: string;
    Preparing: string;
    Ready: string;
    Delivered: string;
  };

  const statusStyles: StatusStyles = {
    Pending: "bg-yellow-100 text-yellow-800",
    Preparing: "bg-blue-100 text-blue-800",
    Ready: "bg-orange-100 text-orange-800",
    Delivered: "bg-green-100 text-green-800",
  };
</script>

<div class="bg-white p-4 pb-6 rounded-2xl shadow-sm mt-6 overflow-x-auto">
  <h2 class="text-lg font-semibold text-gray-800 mb-4">Recent Orders</h2>
  <table class="min-w-full table-auto text-sm text-left text-gray-700">
    <thead>
      <tr class="text-xs text-gray-500 uppercase border-b">
        <th class="py-2 px-3">Order ID</th>
        <th class="py-2 px-3">Customer</th>
        <th class="py-2 px-3">Status</th>
        <th class="py-2 px-3">Total</th>
        <th class="py-2 px-3">Time</th>
      </tr>
    </thead>
    <tbody>
      {#each orders as order}
        <tr class="border-b hover:bg-gray-50">
          <td class="py-2 px-3 font-medium">{order.id}</td>
          <td class="py-2 px-3">{order.customer}</td>
          <td class="py-2 px-3">
            <span
              class={`text-xs font-medium px-2 py-1 rounded-full ${statusStyles[order.status]}`}
            >
              {order.status}
            </span>
          </td>
          <td class="py-2 px-3">{order.total}</td>
          <td class="py-2 px-3">{order.time}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
