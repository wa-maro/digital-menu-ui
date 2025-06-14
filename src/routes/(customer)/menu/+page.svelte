<script lang="ts">
  import AddToCart from "$lib/components/AddToCart.svelte";

  export let data: {
    items: MenuItem[];
    categories: Category[];
  };
  let { items, categories } = data;

  let selectedCategory: Category | null = null;
  $: filteredItems = selectedCategory
    ? items.filter((item) => item.category._id === selectedCategory?._id)
    : items;
</script>

<div class="p-6 max-w-5xl mx-auto space-y-6">
  <!-- Title -->
  <h1
    class="text-4xl font-extrabold text-center text-gray-800 tracking-tight drop-shadow-sm"
  >
    Our Menu
  </h1>

  <!-- Category Filters -->
  <div class="flex flex-wrap justify-center gap-2">
    <button
      class="px-4 py-1 rounded-full text-sm border font-medium transition-all
             duration-200 ease-in-out
             hover:shadow-sm
             {selectedCategory === null
        ? 'bg-[#065B8C] text-white border-[#065B8C]'
        : 'bg-gray-100 text-gray-700 border-gray-300'}"
      on:click={() => (selectedCategory = null)}
    >
      All
    </button>

    {#each categories as category}
      <button
        class="px-4 py-1 rounded-full text-sm border font-medium transition-all
               duration-200 ease-in-out
               hover:shadow-sm
               {selectedCategory === category
          ? 'bg-[#065B8C] text-white border-[#065B8C]'
          : 'bg-gray-100 text-gray-700 border-gray-300'}"
        on:click={() =>
          (selectedCategory = selectedCategory === category ? null : category)}
      >
        {category.name}
      </button>
    {/each}
  </div>
  <!-- Menu Items -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {#each filteredItems as item}
      <div
        class="bg-white flex flex-col justify-between border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition"
      >
        <div class="flex items-center flex-col gap-4 p-4">
          <!-- Item Image -->
          <img
            src={item.imageURL || "https://via.placeholder.com"}
            alt={item.name}
            class="w-full h-44 object-cover rounded-lg flex-shrink-0"
          />

          <!-- Item Info -->
          <div class="flex-1 space-y-2">
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
            </div>

            <p class="text-sm text-gray-500 line-clamp-2">
              {item.description}
            </p>

            <div>
              <span class="bg-gray-100 px-2 py-0.5 rounded-full"
                >{item.category.name}</span
              >
            </div>

            <div
              class="flex items-center justify-between gap-2 text-xs text-gray-500"
            >
              <span class="text-sm font-medium text-[#065B8C]"
                >TZS {item.price.toFixed(2)}</span
              >
            </div>
          </div>
        </div>
        <!-- Add to Cart -->
        {#if item.available}
          <div class="p-4"><AddToCart {item} /></div>
        {/if}
      </div>
    {:else}
      <p class="text-center text-gray-500 col-span-full">
        No menu items available.
      </p>
    {/each}
  </div>
</div>
