<script lang="ts">
  import { goto } from "$app/navigation";
  import { cartStore, cartTotal } from "$lib/stores/cart.store";
  import { orderStore } from "$lib/stores/orders.store";

  let orderType: OrderType = "dine-in";
  let paymentMethod: PaymentMethod;
  let status = "";

  // Dynamic fields
  let tableNumber = "";
  let pickupTime = "";
  let deliveryAddress = "";

  function confirmOrder() {
    const order: Order = {
      _id: "",
      total: $cartTotal,
      items: $cartStore,
      type: orderType,
      status: status,
      paymentMethod: paymentMethod,
      orderDetails: {
        tableNumber: tableNumber,
        pickupTime: pickupTime,
        deliveryAddress: deliveryAddress,
      },
    };

    // TODO: Send order to backend via form action (you will update this later)
    orderStore.addOrder(order);

    cartStore.set([]);

    goto("/orders/order-success");
  }
</script>

<section class="p-4 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-7 gap-6">
  <!-- Cart Summary -->
  <div class="lg:col-span-4 bg-white rounded-2xl shadow p-6 space-y-6">
    <h2 class="text-2xl font-bold border-b pb-3">Cart Summary</h2>
    <div class="space-y-4">
      {#each $cartStore as item}
        <div class="flex justify-between items-center text-gray-700">
          <span class="truncate">{item.name} x {item.quantity}</span>
          <span class="font-medium">Tsh {item.price * item.quantity}</span>
        </div>
      {/each}
    </div>
    <div class="flex justify-between text-xl font-bold pt-6 border-t">
      <span>Total</span>
      <span>Tsh {$cartTotal.toFixed(2)}</span>
    </div>
  </div>

  <!-- Order Section -->
  <div class="lg:col-span-3 space-y-6">
    <!-- Order Type -->
    <div class="bg-white rounded-2xl shadow p-6 space-y-4">
      <h2 class="text-2xl font-bold border-b pb-3">Order Type</h2>
      <div class="grid grid-cols-3 gap-3">
        {#each ["dine-in", "takeaway", "delivery"] as type}
          <label class="cursor-pointer group">
            <input
              type="radio"
              class="peer hidden"
              bind:group={orderType}
              value={type}
            />
            <div
              class="px-3 py-2 rounded-lg border text-center transition-all
              peer-checked:bg-blue-600 peer-checked:text-white
              group-hover:bg-blue-50"
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </div>
          </label>
        {/each}
      </div>
    </div>

    <!-- Dynamic Order Details -->
    <div
      class={`${!orderType ? "hidden" : ""} bg-white rounded-2xl shadow p-6 space-y-4`}
    >
      <h2 class="text-2xl font-bold border-b pb-3">Order Details</h2>

      {#if orderType === "dine-in"}
        <div class="space-y-2">
          <label for="tableNumber" class="block text-gray-700 font-medium"
            >Table Number</label
          >
          <input
            name="tableNumber"
            bind:value={tableNumber}
            required
            placeholder="Enter table number"
            class="input w-full border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      {:else if orderType === "takeaway"}
        <div class="space-y-2">
          <label for="pickupTime" class="block text-gray-700 font-medium"
            >Pickup Time</label
          >
          <input
            name="pickupTime"
            type="time"
            bind:value={pickupTime}
            required
            class="input w-full border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      {:else if orderType === "delivery"}
        <div class="space-y-2">
          <label for="deliveryAddress" class="block text-gray-700 font-medium"
            >Delivery Address</label
          >
          <input
            name="deliveryAddress"
            bind:value={deliveryAddress}
            required
            placeholder="Enter delivery address"
            class="input w-full border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      {/if}
    </div>

    <!-- Payment Method -->
    <div class="bg-white rounded-2xl shadow p-6 space-y-4">
      <h2 class="text-2xl font-bold border-b pb-3">Payment Method</h2>
      <div class="grid grid-cols-2 gap-3">
        {#each ["cash", "mpesa"] as method}
          <label class="cursor-pointer group">
            <input
              type="radio"
              class="peer hidden"
              bind:group={paymentMethod}
              value={method}
            />
            <div
              class="px-3 py-2 rounded-lg border text-center transition-all
              peer-checked:bg-green-600 peer-checked:text-white
              group-hover:bg-green-50"
            >
              {method.toUpperCase()}
            </div>
          </label>
        {/each}
      </div>
    </div>

    <!-- Confirm Button -->
    <button
      on:click={confirmOrder}
      class="w-full bg-blue-600 text-white py-2 rounded-2xl text-lg font-semibold hover:bg-blue-700 active:scale-95 transition disabled:opacity-50"
      disabled={!orderType}
    >
      Confirm Order
    </button>
  </div>
</section>
