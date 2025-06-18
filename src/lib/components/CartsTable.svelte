<script lang="ts">
  export let carts: UserCart[];
  export let page: number;
  export let search: string;
  export let sortBy: string;
  export let order: string;
  export let limit: number;
  export let buildQuery: (params: Record<string, string | number>) => string;

  const cartTotal = (cart: UserCart) =>
    cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const cartItemCount = (cart: UserCart) =>
    cart.items.reduce((count, i) => count + i.quantity, 0);
</script>

<table class="min-w-full divide-y divide-gray-200 text-sm text-left">
  <thead class="bg-gray-100 text-gray-700 uppercase tracking-wider">
    <tr>
      <th class="px-4 py-3">Cart ID</th>
      <th class="px-4 py-3">User</th>
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
    {#each carts as cart}
      <tr class="hover:bg-gray-50">
        <td class="px-4 py-2 max-w-[1rem] truncate" title={cart._id}
          >{cart._id}</td
        >
        <td class="px-4 py-2">{cart.user.fullName}</td>
        <td class="px-4 py-2">{cartItemCount(cart)}</td>
        <td class="px-4 py-2 text-green-600 font-semibold"
          >${cartTotal(cart).toFixed(2)}</td
        >
        <td class="px-4 py-2 text-gray-500"
          >{new Date(cart.createdAt || "").toLocaleDateString()}</td
        >
      </tr>
    {/each}
  </tbody>
</table>
