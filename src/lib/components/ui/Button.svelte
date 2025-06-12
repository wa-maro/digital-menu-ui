<script lang="ts">
  export let type: "button" | "submit" | "reset" = "button";
  export let variant: "default" | "primary" | "outline" = "default";
  export let disabled = false;
</script>

<button
  {type}
  {disabled}
  class={`
    inline-flex items-center justify-center px-4 py-2 rounded-2xl text-sm font-medium transition
    cursor-pointer focus:outline-none
    ${variant === "default" ? "bg-[#065B8C] text-white hover:bg-[#044974]" : ""}
    ${variant === "primary" ? "bg-white text-[#065B8C] hover:bg-gray-100" : ""}
    ${variant === "outline" ? "border border-white text-white hover:bg-white/10" : ""}
    ${disabled ? "opacity-50 cursor-not-allowed" : ""}
  `}
>
  <slot />
</button>
