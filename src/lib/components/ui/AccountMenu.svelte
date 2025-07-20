<script lang="ts">
  import { browser } from "$app/environment";
  import { LogOut, Settings, User, UserCog } from "lucide-svelte";
  import { onDestroy, onMount } from "svelte";

  let open = false;
  let dropdownEl: HTMLElement;

  const toggle = () => (open = !open);

  function handleClickOutside(event: MouseEvent) {
    if (dropdownEl && !dropdownEl.contains(event.target as Node)) open = false;
  }

  onMount(() => {
    if (browser) {
      document.addEventListener("click", handleClickOutside);
    }
  });

  onDestroy(() => {
    if (browser) {
      document.removeEventListener("click", handleClickOutside);
    }
  });
</script>

<div class="relative inline-block text-left" bind:this={dropdownEl}>
  <button
    on:click|stopPropagation={toggle}
    class="flex items-center text-sm text-gray-700 hover:text-blue-600 focus:outline-none"
  >
    <User class="w-5 h-5" color="#065B8C" />
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>

  {#if open}
    <div class="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-xl z-50">
      <a
        href="/account/profile"
        class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-1.5"
      >
        <UserCog class="w-4 h-4" color="#065B8C" />
        Profile</a
      >

      <a
        href="/account/profile"
        class="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-1.5"
      >
        <Settings class="w-4 h-4" color="#065B8C" />
        Settings</a
      >

      <form method="POST" action="/auth/logout">
        <button
          type="submit"
          class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-1.5"
        >
          <LogOut class="w-4 h-4" color="#DC2626" />
          Logout
        </button>
      </form>
    </div>
  {/if}
</div>
