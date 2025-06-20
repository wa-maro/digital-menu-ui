<script lang="ts">
  import AddToCart from "$lib/components/AddToCart.svelte";
  import { notify } from "$lib/stores/notifications";

  export let data: {
    items: MenuItem[];
    categories: Category[];
  };
  let { items, categories } = data;

  let selectedCategory: Category | null = null;
  let searchTerm = "";
  $: filteredItems = items.filter((item) => {
    const matchesCategory = selectedCategory
      ? item.category._id === selectedCategory._id
      : true;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  notify("Menu Items loaded", "success");
</script>

<div class="p-6 max-w-5xl mx-auto space-y-6">
  <!-- Search & Filters Wrapper -->
  <div class="flex flex-col sm:items-center sm:justify-between gap-6 mb-12">
    <!-- Search Input -->
    <div class="relative w-full sm:max-w-lg">
      <input
        type="text"
        placeholder="Search menu items..."
        bind:value={searchTerm}
        class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#065B8C] focus:border-[#065B8C] transition-all duration-150 text-sm"
      />
      <!-- Search Icon -->
      <svg
        class="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
        />
      </svg>
    </div>

    <!-- Category Filters -->
    <div class="flex flex-wrap gap-2 justify-start sm:justify-end">
      <button
        class={`px-4 py-1 rounded-full text-xs font-medium transition-all border
        ${
          selectedCategory === null
            ? "bg-[#065B8C] text-white border-[#065B8C] shadow"
            : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
        }`}
        on:click={() => (selectedCategory = null)}
      >
        All
      </button>

      {#each categories as category}
        <button
          class={`px-4 py-1 rounded-full text-xs font-medium transition-all border
          ${
            selectedCategory === category
              ? "bg-[#065B8C] text-white border-[#065B8C] shadow"
              : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
          }`}
          on:click={() =>
            (selectedCategory =
              selectedCategory === category ? null : category)}
        >
          {category.name}
        </button>
      {/each}
    </div>
  </div>

  <!-- Menu Items -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each filteredItems as item}
      <div
        class="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
      >
        <!-- Item Image -->
        <img
          src={item.imageURL || "https://via.placeholder.com"}
          alt={item.name}
          class="w-full h-44 object-cover rounded-lg flex-shrink-0"
        />

        <!-- Item Info -->
        <div class="flex-1 space-y-2 p-4">
          <h2>
            <a href={`/menu/items/${item._id}`} class="text-gray-800 text-lg"
              >{item.name}</a
            >
          </h2>

          <div
            class="flex items-center justify-between gap-2 text-xs text-gray-500"
          >
            {#if item.available}
              <span class="text-green-600 font-medium">Available</span>
            {:else}
              <span class="text-red-500 font-medium">Unavailable</span>
            {/if}

            <div>
              <span class="bg-gray-100 px-2 py-0.5 rounded-full"
                >{item.category.name}</span
              >
            </div>
          </div>

          <p class="text-sm text-gray-500 line-clamp-2">
            {item.description}
          </p>

          <div
            class="flex items-center justify-between gap-2 text-xs text-gray-500"
          >
            <span class="text-sm font-medium text-[#065B8C]"
              >TZS {item.price.toFixed(2)}</span
            >
          </div>
        </div>

        <!-- Add to Cart -->
        {#if item.available}
          <div class="p-4">
            <AddToCart {item} />
          </div>
        {/if}
      </div>
    {:else}
      <p class="text-center text-gray-500 col-span-full">
        No menu items available.
      </p>
    {/each}
  </div>
</div>
