<script lang="ts">
  export let item: MenuItem;
  export let showModal;
  export let selectImageName = "";
</script>

<div class="flex gap-x-4 mt-2 items-end">
  {#if item.imageURL}
    <img
      src={item.imageURL}
      alt={item.name}
      class="w-16 h-16 object-cover rounded"
    />
  {/if}

  <div class="flex-1">
    <label for="imageURL" class="block mb-1 font-medium">Selected Image</label>
    <input
      name="imageURL"
      bind:value={item.imageURL}
      class="w-full border px-3 py-2 rounded hidden"
    />
    <input
      bind:value={selectImageName}
      class="w-full border px-3 py-2 rounded"
    />
  </div>

  <button
    type="button"
    on:click={() => (showModal = true)}
    class="h-10 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
  >
    {item.imageURL ? "Change" : " Select"}
  </button>
</div>
