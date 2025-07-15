<script>
  import Sidebar from "$lib/components/admin/Sidebar.svelte";
  import TopBar from "$lib/components/admin/TopBar.svelte";
</script>

<div class="flex h-screen overflow-hidden">
  <Sidebar />

  <main class="flex-1 flex flex-col">
    <TopBar />

    <div class="flex-1 px-4 overflow-y-auto">
      <slot />
    </div>
  </main>
</div>
