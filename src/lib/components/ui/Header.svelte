<script lang="ts">
  import { cartStore } from "$lib/stores/cart.store";
  import { userStore } from "$lib/stores/user.store";

  let mobileNavOpen = false;
  let avatarMenuOpen = false;

  const toggleMobileNav = () => (mobileNavOpen = !mobileNavOpen);
  const toggleAvatarMenu = () => (avatarMenuOpen = !avatarMenuOpen);
</script>

<header class="bg-white shadow-sm">
  <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
    <!-- Logo -->
    <a href="/" class="text-xl font-bold text-[#065B8C]">Digital Menu</a>

    <!-- Desktop Nav -->
    <nav class="hidden md:flex items-center space-x-6">
      <a href="/" class="hover:text-[#065B8C]">Home</a>
      <a href="/menu" class="hover:text-[#065B8C]">Menu</a>
      <a href="/orders/history" class="hover:text-[#065B8C]">My Orders</a>

      <!-- Cart -->
      <a href="/cart" class="relative inline-block">
        <svg
          class="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 8m13-8l2 8M9 21h6"
          />
        </svg>

        <span
          class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
        >
          {$cartStore.length}
        </span>
      </a>

      <!-- User -->
      {#if $userStore.user && $userStore.isAuthenticated}
        <form method="POST" action="/auth/logout" class="flex gap-4 mt-2">
          <button
            type="submit"
            class="text-red-600 hover:underline text-sm cursor-pointer"
          >
            Logout
          </button>
        </form>
      {:else}
        <a
          href="/auth/login"
          class="ml-4 text-sm px-3 py-1 border border-[#065B8C] rounded hover:bg-[#065B8C] hover:text-white"
        >
          Login
        </a>
      {/if}
    </nav>

    <!-- Mobile Hamburger -->
    <button
      class="md:hidden"
      on:click={toggleMobileNav}
      aria-label="Toggle Menu"
    >
      <svg
        class="w-6 h-6 text-gray-700"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  </div>

  <!-- Mobile Nav -->
  {#if mobileNavOpen}
    <div class="md:hidden bg-white shadow-inner">
      <nav class="flex flex-col px-4 py-2 space-y-2">
        <a href="/" class="py-1 hover:text-[#065B8C]">Home</a>
        <a href="/menu" class="py-1 hover:text-[#065B8C]">Menu</a>
        <a href="/orders/history" class="py-1 hover:text-[#065B8C]">My Orders</a
        >
        <a
          href="/cart"
          class="py-1 flex justify-between items-center hover:text-[#065B8C]"
        >
          Cart
          <span
            class="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5"
            >{$cartStore.length}</span
          >
        </a>

        {#if $userStore.user && $userStore.isAuthenticated}
          <form method="POST" action="/auth/logout" class="flex gap-4 mt-2">
            <button
              type="submit"
              class="text-red-600 hover:underline text-sm cursor-pointer py-1 hover:text-[#065B8C]"
            >
              Logout
            </button>
          </form>
        {:else}
          <a href="/auth/login" class="py-1 hover:text-[#065B8C]"> Login </a>
        {/if}
      </nav>
    </div>
  {/if}
</header>
