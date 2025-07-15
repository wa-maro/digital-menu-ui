<script lang="ts">
  import { Pencil, Trash, Upload } from "lucide-svelte";

  export let data;
  const mediaItems: MediaItem[] = data.media?.items || [];
  let categories: Category[] = data.categories || [];

  let search = "";
  let selectedCategory = "";

  let filteredItems: MediaItem[] = mediaItems;

  function applyFilters() {
    filteredItems = mediaItems.filter((item) => {
      const matchesSearch = item.displayName
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        !selectedCategory || item.category._id === selectedCategory;
      return matchesSearch && matchesCategory;
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
  <div class="flex justify-end items-center mb-6">
    <a
      href="/admin/media/upload"
      class="bg-[#044974] text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer"
    >
      <Upload size={16} />
      Upload Image
    </a>
  </div>

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

    <!-- Category Filter -->
    <div class="flex flex-col">
      <label
        for="category"
        class="text-sm font-medium text-gray-700 mb-1 hidden"
        aria-label="category">Category</label
      >
      <select
        id="category"
        name="category"
        bind:value={selectedCategory}
        on:change={applyFilters}
        class="w-56 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-sm"
      >
        <option value="">All Categories</option>
        {#each categories as cat}
          <option value={cat._id}>{cat.name}</option>
        {/each}
      </select>
    </div>
  </div>

  <!-- Media Table -->
  <div class="min-h-[300px]">
    <table class="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
      <thead class="bg-gray-50 text-left text-sm text-gray-700">
        <tr>
          <th class="p-4">Image</th>
          <th class="p-4 cursor-pointer">Name</th>
          <th class="p-4">Category </th>
          <th class="p-4 cursor-pointer">Linked Items </th>
          <th class="p-4 text-center">Actions</th>
        </tr>
      </thead>
      <tbody class="text-sm text-gray-800 divide-y divide-stone-100">
        {#each paginatedItems as item}
          <tr class="hover:bg-gray-50 transition">
            <td class="py-1 ps-4">
              {#if item.url}
                <a href={`/admin/media/${item._id}`}>
                  <img
                    src={`http://127.0.0.1:3000${item.url}`}
                    alt={item.filename}
                    class="w-12 object-cover rounded"
                  />
                </a>
              {:else}
                <div
                  class="w-12 h-12 flex items-center justify-center bg-gray-100 text-gray-400 text-xs rounded"
                >
                  No Image
                </div>
              {/if}
            </td>

            <td class="py-1 ps-4">
              <a
                href={`/admin/media/${item._id}`}
                class="font-medium hover:underline"
              >
                {item.displayName}
              </a>
            </td>

            <td class="py-1 ps-4 text-gray-600">{item.category.name}</td>

            <td class="py-1 ps-4 whitespace-nowrap">
              {#if item.linkedMenuItemIds.length > 0}
                {#each item.linkedMenuItemIds.slice(0, 3) as menuItem, i}
                  <a
                    href={`/admin/menu/items/${menuItem._id}`}
                    class="underline text-blue-600 hover:text-blue-800"
                    >{menuItem.name}</a
                  >
                  {i < Math.min(item.linkedMenuItemIds.length, 3) - 1
                    ? ", "
                    : ""}
                {/each}

                {#if item.linkedMenuItemIds.length > 3}
                  <span class="text-gray-500 ml-1 text-sm">
                    +{item.linkedMenuItemIds.length - 3} more
                  </span>
                {/if}
              {:else}
                <span class="text-gray-400 italic">No linked items</span>
              {/if}
            </td>

            <td class="py-1 ps-4 text-center">
              <div class="flex justify-center gap-2">
                <a
                  href={`/admin/media/${item._id}/update`}
                  type="button"
                  class="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors cursor-pointer"
                  aria-label="Edit"
                >
                  <Pencil size={12} /></a
                >

                <form action="?/delete" method="post">
                  <input type="hidden" name="_id" bind:value={item._id} />
                  <button
                    type="submit"
                    class="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                    aria-label="Delete"
                  >
                    <Trash size={12} />
                  </button>
                </form>
              </div>
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
