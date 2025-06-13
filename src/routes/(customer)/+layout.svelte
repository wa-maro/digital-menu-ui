<script lang="ts">
  import Header from "$lib/components/ui/Header.svelte";

  export let data;
  let user = data.user;
</script>

<div class="min-h-screen flex flex-col text-gray-800">
  <!-- Header -->
  <Header {user} />

  <!-- Main Content -->
  <main class="flex-grow">
    <slot />
  </main>
</div>
