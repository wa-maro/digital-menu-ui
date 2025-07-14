<script lang="ts">
  import { PUBLIC_API_URL } from "$env/static/public";

  export let showModal: boolean = false;
  export let mediaItems: MediaItem[] = [];
  export let selectImageUrl = "";
  export let selectImageName;

  export let categories: Category[];

  let filteredItems: MediaItem[] = mediaItems;

  let search = "";
  let selectedCategory = "";

  let currentPage = 1;
  const itemsPerPage = 10;

  $: totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  $: paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
    }
  }

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

  function selectImage(url: string, displayName: string) {
    selectImageUrl = `${PUBLIC_API_URL}${url}`;
    selectImageName = displayName ?? selectImageUrl;
    showModal = false;
  }
</script>

<div
  class="fixed inset-0 bg-gray-50 bg-opacity-50 z-50 flex items-center justify-center"
>
  <div
    class="w-full flex flex-col max-w-5xl mx-auto h-full py-6 relative overflow-auto"
  >
    <button
      class="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
      on:click={() => (showModal = false)}
    >
      &times;
    </button>

    <h2 class="text-xl font-semibold mb-6">Select an Image</h2>

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
          class="w-96 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-sm"
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
          class="w-72 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-sm"
        >
          <option value="">All Categories</option>
          {#each categories as cat}
            <option value={cat._id}>{cat.name}</option>
          {/each}
        </select>
      </div>
    </div>

    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 min-h-[300px]"
    >
      {#each paginatedItems as item}
        <button
          on:click={() => selectImage(item.url, item.displayName)}
          class="cursor-pointer border rounded p-2 hover:shadow-md transition"
        >
          <img
            src={`${PUBLIC_API_URL}${item.url}`}
            alt={item.displayName}
            class="w-full h-32 object-cover rounded mb-2"
          />
          <p class="text-center text-sm">{item.displayName}</p>
        </button>
      {/each}
    </div>

    <div class="flex justify-end">
      <div class="flex gap-x-4 items-center mt-3 px-4">
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
</div>
