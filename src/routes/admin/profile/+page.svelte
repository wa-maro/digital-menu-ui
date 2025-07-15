<script lang="ts">
  let user = {
    name: "Mathew Maro",
    email: "mathewmaro@example.com",
    phone: "+255 712 345 678",
    role: "Manager",
    status: "Active",
    avatarUrl: "https://i.pravatar.cc/150?img=12",
  };

  let editing = false;
  let form = { ...user };

  function toggleEdit() {
    editing = !editing;
  }

  function saveChanges() {}
</script>

<div class="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
  <header class="flex items-center space-x-6 mb-8">
    <div class="relative w-24 h-24 rounded-full overflow-hidden shadow-md">
      <img src={user.avatarUrl} alt="" class="object-cover w-full h-full" />

      {#if editing}
        <button
          class="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-1 hover:bg-blue-700 transition"
          title="Change Profile Picture"
          type="button"
        >
          <!-- Camera icon SVG -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 7h4l3-3h4l3 3h4v13H3V7z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 11a3 3 0 100 6 3 3 0 000-6z"
            />
          </svg>
        </button>
      {/if}
    </div>

    <div>
      <h1 class="text-2xl font-semibold text-gray-800">{user.name}</h1>
      <p class="text-sm text-gray-500">{user.role} • {user.status}</p>
    </div>
  </header>

  <form class="space-y-6" on:submit|preventDefault={() => saveChanges()}>
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700 mb-1"
        >Full Name</label
      >
      <input
        id="name"
        type="text"
        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        bind:value={form.name}
        disabled={!editing}
        required
      />
    </div>

    <div>
      <label for="email" class="block text-sm font-medium text-gray-700 mb-1"
        >Email Address</label
      >
      <input
        id="email"
        type="email"
        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        bind:value={form.email}
        disabled={!editing}
        required
      />
    </div>

    <div>
      <label for="phone" class="block text-sm font-medium text-gray-700 mb-1"
        >Phone Number</label
      >
      <input
        id="phone"
        type="tel"
        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        bind:value={form.phone}
        disabled={!editing}
      />
    </div>

    <div class="flex items-center space-x-4">
      {#if editing}
        <button
          type="submit"
          class="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
        <button
          type="button"
          class="text-gray-500 px-5 py-2 rounded-md hover:bg-gray-100 transition"
          on:click={toggleEdit}
        >
          Cancel
        </button>
      {:else}
        <button
          type="button"
          class="bg-gray-200 text-gray-700 px-5 py-2 rounded-md hover:bg-gray-300 transition"
          on:click={toggleEdit}
        >
          Edit Profile
        </button>
      {/if}
    </div>
  </form>
</div>
