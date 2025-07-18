<script lang="ts">
  import Header from "$lib/components/ui/Header.svelte";
</script>

<div class="min-h-screen flex flex-col text-gray-800">
  <!-- Fixed Header -->
  <header class="fixed top-0 left-0 right-0 z-50 bg-white shadow">
    <Header />
  </header>

  <!-- Main Content -->
  <main class="pt-14 flex-grow overflow-y-auto">
    <slot />
  </main>
</div>
