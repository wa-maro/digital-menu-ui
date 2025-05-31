<script lang="ts">
  import { PlusCircle, FolderCog, ClipboardList, Tag } from "lucide-svelte";

  const actions = [
    {
      label: "Add New Menu Item",
      tooltip: "Create a new menu item",
      icon: PlusCircle,
      href: "/admin/menu/items",
      bg: "bg-[#044974] text-white",
      hover: "hover:bg-[#033c61]",
    },
    {
      label: "Manage Categories",
      tooltip: "Edit menu categories",
      icon: FolderCog,
      href: "/admin/menu/categories",
      bg: "bg-gray-100 text-gray-800",
      hover: "hover:bg-gray-200",
    },
    {
      label: "View Pending Orders",
      tooltip: "See all customer orders",
      icon: ClipboardList,
      href: "/admin/orders",
      bg: "bg-sky-100 text-sky-800",
      hover: "hover:bg-gray-200",
    },
    {
      label: "Create Promo Code",
      tooltip: "Launch discounts or seasonal offers",
      icon: Tag,
      href: "/admin/promotions",
      bg: "bg-pink-100 text-pink-800",
      hover: "hover:bg-pink-200",
    },
  ];
</script>

<div class="mt-6">
  <h2 class="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
  <div class="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {#each actions as action}
      <div class="relative group flex justify-center sm:justify-start">
        <a
          href={action.href}
          class={`flex flex-col sm:flex-row items-center justify-center sm:justify-start p-3 rounded-2xl shadow-sm transition text-center sm:text-left ${action.bg} ${action.hover}`}
        >
          <svelte:component
            this={action.icon}
            class="w-5 h-5 mb-1 sm:mb-0 sm:mr-3"
          />
          <span class="hidden sm:inline font-medium">{action.label}</span>
        </a>

        <!-- Tooltip for icon-only mode -->
        <div
          class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 transition pointer-events-none z-10 sm:hidden"
        >
          {action.tooltip}
        </div>
      </div>
    {/each}
  </div>
</div>
