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
    imageURL: string;
    createdAt?: string;
    updatedAt?: string;
  }

  export interface User {
    _id: string;
    fullName: string;
    email: string;
    avatarUrl?: string;
    role: "customer" | "admin" | "manager";
  }

  export type OrderStatus =
    | "pending"
    | "confirmed"
    | "preparing"
    | "ready"
    | "out_for_delivery"
    | "delivered"
    | "picked"
    | "completed"
    | "cancel_request"
    | "cancelled"
    | "rejected_cancel_request"
    | "failed";
  export type OrderType = "takeaway" | "delivery" | "dine-in";
  export type PaymentMethod = "cash" | "lipa_namba";
  export type SelectedNetwork = "Mpesa" | "tigopesa";

  interface PaymentDetails {
    selectedNetwork?: SelectedNetwork;
    phoneNumber?: string;
    tableNumber?: string;
    pickupTime?: string;
    deliveryAddress?: string;
  }

  export interface Order {
    _id?: string;
    items: CartItemPopulated[];
    type: OrderType;
    paymentMethod: PaymentMethod;
    total: number;
    status: OrderStatus;
    paymentDetails?: PaymentDetails;
    createdAt?: string;
    updatedAt?: string;
  }

  export interface CartItemPopulated {
    _id: string;
    item: MenuItem;
    quantity: number;
    price: number;
  }

  export interface UserCart {
    _id: string;
    user: string;
    items: CartItemPopulated[];
    createdAt?: string;
    updatedAt?: string;
  }
}

export {};
