<script>
  import Sidebar from "$lib/components/Sidebar.svelte";
  import TopBar from "$lib/components/TopBar.svelte";
</script>

<TopBar />

<div class="flex">
  <Sidebar />
  <main class="flex-1 p-4">
    <slot />
  </main>
</div>
