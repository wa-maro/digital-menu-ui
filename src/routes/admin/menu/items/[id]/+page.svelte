<script lang="ts">
  import { PUBLIC_API_URL } from "$env/static/public";

  export let data;
  const item: MenuItem = data.data;
</script>

<div class="max-w-4xl mx-auto space-y-6">
  <!-- Back Button -->
  <div class="pt-3">
    <a href="/admin/menu/items" class="text-sm text-gray-600 hover:underline"
      >← Back to menu</a
    >
  </div>

  <!-- Header -->
  <div class="flex justify-between items-center w-3/4">
    <h1 class="text-2xl font-bold text-gray-800">{item.name}</h1>
  </div>

  <!-- Image -->
  {#if item.imageURL}
    <img
      src={`${PUBLIC_API_URL}${item.imageURL.slice(item.imageURL.indexOf("/upload"))}`}
      alt={item.name}
      class="w-3/4 h-64 object-cover rounded-lg shadow"
    />
  {:else}
    <div>
      <span class="text-gray-400 text-xs py-2">No Image</span>
    </div>
  {/if}

  <!-- Details -->
  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    <div>
      <h2 class="font-semibold text-gray-700">Description</h2>
      <p class="text-gray-600">
        {item.description || "No description available."}
      </p>
    </div>

    <div>
      <h2 class="font-semibold text-gray-700">Category</h2>
      <p class="text-gray-600">{item.category?.name || "Uncategorized"}</p>
    </div>

    <div>
      <h2 class="font-semibold text-gray-700">Price</h2>
      <p class="text-gray-600">TZS {item.price.toFixed(2)}</p>
    </div>

    <div>
      <h2 class="font-semibold text-gray-700">Availability</h2>
      <p class={item.available ? "text-green-600" : "text-red-600"}>
        {item.available ? "Available" : "Not Available"}
      </p>
    </div>
  </div>

  <div class="flex gap-x-8 py-8">
    <div>
      <a
        href={`/admin/menu/items/${item._id}/update`}
        class="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-2xl shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
        aria-label="edit"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M11 4H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"
          />
        </svg>
        Edit Item
      </a>
    </div>

    <form action="./?/delete" method="post">
      <input type="hidden" name="_id" bind:value={item._id} />
      <button
        type="submit"
        class="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-2xl shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
        aria-label="Delete"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 7L5 7M10 11V17M14 11V17M5 7L6 19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19L19 7M9 7V4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V7"
          />
        </svg>
        Delete Item
      </button>
    </form>
  </div>
</div>
