<script lang="ts">
  import { clickOutside } from "$lib/actions/clickOutside";
  import { OrderStatusEnum } from "$lib/constants/order-status";
  import { scale } from "svelte/transition";

  let open = false;
</script>

<div class="relative inline-block" use:clickOutside={() => (open = false)}>
  <button
    on:click={() => (open = !open)}
    class="flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-sm rounded-lg shadow transition-all duration-300"
  >
    Cancel Request
    <svg
      class="w-4 h-4 ml-1"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>

  {#if open}
    <div
      transition:scale={{ duration: 150 }}
      class="absolute left-0 mt-2 w-52 bg-white rounded-lg shadow-xl z-50 overflow-hidden"
    >
      <form action="?/processCancellation" method="post">
        <input
          type="text"
          name="status"
          class="hidden"
          bind:value={OrderStatusEnum.CANCELLED}
        />
        <button
          type="submit"
          class="w-full text-left px-4 py-2 hover:bg-green-100 text-green-700 text-sm"
        >
          ✔️ Approve Cancellation
        </button>
      </form>

      <form action="?/processCancellation" method="post">
        <input
          type="text"
          name="status"
          class="hidden"
          bind:value={OrderStatusEnum.REJECTED_CANCEL_REQUEST}
        />
        <button
          type="submit"
          class="w-full text-left px-4 py-2 hover:bg-red-100 text-red-700 text-sm"
        >
          ❌ Reject Cancellation
        </button>
      </form>
    </div>
  {/if}
</div>
