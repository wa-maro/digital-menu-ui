<script lang="ts">
  import { goto } from "$app/navigation";
  import { userStore } from "$lib/stores/user.store";
  import { cartStore, cartTotal } from "$lib/stores/cart.store";
  import { getItemDetailsById } from "$lib/storage/cart.storage";
  import { fade, fly } from "svelte/transition";
  import { flip } from "svelte/animate";
  import { enhance } from "$app/forms";
  import { notify } from "$lib/stores/notifications";
  import { PUBLIC_API_URL } from "$env/static/public";

  export let data: { data: UserCart; user: User };

  if (data.data) {
    cartStore.set(data.data);
  }

  const proceedToCheckout = async () => {
    if ($userStore.isAuthenticated) return goto("/orders/checkout");

    const redirectUrl = encodeURIComponent("/orders/checkout");
    goto(`/auth/login?redirect=${redirectUrl}`);
  };

  const updateQuantity = async (id: string, quantity: number) => {
    if ($userStore.isAuthenticated) {
      const res = await fetch(`/cart`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, quantity: quantity }),
      });

      if (!res.ok) {
        console.error("Failed to update quantity");
        return;
      }
    }

    cartStore.updateItemQuantity(id, quantity);

    notify(`quantity updated successful`, "success");
  };
</script>

<div class="p-4 pt-8 max-w-5xl mx-auto space-y-6">
  {#if $cartStore.items.length > 0}
    <div class="grid md:grid-cols-3 gap-6">
      <!-- Cart Items -->
      <div class="md:col-span-2 space-y-4">
        {#each $cartStore.items as cartItem (cartItem._id)}
          {@const { item } = getItemDetailsById(cartItem._id)}
          <div
            in:fly={{ y: 20, duration: 300 }}
            out:fade={{ duration: 200 }}
            animate:flip
            class="flex items-center justify-between p-4 bg-white rounded-2xl shadow hover:shadow-lg transition-shadow"
          >
            <div class="flex items-center gap-4">
              <img
                src={`${PUBLIC_API_URL}${item.imageURL.slice(item.imageURL.indexOf("/upload"))}`}
                alt={item.name}
                class="w-20 h-20 object-cover rounded-xl shrink-0"
              />
              <div>
                <p class="font-semibold text-gray-800">{item.name}</p>
                <div class="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    on:click={() =>
                      updateQuantity(item._id, cartItem.quantity - 1)}
                    class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-lg flex items-center justify-center disabled:opacity-40 cursor-pointer"
                    disabled={cartItem.quantity <= 1}
                  >
                    −
                  </button>

                  <span class="w-8 text-center text-base"
                    >{cartItem.quantity}</span
                  >

                  <button
                    type="button"
                    on:click={() =>
                      updateQuantity(item._id, cartItem.quantity + 1)}
                    class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-lg flex items-center justify-center cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div class="flex flex-col items-end">
              <p class="text-lg font-semibold text-gray-900">
                TZS {(cartItem.price * cartItem.quantity).toFixed(2)}
              </p>
              <form
                use:enhance={() => notify(`cart item removed`, "error")}
                method="post"
                action="?/removeItem"
                on:submit={() => cartStore.removeItem(item._id)}
              >
                <input type="hidden" name="itemId" value={item._id} />
                <button
                  type="submit"
                  class="text-sm text-red-500 hover:text-red-700 mt-2 cursor-pointer"
                >
                  Remove
                </button>
              </form>
            </div>
          </div>
        {/each}

        <form
          use:enhance={() => notify(`all cart item removed`, "error")}
          method="post"
          action="?/clearCart"
          on:submit={cartStore.clear}
        >
          <button
            type="submit"
            class="w-full bg-red-500 hover:bg-red-600 text-white text-base font-semibold py-3 rounded-xl shadow mt-4 transition-colors cursor-pointer"
            disabled={$cartStore.items.length === 0}
          >
            Clear Cart
          </button>
        </form>
      </div>

      <!-- Checkout Summary -->
      <div
        class="sticky top-20 bg-white rounded-2xl shadow p-6 h-fit space-y-4"
      >
        <h2 class="text-xl font-semibold text-gray-800 mb-2">Order Summary</h2>
        <div class="flex justify-between text-base text-gray-700">
          <span>Total</span>
          <span class="font-bold text-lg text-gray-900"
            >TZS {$cartTotal.toFixed(2)}</span
          >
        </div>

        <button
          on:click={proceedToCheckout}
          class="w-full bg-[#065B8C] hover:bg-[#044974] text-white text-lg font-semibold py-3 rounded-xl shadow mt-4 transition-colors cursor-pointer"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  {:else}
    <div class="text-center text-gray-500 space-y-4 py-12">
      <p class="text-lg">Your cart is empty.</p>
      <a
        href="/menu"
        class="inline-block bg-[#065B8C] hover:bg-[#044974] text-white text-lg font-semibold py-3 px-6 rounded-xl shadow transition-colors"
      >
        Continue Shopping
      </a>
    </div>
  {/if}
</div>
