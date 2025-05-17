<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import DatePicker from "@/components/DatePicker.vue";
import type { DateValue } from "reka-ui";
import { computed, ref } from "vue";
import { useQueryLog } from "@/composables/queries/log";
import { DateFormatter } from "@internationalized/date";

const initDate = new Date();
initDate.setFullYear(2020, 0, 1);
const endDate = ref<string>(new Date().toISOString().split("T")[0]);
const startDate = ref<string>(initDate.toISOString().split("T")[0]);
const selectedValue = ref<string>("daily");

const { getDaily, getWeekly, getMonthly } = useQueryLog();

function onStartDateChange(date: DateValue | undefined) {
  if (date) {
    startDate.value = date?.toString() || "";
  }
}

function onEndDateChange(date: DateValue | undefined) {
  if (date) {
    endDate.value = date?.toString() || "";
  }
}

const isDailyEnabled = computed(() => {
  return selectedValue.value === "daily";
});
const isWeeklyEnabled = computed(() => {
  return selectedValue.value === "weekly";
});
const isMonthlyEnabled = computed(() => {
  return selectedValue.value === "monthly";
});

const { data: daily } = getDaily(startDate.value, endDate.value, isDailyEnabled);
const { data: weekly } = getWeekly(startDate.value, endDate.value, isWeeklyEnabled);
const { data: monthly } = getMonthly(startDate.value, endDate.value, isMonthlyEnabled);

const df = new DateFormatter("en-SG", {
  dateStyle: "long",
});

const monthFormatter = new Intl.DateTimeFormat("en-SG", {
  month: "long",
  year: "numeric",
});
</script>
<template>
  <div class="flex items-center justify-between">
    <div>
      <p class="text-xl text-muted-foreground">A report for all logged data</p>
    </div>
  </div>

  <div class="flex flex-col grow justify-center">
    <div class="flex gap-4 w-full">
      <div class="flex flex-col gap-2">
        <p class="text-muted-foreground">Start Date</p>
        <DatePicker @update:model-value="onStartDateChange" :model-value="initDate" />
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-muted-foreground">End Date</p>
        <DatePicker @update:model-value="onEndDateChange" :model-value="new Date()" />
      </div>
      <div class="flex flex-col gap-2">
        <p class="text-muted-foreground">View</p>
        <Select v-model="selectedValue">
          <SelectTrigger>
            <SelectValue placeholder="Select a view range" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Log View</SelectLabel>
              <SelectItem value="daily"> Daily </SelectItem>
              <SelectItem value="weekly"> Weekly </SelectItem>
              <SelectItem value="monthly"> Monthly </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
    <div class="flex grow">
      <Table v-if="daily && isDailyEnabled">
        <TableHeader>
          <TableRow>
            <TableHead>Log Date</TableHead>
            <TableHead>Cleaner Count</TableHead>
            <TableHead>Homeowner Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="log in daily" :key="log.log_date.toString()">
            <TableCell>{{ df.format(new Date(log.log_date)) }}</TableCell>
            <TableCell>{{ log.cleaner_count }}</TableCell>
            <TableCell>{{ log.homeowner_count }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table v-else-if="weekly && isWeeklyEnabled">
        <TableHeader>
          <TableRow>
            <TableHead>Week</TableHead>
            <TableHead>Cleaner Count</TableHead>
            <TableHead>Homeowner Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="log in weekly" :key="log.week_start">
            <TableCell>
              {{ `${df.format(new Date(log.week_start))} - ${df.format(new Date(log.week_end))}` }}
            </TableCell>
            <TableCell>{{ log.cleaner_count }}</TableCell>
            <TableCell>{{ log.homeowner_count }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table v-else-if="monthly && isMonthlyEnabled">
        <TableHeader>
          <TableRow>
            <TableHead>Month</TableHead>
            <TableHead>Cleaner Count</TableHead>
            <TableHead>Homeowner Count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="log in monthly" :key="log.month">
            <TableCell>{{ monthFormatter.format(new Date(log.year, log.month - 1)) }}</TableCell>
            <TableCell>{{ log.cleaner_count }}</TableCell>
            <TableCell>{{ log.homeowner_count }}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>

<style scoped></style>
