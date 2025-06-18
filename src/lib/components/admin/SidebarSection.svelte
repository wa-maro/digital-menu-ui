<script lang="ts">
  export let title: string = "";
  export let isSidebarExpanded: boolean;
</script>

<div class="px-2">
  {#if isSidebarExpanded && title}
    <div
      class="text-xs font-semibold text-white/60 uppercase tracking-wider px-2 py-2"
    >
      {title}
    </div>
  {/if}

  <ul class="space-y-1">
    <slot />
  </ul>
</div>
