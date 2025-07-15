<script lang="ts">
  import { derived, get } from "svelte/store";
  import { page } from "$app/stores";
  import { clsx } from "clsx";

  export let icon;
  export let label: string;
  export let href: string;

  $: active = $page.url.pathname === href;
</script>

<li class="relative group">
  <a
    {href}
    class={clsx(
      "flex items-center p-2 transition text-white hover:bg-white/10 rounded-md cursor-pointer",
      {
        "bg-[#044974]": active, // Slightly darker active background
        "opacity-100 font-semibold": active, // Make active item bolder
      }
    )}
  >
    <svelte:component this={icon} class="w-4 h-4" />
    <span class="ml-3">{label}</span>
  </a>
</li>
