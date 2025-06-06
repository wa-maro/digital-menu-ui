<script lang="ts">
  import BackButton from "$lib/components/BackButton.svelte";

  export let data: { item: MenuItem };
  let { item } = data;
  let quantity = 1;
</script>

<div class="max-w-3xl mx-auto p-6 space-y-6">
  <BackButton />

  {#if item}
    <!-- Image -->
    <img
      src={item.imageUrl}
      alt={item.name}
      class="w-full h-64 object-cover rounded-lg shadow-sm"
    />

    <!-- Title + Price -->
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold text-gray-800">{item.name}</h1>
      <div class="text-xl font-semibold text-[#065B8C]">
        ${item.price.toFixed(2)}
      </div>
    </div>

    <!-- Availability + Category -->
    <div class="text-sm text-gray-500 flex gap-4">
      <span class="bg-gray-100 px-2 py-0.5 rounded-full"
        >{item.category.name}</span
      >
      <span class={item.available ? "text-green-600" : "text-red-500"}>
        {item.available ? "Available" : "Unavailable"}
      </span>
    </div>

    <!-- Description -->
    <p class="text-gray-700 text-base leading-relaxed">{item.description}</p>

    <!-- Quantity Selector -->
    <div class="flex items-center gap-2">
      <label for="quantity" class="font-medium">Qty:</label>
      <input
        type="number"
        name="quantity"
        min="1"
        bind:value={quantity}
        class="w-16 border rounded px-2 py-1"
      />
    </div>

    <!-- Add to Cart Button -->
    {#if item.available}
      <button
        class="bg-[#065B8C] hover:bg-[#044974] text-white px-5 py-2 rounded-lg font-medium transition cursor-pointer"
      >
        Add to Cart
      </button>
    {/if}
  {:else}
    <p class="text-center p-6">Loading item details...</p>
  {/if}
</div>
