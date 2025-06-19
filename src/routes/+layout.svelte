<script lang="ts">
  import Toast from "$lib/components/ui/Toast.svelte";
  import "../app.css";

  let { children } = $props();
</script>

{@render children()}

<Toast />

<footer class="text-center text-sm text-gray-500 py-2 shadow-sm">
  &copy; {new Date().getFullYear()} DigiDine. All rights reserved.
</footer>
