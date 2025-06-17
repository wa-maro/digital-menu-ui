<script lang="ts">
  import { goto } from "$app/navigation";
  import { orderStore, reorder } from "$lib/stores/orders.store";
  import { cartStore } from "$lib/stores/cart.store";
  import { formatDate } from "$lib/utils/formatter";

  export let data: { data: Order[]; user: User };

  if (data.data) orderStore.set(data.data);

  function reorderNow(order: Order) {
    reorder(order);
    goto("/orders/checkout");
  }

  function loadToCart(order: Order) {
    cartStore.setItems(order.items);
    goto("/cart");
  }
</script>

<section class="p-6 max-w-4xl mx-auto">
  <h1 class="text-3xl font-extrabold mb-8 text-gray-900 drop-shadow-sm">
    My Orders
  </h1>

  {#if $orderStore.length > 0}
    <div class="space-y-5">
      {#each $orderStore as order, i (i)}
        <!-- TODO: use order._id  instead -->
        <article
          class="bg-white rounded-2xl shadow p-5 border border-gray-200 hover:shadow-lg transition-shadow"
          aria-label={`Order ${order._id}`}
        >
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-6 text-gray-700"
          >
            <div class="space-y-1">
              <p class="text-xs text-gray-500">Order ID</p>
              <p
                class="font-mono font-semibold text-gray-900 break-all text-sm"
              >
                {order._id}
              </p>
            </div>

            <div class="space-y-1">
              <p class="text-xs text-gray-500">Order Type</p>
              <p class="font-medium text-sm capitalize">{order.type}</p>
            </div>

            <div class="space-y-1">
              <p class="text-xs text-gray-500">Payment Method</p>
              <p class="font-medium text-sm capitalize">
                {order.paymentMethod}
              </p>
            </div>

            <div class="space-y-1">
              <p class="text-xs text-gray-500">Total</p>
              <p class="font-medium text-sm">TZS {order.total.toFixed(2)}</p>
            </div>

            <div class="space-y-1">
              <p class="text-xs text-gray-500">Status</p>
              <p>
                <span
                  class={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold tracking-wide ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : order.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : order.status === "cancelled"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
              </p>
            </div>

            <div class="space-y-1">
              <p class="text-xs text-gray-500">Date</p>
              <p class="font-medium text-sm">{formatDate(order.createdAt)}</p>
            </div>

            {#if order.paymentDetails?.tableNumber}
              <div class="space-y-1">
                <p class="text-xs text-gray-500">Table Number</p>
                <p class="font-medium text-sm">
                  {order.paymentDetails.tableNumber}
                </p>
              </div>
            {/if}

            {#if order.paymentDetails?.pickupTime}
              <div class="space-y-1">
                <p class="text-xs text-gray-500">Pickup Time</p>
                <p class="font-medium text-sm">
                  {order.paymentDetails.pickupTime}
                </p>
              </div>
            {/if}

            {#if order.paymentDetails?.deliveryAddress}
              <div class="space-y-1 md:col-span-2">
                <p class="text-xs text-gray-500">Delivery Address</p>
                <p class="font-medium text-sm">
                  {order.paymentDetails.deliveryAddress}
                </p>
              </div>
            {/if}

            {#if order.paymentDetails?.phoneNumber}
              <div class="space-y-1">
                <p class="text-xs text-gray-500">Phone</p>
                <p class="font-medium text-sm">
                  {order.paymentDetails.phoneNumber}
                </p>
              </div>
            {/if}

            {#if order.paymentDetails?.selectedNetwork}
              <div class="space-y-1">
                <p class="text-xs text-gray-500">Network</p>
                <p class="font-medium text-sm">
                  {order.paymentDetails.selectedNetwork}
                </p>
              </div>
            {/if}
          </div>

          <div class="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              class="flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300 transition"
              on:click={() => alert(`Viewing details for order ${order._id}`)}
              aria-label={`View details of order ${order._id}`}
            >
              <!-- View Details Icon -->
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
                  d="M15 12H9m6 0a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
              View Details
            </button>

            <button
              type="button"
              class="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition"
              on:click={() => reorderNow(order)}
              aria-label={`Reorder order ${order._id} now`}
            >
              <!-- Reorder Now Icon -->
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
                  d="M4 4v6h6M20 20v-6h-6M4 14l16-4"
                />
              </svg>
              Reorder Now
            </button>

            <button
              type="button"
              class="flex items-center gap-1.5 px-4 py-2 text-xs font-medium border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-300 transition"
              on:click={() => loadToCart(order)}
              aria-label={`Load order ${order._id} to cart`}
            >
              <!-- Load to Cart Icon -->
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 7M7 13l-2 4h12"
                />
              </svg>
              Load to Cart
            </button>
          </div>
        </article>
      {/each}
    </div>
  {:else}
    <p class="text-center text-gray-500 text-lg mt-20">
      You have no orders yet.
    </p>
  {/if}
</section>
