<script lang="ts">
  import MediaModal from "./MediaModal.svelte";
  import MediaPicker from "./MediaPicker.svelte";

  export let item: MenuItem = {
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
  export let categories: Category[] = [];
  export let mediaItems: MediaItem[] = [];

  let showModal = false;
  $: item.imageURL = item.imageURL;
  $: selectImageName = "";
</script>

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
    <label for="description" class="block mb-1 font-medium">Description</label>
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

  <MediaPicker {item} bind:showModal bind:selectImageName />

  <div class="flex justify-end">
    <button
      type="submit"
      class="bg-[#044974] text-white px-4 py-2 rounded hover:opacity-90 cursor-pointer"
    >
      Save
    </button>
  </div>
</form>

{#if showModal}
  <MediaModal
    bind:showModal
    bind:selectImageUrl={item.imageURL}
    bind:selectImageName
    {mediaItems}
  />
{/if}
