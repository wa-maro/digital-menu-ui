<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  import { cartStore, cartTotal } from "$lib/stores/cart.store";
  import { activeReorder } from "$lib/stores/orders.store";
  import { formatCurrency } from "$lib/utils/formatter";

  $: orderForm = {
    items: $activeReorder?.items ?? $cartStore.items,
    total: $activeReorder?.total ?? $cartTotal,
    type: $activeReorder?.type ?? "dine-in",
    paymentMethod: $activeReorder?.paymentMethod ?? "cash",
    status: $activeReorder?.status ?? "pending",
    paymentDetails: {
      selectedNetwork: $activeReorder?.paymentDetails?.selectedNetwork ?? null,
      phoneNumber: $activeReorder?.paymentDetails?.phoneNumber ?? "",
      tableNumber: $activeReorder?.paymentDetails?.tableNumber ?? "",
      contactPhone: $activeReorder?.paymentDetails?.contactPhone ?? "",
      pickupTime: $activeReorder?.paymentDetails?.pickupTime ?? "",
      deliveryAddress: $activeReorder?.paymentDetails?.deliveryAddress ?? "",
    },
  };

  $: isOrderTypeValid = ["dine-in", "takeaway", "delivery"].includes(
    orderForm.type
  );

  $: isPaymentValid =
    orderForm.paymentMethod === "cash" ||
    (orderForm.paymentMethod === "lipa_namba" &&
      orderForm.paymentDetails.selectedNetwork &&
      orderForm.paymentDetails.phoneNumber);

  $: isOrderDetailsValid =
    orderForm.type === "dine-in"
      ? !!orderForm.paymentDetails.tableNumber
      : orderForm.type === "takeaway"
        ? !!orderForm.paymentDetails.pickupTime
        : orderForm.type === "delivery"
          ? !!orderForm.paymentDetails.deliveryAddress
          : false;

  $: canConfirm = isOrderTypeValid && isPaymentValid && isOrderDetailsValid;

  const onSubmitHandler = async () => {
    cartStore.clear();

    await goto("/orders/order-success");
  };
</script>

<section class="p-4 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-7 gap-6">
  <!-- Cart Summary -->
  <div class="lg:col-span-4 bg-white rounded-2xl shadow p-6 space-y-6">
    <h2 class="text-2xl font-bold border-b pb-3 drop-shadow-sm">
      Cart Summary
    </h2>
    <div class="space-y-4">
      {#each orderForm.items as i}
        <!-- {const details as item.i} -->
        <div class="flex justify-between items-center text-gray-700">
          <span class="truncate">{i.item.name} x {i.quantity}</span>
          <span class="font-medium"
            >Tsh {formatCurrency(i.price * i.quantity)}</span
          >
        </div>
      {/each}
    </div>
    <div class="flex justify-between text-xl font-bold pt-6 border-t">
      <span>Total</span>
      <span>Tsh {orderForm.total.toFixed(2)}</span>
    </div>
  </div>

  <!-- Order Section -->
  <form
    action=""
    method="post"
    use:enhance={onSubmitHandler}
    class="lg:col-span-3 space-y-8"
  >
    <!-- Order Type -->
    <div class="bg-white rounded-2xl shadow p-6 space-y-5">
      <h2 class="text-2xl font-bold border-b pb-4 text-gray-800">Order Type</h2>

      <input
        type="hidden"
        name="items"
        value={JSON.stringify(orderForm.items)}
      />
      <input type="hidden" name="total" value={orderForm.total} />

      <div class="grid grid-cols-3 gap-4">
        {#each ["dine-in", "takeaway", "delivery"] as type}
          <label class="cursor-pointer group">
            <input
              type="radio"
              name="type"
              class="peer hidden"
              bind:group={orderForm.type}
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
    {#if orderForm.type}
      <div class="bg-white rounded-2xl shadow p-6 space-y-5">
        <h2 class="text-2xl font-bold border-b pb-4 text-gray-800">
          Order Details
        </h2>

        {#if orderForm.type === "dine-in"}
          <div class="space-y-2">
            <label for="tableNumber" class="block text-gray-700 font-medium"
              >Table Number</label
            >
            <input
              name="tableNumber"
              bind:value={orderForm.paymentDetails.tableNumber}
              required
              placeholder="Enter table number"
              class="input w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        {:else if orderForm.type === "takeaway"}
          <div class="space-y-2">
            <label for="pickupTime" class="block text-gray-700 font-medium"
              >Pickup Time</label
            >
            <input
              name="pickupTime"
              type="time"
              bind:value={orderForm.paymentDetails.pickupTime}
              required
              class="input w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        {:else if orderForm.type === "delivery"}
          <div class="space-y-2">
            <label for="contactPhone" class="block text-gray-700 font-medium"
              >Contact Phone</label
            >
            <input
              name="contactPhone"
              bind:value={orderForm.paymentDetails.contactPhone}
              required
              placeholder="Enter phone number"
              class="input w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div class="space-y-2">
            <label for="deliveryAddress" class="block text-gray-700 font-medium"
              >Delivery Address</label
            >
            <input
              name="deliveryAddress"
              bind:value={orderForm.paymentDetails.deliveryAddress}
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
              name="paymentMethod"
              class="peer hidden"
              bind:group={orderForm.paymentMethod}
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

      {#if orderForm.paymentMethod === "lipa_namba"}
        <div class="mt-6 space-y-4">
          <div class="space-y-2">
            <label for="selectedNetwork" class="block text-gray-700 font-medium"
              >Select Network</label
            >
            <select
              name="selectedNetwork"
              bind:value={orderForm.paymentDetails.selectedNetwork}
              required
              class="input w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="" disabled selected>Select Network</option>
              <option value="mpesa">MPESA</option>
              <option value="tigopesa">Tigopesa</option>
              <option value="airtel-money">Airtel Money</option>
            </select>
          </div>

          <div class="space-y-2">
            <label for="phoneNumber" class="block text-gray-700 font-medium"
              >Phone Number</label
            >
            <input
              name="phoneNumber"
              type="tel"
              bind:value={orderForm.paymentDetails.phoneNumber}
              required
              placeholder="Enter phone number (e.g. 07XXXXXXXX)"
              class="input w-full border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <!-- pattern="^0[67][0-9]{8}$" -->
          </div>
        </div>
      {/if}
    </div>

    <!-- Confirm Button -->
    <button
      type="submit"
      class="w-full bg-blue-600 text-white py-3 rounded-2xl text-lg font-semibold hover:bg-blue-700 active:scale-95 transition transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      disabled={!canConfirm}
    >
      Confirm Order
    </button>
  </form>
</section>
