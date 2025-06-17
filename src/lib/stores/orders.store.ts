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
    set,

    addOrder: (order: Order) =>
      update((orders) => {
        const updated = [order, ...orders];
        localStorage.setItem("orders", JSON.stringify(updated));
        return updated;
      }),

    loadOrder: (orderId: string) => {
      const orders = JSON.parse(localStorage.getItem("orders") || "[]");
      return orders.find((order: Order) => order._id === orderId) || null;
    },

    loadOrders: async () => {
      const storedOrders = localStorage.getItem("orders");
      const localOrders = JSON.parse(storedOrders || "[]");
      set(localOrders);
      return localOrders;
    },
  };
};

export const activeReorder = writable<Order | null>(null);

export const reorder = (order: Order) => {
  activeReorder.set(order);
};

export const orderStore = createOrderStore();
