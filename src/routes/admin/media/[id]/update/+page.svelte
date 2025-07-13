<script lang="ts">
  import MediaForm from "$lib/components/admin/media/MediaForm.svelte";
  import MediaUpload from "$lib/components/admin/media/MediaUpload.svelte";

  export let data;

  const media = data.media;
  const categories = data.categories;

  $: uploadedUrl = media.url ?? "";
</script>

<div
  class="max-w-4xl mx-auto grid grid-cols-11 gap-x-14 p-12 bg-white rounded-lg shadow-lg border border-gray-200"
>
  <div class="col-span-full pb-1.5 mb-8 border-b border-teal-600">
    <h2 class="text-xl font-semibold text-gray-800 text-end">Edit Media</h2>
  </div>

  <!-- Step 1: Upload Image -->
  <div class="space-y-6 col-span-5">
    <h3 class="text-lg font-medium text-gray-700">1️⃣ Upload Image</h3>

    <MediaUpload {media} />
  </div>

  <!-- Step 2: Create Media Metadata -->
  <div class="space-y-6 border-gray-200 col-span-6 border-s ps-6">
    <h3 class="text-lg font-medium text-gray-700">2️⃣ Add Media Details</h3>

    {#if uploadedUrl}
      <MediaForm url={uploadedUrl} {media} {categories} />
    {/if}
  </div>
</div>
