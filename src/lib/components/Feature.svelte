<script lang="ts">
  export let icon: string;
  export let title: string;
  export let desc: string;
</script>

<div class="bg-white p-6 rounded-2xl shadow text-center">
  <div class="text-4xl mb-2">{icon}</div>
  <h3 class="font-bold mb-1">{title}</h3>
  <p class="text-sm text-gray-600">{desc}</p>
</div>
