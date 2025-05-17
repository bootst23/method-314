<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddAccountForm from "@/components/forms/accounts/AddForm.vue";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-vue-next";
import type { CreateAccount } from "@/types/account";
const { open } = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

defineEmits<{ submit: [values: CreateAccount]; open: void }>();
</script>
<template>
  <Dialog :open="open">
    <DialogTrigger as-child>
      <Button class="tracking-normal" @click="$emit('open')">
        <Plus class="mr-2 h-4 w-4" /> Add Account
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Account</DialogTitle>
        <DialogDescription> Add a new Account. Click add when you're done </DialogDescription>
      </DialogHeader>
      <AddAccountForm @submit="(val) => $emit('submit', val)" />
    </DialogContent>
  </Dialog>
</template>
