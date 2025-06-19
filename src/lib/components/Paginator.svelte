<script lang="ts">
  import { buildQuery } from "$lib/utils/query-builder";

  export let total: number;
  export let limit: number;
  export let page: number;
  export let search: string;
  export let sortBy: string;
  export let order: string;

  const totalPages = Math.ceil(total / limit);
</script>

<div class="flex justify-center mt-4 space-x-2">
  {#each Array(totalPages) as _, i}
    <button
      class={`px-3 py-1 rounded-lg border text-sm font-medium transition-colors duration-200 cursor-pointer
        ${
          page === i + 1
            ? "bg-amber-600 text-white border-amber-600 hover:bg-amber-700"
            : "bg-white text-gray-700 border-gray-300 hover:bg-amber-100"
        }`}
      on:click={() =>
        (location.href = buildQuery({
          search,
          sortBy,
          order,
          page: i + 1,
          limit,
        }))}
    >
      {i + 1}
    </button>
  {/each}
</div>
