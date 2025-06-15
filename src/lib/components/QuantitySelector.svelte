<script lang="ts">
  export let quantity: number;
</script>

<!-- Quantity Selector -->
<div class="flex items-center gap-2">
  <button
    onclick={() => (quantity > 1 ? quantity-- : 1)}
    class="w-8 h-8 rounded-full cursor-pointer bg-gray-100 hover:bg-sky-500 text-gray-700 text-lg flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
    disabled={quantity === 1}
  >
    −
  </button>

  <span class="w-8 h-8 text-center text-base">{quantity}</span>

  <button
    onclick={() => quantity++}
    class="w-8 h-8 rounded-full cursor-pointer bg-gray-100 hover:bg-sky-500 text-gray-700 text-lg flex items-center justify-center"
  >
    +
  </button>
</div>
