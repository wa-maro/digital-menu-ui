<script lang="ts">
  import "../app.css";

  let { children } = $props();
</script>

{@render children()}

<footer class="text-center text-sm text-gray-500 py-2 shadow-sm">
  &copy; {new Date().getFullYear()} DigiDine. All rights reserved.
</footer>
