<script lang="ts">
  export let data;
  const { categories } = data;

  let item: MenuItem = {
    _id: "",
    name: "",
    description: "",
    imageURL: "",
    available: false,
    category: {
      _id: "",
      name: "",
      description: "",
    },
    price: 0.0,
  };
</script>

<div
  class="max-w-2xl mx-auto rounded-2xl shadow-xl px-12 py-6 relative animate-fadeIn max-h-full overflow-y-auto"
  role="dialog"
  aria-modal="true"
>
  <h2 class="text-xl text-amber-700 font-semibold mb-3 ms-auto w-fit">
    Add New Item
  </h2>

  <form method="POST" class="space-y-4">
    <div>
      <label for="name" class="block mb-1 font-medium">Name</label>
      <input
        bind:value={item.name}
        name="name"
        required
        class="w-full border px-3 py-2 rounded"
      />
    </div>

    <div class="mt-3 flex items-center space-x-2">
      <input
        type="checkbox"
        name="available"
        id="available"
        bind:checked={item.available}
        class="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
      />
      <label for="available" class="text-sm font-medium">Available</label>
    </div>

    <div>
      <label for="description" class="block mb-1 font-medium">Description</label
      >
      <textarea
        name="description"
        bind:value={item.description}
        class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#044974]"
      ></textarea>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
      <div class="col-span-1">
        <label for="price" class="block mb-1 font-medium">Price</label>
        <input
          bind:value={item.price}
          name="price"
          type="number"
          min="0"
          step="0.01"
          required
          class="w-full border px-3 py-2 rounded"
        />
      </div>

      <div class="col-span-2">
        <label for="category" class="block mb-1 font-medium">Category</label>
        <select
          name="category"
          bind:value={item.category._id}
          required
          class="w-full border px-3 py-2 rounded"
        >
          <option value="" disabled>Select a category</option>
          {#each categories as cat}
            <option value={cat._id}>{cat.name}</option>
          {/each}
        </select>
      </div>
    </div>

    <div class="flex gap-x-4">
      {#if item.imageURL}
        <img
          src={item.imageURL}
          alt={item.name}
          class="w-16 h-16 object-cover rounded mt-2"
        />
      {/if}

      <div class="flex-1">
        <label for="imageURL" class="block mb-1 font-medium">Image URL</label>
        <input
          name="imageURL"
          bind:value={item.imageURL}
          class="w-full border px-3 py-2 rounded"
        />
      </div>
    </div>

    <div class="flex justify-end">
      <button
        type="submit"
        class="bg-[#044974] text-white px-4 py-2 rounded hover:opacity-90 cursor-pointer"
      >
        Save
      </button>
    </div>
  </form>
</div>
