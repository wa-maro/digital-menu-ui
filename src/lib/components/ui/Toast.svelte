<script lang="ts">
  import { toasts } from "$lib/stores/notifications";
  import { fly } from "svelte/transition";
  import { X, CheckCircle, Info, AlertTriangle } from "lucide-svelte";

  function remove(id: number) {
    toasts.update((all) => all.filter((t) => t.id !== id));
  }
</script>

<div class="fixed bottom-4 right-4 z-50 flex flex-col gap-0.5 w-[18rem]">
  {#each $toasts as toast (toast.id)}
    <div
      in:fly={{ y: -12, opacity: 0, duration: 200 }}
      out:fly={{ y: 8, opacity: 0, duration: 150 }}
      class="mb-0.5 relative flex items-start gap-2 px-3 py-1.5 rounded shadow text-white border-l-4
        transition-transform duration-200 ease-out
        {toast.type === 'success'
        ? 'bg-green-600 border-green-300'
        : toast.type === 'error'
          ? 'bg-red-600 border-red-300'
          : 'bg-blue-600 border-blue-300'}"
    >
      {#if toast.type === "success"}
        <CheckCircle class="mt-0.5 shrink-0" size={16} />
      {:else if toast.type === "error"}
        <AlertTriangle class="mt-0.5 shrink-0" size={16} />
      {:else}
        <Info class="mt-0.5 shrink-0" size={16} />
      {/if}

      <div class="flex-1 text-xs leading-snug">{toast.message}</div>

      <button
        class="ml-1 p-1 rounded hover:bg-white/10 transition"
        on:click={() => remove(toast.id)}
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  {/each}
</div>
