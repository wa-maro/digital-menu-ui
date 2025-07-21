<script lang="ts">
  import { DayOfWeek } from "$lib/constants/week-days";

  export let editing: boolean;
  const allDays = Object.values(DayOfWeek);

  export let workingDays: DayOfWeek[];
  function toggleDay(day: DayOfWeek) {
    if (workingDays.includes(day)) {
      workingDays = workingDays.filter((d) => d !== day);
    } else {
      workingDays = [...workingDays, day];
    }
  }
</script>

<label for="" class="block text-sm font-medium text-gray-700 mb-2"
  >Working Schedule</label
>

<div class="space-y-4">
  {#each allDays as day}
    <div class="flex items-center space-x-4">
      <label for="workingDays" class="flex items-center space-x-2">
        <input
          type="text"
          name="workingDays"
          id="workingDays"
          class="hidden"
          bind:value={workingDays}
        />
        <input
          type="checkbox"
          class="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          checked={workingDays.includes(day)}
          on:change={() => toggleDay(day)}
          disabled={!editing}
        />
        <span class="min-w-[90px]">{day}</span>
      </label>
    </div>
  {/each}
</div>
