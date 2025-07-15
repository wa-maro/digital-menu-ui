<script lang="ts">
  import {
    Menu,
    ShoppingCart,
    ShoppingBasket,
    Utensils,
    MenuSquare,
    UtensilsCrossed,
    ClipboardList,
    Banknote,
    Settings,
    Image,
    Home,
  } from "lucide-svelte";
  import { slide } from "svelte/transition";
  import SidebarSection from "./SidebarSection.svelte";
  import SidebarItem from "./SidebarItem.svelte";
  let isSidebarExpanded = true;

  let openMenus: Record<string, boolean> = {
    dishes: true,
    sales: false,
    settings: false,
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
          <Home class="w-5 h-5" />
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

      <!-- Dishes Management -->
      <SidebarSection title="Dishes" {isSidebarExpanded}>
        <li class="flex flex-col relative">
          <div>
            <SidebarItem
              icon={Utensils}
              label="Menu Management"
              onClick={() => isSidebarExpanded && toggleMenu("dishes")}
              {isSidebarExpanded}
            />
          </div>
          {#if openMenus.dishes}
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
              <SidebarItem
                icon={Image}
                label="Media Library"
                href="/admin/media"
                {isSidebarExpanded}
              />
            </ul>
          {/if}
        </li>
      </SidebarSection>

      <!-- Sales Management -->
      <SidebarSection title="Sales" {isSidebarExpanded}>
        <li class="flex flex-col relative">
          <div>
            <SidebarItem
              icon={ShoppingBasket}
              label="Sales Management"
              onClick={() => isSidebarExpanded && toggleMenu("sales")}
              {isSidebarExpanded}
            />
          </div>
          {#if openMenus.sales}
            <ul in:slide out:slide class="ml-4 space-y-1 text-sm">
              <SidebarItem
                icon={ShoppingCart}
                label="Carts"
                href="/admin/carts"
                {isSidebarExpanded}
              />
              <SidebarItem
                icon={ClipboardList}
                label="Orders"
                href="/admin/orders"
                {isSidebarExpanded}
              />
              <SidebarItem
                icon={Banknote}
                label="Payments"
                href="/admin/payments"
                {isSidebarExpanded}
              />
            </ul>
          {/if}
        </li>
      </SidebarSection>

      <!-- Transactions -->
      <!-- <SidebarSection title="Transactions" {isSidebarExpanded}>
        <li class="flex flex-col">
          <div>
            <SidebarItem
              icon={CreditCardIcon}
              label="Billing Management"
              onClick={() => toggleMenu("transactions")}
              {isSidebarExpanded}
            />
          </div>
          {#if openMenus.transactions}
            <ul in:slide out:slide class="ml-4 space-y-1 text-sm">
              <SidebarItem
                icon={RotateCcw}
                label="Refunds"
                href="/admin/refunds"
                {isSidebarExpanded}
              />
            </ul>
          {/if}
        </li>
      </SidebarSection> -->

      <SidebarSection title="Settings" {isSidebarExpanded}>
        <li class="flex flex-col">
          <div>
            <SidebarItem
              icon={Settings}
              label="Restaurant Management"
              onClick={() => toggleMenu("settings")}
              {isSidebarExpanded}
            />
          </div>
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
