<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddCategoryForm from "@/components/forms/categories/AddForm.vue";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-vue-next";
import type { CreateCategory } from "@/types/category";
const { open } = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

defineEmits<{ submit: [values: CreateCategory]; open: void }>();
</script>
<template>
  <Dialog :open="open">
    <DialogTrigger as-child>
      <Button class="tracking-normal" @click="$emit('open')">
        <Plus class="mr-2 h-4 w-4" /> Add Category
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Category</DialogTitle>
        <DialogDescription> Add a new Category. Click add when you're done </DialogDescription>
      </DialogHeader>
      <AddCategoryForm @submit="(val) => $emit('submit', val)" />
    </DialogContent>
  </Dialog>
</template>
