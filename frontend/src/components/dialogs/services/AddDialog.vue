<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddServiceForm from "@/components/forms/services/AddForm.vue";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-vue-next";
import type { CreateService } from "@/types/service";
const { open } = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

defineEmits<{ submit: [values: CreateService]; open: void }>();
</script>
<template>
  <Dialog :open="open">
    <DialogTrigger as-child>
      <Button class="tracking-normal" @click="$emit('open')">
        <Plus class="mr-2 h-4 w-4" /> Add Service
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Service</DialogTitle>
        <DialogDescription> Add a new Service. Click add when you're done </DialogDescription>
      </DialogHeader>
      <AddServiceForm @submit="(val) => $emit('submit', val)" />
    </DialogContent>
  </Dialog>
</template>
