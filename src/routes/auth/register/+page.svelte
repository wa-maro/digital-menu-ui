<script lang="ts">
  export let form: any;
</script>

<div class="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow">
  <h1 class="text-2xl font-bold mb-6 text-center">Register</h1>
  <form method="POST" class="space-y-4">
    <div>
      <label for="fullName" class="block text-sm font-medium mb-1"
        >Full Name</label
      >
      <input
        name="fullName"
        type="text"
        required
        class="w-full border rounded p-2"
      />
    </div>
    <div>
      <label for="email" class="block text-sm font-medium mb-1">Email</label>
      <input
        name="email"
        type="email"
        required
        class="w-full border rounded p-2"
      />
    </div>
    <div>
      <label for="password" class="block text-sm font-medium mb-1"
        >Password</label
      >
      <input
        name="password"
        type="password"
        required
        class="w-full border rounded p-2"
      />
    </div>
    {#if form?.error}
      <p class="text-red-500 text-sm">{form.error}</p>
    {/if}
    <button
      type="submit"
      class="w-full bg-green-500 text-white rounded py-2 hover:bg-green-600"
    >
      Register
    </button>
  </form>
  <p class="text-center mt-4 text-sm">
    Already have an account?
    <a href="/auth/login" class="text-blue-600 hover:underline">Login</a>
  </p>
</div>
