<script lang="ts">
  import Header from "$lib/components/ui/Header.svelte";
</script>

<div class="min-h-screen flex flex-col text-gray-800">
  <!-- Header -->
  <Header />

  <!-- Main Content -->
  <main class="flex-grow">
    <slot />
  </main>
</div>
