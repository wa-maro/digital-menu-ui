<script lang="ts">
  import {
    Menu,
    LayoutDashboard,
    ArrowRight,
    ShoppingCart,
    ShoppingBasket,
    Utensils,
    MenuSquare,
    UtensilsCrossed,
    Activity,
    UserRound,
    Ghost,
    ClipboardList,
    Clock,
    CheckCircle,
  } from "lucide-svelte";
  import { slide } from "svelte/transition";
  let isSidebarExpanded = true;

  let openMenus: Record<string, boolean> = {
    menu: false,
    cart: false,
    orders: false,
  };

  const toggleMenu = (menu: string) => {
    for (const key in openMenus) {
      openMenus[key] = key === menu ? !openMenus[key] : false;
    }
  };

  const toggleSidebar = () => (isSidebarExpanded = !isSidebarExpanded);
</script>

<aside
  class="bg-[#065B8C] text-white h-screen transition-all duration-300"
  class:w-64={isSidebarExpanded}
  class:w-16={!isSidebarExpanded}
>
  <!-- Toggle Sidebar Button -->
  <div class="flex items-center justify-between p-4">
    <button on:click={toggleSidebar} class="text-white cursor-pointer">
      <Menu />
    </button>
  </div>

  <!-- Navigation -->
  <nav class="mt-4">
    <ul class="space-y-2">
      <!-- Dashboard -->
      <li class="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer">
        <LayoutDashboard class="w-5 h-5" />
        {#if isSidebarExpanded}
          <a href="/admin/dashboard" class="ml-3">Dashboard</a>
        {/if}
      </li>

      <!-- Menu Management (Collapsible) -->
      <li class="flex flex-col">
        <button
          class="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer"
          on:click={() => toggleMenu("menu")}
        >
          <Utensils class="w-5 h-5 " />
          {#if isSidebarExpanded}
            <span class="ml-3 font-medium">Menu Management</span>
          {/if}
        </button>
        {#if openMenus.menu}
          <ul
            in:slide={{ duration: 250 }}
            out:slide={{ duration: 200 }}
            class="ml-8 space-y-2 text-sm"
          >
            <li>
              <a
                href="/admin/menu/categories"
                class="flex items-center gap-x-2 px-4 py-2 rounded-md text-white/90 hover:text-white hover:bg-[#044974]/80 transition-all duration-200"
              >
                <MenuSquare
                  size={16}
                  class="text-white/70 group-hover:text-white transition"
                />
                <span class="text-sm font-medium">Categories</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/menu/items"
                class="flex items-center gap-x-2 px-4 py-2 rounded-md text-white/90 hover:text-white hover:bg-[#044974]/80 transition-all duration-200"
              >
                <UtensilsCrossed
                  size={16}
                  class="text-white/70 group-hover:text-white transition"
                />
                <span class="text-sm font-medium">Menu Items</span></a
              >
            </li>
          </ul>
        {/if}
      </li>

      <!-- Cart Management -->
      <li class="flex flex-col">
        <button
          class="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer"
          on:click={() => toggleMenu("cart")}
        >
          <ShoppingCart class="w-5 h-5 " />
          {#if isSidebarExpanded}
            <span class="ml-3 font-medium">Cart Management</span>
          {/if}
        </button>
        {#if openMenus.cart}
          <ul
            in:slide={{ duration: 250 }}
            out:slide={{ duration: 200 }}
            class="ml-8 space-y-2 text-sm"
          >
            <li>
              <a
                href="/admin/cart"
                class="flex items-center gap-x-2 px-4 py-2 rounded-md text-white/90 hover:text-white hover:bg-[#044974]/80 transition-all duration-200"
              >
                <ShoppingCart
                  size={16}
                  class="text-white/70 group-hover:text-white transition"
                />
                <span class="text-sm font-medium">All Carts</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/cart"
                class="flex items-center gap-x-2 px-4 py-2 rounded-md text-white/90 hover:text-white hover:bg-[#044974]/80 transition-all duration-200"
              >
                <Activity
                  size={16}
                  class="text-white/70 group-hover:text-white transition"
                />
                <span class="text-sm font-medium">Active Carts</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/cart"
                class="flex items-center gap-x-2 px-4 py-2 rounded-md text-white/90 hover:text-white hover:bg-[#044974]/80 transition-all duration-200"
              >
                <UserRound
                  size={16}
                  class="text-white/70 group-hover:text-white transition"
                />
                <span class="text-sm font-medium">Guest Carts</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/cart"
                class="flex items-center gap-x-2 px-4 py-2 rounded-md text-white/90 hover:text-white hover:bg-[#044974]/80 transition-all duration-200"
              >
                <Ghost
                  size={16}
                  class="text-white/70 group-hover:text-white transition"
                />
                <span class="text-sm font-medium">Abandoned Carts</span>
              </a>
            </li>
          </ul>
        {/if}
      </li>

      <!-- Orders Management -->
      <li class="flex flex-col">
        <button
          class="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer"
          on:click={() => toggleMenu("orders")}
        >
          <ShoppingBasket class="w-5 h-5 " />
          {#if isSidebarExpanded}
            <span class="ml-3 font-medium">Orders Management</span>
          {/if}
        </button>
        {#if openMenus.orders}
          <ul
            in:slide={{ duration: 250 }}
            out:slide={{ duration: 200 }}
            class="ml-8 space-y-2 text-sm"
          >
            <li>
              <a
                href="/admin/orders"
                class="flex items-center gap-x-2 px-4 py-2 rounded-md text-white/90 hover:text-white hover:bg-[#044974]/80 transition-all duration-200"
              >
                <ClipboardList
                  size={16}
                  class="text-white/70 group-hover:text-white transition"
                />
                <span class="text-sm font-medium">All Orders</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/orders"
                class="flex items-center gap-x-2 px-4 py-2 rounded-md text-white/90 hover:text-white hover:bg-[#044974]/80 transition-all duration-200"
              >
                <Clock
                  size={16}
                  class="text-white/70 group-hover:text-white transition"
                />
                <span class="text-sm font-medium">Pending Orders</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/orders"
                class="flex items-center gap-x-2 px-4 py-2 rounded-md text-white/90 hover:text-white hover:bg-[#044974]/80 transition-all duration-200"
              >
                <CheckCircle
                  size={16}
                  class="text-white/70 group-hover:text-white transition"
                />
                <span class="text-sm font-medium">Completed Orders</span></a
              >
            </li>
          </ul>
        {/if}
      </li>
    </ul>
  </nav>
</aside>

<style>
  /* Smooth transition when expanding/collapsing */
  aside {
    overflow: hidden;
  }
</style>
