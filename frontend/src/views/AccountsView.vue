<script setup lang="ts">
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import AddAccountDialog from "@/components/dialogs/accounts/AddDialog.vue";
import { useQueryAccount } from "@/composables/queries/account";
import type { CreateAccount } from "@/types/account";
import { ref } from "vue";
import { toast } from "vue-sonner";
import { useMutateAccount } from "@/composables/mutations/account";
import EditAccountDialog from "@/components/dialogs/accounts/EditDialog.vue";

const { createAccount } = useMutateAccount();

const { getAllAccounts } = useQueryAccount();

const { data: accounts } = getAllAccounts();

const isAddDialogOpen = ref(false);

async function onSubmit(values: CreateAccount) {
  try {
    const res = await createAccount(values);
    isAddDialogOpen.value = false;
    toast.success(`Account with ID ${res.id} created successfully!`);
  } catch (error) {
    toast.error("Failed to create account: " + error);
  }
}
</script>
<template>
  <div class="flex items-center justify-between">
    <div>
      <p class="text-xl text-muted-foreground">A list of user accounts</p>
    </div>
    <AddAccountDialog @submit="onSubmit" :open="isAddDialogOpen" @open="isAddDialogOpen = true" />
  </div>

  <div class="flex grow justify-center">
    <Table v-if="accounts">
      <TableHeader>
        <TableRow>
          <TableHead>Account ID</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Profile</TableHead>
          <TableHead>Suspended</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="account in accounts" :key="account.id">
          <TableCell>{{ account.id }}</TableCell>
          <TableCell>{{ account.username }}</TableCell>
          <TableCell>{{ account.profile }}</TableCell>
          <TableCell>{{ account.suspended }}</TableCell>
          <TableCell>
            <EditAccountDialog :account="account" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<style lang="scss" scoped></style>
