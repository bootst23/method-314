<script setup lang="ts">
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import AddProfileDialog from "@/components/dialogs/profiles/AddDialog.vue";
import { useQueryProfile } from "@/composables/queries/profile";
import { ref } from "vue";
import { toast } from "vue-sonner";
import EditProfileDialog from "@/components/dialogs/profiles/EditDialog.vue";
import type { CreateProfile } from "@/types/profile";
import { useMutateProfile } from "@/composables/mutations/profile";

const { createProfile } = useMutateProfile();
const { getAllProfiles } = useQueryProfile();

const { data: profiles } = getAllProfiles();

const isAddDialogOpen = ref(false);

async function onSubmit(values: CreateProfile) {
  try {
    const res = await createProfile(values);
    console.log(values);
    isAddDialogOpen.value = false;
    toast.success(`Profile with ID ${res.profileID} created successfully!`);
  } catch (error) {
    toast.error("Failed to create profile: " + error);
  }
}
</script>
<template>
  <div class="flex items-center justify-between">
    <div>
      <p class="text-xl text-muted-foreground">A list of profiles</p>
    </div>
    <AddProfileDialog @submit="onSubmit" :open="isAddDialogOpen" @open="isAddDialogOpen = true" />
  </div>

  <div class="flex grow justify-center">
    <Table v-if="profiles">
      <TableHeader>
        <TableRow>
          <TableHead>Profile ID</TableHead>
          <TableHead>Profile</TableHead>
          <TableHead>Suspended</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="profile in profiles" :key="profile.profileID">
          <TableCell>{{ profile.profileID }}</TableCell>
          <TableCell>{{ profile.profile }}</TableCell>
          <TableCell>{{ profile.suspended }}</TableCell>
          <TableCell>
            <EditProfileDialog :profile="profile" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<style lang="scss" scoped></style>
