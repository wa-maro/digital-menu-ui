<script lang="ts">
  export let data: { media: MediaItem };
  const media: MediaItem = data.media;
</script>

<main class="max-w-4xl mx-auto py-6">
  <!-- Header -->
  <div class="flex justify-between items-center mb-5">
    <!-- Back Button -->
    <a href="/admin/media" class="text-sm text-gray-600 hover:underline"
      >← Back to menu</a
    >

    <!-- Edit Button -->
    <a
      href={`/admin/media/${media._id}/update`}
      class="text-blue-600 hover:underline"
    >
      Edit
    </a>
  </div>

  <div
    class="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 justify-start items-start"
  >
    <div class="overflow-hidden rounded-lg shadow-md col-span-1">
      <img
        src={`http://127.0.0.1:3000${media.url}`}
        alt={media.name}
        class="w-full h-64 md:h-full object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>

    <div class="flex flex-col justify-center space-y-6 col-span-2">
      <h2 class="text-2xl font-bold text-gray-900">{media.name}</h2>

      <div class="space-y-2 text-gray-700">
        <div class="flex items-center space-x-2">
          <span class="font-semibold text-gray-800">Category:</span>
          <span>{media.category.name}</span>
        </div>

        <div class="flex items-center space-x-2">
          <span class="font-semibold text-gray-800">Uploaded By:</span>
          <span>{media.uploadedBy.fullName}</span>
        </div>

        <div class="flex items-center space-x-2 text-sm text-gray-500">
          <span class="font-semibold">Created At:</span>
          <time datetime={media.createdAt}
            >{new Date(media.createdAt).toLocaleString()}</time
          >
        </div>

        <div class="flex items-center space-x-2 text-sm text-gray-500">
          <span class="font-semibold">Updated At:</span>
          <time datetime={media.updatedAt}
            >{new Date(media.updatedAt).toLocaleString()}</time
          >
        </div>
      </div>
    </div>
  </div>

  <div class="mt-8">
    <h3 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
      Linked Menu Items
    </h3>

    {#if media.linkedMenuItemIds.length > 0}
      <ul
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 p-0 m-0 list-none"
      >
        {#each media.linkedMenuItemIds as item}
          <li>
            <a
              href={`/admin/menu/items/${item._id}`}
              class="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {#if item.imageURL}
                <img
                  src={item.imageURL}
                  alt={item.name}
                  class="w-full h-24 object-cover"
                  loading="lazy"
                />
              {:else}
                <div
                  class="w-16 h-16 flex items-center justify-center bg-gray-100 text-gray-400 text-xs rounded"
                >
                  No Image
                </div>
              {/if}
              <div class="p-2">
                <h3
                  class="text-sm font-semibold text-blue-600 hover:underline truncate"
                >
                  {item.name}
                </h3>
              </div>
            </a>
          </li>
        {/each}
      </ul>
    {:else}
      <p class="text-gray-500 italic">No linked menu items</p>
    {/if}
  </div>
</main>
