<script lang="ts">
  import { cartStore } from "$lib/stores/cart";

  export let item: MenuItem;
  let quantity = 1;

  const decrement = () => {
    if (quantity > 1) quantity--;
  };

  const increment = () => quantity++;
</script>

<div class="flex items-center gap-2 mt-1">
  <span>Qty: </span>

  <button
    onclick={decrement}
    class="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm flex items-center justify-center disabled:opacity-40"
    disabled={quantity === 1}
  >
    −
  </button>

  <span class="w-6 text-center text-sm">{quantity}</span>

  <button
    onclick={increment}
    class="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm flex items-center justify-center"
  >
    +
  </button>
</div>

<button
  onclick={() => cartStore.addToCart({ ...item, quantity })}
  class="bg-[#065B8C] hover:bg-[#044974] text-white transition cursor-pointer text-xs px-3 py-1 rounded-full"
>
  Add to Cart
</button>
