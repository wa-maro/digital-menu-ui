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
  <div class="flex justify-end items-center mb-4">
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

  <div class="min-h-[300px]">
    <table class="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
      <thead class="bg-gray-50 text-left text-sm text-gray-700">
        <tr>
          <th class="p-4">Name</th>
          <th class="p-4">Description</th>
          <th class="p-4 text-center">Actions</th>
        </tr>
      </thead>
      <tbody class="text-sm text-gray-800 divide-y divide-stone-100">
        {#each filteredCategories as category}
          <tr class="hover:bg-gray-50 transition">
            <td class="py-1 ps-4 text-gray-800">{category.name}</td>
            <td class="py-1 ps-4 text-gray-500">{category.description}</td>
            <td class="py-1 ps-4 text-center">
              <div class="flex justify-center gap-2">
                <a
                  href={`/admin/menu/categories/${category._id}/update`}
                  class="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
                  aria-label="Edit"
                >
                  <Pencil size={12} />
                </a>

                <form action="?/delete" method="post">
                  <input type="hidden" name="_id" bind:value={category._id} />
                  <button
                    type="submit"
                    class="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition-colors"
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
</div>
