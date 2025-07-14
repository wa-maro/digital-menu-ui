<script lang="ts">
  import { PUBLIC_API_URL } from "$env/static/public";

  export let showModal: boolean = false;
  export let mediaItems: MediaItem[] = [];
  export let selectImageUrl = "";
  export let selectImageName;

  function selectImage(url: string, displayName: string) {
    selectImageUrl = `${PUBLIC_API_URL}${url}`;
    selectImageName = displayName;
    showModal = false;
  }
</script>

<div
  class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
>
  <div class="bg-white w-full h-full p-4 relative overflow-auto">
    <button
      class="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
      on:click={() => (showModal = false)}
    >
      &times;
    </button>

    <h2 class="text-xl font-semibold mb-4">Select an Image</h2>

    <div
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
    >
      {#each mediaItems as media}
        <button
          on:click={() => selectImage(media.url, media.displayName)}
          class="cursor-pointer border rounded p-2 hover:shadow-md transition"
        >
          <img
            src={`${PUBLIC_API_URL}${media.url}`}
            alt={media.displayName}
            class="w-full h-32 object-cover rounded mb-2"
          />
          <p class="text-center text-sm">{media.displayName}</p>
        </button>
      {/each}
    </div>
  </div>
</div>
