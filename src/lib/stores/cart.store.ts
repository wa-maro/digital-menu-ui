import {
  getCartStorage,
  initialCart,
  saveCartStorage,
} from "$lib/storage/cart.storage";
import { derived, writable } from "svelte/store";

export const cartStore = (() => {
  const { subscribe, update, set } = writable<UserCart>(getCartStorage());

  // Persist to localStorage on every change
  subscribe((items) => saveCartStorage(items));

  return {
    subscribe,
    set,

    // Update item quantity
    updateItemQuantity: (itemId: string, quantity: number) =>
      update((cart) => {
        const updatedItems = cart.items.map((i) =>
          i.item._id === itemId ? { ...i, quantity } : i
        );
        return { ...cart, items: updatedItems };
      }),

    addItem: (newItem: CartItemPopulated) =>
      update((cart) => {
        const existing = cart.items.find(
          (i) => i.item._id === newItem.item._id
        );
        let updatedItems;

        if (existing) {
          updatedItems = cart.items.map((i) =>
            i.item._id === newItem.item._id
              ? { ...i, quantity: i.quantity + newItem.quantity }
              : i
          );
        } else {
          updatedItems = [...cart.items, newItem];
        }

        return { ...cart, items: updatedItems };
      }),
      
    // Remove item
    removeItem: (itemId: string) =>
      update((cart) => {
        cart.items = cart.items.filter((i) => i.item._id !== itemId);
        return { ...cart };
      }),

    // Clear the cart
    clear: () => set(initialCart),
  };
})();

export const cartTotal = derived(cartStore, ($cart) =>
  $cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
);
