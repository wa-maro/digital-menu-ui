// Read cart from localStorage
export const getCartFromStorage = (): CartItem[] => {
  if (typeof localStorage !== "undefined") {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

// Write cart to localStorage
export const saveCartToStorage = (cart: CartItem[]) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};
