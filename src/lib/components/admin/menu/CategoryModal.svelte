<script lang="ts">
  export let show = false;

  export let category: Category;

  let onClose = () => {
    show = !show;
    category._id = "";
    category.name = "";
    category.description = "";
  };
</script>

{#if show}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
  >
    <div
      class="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      <!-- Close Button -->
      <button
        class="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
        on:click={onClose}
        aria-label="Close"
      >
        ✕
      </button>

      <h2 class="text-xl font-semibold mb-4">
        {category.name && category._id ? "Edit" : "Add"} Category
      </h2>

      <form
        action={`${category.name && category._id ? "?/update" : "?/create"}`}
        method="post"
        class="space-y-4"
      >
        {#if category._id}
          <div>
            <label for="_id" class="block mb-1 font-medium"></label>
            <input
              name="_id"
              bind:value={category._id}
              hidden
              required
              class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#044974]"
            />
          </div>
        {/if}
        <div>
          <label for="name" class="block mb-1 font-medium">Name</label>
          <input
            name="name"
            bind:value={category.name}
            required
            class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#044974]"
          />
        </div>

        <div>
          <label for="description" class="block mb-1 font-medium"
            >Description</label
          >
          <textarea
            name="description"
            bind:value={category.description}
            class="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#044974]"
          ></textarea>
        </div>

        <div class="flex justify-end">
          <button
            type="submit"
            class="bg-[#044974] text-white px-4 py-2 rounded hover:opacity-90 cursor-pointer"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
{/if}

<style>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }
</style>
