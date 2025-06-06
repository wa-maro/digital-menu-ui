<script lang="ts">
  import { cart } from "$lib/stores/cart";

  // Mock user session (replace with your actual store)
  const user = {
    name: "Alex",
    avatarUrl: "https://i.pravatar.cc/40?u=alex", // or default avatar
    loggedIn: true, // toggle this to false to simulate logged out state
  };

  let mobileNavOpen = false;
  let avatarMenuOpen = false;

  $: itemCount = $cart.reduce((sum, entry) => sum + entry.quantity, 0);

  const toggleMobileNav = () => (mobileNavOpen = !mobileNavOpen);
  const toggleAvatarMenu = () => (avatarMenuOpen = !avatarMenuOpen);
</script>

<div class="min-h-screen flex flex-col text-gray-800">
  <!-- Header -->
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
      <!-- Logo -->
      <a href="/" class="text-xl font-bold text-[#065B8C]">Digital Menu</a>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex items-center space-x-6">
        <a href="/" class="hover:text-[#065B8C]">Home</a>
        <a href="/menu" class="hover:text-[#065B8C]">Menu</a>
        <a href="/orders" class="hover:text-[#065B8C]">My Orders</a>

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
          {#if itemCount > 0}
            <span
              class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
            >
              {itemCount}
            </span>
          {/if}
        </a>

        <!-- User -->
        {#if user.loggedIn}
          <div class="relative">
            <button on:click={toggleAvatarMenu} class="ml-4 focus:outline-none">
              <img
                src={user.avatarUrl}
                alt="User avatar"
                class="w-8 h-8 rounded-full border-2 border-[#065B8C] hover:opacity-90"
              />
            </button>

            {#if avatarMenuOpen}
              <div
                class="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50"
              >
                <a href="/profile" class="block px-4 py-2 hover:bg-gray-100"
                  >Profile</a
                >
                <a href="auth/logout" class="block px-4 py-2 hover:bg-gray-100"
                  >Logout</a
                >
              </div>
            {/if}
          </div>
        {:else}
          <a
            href="/login"
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
          <a href="/" class="py-1 border-b hover:text-[#065B8C]">Home</a>
          <a href="/menu" class="py-1 border-b hover:text-[#065B8C]">Menu</a>
          <a href="/orders" class="py-1 border-b hover:text-[#065B8C]"
            >My Orders</a
          >
          <a
            href="/cart"
            class="py-1 flex justify-between items-center hover:text-[#065B8C]"
          >
            Cart
            {#if itemCount > 0}
              <span
                class="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5"
                >{itemCount}</span
              >
            {/if}
          </a>

          {#if user.loggedIn}
            <a href="/profile" class="py-1 border-b hover:text-[#065B8C]"
              >Profile</a
            >
            <a href="/logout" class="py-1 hover:text-[#065B8C]">Logout</a>
          {:else}
            <a href="/login" class="py-1 hover:text-[#065B8C]">Login</a>
          {/if}
        </nav>
      </div>
    {/if}
  </header>

  <!-- Main Content -->
  <main class="flex-grow max-w-7xl mx-auto px-4 py-6">
    <slot />
  </main>

  <!-- Footer -->
  <footer class="text-center text-sm text-gray-500 py-4 shadow-sm">
    &copy; {new Date().getFullYear()} My Restaurant. All rights reserved.
  </footer>
</div>
