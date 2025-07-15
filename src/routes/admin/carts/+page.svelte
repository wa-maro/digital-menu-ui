<script lang="ts">
  export let data: {
    carts: UserCart[];
    page: number;
    limit: number;
    search: string;
    sortBy: string;
    order: string;
  };

  const { carts } = data;

  let search = "";
  let filteredItems: UserCart[] = carts;

  function applyFilters() {
    filteredItems = carts.filter((item) => {
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

  const cartTotal = (cart: UserCart) =>
    cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const cartItemCount = (cart: UserCart) =>
    cart.items.reduce((count, i) => count + i.quantity, 0);
</script>

<div class="p-4">
  <div class="flex justify-end items-center mb-6"></div>

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

  <!-- Cart Table -->
  <div class="min-h-[300px]">
    <table class="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
      <thead class="bg-gray-50 text-left text-sm text-gray-700">
        <tr>
          <th class="px-4 py-3">Cart ID</th>
          <th class="px-4 py-3">Customer</th>
          <th class="px-4 py-3">Items</th>
          <th class="px-4 py-3 cursor-pointer hover:text-blue-600">
            Total (TZS)
          </th>
          <th class="px-4 py-3 cursor-pointer hover:text-blue-600">
            Created at
          </th>
        </tr></thead
      >

      <tbody class="bg-white divide-y divide-gray-100">
        {#each paginatedItems as item}
          <tr class="hover:bg-gray-50">
            <td class="px-4 py-2 max-w-fit truncate" title={item._id}
              >{item._id}</td
            >
            <td class="px-4 py-2">{item.user.fullName}</td>
            <td class="px-4 py-2">{cartItemCount(item)}</td>
            <td class="px-4 py-2 text-green-600 font-semibold"
              >{cartTotal(item).toFixed(2)}</td
            >
            <td class="px-4 py-2 text-gray-500"
              >{new Date(item.createdAt || "").toLocaleDateString()}</td
            >
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
