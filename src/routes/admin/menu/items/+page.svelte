<script lang="ts">
  import { Pencil, Plus, Trash } from "lucide-svelte";
  import MenuItemModalForm from "$lib/components/MenuItemModalForm.svelte";
  import { fail } from "@sveltejs/kit";
  import { onMount } from "svelte";

  export let data: LoadResult<MenuItem>;
  let items: MenuItem[] = data.data;

  let showModal = false;

  const openModal = () => {
    showModal = true;
  };

  $: item = {
    _id: "",
    name: "",
    description: "",
    imageUrl: "",
    available: true,
    category: {
      _id: "",
      name: "",
      description: "",
    },
    price: 0.0,
  };
  $: categories = [{ _id: "", name: "" }];

  const getCategories = async () => {
    const token = data.user.token;
    try {
      const res = await fetch("http://localhost:3000/menu/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const error = res.text();
        return fail(400, { error: error || "Request Failed" });
      }

      const data: Category[] = await res.json();

      categories = data.map((c: Category) => {
        return {
          _id: c._id,
          name: c.name,
        };
      });
    } catch (error) {}
  };

  onMount(async () => {
    await getCategories();
  });
</script>

<div class="p-4">
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold text-[#044974]">Menu Items</h1>
    <button
      on:click={openModal}
      class="bg-[#044974] text-white px-4 py-2 rounded cursor-pointer flex items-center gap-2"
    >
      <Plus size={16} />
      Add Item
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
            class="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
            aria-label="Edit item"
          >
            <Pencil size={16} />
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
      </div>
    {/each}
  </div>

  <MenuItemModalForm bind:show={showModal} bind:item bind:categories />
</div>
