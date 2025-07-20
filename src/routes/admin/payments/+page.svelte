<script lang="ts">
  import { formatRelativeDate } from "$lib/utils/formatter";
  import { statusBadgeClassForPayment } from "$lib/utils/payment-status";

  export let data: { payments: Payment[]; title: string };

  const { payments } = data;

  let search = "";
  let filteredItems: any[] = payments;

  function applyFilters() {
    const searchTerm = search.trim().toLowerCase();

    filteredItems = payments.filter((item) => {
      const transactionId = item.transactionId.toLowerCase();
      const orderNumber = item.order.orderNumber.toLowerCase();

      return (
        transactionId.includes(searchTerm) || orderNumber.includes(searchTerm)
      );
    });
  }

  let currentPage = 1;
  const itemsPerPage = 10;

  $: totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  $: if (currentPage > totalPages) currentPage = totalPages || 1;
  $: paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function goToPage(page: number) {
    if (page >= 1 && page <= totalPages) currentPage = page;
  }
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<div class="p-4">
  <div class="flex justify-between items-center mb-4"></div>

  <!-- Filters -->
  <div class="flex flex-wrap justify-between gap-6 items-end mb-6">
    <!-- Search Field -->
    <div class="flex flex-col">
      <label
        for="search"
        class="text-sm font-medium text-gray-700 mb-1 hidden"
        aria-label="search">Search</label
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

  <!-- Payments Table -->
  <div class="min-h-[300px]">
    <table class="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
      <thead class="bg-gray-50 text-left text-sm text-gray-700">
        <tr class="text-sm">
          <th class="px-4 py-3 text-start">#</th>
          <th class="px-4 py-3 text-start">Transaction ID</th>
          <th class="px-4 py-3 text-start">Order</th>
          <th class="px-4 py-3 text-start">Method</th>
          <th
            class="px-4 py-3 text-green-700 cursor-pointer hover:text-blue-600"
          >
            Amount (TZS)
          </th>
          <th class="px-4 py-3">Status</th>
          <th class="px-4 py-3 cursor-pointer hover:text-blue-600">
            Paid At
          </th>
        </tr>
      </thead>
      <tbody>
        {#each paginatedItems as payment, i}
          <tr class="hover:bg-gray-50 text-sm">
            <td class="px-4 py-2">{i + 1}</td>
            <td class="px-4 py-2" title={payment.transactionId}>
              <a
                href={`/admin/payments/${payment._id}`}
                class="hover:underline transition"
              >
                {payment.transactionId}
              </a>
            </td>
            <td class="px-4 py-2">
              <a
                href={`/admin/orders/${payment.order._id}`}
                class="text-blue-600 hover:underline"
              >
                {payment.order.orderNumber}
              </a>
            </td>
            <td class="px-4 py-2 capitalize text-gray-700">
              {payment.paymentMethod}
            </td>
            <td class="px-4 py-2">
              {payment.amount.toFixed(2)}
            </td>
            <td class="px-4 py-2">
              <span
                class={`px-2 py-1 rounded text-xs font-medium ${statusBadgeClassForPayment(payment.status)}`}
              >
                {payment.status.replace(/_/g, " ")}
              </span>
            </td>
            <td class="px-4 py-2 text-gray-500">
              {payment.paidAt ? formatRelativeDate(payment.paidAt) : "—"}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <!-- Paginator -->
  <div class="flex justify-end">
    <div class="flex gap-x-4 items-center mt-5 px-4">
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
</div>
