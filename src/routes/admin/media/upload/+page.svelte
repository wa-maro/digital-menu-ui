<script lang="ts">
  import { enhance } from "$app/forms";
  import DetailsSection from "$lib/components/admin/media/MediaFormDetailsSection.svelte";
  import UploadSection from "$lib/components/admin/media/MediaFormUploadSection.svelte";

  export let data;

  const categories = data.categories;
  let media: MediaItem = {
    _id: "",
    displayName: "",
    filename: "",
    category: { _id: "", description: "", name: "" },
    linkedMenuItemIds: [],
    uploadedBy: {
      _id: "",
      email: "",
      fullName: "",
      avatarUrl: "",
      role: "manager",
    },
    url: "",
  };
</script>

<form
  action="?/updateMedia"
  method="post"
  enctype="multipart/form-data"
  use:enhance
  class="max-w-4xl mx-auto grid grid-cols-11 gap-x-14 p-8 bg-white rounded-lg shadow-lg border border-gray-200"
>
  <div class="col-span-full pb-1.5 mb-6 border-b border-teal-600">
    <h2 class="text-xl font-semibold text-gray-800 text-end">
      Upload New Media
    </h2>
  </div>

  <!-- Step 1: Upload Image -->
  <div class="space-y-6 col-span-5">
    <h3 class="text-lg font-medium text-gray-700">1️⃣ Upload Image</h3>
    <UploadSection bind:media />
  </div>

  <!-- Step 2: Create Media Metadata -->
  <div class="space-y-6 border-gray-200 col-span-6 border-s ps-6">
    <h3 class="text-lg font-medium text-gray-700">2️⃣ Add Media Details</h3>
    <DetailsSection bind:media {categories} />
  </div>

  <!-- Submit Button -->
  <div class="col-span-full mt-8">
    <button
      type="submit"
      class="w-full rounded-md bg-blue-600 py-3 text-white font-semibold shadow-md hover:bg-blue-700 cursor-pointer transition-colors"
    >
      Create Media
    </button>
  </div>
</form>
