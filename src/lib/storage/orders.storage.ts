// Read orders from localStorage
export const getOrdersFromStorage = (): Order[] => {
  if (typeof localStorage !== "undefined") {
    const stored = localStorage.getItem("orders");
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

// Write orders to localStorage
export const saveOrdersToStorage = (orders: Order[]) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("orders", JSON.stringify(orders));
  }
};
