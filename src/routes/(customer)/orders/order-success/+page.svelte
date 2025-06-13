<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  // Simulate fetching order details passed via query params or session
  let orderId = "";
  let orderDetails: any = null;

  // Example: Load order details from query param
  onMount(() => {
    const params = new URLSearchParams(window.location.search);
    orderId = params.get("orderId") ?? "";

    // You can fetch order details from backend if needed
    // For now, we can mock or store them in session/localStorage
    const order = localStorage.getItem("lastOrder");
    if (order) {
      orderDetails = JSON.parse(order);
    }
  });

  function backToMenu() {
    goto("/menu");
  }

  function viewOrders() {
    goto("/orders/history");
  }
</script>

<section
  class="flex flex-col items-center justify-center min-h-screen text-center p-4"
>
  <div class="text-green-600 text-6xl mb-4">✔️</div>
  <h1 class="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
  {#if orderId}
    <p class="mb-4">Your order ID is <strong>{orderId}</strong></p>
  {/if}

  {#if orderDetails}
    <div class="w-full max-w-md bg-white shadow rounded p-4 mb-4 text-left">
      <h2 class="text-xl font-semibold mb-2">Order Summary</h2>
      <ul class="mb-2">
        {#each orderDetails.items as item}
          <li class="flex justify-between">
            <span>{item.name} x {item.quantity}</span>
            <span>{item.price * item.quantity}</span>
          </li>
        {/each}
      </ul>
      <div class="flex justify-between font-bold">
        <span>Total:</span>
        <span>{orderDetails.total}</span>
      </div>
      <div class="mt-2">
        <p><strong>Order Type:</strong> {orderDetails.orderType}</p>
        {#if orderDetails.orderType === "dine-in"}
          <p>
            <strong>Table Number:</strong>
            {orderDetails.details.tableNumber}
          </p>
        {:else if orderDetails.orderType === "takeaway"}
          <p><strong>Pickup Time:</strong> {orderDetails.details.pickupTime}</p>
        {:else}
          <p>
            <strong>Delivery Address:</strong>
            {orderDetails.details.deliveryAddress}
          </p>
        {/if}
        <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>
      </div>
    </div>
  {/if}

  <!-- Action Buttons -->
  <div class="flex gap-4">
    <button on:click={backToMenu} class="btn btn-primary">Back to Menu</button>
    <button on:click={viewOrders} class="btn btn-secondary"
      >View My Orders</button
    >
  </div>
</section>
