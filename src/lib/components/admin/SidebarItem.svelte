<script lang="ts">
  export let icon;
  export let label: string;
  export let href: string | null = null;
  export let isSidebarExpanded: boolean;
  export let onClick: (() => void) | null = null;
  let active: boolean = false;
</script>

<li class="relative group text-sm">
  {#if href}
    <a
      {href}
      class="flex items-center p-2 transition hover:bg-white/10 cursor-pointer"
      class:bg-white={active}
      class:opacity-10={active}
    >
      <svelte:component this={icon} class="w-5 h-5" />
      {#if isSidebarExpanded}
        <span class="ml-3">{label}</span>
      {/if}
    </a>
  {:else}
    <button
      on:click={onClick}
      aria-label={label}
      class="flex items-center w-full p-2 transition hover:bg-white/10 cursor-pointer"
    >
      <svelte:component this={icon} class="w-5 h-5" />
      {#if isSidebarExpanded}
        <span class="ml-3">{label}</span>
      {/if}
    </button>
  {/if}
</li>
