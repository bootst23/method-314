<script setup lang="ts">
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  DateFormatter,
  type DateValue,
  getLocalTimeZone,
  parseDate,
} from "@internationalized/date";
import { CalendarIcon } from "lucide-vue-next";
import { onMounted, ref } from "vue";

const emit = defineEmits<{
  (e: "update:model-value", value: DateValue | undefined): void;
}>();
const df = new DateFormatter("en-SG", {
  dateStyle: "long",
});

const { modelValue } = defineProps<{
  modelValue?: Date;
}>();

const value = ref<DateValue>();

function onDateChange(date: DateValue | undefined) {
  emit("update:model-value", date);
}

onMounted(() => {
  if (modelValue) {
    value.value = parseDate(modelValue.toISOString().split("T")[0]);
  }
});
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button
        variant="outline"
        :class="
          cn('w-[280px] justify-start text-left font-normal', !value && 'text-muted-foreground')
        "
      >
        <CalendarIcon class="mr-2 h-4 w-4" />
        {{ value ? df.format(value.toDate(getLocalTimeZone())) : "Pick a date" }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="value" initial-focus @update:model-value="onDateChange" />
    </PopoverContent>
  </Popover>
</template>
