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
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useQueryProfile } from "@/composables/queries/profile";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import type { CreateAccount } from "@/types/account";

const { getAllProfiles } = useQueryProfile();
const { data: profiles } = getAllProfiles();
const emit = defineEmits<{ submit: [values: CreateAccount] }>();

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
    profile: z.string().min(1, { message: "Profile is required" }),
    suspended: z.boolean().default(false),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit((values) => {
  emit("submit", {
    username: values.username,
    password: values.password,
    profile: values.profile,
    suspended: Number(values.suspended),
  });
});
</script>

<template>
  <form class="space-y-2" @submit.prevent="onSubmit">
    <FormField v-slot="{ componentField }" name="username">
      <FormItem>
        <FormLabel>Username</FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="text" placeholder="Enter username" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="password" placeholder="Enter password" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="profile">
      <FormItem>
        <FormLabel>Profile</FormLabel>
        <FormControl>
          <Select v-bind="componentField">
            <SelectTrigger>
              <SelectValue placeholder="Select a profile" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Profiles</SelectLabel>
                <SelectItem
                  v-for="profile in profiles ?? []"
                  :key="profile.profileID"
                  :value="profile.profile"
                >
                  {{ profile.profile }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
