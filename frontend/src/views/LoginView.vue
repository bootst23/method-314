<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import { fetcher } from "@/utils/fetcher";
import type { AccountResponse } from "@/types/account";
import { useStorage } from "@vueuse/core";
import { toast } from "vue-sonner";
import { useRouter } from "vue-router";

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
  }),
);

const form = useForm({
  validationSchema: formSchema,
});
const router = useRouter();

const onSubmit = form.handleSubmit(async (values) => {
  try {
    const res = await fetcher("/login", {
      method: "POST",
      json: { ...values },
    });
    const user = await res.json<AccountResponse>();

    const roleStorage = useStorage("role", "");
    const userIdStorage = useStorage("userId", -1);
    const usernameStorage = useStorage("username", "");
    roleStorage.value = user.user.profile;
    userIdStorage.value = user.user.id;
    usernameStorage.value = user.user.username;

    toast.success("Login successful!");

    switch (user.user.profile) {
      case "cleaner":
        router.push("/offered-services");
        break;
      case "homeowner":
        router.push("/services");
        break;
      case "useradmin":
        router.push("/accounts");
        break;
      case "platformmanager":
        router.push("/categories");
        break;
      default:
        toast.error("Invalid role");
    }
  } catch (error) {
    toast.error("Login failed. Please check your credentials. | " + error);
  }
});
</script>

<template>
  <div class="flex w-full h-full items-center justify-center">
    <Card class="sm:w-full lg:w-96">
      <CardHeader> <CardTitle>Login</CardTitle> </CardHeader>
      <CardContent>
        <form @submit="onSubmit" class="space-y-4">
          <FormField v-slot="{ componentField }" name="username">
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Your username" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="password">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Your password" v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button type="submit" class="w-full"> Login </Button>
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<style scoped></style>
