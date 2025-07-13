<script lang="ts">
  export let url: string = "";
  export let categories: Category[] = [];

  let name = "";
  let category = "";
  let linkedMenuItemIds: string[] = [];
</script>

<form
  action="?/mediaCreation"
  method="post"
  class="space-y-6 bg-white rounded-l p-6"
>
  <input type="hidden" id="url" name="url" value={url} />

  <!-- Name Input -->
  <div class="flex flex-col">
    <label
      for="name"
      class="text-sm font-medium text-gray-700 mb-1 hidden"
      aria-label="name">Name</label
    >
    <input
      id="name"
      name="name"
      type="text"
      bind:value={name}
      placeholder="Image name"
      class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-sm"
    />
  </div>

  <!-- Category Select -->
  <div class="flex flex-col">
    <label
      for="category"
      class="text-sm font-medium text-gray-700 mb-1 hidden"
      aria-label="category">Category</label
    >
    <select
      bind:value={category}
      id="category"
      name="category"
      class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-sm"
    >
      <option disabled value="">Select Category</option>
      {#each categories as cat}
        <option value={cat._id}>{cat.name}</option>
      {/each}
    </select>
  </div>

  <!-- Linked Menu Items -->
  <div class="flex-col hidden">
    <label for="linkedItems" class="text-sm font-medium text-gray-700 mb-1"
      >Linked Menu Item IDs</label
    >
    <input
      id="linkedItems"
      name="linkedMenuItemIds"
      bind:value={linkedMenuItemIds}
      placeholder="e.g. 123,456,789"
      class="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 text-sm"
    />
    <small class="text-gray-500 mt-1 text-xs"
      >Separate multiple IDs with commas.</small
    >
  </div>

  <!-- Submit Button -->
  <button
    type="submit"
    disabled={!url || !name || !category}
    class="w-full rounded-md bg-blue-600 py-3 text-white font-semibold shadow-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-colors"
  >
    Create Media
  </button>
</form>
