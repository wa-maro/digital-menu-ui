import { VITE_API_URL_CUSTOMER } from "$env/static/private";
import { redirect, type Actions } from "@sveltejs/kit";

export const actions: Actions = {
  default: async ({ request, cookies, fetch }) => {
    const formData = await request.formData();

    const rawItems = formData.get("items");
    const items = rawItems ? JSON.parse(rawItems.toString()) : [];
    const type = formData.get("type") as OrderType;
    const paymentMethod = formData.get("paymentMethod") as PaymentMethod;

    const tableNumber = formData.get("tableNumber")?.toString();
    const pickupTime = formData.get("pickupTime")?.toString();
    const provider = formData.get("provider")?.toString() as PaymentProvider;
    const accountNumber = formData.get("accountNumber")?.toString();
    const deliveryAddress = formData.get("deliveryAddress")?.toString();
    const contactPhone = formData.get("contactPhone")?.toString();
    const rawLocation = formData.get("deliveryLocation");
    const deliveryLocation = rawLocation
      ? JSON.parse(rawLocation.toString())
      : null;

    const orderItems = items.map((i: any) => ({
      itemId: i.item._id,
      quantity: i.quantity,
      price: i.price,
      // customization: i.customization ?? null,
    }));

    const order = {
      items: orderItems,
      type: type,
      paymentMethod,
      provider,
      deliveryAddress,
      deliveryLocation,
      contactPhone,
      accountNumber,
      pickupTime,
      tableNumber,
    };

    const res = await fetch(`${VITE_API_URL_CUSTOMER}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("token")}`,
      },
      body: JSON.stringify(order),
    });

    if (!res.ok) {
      const error = await res.text();
      return { success: false, error };
    }

    throw redirect(303, "/orders/order-success");
  },
};
