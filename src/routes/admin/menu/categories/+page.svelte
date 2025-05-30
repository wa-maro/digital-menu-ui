<script lang="ts">
  import { Pencil, Trash } from "lucide-svelte";
  import CategoryModal from "$lib/components/menu/CategoryModal.svelte";

  export let data: LoadResult<Category>;
  let categories: Category[] = data.data;

  let showModal = false;

  const openModal = () => {
    showModal = true;
  };

  $: _id = "";
  $: name = "";
  $: description = "";
  $: editCategory = (id: string, iname: string, idescription: string) => {
    openModal();

    _id = id;
    name = iname;
    description = idescription;
  };
</script>

<div class="p-4">
  <div class="flex justify-between items-center mb-4">
    <h1 class="text-2xl font-bold text-[#044974]">Categories</h1>
    <button
      on:click={openModal}
      class="bg-[#044974] text-white px-4 py-2 rounded cursor-pointer"
    >
      Add Category
    </button>
  </div>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {#each categories as category}
      <div
        class="bg-white shadow-sm hover:shadow-md duration-200 rounded-xl px-4 py-3 flex items-center justify-between group transform hover:scale-[1.01] transition-[box-shadow,transform]"
      >
        <div>
          <h2
            class="text-base font-medium text-gray-800 group-hover:text-blue-700 transition-colors"
          >
            {category.name}
          </h2>
          <p class="text-sm text-gray-500">{category.description}</p>
        </div>

        <div class="flex gap-2 items-center">
          <button
            on:click={() =>
              editCategory(category._id, category.name, category.description)}
            type="button"
            class="p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors cursor-pointer"
            aria-label="Edit"
          >
            <Pencil size={12} />
          </button>

          <form action="?/delete" method="post">
            <input type="hidden" name="_id" bind:value={category._id} />
            <button
              type="submit"
              class="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
              aria-label="Delete"
            >
              <Trash size={12} />
            </button>
          </form>
        </div>
      </div>
    {/each}
  </div>

  <CategoryModal bind:show={showModal} bind:_id bind:name bind:description />
</div>
