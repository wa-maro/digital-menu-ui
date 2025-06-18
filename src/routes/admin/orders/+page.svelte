<script lang="ts">
  import OrdersTable from "$lib/components/admin/orders/OrdersTable.svelte";
  import Paginator from "$lib/components/Paginator.svelte";
  import SearchInput from "$lib/components/SearchInput.svelte";

  export let data: {
    orders: Order[];
    page: number;
    limit: number;
    search: string;
    sortBy: string;
    order: string;
  };

  const { orders, page, limit, search, sortBy, order } = data;
</script>

<div class="p-4">
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold text-[#044974]">Orders</h1>
  </div>

  <SearchInput {limit} {search} {sortBy} {order} />

  <OrdersTable {orders} {limit} {search} {sortBy} {order} {page} />

  <Paginator total={orders.length} {page} {limit} {search} {sortBy} {order} />
</div>
