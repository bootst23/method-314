<script setup lang="ts">
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import type { CreateProfile } from "@/types/profile";

const emit = defineEmits<{ submit: [values: CreateProfile] }>();

const formSchema = toTypedSchema(
  z.object({
    profile: z.string().min(2).max(50),
    suspended: z.boolean().default(false),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  emit("submit", {
    profile: values.profile,
    suspended: Number(values.suspended),
  });
});
</script>

<template>
  <form class="space-y-2" @submit.prevent="onSubmit">
    <FormField v-slot="{ componentField }" name="profile">
      <FormItem>
        <FormLabel>Profile Name</FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="text" placeholder="Enter profile" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ value, handleChange }" type="checkbox" name="suspended">
      <FormItem class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4 shadow">
        <FormControl>
          <Checkbox :model-value="value" @update:model-value="handleChange" />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel>Suspended</FormLabel>
          <FormMessage />
        </div>
      </FormItem>
    </FormField>

    <Button type="submit"> Add </Button>
  </form>
</template>

<style scoped></style>
