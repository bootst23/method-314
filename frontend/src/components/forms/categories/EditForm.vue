<script setup lang="ts">
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import type { CreateCategory } from "@/types/category";

const { category } = defineProps<{ category: string }>();
const emit = defineEmits<{ submit: [values: CreateCategory] }>();

const formSchema = toTypedSchema(
  z.object({
    category: z.string().min(2).max(50).default(category),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  emit("submit", {
    category: values.category,
  });
});
</script>

<template>
  <form class="space-y-2" @submit.prevent="onSubmit">
    <FormField v-slot="{ componentField }" name="category">
      <FormItem>
        <FormLabel>Category Name</FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="text" placeholder="Enter category" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit"> Edit </Button>
  </form>
</template>

<style scoped></style>
