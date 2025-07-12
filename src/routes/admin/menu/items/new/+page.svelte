<script lang="ts">
  import MenuItemModalForm from "$lib/components/admin/menu/MenuItemModalForm.svelte";

  export let data;
  const { categories } = data;
</script>

<div
  class="max-w-2xl mx-auto rounded-2xl shadow-xl px-12 py-6 relative animate-fadeIn max-h-full overflow-y-auto"
  role="dialog"
  aria-modal="true"
>
  <h2 class="text-xl text-amber-700 font-semibold mb-3 ms-auto w-fit">
    Add New Item
  </h2>

  <MenuItemModalForm {categories} />
</div>
