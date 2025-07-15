<script lang="ts">
  import { Pencil, Trash } from "lucide-svelte";

  export let data: LoadResult<Category>;
  let categories: Category[] = data.data;

  let search = "";
  let filteredCategories: Category[] = categories;

  function applyFilters() {
    filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    );
  }
</script>

<div class="p-4">
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold text-[#044974]">Categories</h1>
    <a
      href="/admin/menu/categories/new"
      class="bg-[#044974] text-white px-4 py-2 rounded cursor-pointer"
      >Add Category</a
    >
  </div>

  <!-- Filters -->
  <div class="flex flex-wrap gap-6 items-end mb-6 py-4">
    <!-- Search Field -->
    <div class="flex basis-1/2 flex-col">
      <label for="search" class="text-sm font-medium text-gray-700 mb-1"
        >Search</label
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

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {#each filteredCategories as category}
      <div
        class="bg-white shadow-sm hover:shadow-md duration-200 rounded-xl px-4 py-3 flex items-center justify-between group transform hover:scale-[1.01] transition-[box-shadow,transform]"
      >
        <div>
          <h2
            class="text-base font-medium text-gray-800 group-hover:text-blue-700 transition-colors"
          >
            {category.name}
          </h2>
          <p class="text-sm text-gray-500">{category.description}</p>
        </div>

        <div class="flex gap-2 items-center">
          <a
            href={`/admin/menu/categories/${category._id}/update`}
            type="button"
            class="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors cursor-pointer"
            aria-label="Edit"
          >
            <Pencil size={12} /></a
          >

          <form action="?/delete" method="post">
            <input type="hidden" name="_id" bind:value={category._id} />
            <button
              type="submit"
              class="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
              aria-label="Delete"
            >
              <Trash size={12} />
            </button>
          </form>
        </div>
      </div>
    {/each}
  </div>
</div>
