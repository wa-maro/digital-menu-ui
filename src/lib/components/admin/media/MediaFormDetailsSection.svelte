<script lang="ts">
  export let categories: Category[] = [];
  export let media: MediaItem;
</script>

<div class="space-y-6 bg-white rounded-l p-6">
  <!-- Name Input -->
  <div class="flex flex-col">
    <label
      for="displayName"
      class="text-sm font-medium text-gray-700 mb-1"
      aria-label="displayName"
      >Name
    </label>
    <input
      id="displayName"
      name="displayName"
      type="text"
      bind:value={media.displayName}
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
      bind:value={media.category._id}
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
</div>
