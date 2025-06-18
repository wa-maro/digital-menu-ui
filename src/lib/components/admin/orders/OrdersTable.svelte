<script lang="ts">
  import { buildQuery } from "$lib/utils/query-builder";

  export let orders;
  export let page: number;
  export let search: string;
  export let sortBy: string;
  export let order: string;
  export let limit: number;
</script>

<table class="min-w-full divide-y divide-gray-200 text-sm text-left">
  <thead class="bg-gray-100 text-lime-800 uppercase tracking-wider">
    <tr>
      <th class="px-4 py-3">Order ID</th>
      <th class="px-4 py-3">User</th>
      <th class="px-4 py-3">Type</th>
      <th class="px-4 py-3">Items</th>
      <th
        class="px-4 py-3 cursor-pointer hover:text-blue-600"
        on:click={() =>
          (location.href = buildQuery({
            search,
            sortBy: "total",
            order: order === "asc" ? "desc" : "asc",
            page,
            limit,
          }))}
      >
        Total {sortBy === "total" ? (order === "asc" ? "▲" : "▼") : ""}
      </th>
      <th class="px-4 py-3">Status</th>
      <th
        class="px-4 py-3 cursor-pointer hover:text-blue-600"
        on:click={() =>
          (location.href = buildQuery({
            search,
            sortBy: "createdAt",
            order: order === "asc" ? "desc" : "asc",
            page,
            limit,
          }))}
      >
        Created {sortBy === "createdAt" ? (order === "asc" ? "▲" : "▼") : ""}
      </th>
    </tr>
  </thead>

  <tbody class="bg-white divide-y divide-gray-100">
    {#each orders as order}
      <tr class="hover:bg-gray-50">
        <td class="px-4 py-2 max-w-[10rem] truncate" title={order._id}>
          {order._id}
        </td>
        <td class="px-4 py-2">{order.user.fullName}</td>
        <td class="px-4 py-2 capitalize text-gray-700">{order.type}</td>
        <td class="px-4 py-2">{order.items.length}</td>
        <td class="px-4 py-2 text-green-600 font-semibold"
          >${order.total.toFixed(2)}</td
        >
        <td class="px-4 py-2">
          <span
            class={`px-2 py-1 rounded text-xs font-medium
              ${
                order.status === "pending"
                  ? "bg-yellow-100 text-yellow-800"
                  : order.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : order.status === "cancelled"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-800"
              }`}
          >
            {order.status.replace(/_/g, " ")}
          </span>
        </td>
        <td class="px-4 py-2 text-gray-500"
          >{new Date(order.createdAt || "").toLocaleDateString()}</td
        >
      </tr>
    {/each}
  </tbody>
</table>
