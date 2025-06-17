import { VITE_API_URL_CUSTOMER } from "$env/static/private";
import { cartStore } from "$lib/stores/cart.store";
import { orderStore } from "$lib/stores/orders.store";
import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ request, cookies, fetch }) => {
    const formData = await request.formData();

    const rawItems = formData.get("items");
    const items = rawItems ? JSON.parse(rawItems.toString()) : [];
    const type = formData.get("type") as OrderType;
    const paymentMethod = formData.get("paymentMethod") as PaymentMethod;

    const status = formData.get("status") as OrderStatus;
    const total = Number(formData.get("total"));
    const tableNumber = formData.get("tableNumber")?.toString();
    const pickupTime = formData.get("pickupTime")?.toString();
    const selectedNetwork = formData
      .get("selectedNetwork")
      ?.toString() as SelectedNetwork;
    const phoneNumber = formData.get("phoneNumber")?.toString();
    const deliveryAddress = formData.get("deliveryAddress")?.toString();

    const orderItems = items.map((i: any) => ({
      itemId: i.item._id,
      quantity: i.quantity,
      price: i.price,
      // customization: i.customization ?? null,
    }));

    try {
      const res = await fetch(`${VITE_API_URL_CUSTOMER}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies.get("token")}`,
        },
        body: JSON.stringify({
          items: orderItems,
          type: type,
          paymentMethod,
          paymentDetails: {
            selectedNetwork,
            deliveryAddress,
            phoneNumber,
            pickupTime,
            tableNumber,
          },
        }),
      });

      if (!res.ok) {
        const error = await res.text();
        return { success: false, error };
      }
    } catch (error) {
      return {
        success: false,
        error: "Failed to place order. Please try again.",
      };
    }
  },
};
