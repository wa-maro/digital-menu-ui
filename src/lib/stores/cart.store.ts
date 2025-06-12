import {
  getCartFromStorage,
  saveCartToStorage,
} from "$lib/storage/cart.storage";
import { derived, writable } from "svelte/store";

export const cartStore = (() => {
  const { subscribe, update, set } = writable<CartItem[]>(getCartFromStorage());

  // Persist to localStorage on every change
  subscribe((items) => saveCartToStorage(items));

  return {
    subscribe,
    set,
    addToCart: async (item: CartItem) => {
      update((items) => {
        const existing = items.find((i) => i._id === item._id);
        if (existing) {
          return items.map((i) =>
            i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
          );
        } else {
          return [...items, { ...item }];
        }
      });
    },

    updateQuantity: async (cartId: string, quantity: number) => {
      update((items) => {
        const itemIndex = items.findIndex((item) => item._id === cartId);
        if (itemIndex !== -1) {
          items[itemIndex].quantity = quantity;
        }
        return [...items];
      });
    },

    removeFromCart: (itemId: string) => {
      update((items) => items.filter((item) => item._id !== itemId));
    },

    increment: (itemId: string) => {
      update((items) =>
        items.map((item) =>
          item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    },

    decrement: (itemId: string) => {
      update((items) =>
        items.map((item) =>
          item._id === itemId && item.quantity > 1
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    },

    clearCart: () => set([]),
  };
})();

export const cartTotal = derived(cartStore, ($cartStore) =>
  $cartStore.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
