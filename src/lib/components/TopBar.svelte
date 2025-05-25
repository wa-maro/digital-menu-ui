<script lang="ts">
  const logout = () => {};
</script>

<nav class="bg-white shadow p-4 flex justify-between">
  <div class="font-bold">Digital Menu</div>
  <div class="flex gap-4">
    <button on:click={logout}>Logout</button>
  </div>
</nav>
