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

  export interface Category {
    _id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }
}

export {};
