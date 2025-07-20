<script lang="ts">
  export let data: { customers: User[]; title: string };

  let search = "";
  let filteredItems: User[] = data.customers;

  function applyFilters() {
    filteredItems = data.customers.filter((item) => {
      const searchText = search.toLowerCase();

      const fullName = item.profile.fullName.toLowerCase();
      const phoneNumber = item.profile.phoneNumber ?? "";

      return fullName.includes(searchText) || phoneNumber.includes(searchText);
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

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

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
          <th class="px-4 py-3 text-start">#</th>
          <th class="px-4 py-3 text-start">Name</th>
          <th class="px-4 py-3 text-start">Email</th>
          <th class="px-4 py-3 text-start">Phone</th>
          <th class="px-4 py-3 text-start">Gender</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-100">
        {#each paginatedItems as customer, i}
          <tr class="hover:bg-gray-50">
            <td class="px-4 py-3">{i + 1}</td>
            <td class="px-4 py-3">{customer.profile?.fullName ?? "-"}</td>
            <td class="px-4 py-3">{customer.email}</td>
            <td class="px-4 py-3">{customer.profile?.phoneNumber ?? "-"}</td>
            <td class="px-4 py-3 capitalize"
              >{customer.profile?.gender ?? "-"}</td
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
