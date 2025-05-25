<script lang="ts">
  import { enhance } from "$app/forms";

  export let form: any;
</script>

<div class="max-w-md mx-auto mt-20 bg-white p-8 rounded shadow">
  <h1 class="text-2xl font-bold mb-6 text-center">Login</h1>
  <form method="POST" use:enhance class="space-y-4">
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
      class="w-full bg-blue-500 text-white rounded py-2 hover:bg-blue-600 curser-pointer"
    >
      Login
    </button>
  </form>
  <p class="text-center mt-4 text-sm">
    Don't have an account?
    <a href="/auth/register" class="text-blue-600 hover:underline">Register</a>
  </p>
</div>
