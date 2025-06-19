import { writable } from "svelte/store";

type ToastType = {
  id: number;
  message: string;
  type?: "success" | "error" | "info";
  timeout?: number;
};

export const toasts = writable<ToastType[]>([]);
let counter = 0;

export function notify(
  message: string,
  type: "success" | "error" | "info" = "info",
  baseTimeout = 3000
) {
  const id = ++counter;

  toasts.update((all) => {
    const newToast: ToastType = { id, message, type, timeout: baseTimeout };
    const delay = all.length * baseTimeout;

    setTimeout(() => {
      toasts.update((current) => current.filter((t) => t.id !== id));
    }, baseTimeout + delay);

    return [...all, newToast];
  });
}
