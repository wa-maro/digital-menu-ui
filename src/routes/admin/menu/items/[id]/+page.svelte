<script lang="ts">
  export let data;
  const item: MenuItem = data.item;
</script>

<div class="max-w-3xl mx-auto p-6 space-y-6">
  <!-- Back Button -->
  <div class="pt-6">
    <a href="/admin/menu/items" class="text-sm text-gray-600 hover:underline"
      >← Back to menu</a
    >
  </div>

  <!-- Header -->
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold text-gray-800">{item.name}</h1>
    <a
      href={`/admin/menu/items/${item._id}`}
      class="text-blue-600 hover:underline"
    >
      Edit
    </a>
  </div>

  <!-- Image -->
  {#if item.imageUrl}
    <img
      src={item.imageUrl}
      alt={item.name}
      class="w-full h-64 object-cover rounded-lg shadow"
    />
  {:else}
    <div>
      <span class="text-gray-400 text-xs py-2">No Image</span>
    </div>
  {/if}

  <!-- Details -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <h2 class="font-semibold text-gray-700">Description</h2>
      <p class="text-gray-600">
        {item.description || "No description available."}
      </p>
    </div>

    <div>
      <h2 class="font-semibold text-gray-700">Category</h2>
      <p class="text-gray-600">{item.category?.name || "Uncategorized"}</p>
    </div>

    <div>
      <h2 class="font-semibold text-gray-700">Price</h2>
      <p class="text-gray-600">${item.price.toFixed(2)}</p>
    </div>

    <div>
      <h2 class="font-semibold text-gray-700">Availability</h2>
      <p class={item.available ? "text-green-600" : "text-red-600"}>
        {item.available ? "Available" : "Not Available"}
      </p>
    </div>
  </div>
</div>
