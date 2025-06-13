// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: {
        token: string;
        role: string;
      } | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }

  interface LoadResult<T> {
    user: {
      token: string;
      role: string;
    };
    data: T[] = [];
  }

  export interface Category {
    _id?: string;
    name: string;
    description: string;
    createdAt?: string;
    updatedAt?: string;
  }

  export interface MenuItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    available: boolean;
    category: Category;
    imageUrl: string;
    createdAt?: string;
    updatedAt?: string;
  }

  export interface CartItem {
    _id: string;
    name: string;
    price: number;
    imageUrl?: string;
    quantity: number;
  }

  export interface User {
    _id: string;
    fullName: string;
    email: string;
    avatarUrl?: string;
    role: "customer" | "admin" | "manager";
  }

  export type OrderType = "takeaway" | "delivery" | "dine-in";
  export type PaymentMethod = "cash" | "mpesa";

  export interface Order {
    items: CartItem[];
    type: OrderType;
    paymentMethod: PaymentMethod;
    orderDetails?: {
      tableNumber?: string;
      pickupTime?: string;
      deliveryAddress?: string;
    };
  }
}

export {};
