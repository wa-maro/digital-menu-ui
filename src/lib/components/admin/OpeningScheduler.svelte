<script lang="ts">
  import { DayOfWeek, type DailyHours } from "$lib/constants/week-days";

  export let editing: boolean;
  const allDays = Object.values(DayOfWeek);

  export let workingDays: DayOfWeek[];
  function toggleDay(day: DayOfWeek) {
    if (workingDays.includes(day))
      workingDays = workingDays.filter((d) => d !== day);
    else workingDays = [...workingDays, day];
  }

  export let workingHours: Partial<Record<DayOfWeek, DailyHours>>;
  function changeHour(day: DayOfWeek, type: "open" | "close", value: string) {
    if (!workingHours[day]) workingHours[day] = { open: "", close: "" };
    workingHours[day][type] = value;
  }
</script>

<label for="" class="block text-sm font-medium text-gray-700 mb-2"
  >Working Schedule</label
>

<div class="space-y-4">
  {#each allDays as day (day)}
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

      <input
        type="text"
        name="workingHours"
        id="workingHours"
        class="hidden"
        value={JSON.stringify(workingHours)}
      />

      <input
        type="time"
        id="from"
        name="from"
        class="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        on:input={(e) =>
          changeHour(day, "open", (e.target as HTMLInputElement).value)}
        disabled={!editing || !workingDays.includes(day)}
        value={workingHours[day]?.open ?? ""}
      />

      <span>to</span>

      <input
        type="time"
        id="to"
        name="to"
        on:input={(e) =>
          changeHour(day, "close", (e.target as HTMLInputElement).value)}
        class="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        disabled={!editing || !workingDays.includes(day)}
        value={workingHours[day]?.close ?? ""}
      />
    </div>
  {/each}
</div>
