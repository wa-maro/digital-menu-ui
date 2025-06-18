<script lang="ts">
  import { buildQuery } from "$lib/utils/query-builder";

  export let limit: number;
  export let search: string;
  export let sortBy: string;
  export let order: string;
</script>

<div class="flex justify-between items-center mb-4">
  <input
    type="text"
    placeholder="Search by User ID or Item Name"
    class="w-1/3 px-4 py-2 border border-amber-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
    value={search}
    on:input={(e) =>
      (location.href = buildQuery({
        search: (e.target as HTMLInputElement).value,
        page: 1,
        sortBy,
        order,
        limit,
      }))}
  />
</div>
