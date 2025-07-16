<script lang="ts">
  import { formatRelativeDate } from "$lib/utils/formatter";
  import { statusBadgeClass } from "$lib/utils/order-status";

  export let data: { orders: Order[] };

  const { orders } = data;

  let search = "";
  let filteredItems: Order[] = orders;

  function applyFilters() {
    filteredItems = orders.filter((item) => {
      return item.user.fullName.toLowerCase().includes(search.toLowerCase());
    });
  }

  let currentPage = 1;
  const itemsPerPage = 10;

  $: totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  $: if (currentPage > totalPages) currentPage = totalPages || 1;
  $: paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages) currentPage = page;
  }
</script>

<div class="p-4">
  <div class="flex justify-between items-center mb-4"></div>

  <!-- Filters -->
  <div class="flex flex-wrap justify-between gap-6 items-end mb-6">
    <!-- Search Field -->
    <div class="flex flex-col">
      <label
        for="search"
        class="text-sm font-medium text-gray-700 mb-1 hidden"
        aria-label="search">Search</label
      >
      <input
        id="search"
        name="search"
        type="text"
        bind:value={search}
        on:input={applyFilters}
        placeholder="Search by name..."
        class="w-80 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-sm"
      />
    </div>
  </div>

  <!-- Orders Table -->
  <div class="min-h-[300px]">
    <table class="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
      <thead class="bg-gray-50 text-left text-sm text-gray-700">
        <tr class="text-sm">
          <th class="px-4 py-3">Order ID</th>
          <th class="px-4 py-3">Customer</th>
          <th class="px-4 py-3">Type</th>
          <th class="px-4 py-3 cursor-pointer hover:text-blue-600">
            Total (TZS)
          </th>
          <th class="px-4 py-3">Status</th>
          <th class="px-4 py-3 cursor-pointer hover:text-blue-600">
            Created at
          </th>
        </tr>
      </thead>
      <tbody>
        {#each paginatedItems as item}
          <tr class="hover:bg-gray-50 text-sm">
            <td class="" title={item.orderId}>
              <a
                href={`/admin/orders/${item._id}`}
                class="px-4 py-2 hover:underline transition"
              >
                {item.orderId}
              </a>
            </td>
            <td class="px-4 py-2">{item.user.fullName || item.user.email}</td>
            <td class="px-4 py-2 capitalize text-gray-700">{item.type}</td>
            <td class="px-4 py-2 text-green-600 font-semibold"
              >{item.total.toFixed(2)}</td
            >
            <td class="px-4 py-2">
              <span
                class={`px-2 py-1 rounded text-xs font-medium ${statusBadgeClass(item.status)}`}
              >
                {item.status.replace(/_/g, " ")}
              </span>
            </td>
            <td class="px-4 py-2 text-gray-500"
              >{formatRelativeDate(item.createdAt || "")}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <!-- Paginator -->
  <div class="flex justify-end">
    <div class="flex gap-x-4 items-center mt-5 px-4">
      <button
        on:click={() => goToPage(currentPage - 1)}
        class="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm"
        disabled={currentPage === 1}
      >
        Prev
      </button>

      <div class="space-x-1">
        {#each Array(totalPages)
          .fill(0)
          .map((_, i) => i + 1) as page}
          <button
            on:click={() => goToPage(page)}
            class="px-3 py-1 rounded text-sm
            {page === currentPage
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 hover:bg-gray-200'}"
          >
            {page}
          </button>
        {/each}
      </div>

      <button
        on:click={() => goToPage(currentPage + 1)}
        class="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 text-sm"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  </div>
</div>
