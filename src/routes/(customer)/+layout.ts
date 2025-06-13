import { userStore } from "$lib/stores/user.store";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = ({ data }) => {
  if (data.user) {
    userStore.set({ isAuthenticated: true, user: data.user });
  } else {
    userStore.set({ isAuthenticated: false });
  }

  return {
    user: data.user,
  };
};
