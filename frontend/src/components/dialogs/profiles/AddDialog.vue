<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddProfileForm from "@/components/forms/profiles/AddForm.vue";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-vue-next";
import type { CreateProfile } from "@/types/profile";
const { open } = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

defineEmits<{ submit: [values: CreateProfile]; open: void }>();
</script>
<template>
  <Dialog :open="open">
    <DialogTrigger as-child>
      <Button class="tracking-normal" @click="$emit('open')">
        <Plus class="mr-2 h-4 w-4" /> Add Profile
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Profile</DialogTitle>
        <DialogDescription> Add a new Profile. Click add when you're done </DialogDescription>
      </DialogHeader>
      <AddProfileForm @submit="(val) => $emit('submit', val)" />
    </DialogContent>
  </Dialog>
</template>
