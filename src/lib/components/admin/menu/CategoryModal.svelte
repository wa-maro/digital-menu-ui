<script lang="ts">
  export let category: Category = {
    _id: "",
    name: "",
    description: "",
  };
</script>

<form method="post" class="space-y-4">
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
    <label for="description" class="block mb-1 font-medium">Description</label>
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
