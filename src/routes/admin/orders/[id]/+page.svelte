<script lang="ts">
  import {
    OrderStatusEnum,
    PaymentStatusEnum,
  } from "$lib/constants/order-status";
  import { formatDate, maskPhone } from "$lib/utils/formatter.js";

  export let data: { order: any };

  const { order } = data;

  function saveStatuses(_id: any, status: any, paymentStatus: any): any {
    console.log("Saving statuses", { _id, status, paymentStatus });
  }

  function updateOrderStatus(_id: any, status: string): any {
    console.log("Updating order status", { _id, status });
  }

  function updatePaymentStatus(_id: any, status: string): any {
    console.log("Updating payment status", { _id, status });
  }

  function statusBadgeClass(status: OrderStatus) {
    const map: Record<OrderStatus, string> = {
      pending: "bg-yellow-100 text-yellow-800",
      confirmed: "bg-blue-100 text-blue-800",
      preparing: "bg-purple-100 text-purple-800",
      ready: "bg-indigo-100 text-indigo-800",
      out_for_delivery: "bg-orange-100 text-orange-800",
      delivered: "bg-green-100 text-green-800",
      picked: "bg-green-100 text-green-800",
      completed: "bg-teal-100 text-teal-800",
      cancel_request: "bg-red-100 text-red-800",
      cancelled: "bg-red-100 text-red-800",
      rejected_cancel_request: "bg-gray-100 text-gray-700",
      failed: "bg-gray-100 text-gray-700",
    };
    return map[status] || "bg-gray-100 text-gray-700";
  }
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
        <p class="font-mono text-sm font-medium break-all">{order._id}</p>
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
        <p class="text-sm font-medium capitalize">{order.paymentMethod}</p>
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

      <div class="space-y-1">
        <p class="text-xs text-gray-500">Payment Status</p>
        <span
          class={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${order.paymentStatus === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
        >
          {order.paymentStatus.replace(/_/g, " ")}
        </span>
      </div>

      {#if order.paymentDetails?.pickupTime}
        <div class="space-y-1">
          <p class="text-xs text-gray-500">Pickup Time</p>
          <p class="text-sm font-medium">{order.paymentDetails.pickupTime}</p>
        </div>
      {/if}

      {#if order.paymentDetails?.deliveryLocation?.address}
        <div class="space-y-1 md:col-span-2">
          <p class="text-xs text-gray-500">Delivery Address</p>
          <p class="text-sm font-medium">
            {order.paymentDetails.deliveryLocation.address}
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
              <th class="px-4 py-2 text-right">Price</th>
              <th class="px-4 py-2 text-right">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {#each order.items as item, i}
              <tr class={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td class="px-4 py-2">{item.item?.name ?? "Unknown Item"}</td>
                <td class="px-4 py-2 text-center">{item.quantity}</td>
                <td class="px-4 py-2 text-right">TZS {item.price.toFixed(2)}</td
                >
                <td class="px-4 py-2 text-right"
                  >TZS {(item.quantity * item.price).toFixed(2)}</td
                >
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Payment Log -->
    {#if order.paymentLog?.length}
      <div class="mt-6">
        <h3 class="text-sm font-semibold text-gray-700 mb-2">Payment Log</h3>
        <ul class="text-xs text-gray-600 space-y-1">
          {#each order.paymentLog as log}
            <li>
              <span class="font-medium text-gray-800"
                >{formatDate(log.timestamp)}:</span
              >
              {log.message} ({log.status})
            </li>
          {/each}
        </ul>
      </div>
    {/if}

    <!-- Actions -->
    <div class="mt-6 border-t pt-4 space-y-4">
      <h3 class="text-sm font-semibold text-gray-700 mb-2">Quick Actions</h3>

      <div class="flex flex-wrap gap-3">
        {#if order.status === "pending"}
          <button
            class="btn-primary"
            on:click={() => updateOrderStatus(order._id, "confirmed")}
            >Accept Order</button
          >
        {/if}

        {#if order.status === "confirmed"}
          <button
            class="btn-primary"
            on:click={() => updateOrderStatus(order._id, "preparing")}
            >Start Preparing</button
          >
        {/if}

        {#if order.status === "preparing"}
          <button
            class="btn-primary"
            on:click={() => updateOrderStatus(order._id, "ready")}
            >Mark as Ready</button
          >
        {/if}

        {#if order.type === "takeaway" && order.status === "ready"}
          <button
            class="btn-primary"
            on:click={() => updateOrderStatus(order._id, "picked")}
            >Mark as Picked</button
          >
        {/if}

        {#if order.type === "delivery" && order.status === "ready"}
          <button
            class="btn-primary"
            on:click={() => updateOrderStatus(order._id, "out_for_delivery")}
            >Out for Delivery</button
          >
        {/if}

        {#if order.status === "out_for_delivery"}
          <button
            class="btn-primary"
            on:click={() => updateOrderStatus(order._id, "delivered")}
            >Mark as Delivered</button
          >
        {/if}

        {#if ["delivered", "picked"].includes(order.status)}
          <button
            class="btn-primary"
            on:click={() => {
              updateOrderStatus(order._id, "completed");
              updatePaymentStatus(order._id, "paid");
            }}>Mark as Completed</button
          >
        {/if}

        <button
          class="btn-secondary"
          on:click={() => updateOrderStatus(order._id, "cancelled")}
          >Cancel Order</button
        >

        <button
          class="btn-secondary"
          on:click={() => updatePaymentStatus(order._id, "cancelled")}
          >Refund</button
        >
      </div>

      <!-- Manual Status Update -->
      <div class="mt-4 flex flex-col md:flex-row gap-4">
        <div>
          <label for="status" class="block text-xs text-gray-500 mb-1"
            >Order Status</label
          >
          <select
            name="status"
            class="border rounded px-3 py-2 text-sm w-48"
            bind:value={order.status}
          >
            {#each Object.values(OrderStatusEnum) as status}
              <option value={status}>{status.replace(/_/g, " ")}</option>
            {/each}
          </select>
        </div>

        <div>
          <label for="paymentStatus" class="block text-xs text-gray-500 mb-1"
            >Payment Status</label
          >
          <select
            name="paymentStatus"
            class="border rounded px-3 py-2 text-sm w-48"
            bind:value={order.paymentStatus}
          >
            {#each Object.values(PaymentStatusEnum) as pStatus}
              <option value={pStatus}>{pStatus.replace(/_/g, " ")}</option>
            {/each}
          </select>
        </div>

        <button
          class="btn-primary mt-3 md:mt-5"
          on:click={() =>
            saveStatuses(order._id, order.status, order.paymentStatus)}
        >
          Save Statuses
        </button>
      </div>
    </div>
  </article>
</section>
