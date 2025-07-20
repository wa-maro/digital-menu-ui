<script lang="ts">
  import { formatRelativeDate } from "$lib/utils/formatter";

  export let data: { cart: UserCart };

  const cart = data.cart;
</script>

<div class="max-w-4xl mx-auto space-y-6">
  <!-- Back Button -->
  <div class="pt-3">
    <a href="/admin/carts" class="text-sm text-gray-600 hover:underline"
      >← Back to carts</a
    >
  </div>

  <!-- User Info -->
  <div class="bg-white shadow-lg rounded-xl p-6 mb-6">
    <h2
      class="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2"
    >
      <svg
        class="w-6 h-6 text-indigo-500"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M5.121 17.804A4 4 0 017 17h10a4 4 0 011.879.804M15 11a3 3 0 11-6 0 3 3 0 016 0zM19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h3m10 0h3a2 2 0 012 2v12a2 2 0 01-2 2z"
        />
      </svg>
      Customer Information
    </h2>

    <div class="grid md:grid-cols-3 gap-4 text-gray-700">
      <div>
        <p class="text-sm text-gray-500">Full Name</p>
        <p class="font-medium">{cart.user.profile.fullName}</p>
      </div>

      <div>
        <p class="text-sm text-gray-500">Email</p>
        <p class="font-medium">{cart.user.email}</p>
      </div>

      <div>
        <p class="text-sm text-gray-500">Created At</p>
        <p class="font-medium">{formatRelativeDate(cart.createdAt ?? "")}</p>
      </div>
    </div>
  </div>

  <!-- Items -->
  <div class="bg-white shadow-lg rounded-xl p-6 mb-6">
    <h2
      class="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2"
    >
      🛒 Items in Cart
    </h2>

    <div class="space-y-6">
      {#each cart.items as item}
        <div
          class="flex flex-col md:flex-row gap-4 border border-gray-300 rounded-lg p-4 hover:shadow-sm transition-all duration-200"
        >
          <!-- Product Image -->
          <div class="w-full md:w-24 h-24">
            <img
              src={item.item.imageURL}
              alt={item.item.name}
              class="w-full h-full object-cover rounded-md"
            />
          </div>

          <!-- Item Details -->
          <div class="flex-1">
            <div
              class="flex justify-between items-start flex-col md:flex-row md:items-center"
            >
              <h3 class="mb-2 md:-my-1">
                <a
                  href={`/admin/menu/items/${item.item._id}`}
                  class="text-lg font-semibold text-gray-800"
                  >{item.item.name}</a
                >
              </h3>
              <p class="text-sm text-gray-500">#{item.item._id.slice(-6)}</p>
            </div>

            <p class="text-gray-600 text-sm mb-2">
              {item.item.description || "No description available"}
            </p>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p class="text-gray-500">Price</p>
                <p class="font-medium text-gray-800">
                  TZS {item.item.price.toLocaleString()}
                </p>
              </div>
              <div>
                <p class="text-gray-500">Quantity</p>
                <p class="font-medium text-gray-800">{item.quantity}</p>
              </div>
              <div>
                <p class="text-gray-500">Total</p>
                <p class="font-semibold text-green-700">
                  TZS {(item.quantity * item.price).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>

  <!-- Cart Total -->
  <div class="flex justify-end">
    <div class="bg-gray-100 p-4 rounded-lg shadow-inner">
      <p class="text-lg font-semibold">
        Grand Total:
        <span class="text-green-700">
          TZS {cart.items
            .reduce((sum, i) => sum + i.quantity * i.price, 0)
            .toLocaleString()}
        </span>
      </p>
    </div>
  </div>
</div>
