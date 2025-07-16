<script lang="ts">
  import { getNextOrderAction } from "$lib/utils/order-status";

  export let order: Order;

  const action = getNextOrderAction(order);
</script>

{#if action}
  <form action="?/updateStatus" method="post">
    <input type="text" name="status" class="hidden" value={action.nextStatus} />
    <button type="submit" class="btn-primary">{action.label}</button>
  </form>
{/if}
