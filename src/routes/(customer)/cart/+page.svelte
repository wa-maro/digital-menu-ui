<script lang="ts">
  import { goto } from "$app/navigation";
  import { cart } from "$lib/stores/cart";

  // Reactive cart state
  let cartItems: CartItem[] = [];

  $: cartItems = $cart;

  $: total = cartItems.reduce(
    (sum, entry) => sum + entry.price * entry.quantity,
    0
  );

  const goToCheckout = () => {
    if (cartItems.length > 0) goto("/checkout");
  };

  function updateQuantity(index: number, newQty: number) {
    if (newQty < 1) return;
    cartItems[index].quantity = newQty;
    cartItems = [...cartItems]; // trigger reactivity
    updateTotal();
  }

  function updateTotal() {
    total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  function removeItem(index: number) {
    cartItems.splice(index, 1);
    cartItems = [...cartItems]; // Trigger reactivity
    updateTotal();
  }
</script>

<div class="p-4 space-y-4 max-w-md mx-auto">
  <h1 class="text-2xl font-bold text-center text-gray-800">Your Cart</h1>

  <div class="bg-white rounded-xl shadow-md divide-y">
    {#if cartItems.length > 0}
      {#each cartItems as { name, price, quantity }, index}
        <div class="flex items-center justify-between p-4 gap-3">
          <div class="flex items-center gap-4">
            <div class="w-14 h-14 bg-gray-200 rounded-lg shrink-0"></div>
            <div class="text-sm leading-tight">
              <p class="font-medium text-gray-800">{name}</p>

              <div class="flex items-center gap-2 mt-1">
                <button
                  on:click={() => updateQuantity(index, quantity - 1)}
                  class="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm flex items-center justify-center disabled:opacity-40"
                  disabled={quantity <= 1}>−</button
                >

                <span class="w-6 text-center text-sm">{quantity}</span>

                <button
                  on:click={() => updateQuantity(index, quantity + 1)}
                  class="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm flex items-center justify-center"
                  >+</button
                >
              </div>
            </div>
          </div>

          <div class="text-sm font-semibold text-gray-800 text-right">
            ${(price * quantity).toFixed(2)}
          </div>

          <button
            on:click={() => removeItem(index)}
            class="text-red-500 hover:text-red-700 text-sm ml-2"
          >
            Remove
          </button>
        </div>
      {/each}

      <div
        class="p-4 flex justify-between items-center text-base font-semibold text-gray-700"
      >
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
    {:else}
      <div class="p-6 text-center text-gray-500 text-sm">
        <p>Your cart is empty.</p>
      </div>
    {/if}
  </div>

  <button
    on:click={goToCheckout}
    class="w-full bg-[#065B8C] hover:bg-[#044974] transition-colors text-white text-center text-base font-semibold py-3 rounded-xl shadow disabled:opacity-40"
    disabled={cartItems.length === 0}
  >
    Proceed to Checkout
  </button>
</div>
