<script lang="ts">
  export let show = false;
  export let item: MenuItem;
  export let categories: Category[] = [];

  let onClose = () => {
    show = false;
    item = {
      _id: "",
      name: "",
      description: "",
      imageUrl: "",
      available: false,
      category: {
        _id: "",
        name: "",
        description: "",
      },
      price: 0.0,
    };
  };
</script>

{#if show}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto"
  >
    <div
      class="bg-white w-full max-w-xl rounded-2xl shadow-lg p-6 relative animate-fadeIn max-h-full overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <!-- Close Button -->
      <button
        class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
        on:click={onClose}
        aria-label="Close"
      >
        ✕
      </button>

      <h2 class="text-xl font-semibold mb-4">
        {item.name && item._id ? "Edit" : "Add"} Item
      </h2>

      <form
        action={`${item.name && item._id ? "?/update" : "?/create"}`}
        method="POST"
        class="space-y-4"
      >
        {#if item._id}
          <div>
            <label for="_id" class="block mb-1 font-medium"></label>
            <input
              name="_id"
              bind:value={item._id}
              hidden
              required
              class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#044974]"
            />
          </div>
        {/if}

        <div>
          <label for="name" class="block mb-1 font-medium">Name</label>
          <input
            bind:value={item.name}
            name="name"
            required
            class="w-full border px-3 py-2 rounded"
          />
        </div>

        <div class="mt-4 flex items-center space-x-2">
          <input
            type="checkbox"
            id="available"
            bind:checked={item.available}
            class="form-checkbox h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <label for="available" class="text-sm font-medium">Available</label>
        </div>

        <div>
          <label for="description" class="block mb-1 font-medium"
            >Description</label
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
            <label for="category" class="block mb-1 font-medium">Category</label
            >
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

        <div>
          <label for="imageUrl" class="block mb-1 font-medium">Image URL</label>
          <input
            name="imageUrl"
            bind:value={item.imageUrl}
            class="w-full border px-3 py-2 rounded"
          />
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
  </div>
{/if}
