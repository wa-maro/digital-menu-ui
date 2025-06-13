import { writable } from "svelte/store";

const storedOrders = JSON.parse(localStorage.getItem("userOrders") || "[]");

function createOrderStore() {
  const { subscribe, update, set } = writable<Order[]>(storedOrders);

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
}

export const orderStore = createOrderStore();
