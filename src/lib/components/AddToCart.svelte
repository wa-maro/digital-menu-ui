<script lang="ts">
  export let item: MenuItem;
  export let quantity: number = 1;

  async function addToCart() {
    try {
      await fetch("/../cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ item, quantity }),
      });
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  }
</script>

<!-- Add to Cart Button -->
<button
  onclick={addToCart}
  class="bg-[#065B8C] hover:bg-[#044974] text-white text-sm px-4 py-1.5 cursor-pointer rounded-full transition-all duration-200"
>
  Add to Cart
</button>
