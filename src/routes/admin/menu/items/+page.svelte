<script lang="ts">
  import { goto } from "$app/navigation";
  import { Pencil, Plus, Trash } from "lucide-svelte";
  export let data: LoadResult<MenuItem>;

  function deleteItem(_id: string) {}

  let items: MenuItem[] = data.data;
</script>

<div class="p-4">
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold text-[#044974]">Menu Items</h1>
    <button
      on:click={() => goto("/menu/items/form/new")}
      class="flex items-center gap-2 bg-[#044974] text-white px-4 py-2 rounded hover:opacity-90"
    >
      <Plus size={16} /> Add Item
    </button>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {#each items as item}
      <div
        class="flex items-center gap-4 bg-white shadow-md rounded-xl p-4 transition hover:shadow-lg"
      >
        <div
          class="w-16 h-16 rounded overflow-hidden bg-gray-100 flex items-center justify-center"
        >
          {#if item.imageUrl}
            <img
              src={item.imageUrl}
              alt={item.name}
              class="w-full h-full object-cover"
            />
          {:else}
            <span class="text-gray-400 text-xs text-center px-2">No Image</span>
          {/if}
        </div>

        <div class="flex-1">
          <div class="flex justify-between items-start">
            <h2 class="text-base font-medium text-gray-800 leading-snug">
              {item.name}
            </h2>
            <span class="text-sm text-gray-600 whitespace-nowrap"
              >${item.price}</span
            >
          </div>
          <p class="text-sm text-gray-500">{item.category.name}</p>
        </div>

        <div class="flex gap-2 items-center ml-2">
          <button
            on:click={() => goto(`/menu/items/${item._id}`)}
            class="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
            aria-label="Edit item"
          >
            <Pencil size={16} />
          </button>
          <button
            on:click={() => deleteItem(item._id)}
            class="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
            aria-label="Delete item"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    {/each}
  </div>
</div>
