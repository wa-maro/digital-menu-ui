import { writable } from "svelte/store";

export const userStore = writable<{ isAuthenticated: boolean; user?: any }>({
  isAuthenticated: false,
});
