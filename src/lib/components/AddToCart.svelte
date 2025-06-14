<script lang="ts">
  import { cartStore } from "$lib/stores/cart.store";

  export let item: MenuItem;
  let quantity = 1;

  const decrement = () => {
    if (quantity > 1) quantity--;
  };

  const increment = () => quantity++;
</script>

<div class="p-4 space-y-4">
  <!-- Quantity Selector -->
  <div class="flex items-center gap-3">
    <span class="text-sm font-medium">Qty:</span>

    <button
      onclick={decrement}
      class="w-8 h-8 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 text-lg flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
      disabled={quantity === 1}
    >
      −
    </button>

    <span class="w-8 text-center text-base">{quantity}</span>

    <button
      onclick={increment}
      class="w-8 h-8 rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 text-lg flex items-center justify-center"
    >
      +
    </button>
  </div>

  <!-- Add to Cart Button -->
  <button
    onclick={() => cartStore.addToCart({ ...item, quantity })}
    class="bg-[#065B8C] hover:bg-[#044974] text-white text-sm px-4 py-1.5 cursor-pointer rounded-full transition-all duration-200"
  >
    Add to Cart
  </button>
</div>
