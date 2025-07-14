<script lang="ts">
  export let media;

  let file: File | null = null;
  let previewUrl: string | null = media.url
    ? `http://127.0.0.1:3000${media.url}`
    : null;

  function handleFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      file = input.files[0];
      previewUrl = URL.createObjectURL(file);
    }
  }
</script>

<div
  class="space-y-6 max-w-xs mx-auto p-3 bg-white rounded-lg shadow-md border border-gray-200"
>
  <label
    for="file"
    class="block cursor-pointer rounded-md border-2 border-dashed border-gray-300 p-1 text-center text-gray-500 hover:border-blue-500 hover:text-blue-600 transition-colors"
  >
    <input
      id="file"
      type="file"
      name="file"
      accept="image/*"
      class="hidden"
      on:change={handleFileChange}
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="mx-auto mb-2 h-4 w-8 text-gray-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M4 12l4-4 4 4M12 16v-8"
      />
    </svg>
    <span>Click to select an image or drag and drop</span>
  </label>

  {#if previewUrl}
    <img
      src={previewUrl}
      alt="Preview"
      class="w-48 h-48 object-cover rounded-lg border border-gray-300 shadow-sm mx-auto"
      draggable="false"
    />
  {/if}
</div>
