<script lang="ts">
  import CartsTable from "$lib/components/CartsTable.svelte";
  import Paginator from "$lib/components/Paginator.svelte";
  import SearchInput from "$lib/components/SearchInput.svelte";

  export let data: {
    carts: UserCart[];
    page: number;
    limit: number;
    search: string;
    sortBy: string;
    order: string;
  };

  const { carts, page, limit, search, sortBy, order } = data;

  const buildQuery = (params: Record<string, string | number>) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => query.set(key, String(val)));
    return `?${query.toString()}`;
  };
</script>

<div class="p-4">
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold text-[#044974]">Carts</h1>
  </div>

  <SearchInput {limit} {search} {sortBy} {order} {buildQuery} />

  <CartsTable {carts} {page} {limit} {search} {sortBy} {order} {buildQuery} />

  <Paginator
    total={carts.length}
    {page}
    {limit}
    {search}
    {sortBy}
    {order}
    {buildQuery}
  />
</div>
