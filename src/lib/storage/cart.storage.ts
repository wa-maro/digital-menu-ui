import { cartStore } from "$lib/stores/cart.store";
import { get } from "svelte/store";

export const initialCart: UserCart = {
  _id: "",
  items: [{
    _id: "",
    price: 0, quantity: 0, item: {
      _id: "", imageURL: "", available: false, category: {
        _id: "", name: "", description: ""
      }, description: "", name: "", price: 0, createdAt: "", updatedAt: ""
    }
  }],
  user: {
    _id: "",
    email: "", role: "customer", avatarUrl: "",
    profile: {
      _id: "", fullName: "", address: ""
    }
  },
  createdAt: undefined,
  updatedAt: undefined,
};

// Read cart from localStorage
export const getCartStorage = (): UserCart => {
  if (typeof localStorage !== "undefined") {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : initialCart;
  }
  return initialCart;
};

// Write cart to localStorage
export const saveCartStorage = (cart: UserCart) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export function getItemDetailsById(itemId: string) {
  const { items } = get(cartStore);
  const item = items.find((p) => p._id === itemId);
  if (!item) {
    throw new Error(`Item with ID "${itemId}" not found.`);
  }
  return item;
}
