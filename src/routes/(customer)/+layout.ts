import { PUBLIC_API_URL } from "$env/static/public";
import { userStore } from "$lib/stores/user.store";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async ({ data }) => {
  let userData: User | undefined;

  if (data.user) {
    userStore.set({ isAuthenticated: true, user: data.user });

    userData = await getUserData(data.user.token);
  } else {
    userStore.set({ isAuthenticated: false });
    userData = undefined;
  }

  return {
    user: data.user,
    userData: userData,
  };
};

async function getUserData(token: string) {
  const userRes = await fetch(`${PUBLIC_API_URL}/users/me/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await userRes.json();
}
