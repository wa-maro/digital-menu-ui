<script lang="ts">
  import { cartStore, cartTotal } from "$lib/stores/cart";
  import { fade, fly } from "svelte/transition";
  import { flip } from "svelte/animate";
</script>

<div class="p-4 max-w-5xl mx-auto space-y-6">
  <h1 class="text-3xl font-bold text-center text-gray-900">Your Cart</h1>

  {#if $cartStore.length > 0}
    <div class="grid md:grid-cols-3 gap-6">
      <!-- Cart Items -->
      <div class="md:col-span-2 space-y-4">
        {#each $cartStore as { _id, name, price, quantity, imageUrl } (_id)}
          <div
            in:fly={{ y: 20, duration: 300 }}
            out:fade={{ duration: 200 }}
            animate:flip
            class="flex items-center justify-between p-4 bg-white rounded-2xl shadow hover:shadow-lg transition-shadow"
          >
            <div class="flex items-center gap-4">
              <img
                src={imageUrl}
                alt={name}
                class="w-20 h-20 object-cover rounded-xl shrink-0"
              />
              <div>
                <p class="font-semibold text-gray-800">{name}</p>
                <div class="flex items-center gap-2 mt-2">
                  <button
                    type="button"
                    on:click={() => cartStore.decrement(_id)}
                    class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-lg flex items-center justify-center disabled:opacity-40"
                    disabled={quantity <= 1}
                  >
                    −
                  </button>

                  <span class="w-8 text-center text-base">{quantity}</span>

                  <button
                    type="button"
                    on:click={() => cartStore.increment(_id)}
                    class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 text-lg flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div class="flex flex-col items-end">
              <p class="text-lg font-semibold text-gray-900">
                TZS {(price * quantity).toFixed(2)}
              </p>
              <form
                method="post"
                action="?/removeItem"
                on:submit={() => cartStore.removeFromCart(_id)}
              >
                <input type="hidden" name="itemId" value={_id} />
                <button
                  type="submit"
                  class="text-sm text-red-500 hover:text-red-700 mt-2"
                >
                  Remove
                </button>
              </form>
            </div>
          </div>
        {/each}

        <button
          on:click={cartStore.clearCart}
          class="w-full bg-red-500 hover:bg-red-600 text-white text-base font-semibold py-3 rounded-xl shadow mt-4 transition-colors"
          disabled={$cartStore.length === 0}
        >
          Clear Cart
        </button>
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
          class="w-full bg-[#065B8C] hover:bg-[#044974] text-white text-lg font-semibold py-3 rounded-xl shadow mt-4 transition-colors"
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
