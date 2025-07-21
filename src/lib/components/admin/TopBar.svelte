<script lang="ts">
  import AdminAccountMenu from "./AdminAccountMenu.svelte";

  export let adminData: User;
</script>

<nav class="bg-white border-b border-gray-200 p-3 px-8 flex justify-between">
  <div class="font-bold">Digital Menu</div>

  <AdminAccountMenu {adminData} />
</nav>
