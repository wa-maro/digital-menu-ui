import { writable } from "svelte/store";

export const cart = writable<CartItem[]>([
  {
    _id: "1a2b3c",
    name: "Wireless Mouse",
    price: 29.99,
    quantity: 2,
  },
  {
    _id: "4d5e6f",
    name: "Mechanical Keyboard",
    price: 89.99,
    quantity: 1,
  },
  {
    _id: "7g8h9i",
    name: "HD Monitor",
    price: 199.99,
    quantity: 1,
  },
]);
