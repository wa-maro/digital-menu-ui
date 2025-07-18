<script lang="ts">
  import CancelRequestActions from "$lib/components/admin/orders/CancelRequestActions.svelte";
  import StatusUpdateActionButton from "$lib/components/admin/orders/StatusUpdateActionButton.svelte";
  import {
    OrderStatusEnum,
    PaymentStatusEnum,
  } from "$lib/constants/order-status";
  import { formatDate } from "$lib/utils/formatter.js";
  import { statusBadgeClass } from "$lib/utils/order-status";

  export let data: { order: any };

  const { order } = data;
</script>

<section class="p-6 max-w-5xl mx-auto space-y-6">
  <!-- Back Button -->
  <div>
    <a
      href="/admin/orders"
      class="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Back to Orders
    </a>
  </div>

  <article
    class="bg-white rounded-2xl shadow p-6 border border-gray-200 hover:shadow-md transition-shadow"
  >
    <!-- Order Info Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
      <div class="space-y-1">
        <p class="text-xs text-gray-500">Order ID</p>
        <p class="font-mono text-sm font-medium break-all">
          {order.orderNumber}
        </p>
      </div>

      <div class="space-y-1">
        <p class="text-xs text-gray-500">Order Type</p>
        <p class="text-sm font-medium capitalize">{order.type}</p>
      </div>

      <div class="space-y-1">
        <p class="text-xs text-gray-500">Customer</p>
        <p class="text-sm font-medium">
          {order.user.fullName}
          (<a href={`mailto:${order.user.email}`} class="underline text-sky-600"
            >{order.user.email}</a
          >)
        </p>
      </div>

      <div class="space-y-1">
        <p class="text-xs text-gray-500">Payment Method</p>
        <p class="text-sm font-medium capitalize">
          {order.payments[0].paymentMethod}
        </p>
      </div>

      <div class="space-y-1">
        <p class="text-xs text-gray-500">Created At</p>
        <p class="text-sm font-medium">{formatDate(order.createdAt)}</p>
      </div>

      <div class="space-y-1">
        <p class="text-xs text-gray-500">Total</p>
        <p class="text-sm font-medium">TZS {order.total.toFixed(2)}</p>
      </div>

      <div class="space-y-1">
        <p class="text-xs text-gray-500">Order Status</p>
        <span
          class={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${statusBadgeClass(order.status)}`}
        >
          {order.status.replace(/_/g, " ")}
        </span>
      </div>

      {#if order.pickupTime}
        <div class="space-y-1">
          <p class="text-xs text-gray-500">Pickup Time</p>
          <p class="text-sm font-medium">{order.pickupTime}</p>
        </div>
      {/if}

      {#if order.deliveryLocation?.address}
        <div class="space-y-1 md:col-span-2">
          <p class="text-xs text-gray-500">Delivery Address</p>
          <p class="text-sm font-medium">
            {order.deliveryLocation.address}
          </p>
        </div>
      {/if}
    </div>

    <!-- Order Items -->
    <div class="mt-6">
      <h3 class="text-sm font-semibold text-gray-700 mb-2">Order Items</h3>
      <div class="overflow-x-auto rounded-lg border border-gray-200">
        <table class="min-w-full text-sm text-gray-700">
          <thead
            class="bg-gray-50 text-xs font-semibold uppercase text-gray-500"
          >
            <tr>
              <th class="px-4 py-2 text-left">Item</th>
              <th class="px-4 py-2 text-center">Qty</th>
              <th class="px-4 py-2 text-right">Price (TZS)</th>
              <th class="px-4 py-2 text-right">Subtotal (TZS)</th>
            </tr>
          </thead>
          <tbody>
            {#each order.items as item, i}
              <tr class={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td class="px-4 py-2">{item.item?.name ?? "Unknown Item"}</td>
                <td class="px-4 py-2 text-center">{item.quantity}</td>
                <td class="px-4 py-2 text-right">{item.price.toFixed(2)}</td>
                <td class="px-4 py-2 text-right"
                  >{(item.quantity * item.price).toFixed(2)}</td
                >
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Payment Log -->
    {#if order.payments[0].logs.length}
      <div class="mt-6">
        <h3 class="text-sm font-semibold text-gray-700 mb-2">Payment Logs</h3>
        <ul class="text-xs text-gray-600 space-y-1">
          {#each order.payments[0].logs as log}
            <li>
              <span class="font-medium text-gray-800"
                >{formatDate(log.timestamp)}:</span
              >
              {log.message}
              <span
                class={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${order.payments[0].status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
              >
                {log.status.replace(/_/g, " ")}
              </span>
            </li>
          {/each}
        </ul>
      </div>
    {/if}

    <!-- Actions -->
    <div class="mt-6 border-t pt-4 space-y-4">
      <h3 class="text-sm font-semibold text-gray-700 mb-2.5">Quick Actions</h3>

      <div class="flex flex-wrap gap-3">
        {#if order.payments[0].status === PaymentStatusEnum.PAID}
          <StatusUpdateActionButton {order} />
        {/if}

        {#if order.status === OrderStatusEnum.CANCEL_REQUEST}
          <CancelRequestActions />
        {/if}

        {#if order.status === OrderStatusEnum.PENDING && order.payments[0].paymentMethod === "cash" && order.payments[0].status === PaymentStatusEnum.PENDING_CONFIRMATION}
          <form
            action="?/manualPaymentConfirm"
            method="post"
            class="flex items-center border border-gray-100 rounded-md shadow-md overflow-hidden"
          >
            <button
              type="submit"
              class="px-3 py-2 border-none text-sm bg-blue-700 text-white"
              >Confirm Payment</button
            >
          </form>
        {/if}

        {#if order.payments[0].paymentMethod === "cash" && order.payments[0].status === PaymentStatusEnum.MANUAL_REVIEW}
          <button type="button" class="btn-secondary">Review</button>
        {/if}
      </div>
    </div>
  </article>
</section>
