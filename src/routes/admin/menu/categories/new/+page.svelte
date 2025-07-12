<script lang="ts">
  let category: Category = {
    _id: "",
    name: "",
    description: "",
  };
</script>

<!-- Back Button -->
<div class="pt-6 max-w-2xl mx-auto">
  <a href="/admin/menu/items" class="text-sm text-gray-600 hover:underline"
    >← Back to menu</a
  >
</div>

<div
  class="max-w-2xl mx-auto rounded-2xl shadow-xl px-12 py-6 relative animate-fadeIn max-h-full overflow-y-auto"
  role="dialog"
  aria-modal="true"
>
  <h2 class="text-xl text-amber-700 font-semibold mb-3 ms-auto w-fit">
    Add New Category
  </h2>

  <form method="post" class="space-y-4">
    {#if category._id}
      <div>
        <label for="_id" class="block mb-1 font-medium"></label>
        <input
          name="_id"
          bind:value={category._id}
          hidden
          required
          class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#044974]"
        />
      </div>
    {/if}
    <div>
      <label for="name" class="block mb-1 font-medium">Name</label>
      <input
        name="name"
        bind:value={category.name}
        required
        class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#044974]"
      />
    </div>

    <div>
      <label for="description" class="block mb-1 font-medium">Description</label
      >
      <textarea
        name="description"
        bind:value={category.description}
        class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#044974]"
      ></textarea>
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
