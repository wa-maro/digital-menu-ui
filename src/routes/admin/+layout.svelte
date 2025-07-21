<script lang="ts">
  import Sidebar from "$lib/components/admin/Sidebar.svelte";
  import TopBar from "$lib/components/admin/TopBar.svelte";

  export let data;
</script>

<svelte:head>
  <title>{data.title ?? "Digital Menu"}</title>
</svelte:head>

<div class="flex h-screen overflow-hidden">
  <Sidebar />

  <main class="flex-1 flex flex-col">
    <TopBar adminData={data.adminData} />

    <div class="flex-1 px-4 overflow-y-auto">
      <slot />

      <footer class="text-center text-sm text-gray-500 py-2 shadow-sm">
        &copy; {new Date().getFullYear()} DigiDine. All rights reserved.
      </footer>
    </div>
  </main>
</div>
