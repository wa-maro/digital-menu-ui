import { cartStore } from "$lib/stores/cart.store";
import { get } from "svelte/store";

export const initialCart = {
  _id: "",
  items: [],
  user: "",
  createdAt: "",
  updatedAt: "",
};

// Read cart from localStorage
export const getCartStorage = (): UserCart => {
  if (typeof localStorage !== "undefined") {
    const stored = localStorage.getItem("my-cart");
    return stored ? JSON.parse(stored) : initialCart;
  }
  return initialCart;
};

// Write cart to localStorage
export const saveCartStorage = (cart: UserCart) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("my-cart", JSON.stringify(cart));
  }
};

export function getItemDetailsById2(itemId: string) {
  const { items } = get(cartStore);
  return items.find((p) => p._id === itemId);
}

export function getItemDetailsById(itemId: string) {
  const { items } = get(cartStore);
  const item = items.find((p) => p._id === itemId);
  if (!item) {
    throw new Error(`Item with ID "${itemId}" not found.`);
  }
  return item;
}
