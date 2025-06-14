import {
  getOrdersFromStorage,
  saveOrdersToStorage,
} from "$lib/storage/orders.storage";
import { writable } from "svelte/store";

export const createOrderStore = () => {
  const { subscribe, update, set } = writable<Order[]>(getOrdersFromStorage());

  subscribe((items) => saveOrdersToStorage(items));

  return {
    subscribe,

    addOrder: (order: Order) =>
      update((orders) => {
        const updated = [order, ...orders];
        localStorage.setItem("userOrders", JSON.stringify(updated));
        return updated;
      }),

    loadOrder: (orderId: string) => {
      const orders = JSON.parse(localStorage.getItem("userOrders") || "[]");
      return orders.find((order: Order) => order._id === orderId) || null;
    },

    loadOrders: async () => {
      const storedOrders = localStorage.getItem("userOrders");
      const localOrders = JSON.parse(storedOrders || "[]");
      set(localOrders);
      return localOrders;
    },
  };
};

export const orderStore = createOrderStore();
