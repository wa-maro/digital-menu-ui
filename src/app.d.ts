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
  export type SelectedNetwork = "mpesa" | "tigopesa" | "airtel-money";
  export interface DeliveryLocation {
    lng: number;
    lat: number;
    address: string;
  }

  export interface Order {
    _id: string;
    orderId: string;
    user: User;
    items: CartItemPopulated[];
    type: OrderType;
    paymentMethod: PaymentMethod;
    paymentStatus: any;
    total: number;
    status: OrderStatus;
    selectedNetwork?: SelectedNetwork;
    phoneNumber?: string;
    contactPhone?: string;
    tableNumber?: string;
    pickupTime?: string;
    deliveryAddress?: string;
    deliveryLocation?: DeliveryLocation;
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
    user: any;
    items: CartItemPopulated[];
    createdAt?: string;
    updatedAt?: string;
  }

  export interface DashboardSummary {
    totalOrders: number;
    totalRevenue: number; // in smallest currency unit (e.g. cents)
    totalMenuItems: number;
    activeUsers: number;
  }

  export interface RecentOrder {
    _id: string;
    user: User;
    orderId: string;
    items: OrderItem[];
    type: OrderType;
    status: OrderStatus;
    paymentMethod: PaymentMethod;
    paymentStatus: PaymentStatus;
    paymentLog: PaymentLogEntry[];
    paymentDetails: PaymentDetails;
    total: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
  }

  export interface DashboardPageData {
    summary: DashboardSummary;
  }

  export interface MediaItem {
    _id: string;
    displayName: string;
    filename: string;
    url: string;
    category: Category;
    linkedMenuItemIds: MenuItem[];
    uploadedBy: User;
    createdAt?: string;
    updatedAt?: string;
  }

  export interface MediaResponse {
    items: MediaItem[];
    total: number;
  }

  interface MediaUploadResponse {
    message: string;
    url: string;
    filename: string;
  }
}

export {};
