<script lang="ts">
  export let title: string;
  export let icon;
  export let onClick: (() => void) | null;
</script>

<div class="px-2">
  <button
    on:click={onClick}
    aria-label={title}
    class="flex items-center w-full text-xs font-semibold text-white/70 hover:bg-white/10 uppercase tracking-wider p-2 transition cursor-pointer"
  >
    <svelte:component this={icon} class="w-5 h-5" />
    <span class="ml-3">{title}</span>
  </button>

  <ul class="space-y-1">
    <slot />
  </ul>
</div>
