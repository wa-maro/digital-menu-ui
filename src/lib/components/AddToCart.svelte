<script lang="ts">
  import { cartStore } from "$lib/stores/cart.store";

  export let item: MenuItem;
  export let quantity: number = 1;
</script>

<!-- Add to Cart Button -->
<button
  onclick={() => cartStore.addToCart({ ...item, quantity })}
  class="bg-[#065B8C] hover:bg-[#044974] text-white text-sm px-4 py-1.5 cursor-pointer rounded-full transition-all duration-200"
>
  Add to Cart
</button>
