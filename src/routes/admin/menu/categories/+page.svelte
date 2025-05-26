<script lang="ts">
  import { Pencil, Trash } from "lucide-svelte";
  import type { LoadResult } from "./+page.server";
  import CategoryModal from "$lib/components/CategoryModal.svelte";

  export let data: LoadResult;
  let categories: Category[] = data.data;

  let showModal = false;

  const openModal = () => {
    showModal = !showModal;
  };
</script>

<div class="p-4">
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold text-[#044974]">Categories</h1>
    <button
      on:click={openModal}
      class="bg-[#044974] text-white px-4 py-2 rounded cursor-pointer"
    >
      Add Category
    </button>
  </div>

  <div class="grid gap-3">
    {#each categories as category}
      <div
        class="bg-white shadow rounded p-4 flex justify-between items-center"
      >
        <div>
          <h2 class="font-semibold">{category.name}</h2>
          <p class="text-sm text-gray-500">{category.description}</p>
        </div>
        <div class="flex gap-2">
          <button
            type="submit"
            class="p-2 rounded bg-blue-100 hover:bg-blue-200 text-blue-700 cursor-pointer"
          >
            <Pencil size={16} />
          </button>

          <form action="?/delete" method="post">
            <label for="_id"></label>
            <input type="text" name="_id" hidden bind:value={category._id} />
            <button
              type="submit"
              class="p-2 rounded bg-red-100 hover:bg-red-200 text-red-700 cursor-pointer"
            >
              <Trash size={16} />
            </button>
          </form>
        </div>
      </div>
    {/each}
  </div>

  <CategoryModal bind:show={showModal} />
</div>
