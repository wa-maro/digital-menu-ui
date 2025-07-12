<script lang="ts">
  import MenuItemModalForm from "$lib/components/admin/menu/MenuItemModalForm.svelte";

  export let data;
  const { categories, item } = data;
</script>

<!-- Back Button -->
<div class="pt-6 max-w-2xl mx-auto">
  <a href="/admin/menu/items" class="text-sm text-gray-600 hover:underline"
    >← Back to menu</a
  >
</div>

<div
  class="max-w-2xl mx-auto rounded-2xl shadow-xl px-12 py-6 relative animate-fadeIn max-h-full overflow-y-auto"
  role="dialog"
  aria-modal="true"
>
  <h2 class="text-xl text-amber-700 font-semibold mb-3 ms-auto w-fit">
    Edit Item
  </h2>

  <MenuItemModalForm {categories} {item} />
</div>
