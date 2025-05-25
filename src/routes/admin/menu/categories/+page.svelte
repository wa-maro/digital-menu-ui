<script lang="ts">
  import { goto } from "$app/navigation";
  import { Pencil, Plus, Trash } from "lucide-svelte";
  import type { LoadResult } from "./+page.server";

  export let data: LoadResult;
  let categories: Category[] = data.data;

  function deleteCategory(_id: string): any {}
</script>

<div class="p-4">
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold text-[#044974]">Categories</h1>
    <button
      on:click={() => goto("/menu/categories/form/new")}
      class="flex items-center gap-2 bg-[#044974] text-white px-4 py-2 rounded hover:opacity-90"
    >
      <Plus size={16} /> Add Category
    </button>
  </div>

  <div class="grid gap-4">
    {#each categories as category}
      <div
        class="bg-white shadow rounded p-4 flex justify-between items-center"
      >
        <div>
          <h2 class="text-lg font-semibold">{category.name}</h2>
          <p class="text-sm text-gray-500">{category.description}</p>
        </div>
        <div class="flex gap-2">
          <button
            on:click={() => goto(`/menu/categories/form/${category._id}`)}
            class="p-2 rounded bg-blue-100 hover:bg-blue-200 text-blue-700"
          >
            <Pencil size={16} />
          </button>
          <button
            on:click={() => deleteCategory(category._id)}
            class="p-2 rounded bg-red-100 hover:bg-red-200 text-red-700"
          >
            <Trash size={16} />
          </button>
        </div>
      </div>
    {/each}
  </div>
</div>
