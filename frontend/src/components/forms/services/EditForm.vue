<script setup lang="ts">
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NumberField, NumberFieldContent, NumberFieldInput } from "@/components/ui/number-field";
import { useQueryCategory } from "@/composables/queries/category";
import { useForm } from "vee-validate";
import type { CreateService } from "@/types/service";
import { toTypedSchema } from "@vee-validate/zod";

const { getAllCategories } = useQueryCategory();
const { data: categories } = getAllCategories();
const emit = defineEmits<{ submit: [values: CreateService] }>();
const { category, price } = defineProps({
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const formSchema = toTypedSchema(
  z.object({
    category: z.string().min(1, { message: "Category is required" }).default(category),
    price: z.number().min(1, { message: "Price must be greater than 0" }).default(price),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  emit("submit", { category: values.category, price: values.price });
});
</script>

<template>
  <form class="space-y-2" @submit.prevent="onSubmit">
    <FormField v-slot="{ componentField }" name="category">
      <FormItem>
        <FormLabel>Category</FormLabel>
        <FormControl>
          <Select v-bind="componentField">
            <SelectTrigger>
              <SelectValue placeholder="Select a Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem
                  v-for="category in categories ?? []"
                  :key="category.categoryID"
                  :value="category.category"
                >
                  {{ category.category }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ value }" name="price">
      <FormItem>
        <FormLabel>Price</FormLabel>
        <NumberField
          class="gap-2"
          :min="1"
          :model-value="value"
          @update:model-value="
            (v) => {
              if (v) {
                form.setFieldValue('price', v);
              } else {
                form.setFieldValue('price', undefined);
              }
            }
          "
        >
          <NumberFieldContent>
            <FormControl>
              <NumberFieldInput />
            </FormControl>
          </NumberFieldContent>
        </NumberField>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button type="submit"> Edit </Button>
  </form>
</template>

<style scoped></style>
