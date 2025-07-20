<script lang="ts">
  import {
    OrderStatusEnum,
    PaymentStatusEnum,
  } from "$lib/constants/order-status";
  import { PaymentMethodEnum } from "$lib/constants/payment-enums";
  import { formatDate, formatRelativeDate } from "$lib/utils/formatter";
  import { statusBadgeClassForPayment } from "$lib/utils/payment-status";

  export let data: { payment: Payment };

  const { payment } = data;
</script>

<svelte:head>
  <title>Payment Details - {payment.transactionId}</title>
</svelte:head>

<div class="max-w-4xl mx-auto px-4 py-8">
  <div class="mb-6">
    <a href="/admin/payments" class="text-blue-600 hover:underline text-sm">
      ← Back to Payments
    </a>
  </div>

  <div class="space-y-6">
    <div class="text-sm text-gray-700 bg-white rounded-xl shadow-md p-6">
      <h2 class="text-xl font-semibold text-gray-800 mb-6">
        Payment: {payment.transactionId}
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <div class="font-medium text-gray-400 mb-1">Order</div>
          <a
            href={`/admin/orders/${payment.order._id}`}
            class="text-blue-600 hover:underline"
          >
            {payment.order.orderNumber}
          </a>
        </div>

        <div>
          <div class="font-medium text-gray-400 mb-1">Payer Name</div>
          <div class="capitalize">
            {payment.order.user.profile.fullName}
          </div>
        </div>

        <div>
          <div class="font-medium text-gray-400 mb-1">Amount</div>
          <div class="text-green-600 font-semibold">
            TZS {payment.amount.toFixed(2)}
          </div>
        </div>

        <div>
          <div class="font-medium text-gray-400 mb-1">Payment Method</div>
          <div class="capitalize">
            {payment.paymentMethod}
          </div>
        </div>

        {#if payment.paymentMethod === PaymentMethodEnum.MOBILE_MONEY}
          <div>
            <div class="font-medium text-gray-400 mb-1">Payment Provider</div>
            <div class="capitalize">
              {payment.provider}
            </div>
          </div>

          <div>
            <div class="font-medium text-gray-400 mb-1">account Number</div>
            <div class="capitalize">
              {payment.accountNumber}
            </div>
          </div>
        {/if}

        <div>
          <div class="font-medium text-gray-400 mb-1">Status</div>
          <span
            class={`px-2 py-1 text-xs font-medium rounded-full ${statusBadgeClassForPayment(payment.status)}`}
          >
            {payment.status.replace(/_/g, " ")}
          </span>
        </div>

        <div>
          <div class="font-medium text-gray-400 mb-1">Paid At</div>
          <div>{payment.paidAt ? formatRelativeDate(payment.paidAt) : "—"}</div>
        </div>
      </div>
    </div>

    <!-- Payment Log -->
    {#if payment.logs.length}
      <div class="mt-6 bg-white rounded-xl shadow-md p-6">
        <h3 class="text-sm font-semibold text-gray-700 mb-2">Payment Logs</h3>
        <ul class="text-xs text-gray-600 space-y-1">
          {#each payment.logs as log}
            <li>
              <span class="font-medium text-gray-800"
                >{formatDate(log.timestamp)}:</span
              >
              {log.message}
              <span
                class={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${payment.status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
              >
                {log.status.replace(/_/g, " ")}
              </span>
            </li>
          {/each}
        </ul>
      </div>
    {/if}

    <!-- Actions -->
    <div class="mt-6 border-t py-4 space-y-4">
      <h3 class="text-sm font-semibold text-gray-700 mb-2.5">Quick Actions</h3>

      {#if payment.order.status === OrderStatusEnum.PENDING && payment.paymentMethod === "cash" && payment.status === PaymentStatusEnum.PENDING_CONFIRMATION}
        <form action={`?/manualPaymentConfirm`} method="post" class="">
          <input
            type="text"
            name="orderId"
            class="hidden"
            bind:value={payment.order._id}
          />
          <button type="submit" class="btn-primary">Confirm Payment</button>
        </form>
      {/if}
    </div>
  </div>
</div>
