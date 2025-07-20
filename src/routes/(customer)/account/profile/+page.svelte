<script lang="ts">
  export let data: { user: User };

  let { user } = data;

  $: editing = user._id ? false : true;
  let form = { ...user };

  function toggleEdit() {
    editing = !editing;
  }
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
      <h1 class="text-2xl font-semibold text-gray-800">
        {user.profile.fullName}
      </h1>
      <p class="text-sm text-gray-500 flex items-center gap-x-2">
        {user.role}
        <span class="px-1 rounded-full text-xs bg-amber-400">active</span>
      </p>
    </div>
  </header>

  <form method="post" class="space-y-6">
    <div>
      <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1"
        >Full Name</label
      >
      <input
        type="text"
        name="fullName"
        id="fullName"
        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        bind:value={form.profile.fullName}
        disabled={!editing}
        required
      />
    </div>

    <div>
      <label
        for="phoneNumber"
        class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label
      >
      <input
        id="phoneNumber"
        name="phoneNumber"
        type="tel"
        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        bind:value={form.profile.phoneNumber}
        disabled={!editing}
      />
    </div>

    <div>
      <label
        for="dateOfBirth"
        class="block text-sm font-medium text-gray-700 mb-1"
        >Date of birth</label
      >
      <input
        id="dateOfBirth"
        name="dateOfBirth"
        type="date"
        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        bind:value={form.profile.dateOfBirth}
        disabled={!editing}
      />
    </div>

    <div>
      <label for="address" class="block text-sm font-medium text-gray-700 mb-1"
        >Physical Address</label
      >
      <input
        id="address"
        name="address"
        type="text"
        class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        bind:value={form.profile.address}
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
