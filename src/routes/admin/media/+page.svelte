<script lang="ts">
  import { Pencil, Trash, Upload } from "lucide-svelte";

  export let data;
  const mediaItems: MediaItem[] = data.media?.items || [];
</script>

<div class="p-4">
  <div class="flex justify-between items-center mb-6">
    <h1 class="text-2xl font-bold text-[#044974]">Media</h1>

    <button>
      <a
        href="/admin/media"
        class="bg-[#044974] text-white px-4 py-2 rounded flex items-center gap-2 cursor-pointer"
      >
        <Upload size={16} />
        Upload Image
      </a>
    </button>
  </div>

  <!-- Media Table -->
  <div class="min-h-[300px]">
    <table class="min-w-full bg-white rounded-xl shadow-md overflow-hidden">
      <thead class="bg-gray-50 text-left text-sm text-gray-700">
        <tr>
          <th class="p-4">Image</th>
          <th class="p-4 cursor-pointer">Name</th>
          <th class="p-4">Category </th>
          <th class="p-4 cursor-pointer">Linked Items </th>
          <th class="p-4 text-center">Actions</th>
        </tr>
      </thead>
      <tbody class="text-sm text-gray-800 divide-y divide-stone-100">
        {#each mediaItems as item}
          <tr class="hover:bg-gray-50 transition">
            <td class="py-1 ps-4">
              {#if item.url}
                <a href={`/admin/media/${item._id}`}>
                  <img
                    src={item.url}
                    alt={item.name}
                    class="w-16 h-16 object-cover rounded"
                  />
                </a>
              {:else}
                <div
                  class="w-16 h-16 flex items-center justify-center bg-gray-100 text-gray-400 text-xs rounded"
                >
                  No Image
                </div>
              {/if}
            </td>

            <td class="py-1 ps-4">
              <a
                href={`/admin/media/${item._id}`}
                class="font-medium hover:underline"
              >
                {item.name}
              </a>
            </td>

            <td class="py-1 ps-4 text-gray-600">{item.category.name}</td>

            <td class="py-1 ps-4 whitespace-nowrap">
              {#if item.linkedMenuItemIds.length > 0}
                {#each item.linkedMenuItemIds.slice(0, 3) as menuItem, i}
                  <a
                    href={`/admin/menu/items/${menuItem._id}`}
                    class="underline text-blue-600 hover:text-blue-800"
                    >{menuItem.name}</a
                  >
                  {i < Math.min(item.linkedMenuItemIds.length, 3) - 1
                    ? ", "
                    : ""}
                {/each}

                {#if item.linkedMenuItemIds.length > 3}
                  <span class="text-gray-500 ml-1 text-sm">
                    +{item.linkedMenuItemIds.length - 3} more
                  </span>
                {/if}
              {:else}
                <span class="text-gray-400 italic">No linked items</span>
              {/if}
            </td>

            <td class="py-1 ps-4 text-center">
              <div class="flex justify-center gap-2">
                <button
                  type="button"
                  aria-label="Edit"
                  class="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors cursor-pointer"
                >
                  <a href={`/admin/media/${item._id}/update`}>
                    <Pencil size={12} /></a
                  >
                </button>

                <form action="?/delete" method="post">
                  <input type="hidden" name="_id" bind:value={item._id} />
                  <button
                    type="submit"
                    class="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                    aria-label="Delete"
                  >
                    <Trash size={12} />
                  </button>
                </form>
              </div>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
