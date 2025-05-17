<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditServiceForm from "@/components/forms/services/EditForm.vue";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-vue-next";
import type { CreateService } from "@/types/service";
import { ref } from "vue";
import { useStorage } from "@vueuse/core";
import { useMutateService } from "@/composables/mutations/service";
import { toast } from "vue-sonner";
const { serviceID, view, shortlistCount } = defineProps({
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  serviceID: {
    type: Number,
    required: true,
  },
  view: {
    type: Number,
    required: true,
  },
  shortlistCount: {
    type: Number,
    required: true,
  },
});

const { editService } = useMutateService();
const userIdStorage = useStorage("userId", -1);
const isDialogOpen = ref(false);

async function onEdit(values: CreateService) {
  try {
    const res = await editService({
      ...values,
      cleanerID: userIdStorage.value,
      serviceID,
      view,
      shortlistCount,
    });
    isDialogOpen.value = false;
    toast.success(`Service with ID ${res.serviceID} updated successfully!`);
  } catch (error) {
    toast.error("Failed to update service: " + error);
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
        <DialogTitle>Edit Service</DialogTitle>
        <DialogDescription> Edit a Service. Click edit when you're done </DialogDescription>
      </DialogHeader>
      <EditServiceForm @submit="onEdit" :category="category" :price="price" />
    </DialogContent>
  </Dialog>
</template>
