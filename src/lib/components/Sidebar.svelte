<script lang="ts">
  import {
    Menu,
    LayoutDashboard,
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
  import SidebarSection from "./SidebarSection.svelte";
  import SidebarItem from "./SidebarItem.svelte";
  let isSidebarExpanded = false;

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

  const toggleSidebar = () => {
    for (const key in openMenus) {
      openMenus[key] = false;
    }

    isSidebarExpanded = !isSidebarExpanded;
  };
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
      <li class="relative group">
        <a
          href="/admin/dashboard"
          class="flex items-center px-4 py-2 hover:bg-white/10 cursor-pointer"
        >
          <LayoutDashboard class="w-5 h-5" />
          {#if isSidebarExpanded}
            <span class="ml-3">Dashboard</span>
          {/if}
        </a>

        {#if !isSidebarExpanded}
          <div
            class="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 text-xs text-white bg-black rounded shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none z-50 whitespace-nowrap"
          >
            Dashboard
          </div>
        {/if}
      </li>

      <!-- Menu Management (Collapsible) -->
      <SidebarSection title="Menu" {isSidebarExpanded}>
        <li class="flex flex-col relative">
          <div>
            <SidebarItem
              icon={Utensils}
              label="Menu Management"
              onClick={() => isSidebarExpanded && toggleMenu("menu")}
              {isSidebarExpanded}
            />
          </div>
          {#if openMenus.menu}
            <ul in:slide out:slide class="ml-4 space-y-1 text-sm">
              <SidebarItem
                icon={MenuSquare}
                label="Categories"
                href="/admin/menu/categories"
                {isSidebarExpanded}
              />
              <SidebarItem
                icon={UtensilsCrossed}
                label="Menu Items"
                href="/admin/menu/items"
                {isSidebarExpanded}
              />
            </ul>
          {/if}
        </li>
      </SidebarSection>

      <!-- Cart Management -->
      <SidebarSection title="Cart" {isSidebarExpanded}>
        <li class="flex flex-col relative">
          <div>
            <SidebarItem
              icon={ShoppingCart}
              label="Cart Management"
              onClick={() => isSidebarExpanded && toggleMenu("cart")}
              {isSidebarExpanded}
            />
          </div>
          {#if openMenus.cart}
            <ul in:slide out:slide class="ml-4 space-y-1 text-sm">
              <SidebarItem
                icon={ShoppingCart}
                label="All Carts"
                href="/admin/cart"
                {isSidebarExpanded}
              />
              <SidebarItem
                icon={Activity}
                label="Active Carts"
                href="/admin/cart"
                {isSidebarExpanded}
              />
              <SidebarItem
                icon={UserRound}
                label="Guest Carts"
                href="/admin/cart"
                {isSidebarExpanded}
              />
              <SidebarItem
                icon={Ghost}
                label="Abandoned Carts"
                href="/admin/cart"
                {isSidebarExpanded}
              />
            </ul>
          {/if}
        </li>
      </SidebarSection>

      <!-- Orders Management -->
      <SidebarSection title="Orders" {isSidebarExpanded}>
        <li class="flex flex-col">
          <div>
            <SidebarItem
              icon={ShoppingBasket}
              label="Orders Management"
              onClick={() => toggleMenu("orders")}
              {isSidebarExpanded}
            />
          </div>
          {#if openMenus.orders}
            <ul in:slide out:slide class="ml-4 space-y-1 text-sm">
              <SidebarItem
                icon={ClipboardList}
                label="All Orders"
                href="/admin/orders"
                {isSidebarExpanded}
              />
              <SidebarItem
                icon={Clock}
                label="Pending Orders"
                href="/admin/orders"
                {isSidebarExpanded}
              />
              <SidebarItem
                icon={CheckCircle}
                label="Completed Orders"
                href="/admin/orders"
                {isSidebarExpanded}
              />
            </ul>
          {/if}
        </li>
      </SidebarSection>
    </ul>
  </nav>
</aside>

<style>
  /* Smooth transition when expanding/collapsing */
  aside {
    overflow: hidden;
  }
</style>
