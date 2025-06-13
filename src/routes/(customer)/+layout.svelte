<script lang="ts">
  import { onMount } from "svelte";
  import { sessionStore } from "$lib/stores/session.store";
  import Header from "$lib/components/ui/Header.svelte";

  export let data: { customer: User | null };

  // Set session on client side
  onMount(() => {
    sessionStore.set({
      customer: data.customer,
    });
  });
</script>

<div class="min-h-screen flex flex-col text-gray-800">
  <!-- Header -->
  <Header />

  <!-- Main Content -->
  <main class="flex-grow">
    <slot />
  </main>
</div>
