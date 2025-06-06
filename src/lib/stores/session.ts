import { writable } from "svelte/store";

export const sessionStore = writable<{ customer: User | null }>({
  customer: null,
});
