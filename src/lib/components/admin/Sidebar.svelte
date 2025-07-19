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
    LayoutDashboard,
    HandPlatter,
  } from "lucide-svelte";
  import { slide } from "svelte/transition";
  import SidebarSection from "./SidebarSection.svelte";
  import SidebarItem from "./SidebarItem.svelte";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  let isSidebarExpanded = true;

  let openMenus: Record<string, boolean> = {
    dashboard: false,
    dishes: false,
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

  onMount(() => {
    const path = $page.url.pathname;

    if (path.startsWith("/admin/dashboard")) {
      openMenus.dashboard = true;
    } else if (
      path.startsWith("/admin/menu") ||
      path.startsWith("/admin/media")
    ) {
      openMenus.dishes = true;
    } else if (
      path.startsWith("/admin/carts") ||
      path.startsWith("/admin/orders") ||
      path.startsWith("/admin/payments")
    ) {
      openMenus.sales = true;
    } else if (
      path.startsWith("/admin/settings") ||
      path.startsWith("/admin/restaurant")
    ) {
      openMenus.settings = true;
    }
  });
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
      <SidebarSection
        title="Dashboard"
        icon={LayoutDashboard}
        onClick={() => isSidebarExpanded && toggleMenu("dashboard")}
      >
        {#if openMenus.dashboard}
          <ul in:slide out:slide class="ml-4 space-y-1 text-sm">
            <SidebarItem icon={Home} label="Home" href="/admin/dashboard" />
          </ul>
        {/if}
      </SidebarSection>

      <!-- Dishes Management -->
      <SidebarSection
        title="Dishes"
        icon={Utensils}
        onClick={() => isSidebarExpanded && toggleMenu("dishes")}
      >
        {#if openMenus.dishes}
          <ul in:slide out:slide class="ml-4 space-y-1 text-sm">
            <SidebarItem
              icon={MenuSquare}
              label="Categories"
              href="/admin/menu/categories"
            />
            <SidebarItem
              icon={UtensilsCrossed}
              label="Menu Items"
              href="/admin/menu/items"
            />
            <SidebarItem
              icon={Image}
              label="Media Library"
              href="/admin/media"
            />
          </ul>
        {/if}
      </SidebarSection>

      <!-- Sales Management -->
      <SidebarSection
        title="Sales"
        icon={ShoppingBasket}
        onClick={() => isSidebarExpanded && toggleMenu("sales")}
      >
        {#if openMenus.sales}
          <ul in:slide out:slide class="ml-4 space-y-1 text-sm">
            <SidebarItem
              icon={ShoppingCart}
              label="Carts"
              href="/admin/carts"
            />
            <SidebarItem
              icon={ClipboardList}
              label="Orders"
              href="/admin/orders"
            />
            <SidebarItem
              icon={Banknote}
              label="Payments"
              href="/admin/payments"
            />
          </ul>
        {/if}
      </SidebarSection>

      <SidebarSection
        title="Settings"
        icon={Settings}
        onClick={() => isSidebarExpanded && toggleMenu("settings")}
      >
        {#if openMenus.settings}
          <ul in:slide out:slide class="ml-4 space-y-1 text-sm">
            <SidebarItem
              icon={HandPlatter}
              label="Restaurant"
              href="/admin/restaurant"
            />
          </ul>
        {/if}
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
