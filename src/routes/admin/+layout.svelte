<script>
  import Sidebar from "$lib/components/admin/Sidebar.svelte";
  import TopBar from "$lib/components/admin/TopBar.svelte";
</script>

<TopBar />

<div class="flex">
  <Sidebar />
  <main class="flex-1 p-4">
    <slot />
  </main>
</div>
