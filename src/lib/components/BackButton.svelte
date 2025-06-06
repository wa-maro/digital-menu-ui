<script>
  function goBack() {
    if (history.length > 1) {
      history.back();
    } else {
      window.location.href = "/menu";
    }
  }
</script>

<button
  on:click={goBack}
  class="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#065B8C] mb-4 cursor-pointer"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M15 19l-7-7 7-7"
    />
  </svg>
  Back
</button>
