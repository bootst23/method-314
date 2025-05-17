<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditAccountForm from "@/components/forms/accounts/EditForm.vue";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-vue-next";
import { ref } from "vue";
import { useMutateAccount } from "@/composables/mutations/account";
import { toast } from "vue-sonner";
import type { Account, CreateAccount } from "@/types/account";
const { account } = defineProps<{ account: Account }>();

const { editAccount } = useMutateAccount();
const isDialogOpen = ref(false);

async function onEdit(values: CreateAccount) {
  try {
    const res = await editAccount({ ...values, id: account.id });
    isDialogOpen.value = false;
    toast.success(`Account with ID ${res.id} updated successfully!`);
  } catch (error) {
    toast.error("Failed to update account: " + error);
  }
}

function onDialogUpdate(value: boolean) {
  isDialogOpen.value = value;
}
</script>
<template>
  <Dialog :open="isDialogOpen" @update:open="onDialogUpdate">
    <DialogTrigger as-child>
      <Button variant="outline" size="icon" class="mr-2" @click="isDialogOpen = true">
        <Edit class="h-4 w-4 text-yellow-300" />
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit Account</DialogTitle>
        <DialogDescription> Edit an Account. Click edit when you're done </DialogDescription>
      </DialogHeader>
      <EditAccountForm
        @submit="onEdit"
        :username="account.username"
        :password="account.password"
        :profile="account.profile"
        :suspended="account.suspended"
      />
    </DialogContent>
  </Dialog>
</template>
