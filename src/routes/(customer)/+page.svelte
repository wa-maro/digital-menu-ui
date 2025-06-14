<script lang="ts">
  import Feature from "$lib/components/Feature.svelte";
  import Button from "$lib/components/ui/Button.svelte";
</script>

<!-- Hero Section -->
<section class="bg-[#065B8C] text-white py-20 text-center">
  <div class="max-w-3xl mx-auto">
    <h1 class="text-4xl md:text-5xl font-bold mb-4">
      Scan. Browse. Order. Easy.
    </h1>
    <p class="text-lg md:text-xl mb-8">
      Your restaurant's digital menu and online ordering system — for dine-in,
      takeaway, and delivery.
    </p>
    <div class="flex justify-center gap-4 flex-wrap">
      <Button variant="primary">
        <a href="/menu">Browse Menu</a>
      </Button>
      <Button variant="outline">Get Started</Button>
    </div>
  </div>
</section>

<!-- How It Works -->
<section class="py-16 bg-white text-center max-w-7xl mx-auto">
  <h2 class="text-3xl font-semibold mb-10">How It Works</h2>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
    <div>
      <div class="text-4xl mb-2">📷</div>
      <h3 class="font-bold mb-1">Scan QR Code</h3>
      <p class="text-sm text-gray-600">
        Easily access the menu via QR or shared link.
      </p>
    </div>
    <div>
      <div class="text-4xl mb-2">📖</div>
      <h3 class="font-bold mb-1">Browse & Customize</h3>
      <p class="text-sm text-gray-600">
        See item images, details, and customize orders.
      </p>
    </div>
    <div>
      <div class="text-4xl mb-2">🛒</div>
      <h3 class="font-bold mb-1">Place Your Order</h3>
      <p class="text-sm text-gray-600">
        Choose payment method and confirm your order.
      </p>
    </div>
    <div>
      <div class="text-4xl mb-2">📦</div>
      <h3 class="font-bold mb-1">Track in Real-Time</h3>
      <p class="text-sm text-gray-600">
        Get updates on order status from kitchen to delivery.
      </p>
    </div>
  </div>
</section>

<!-- QR Code Preview Section -->
<section class="py-16 bg-gray-100 text-center max-w-7xl mx-auto">
  <div class="max-w-4xl mx-auto">
    <h2 class="text-3xl font-semibold mb-4">Scan the QR Code</h2>
    <p class="mb-6">
      Point your phone camera at the QR code below to preview a sample menu
      experience.
    </p>
    <div class="flex justify-center items-center gap-8 flex-col md:flex-row">
      <!-- /sample-qr-code.png -->
      <img
        src=""
        alt="Sample QR Code"
        class="w-40 h-40 object-contain border border-gray-300 rounded-lg"
      />
      <!-- /phone-mockup.png -->
      <img
        src=""
        alt="Phone Preview"
        class="w-48 h-auto rounded-xl shadow-md"
      />
    </div>
  </div>
</section>

<!-- Features Section -->
<section class="py-16 bg-gray-50 max-w-7xl mx-auto">
  <h2 class="text-3xl font-semibold text-center mb-10">Features You'll Love</h2>
  <div
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
  >
    <Feature
      icon="✅"
      title="Multiple Order Modes"
      desc="Supports dine-in, takeaway, and delivery."
    />
    <Feature
      icon="🧾"
      title="Rich Digital Menu"
      desc="Images, descriptions, customizations for each item."
    />
    <Feature
      icon="📱"
      title="Mobile-First Design"
      desc="Optimized for smartphones and tablets."
    />
    <Feature
      icon="💳"
      title="MPESA & Cash"
      desc="Pay easily with MPESA or cash on delivery."
    />
    <Feature
      icon="🔐"
      title="Customer Login & History"
      desc="Log in to view past orders or reorder quickly."
    />
    <Feature
      icon="🛒"
      title="Smart Cart"
      desc="Cart stays active even if you leave and return."
    />
  </div>
</section>

<!-- Try Demo -->
<section class="py-16 text-center bg-white max-w-7xl mx-auto">
  <h2 class="text-3xl font-semibold mb-6">Try It Now</h2>
  <p class="mb-6">Experience the menu just like your customers would.</p>
  <Button variant="default">Try Demo</Button>
</section>

<!-- For Restaurants -->
<section class="py-16 bg-[#065B8C] text-white text-center">
  <h2 class="text-3xl font-semibold mb-4">Own a Restaurant?</h2>
  <p class="mb-6">
    Digitize your menu and simplify your ordering process in minutes.
  </p>
  <Button variant="outline">For Business</Button>
</section>

<!-- Footer -->
<footer class="bg-gray-900 text-gray-300 py-10 text-sm">
  <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
    <div>
      <h3 class="text-white font-bold mb-2">Quick Links</h3>
      <ul class="space-y-1">
        <li><a href="/menu" class="hover:underline">Menu</a></li>
        <li><a href="/order" class="hover:underline">Order</a></li>
        <li><a href="/login" class="hover:underline">Login</a></li>
        <li>
          <a href="/for-business" class="hover:underline">For Restaurants</a>
        </li>
      </ul>
    </div>
    <div>
      <h3 class="text-white font-bold mb-2">Support</h3>
      <ul class="space-y-1">
        <li><a href="#contact" class="hover:underline">Contact Us</a></li>
        <li>
          <a href="#privacy-policy" class="hover:underline">Privacy Policy</a>
        </li>
        <li>
          <a href="#terms-of-service" class="hover:underline"
            >Terms of Service</a
          >
        </li>
      </ul>
    </div>
    <div>
      <h3 class="text-white font-bold mb-2">Follow Us</h3>
      <p>Instagram, Facebook, Twitter (coming soon)</p>
    </div>
  </div>
</footer>
