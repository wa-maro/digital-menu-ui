<script lang="ts">
  import { cartStore } from "$lib/stores/cart.store";
  import { notify } from "$lib/stores/notifications";
  import { userStore } from "$lib/stores/user.store";

  export let item: MenuItem;
  export let quantity: number = 1;

  async function addToCart() {
    try {
      if ($userStore.isAuthenticated) {
        const cartRes = await fetch("/../cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ item, quantity }),
        });

        const data = await cartRes.json();

        if (!cartRes.ok || !data.success) {
          notify(data.error || "Failed to add item to cart", "error");
          return;
        }

        cartStore.set(data.cart);
      } else {
        cartStore.addItem({
          _id: crypto.randomUUID(),
          item,
          quantity,
          price: item.price,
        });
      }

      notify("item was addes to a cart", "success");
    } catch (err) {
      notify("Something went wrong", "error");
    }
  }
</script>

<!-- Add to Cart Button -->
<button
  onclick={addToCart}
  class="bg-[#065B8C] hover:bg-[#044974] text-white text-sm px-4 py-1.5 cursor-pointer rounded-full transition-all duration-200"
>
  Add to Cart
</button>
