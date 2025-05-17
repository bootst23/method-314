<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditProfileForm from "@/components/forms/profiles/EditForm.vue";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-vue-next";
import type { CreateProfile, Profile } from "@/types/profile";
import { ref } from "vue";
import { toast } from "vue-sonner";
import { useMutateProfile } from "@/composables/mutations/profile";

const { profile } = defineProps<{ profile: Profile }>();
const { editProfile } = useMutateProfile();
const isDialogOpen = ref(false);

async function onEdit(values: CreateProfile) {
  try {
    const res = await editProfile({ ...values, profileID: profile.profileID });
    isDialogOpen.value = false;
    toast.success(`Profile with ID ${res.profileID} updated successfully!`);
  } catch (error) {
    toast.error("Failed to update profile: " + error);
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
        <DialogDescription> Edit a Profile. Click edit when you're done </DialogDescription>
      </DialogHeader>
      <EditProfileForm @submit="onEdit" :profile="profile.profile" :suspended="profile.suspended" />
    </DialogContent>
  </Dialog>
</template>
