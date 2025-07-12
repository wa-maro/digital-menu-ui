<script lang="ts">
  import MenuItemModalForm from "$lib/components/admin/menu/MenuItemModalForm.svelte";
  import { Pencil, Plus, Trash } from "lucide-svelte";
  import { onMount } from "svelte";

  export let data;

  let items: MenuItem[] = data.items || [];
  let categories: Category[] = data.categories || [];

  let showModal = false;

  const openModal = () => {
    showModal = true;
  };

  let item: MenuItem = {
    _id: "",
    name: "",
    description: "",
    price: 0,
    available: false,
    category: { _id: "", name: "", description: "" },
    imageURL: "",
  };

  $: editMenuItem = (data: MenuItem) => {
    item._id = data._id;
    item.name = data.name;
    item.description = data.description;
    item.price = data.price;
    item.available = data.available;
    item.category = { ...data.category } as Category;
    item.imageURL = data.imageURL;

    openModal();
  };

  let search = "";
  let selectedCategory = "";
  let sort: "asc" | "desc" = "desc";
  let sortField: "name" | "price" = "name";
  let filteredItems: MenuItem[] = items;
  let currentPage = 1;
  const itemsPerPage = 5;

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

  function toggleSort(field: "name" | "price" = "name") {
    if (sortField === field) sort = sort === "asc" ? "desc" : "asc";
    else {
      sortField = field;
      sort = "asc";
    }
    applyFilters();
  }

  function applyFilters() {
    filteredItems = items
      .filter((item) => {
        const matchesSearch = item.name
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesCategory =
          !selectedCategory || item.category._id === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (!sortField) return 0;

        const aValue = a[sortField];
        const bValue = b[sortField];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sort === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === "number" && typeof bValue === "number") {
          return sort === "asc" ? aValue - bValue : bValue - aValue;
        }

        return 0;
      });
  }

  onMount(() => toggleSort());
</script>

<div class="p-4">
  <div class="flex justify-between items-center mb-3">
    <h1 class="text-2xl font-bold text-[#044974]">Menu Items</h1>

    <button
      on:click={openModal}
      class="bg-[#044974] text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer"
    >
      <Plus size={16} />
      Add Item
    </button>
  </div>

  <!-- Filters -->
  <div class="flex flex-wrap justify-between gap-6 items-end mb-3">
    <!-- Search Field -->
    <div class="flex flex-col">
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

    <!-- Category Filter -->
    <div class="flex flex-col">
      <label for="category" class="text-sm font-medium text-gray-700 mb-1"
        >Category</label
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

  <div class="min-h-[300px]">
    <table class="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
      <thead class="bg-gray-50 text-left text-sm text-gray-700">
        <tr>
          <th class="p-4">Image</th>
          <th class="p-4 cursor-pointer" on:click={() => toggleSort("name")}
            >Name {#if sortField === "name"}
              <span>{sort === "asc" ? "↑" : "↓"}</span>
            {/if}</th
          >
          <th class="p-4">Category </th>
          <th class="p-4 cursor-pointer" on:click={() => toggleSort("price")}
            >Price {#if sortField === "price"}
              <span>{sort === "asc" ? "↑" : "↓"}</span>
            {/if}</th
          >
          <th class="p-4 text-center">Actions</th>
        </tr>
      </thead>
      <tbody class="text-sm text-gray-800 divide-y divide-stone-100">
        {#each paginatedItems as item}
          <tr class="hover:bg-gray-50 transition">
            <td class="py-1 ps-4">
              {#if item.imageURL}
                <a href={`/admin/menu/items/${item._id}`}>
                  <img
                    src={item.imageURL}
                    alt={item.name}
                    class="w-16 h-16 object-cover rounded"
                  />
                </a>
              {:else}
                <div
                  class="w-16 h-16 flex items-center justify-center bg-gray-100 text-gray-400 text-xs rounded"
                >
                  No Image
                </div>
              {/if}
            </td>

            <td class="py-1 ps-4">
              <a
                href={`/admin/menu/items/${item._id}`}
                class="font-medium hover:underline"
              >
                {item.name}
              </a>
            </td>

            <td class="py-1 ps-4 text-gray-600">{item.category.name}</td>

            <td class="py-1 ps-4 whitespace-nowrap">TZS {item.price}</td>

            <td class="py-1 ps-4 text-center">
              <div class="flex justify-center gap-2">
                <button
                  on:click={() =>
                    editMenuItem({ ...item, category: item.category })}
                  type="button"
                  class="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors cursor-pointer"
                  aria-label="Edit"
                >
                  <Pencil size={12} />
                </button>

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

  <div class="flex justify-end">
    <div class="flex gap-x-4 items-center mt-4 px-4">
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

  <MenuItemModalForm bind:show={showModal} bind:item bind:categories />
</div>
