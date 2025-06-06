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
}

export {};
