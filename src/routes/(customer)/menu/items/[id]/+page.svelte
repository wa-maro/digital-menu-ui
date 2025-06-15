<script lang="ts">
  import AddToCart from "$lib/components/AddToCart.svelte";
  import BackButton from "$lib/components/BackButton.svelte";
  import QuantitySelector from "$lib/components/QuantitySelector.svelte";

  export let data: { item: MenuItem };
  let { item } = data;
  let quantity: number = 1;
</script>

<div class="p-6 space-y-4 max-w-5xl mx-auto">
  <BackButton />

  {#if item}
    <!-- Image -->
    <img
      src={item.imageURL}
      alt={item.name}
      class="w-full h-64 object-cover rounded-lg shadow-sm"
    />

    <!-- Title + Price -->
    <div class="space-y-1">
      <h1 class="text-2xl font-bold text-gray-800">{item.name}</h1>
      <div class="text-xl font-semibold text-[#065B8C]">
        TZS {item.price.toFixed(2)}
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

    <!-- Add to Cart -->
    {#if item.available}
      <QuantitySelector bind:quantity />
      <AddToCart {item} bind:quantity />
    {/if}
  {:else}
    <p class="text-center p-6">Loading item details...</p>
  {/if}
</div>
