<script lang="ts">
  import { goto } from "$app/navigation";
  import { initialCart } from "$lib/storage/cart.storage";
  import { cartStore, cartTotal } from "$lib/stores/cart.store";
  import { activeReorder, orderStore } from "$lib/stores/orders.store";

  let items = $activeReorder?.items ?? $cartStore.items;
  let total = $activeReorder?.total ?? $cartTotal;
  let orderType = $activeReorder?.type ?? "dine-in";
  let paymentMethod = $activeReorder?.paymentMethod ?? "";
  let status = $activeReorder?.status ?? "pending";
  let selectedNetwork =
    $activeReorder?.paymentDetails?.selectedNetwork ?? undefined;
  let phoneNumber = $activeReorder?.paymentDetails?.phoneNumber ?? "";
  let tableNumber = $activeReorder?.paymentDetails?.tableNumber ?? "";
  let pickupTime = $activeReorder?.paymentDetails?.pickupTime ?? "";
  let deliveryAddress = $activeReorder?.paymentDetails?.deliveryAddress ?? "";

  function confirmOrder() {
    const order: Order = {
      _id: "",
      items: items,
      total: total,
      type: orderType,
      status: status,
      paymentMethod: paymentMethod,
      paymentDetails: {
        tableNumber: tableNumber,
        pickupTime: pickupTime,
        deliveryAddress: deliveryAddress,
        phoneNumber: paymentMethod === "lipa_namba" ? phoneNumber : undefined,
        selectedNetwork:
          paymentMethod === "lipa_namba" ? selectedNetwork : undefined,
      },
    };

    // Send order to backend via form action (to be implemented)
    orderStore.addOrder(order);

    cartStore.set(initialCart);

    goto("/orders/order-success");
  }
</script>

<section class="p-4 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-7 gap-6">
  <!-- Cart Summary -->
  <div class="lg:col-span-4 bg-white rounded-2xl shadow p-6 space-y-6">
    <h2 class="text-2xl font-bold border-b pb-3 drop-shadow-sm">
      Cart Summary
    </h2>
    <div class="space-y-4">
      {#each items as i}
        <!-- {const details as item.i} -->
        <div class="flex justify-between items-center text-gray-700">
          <span class="truncate">{i.item.name} x {i.quantity}</span>
          <span class="font-medium">Tsh {i.price * i.quantity}</span>
        </div>
      {/each}
    </div>
    <div class="flex justify-between text-xl font-bold pt-6 border-t">
      <span>Total</span>
      <span>Tsh {total.toFixed(2)}</span>
    </div>
  </div>

  <!-- Order Section -->
  <div class="lg:col-span-3 space-y-8">
    <!-- Order Type -->
    <div class="bg-white rounded-2xl shadow p-6 space-y-5">
      <h2 class="text-2xl font-bold border-b pb-4 text-gray-800">Order Type</h2>
      <div class="grid grid-cols-3 gap-4">
        {#each ["dine-in", "takeaway", "delivery"] as type}
          <label class="cursor-pointer group">
            <input
              type="radio"
              class="peer hidden"
              bind:group={orderType}
              value={type}
            />
            <div
              class="py-4 rounded-xl border text-center font-medium capitalize
            transition-all duration-300
            peer-checked:bg-blue-600 peer-checked:text-white
            peer-checked:border-blue-600
            group-hover:bg-blue-50 group-hover:border-blue-300"
            >
              {type}
            </div>
          </label>
        {/each}
      </div>
    </div>

    <!-- Dynamic Order Details -->
    {#if orderType}
      <div class="bg-white rounded-2xl shadow p-6 space-y-5">
        <h2 class="text-2xl font-bold border-b pb-4 text-gray-800">
          Order Details
        </h2>

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
              class="input w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              class="input w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              class="input w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        {/if}
      </div>
    {/if}

    <!-- Payment Method -->
    <div class="bg-white rounded-2xl shadow p-6 space-y-5">
      <h2 class="text-2xl font-bold border-b pb-4 text-gray-800">
        Payment Method
      </h2>
      <div class="grid grid-cols-2 gap-4">
        {#each ["cash", "lipa_namba"] as method}
          <label class="cursor-pointer group">
            <input
              type="radio"
              class="peer hidden"
              bind:group={paymentMethod}
              value={method}
            />
            <div
              class="py-4 rounded-xl border text-center font-medium transition-all duration-300
            peer-checked:bg-green-600 peer-checked:text-white
            peer-checked:border-green-600
            group-hover:bg-green-50 group-hover:border-green-300"
            >
              {method === "lipa_namba" ? "Lipa Namba" : method.toUpperCase()}
            </div>
          </label>
        {/each}
      </div>

      {#if paymentMethod === "lipa_namba"}
        <div class="mt-6 space-y-4">
          <div class="space-y-2">
            <label for="mtandao" class="block text-gray-700 font-medium"
              >Select Mtandao</label
            >
            <select
              name="mtandao"
              bind:value={selectedNetwork}
              required
              class="input w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="" disabled selected>Select Mtandao</option>
              <option value="MPESA">MPESA</option>
              <option value="Tigopesa">Tigopesa</option>
              <option value="AirtelMoney">Airtel Money</option>
            </select>
          </div>

          <div class="space-y-2">
            <label for="phoneNumber" class="block text-gray-700 font-medium"
              >Phone Number</label
            >
            <input
              name="phoneNumber"
              type="tel"
              bind:value={phoneNumber}
              required
              placeholder="Enter phone number (e.g. 07XXXXXXXX)"
              class="input w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              pattern="0[67][0-9]{6}"
            />
          </div>
        </div>
      {/if}
    </div>

    <!-- Confirm Button -->
    <button
      on:click={confirmOrder}
      class="w-full bg-blue-600 text-white py-3 rounded-2xl text-lg font-semibold hover:bg-blue-700 active:scale-95 transition transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      disabled={!orderType ||
        !paymentMethod ||
        (paymentMethod === "lipa_namba" && (!selectedNetwork || !phoneNumber))}
    >
      Confirm Order
    </button>
  </div>
</section>
