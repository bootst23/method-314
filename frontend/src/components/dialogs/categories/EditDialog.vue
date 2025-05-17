<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditCategoryForm from "@/components/forms/categories/EditForm.vue";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-vue-next";
import { ref } from "vue";
import { toast } from "vue-sonner";
import type { Category, CreateCategory } from "@/types/category";
import { useMutateCategory } from "@/composables/mutations/category";

const { category } = defineProps<{ category: Category }>();
const { editCategory } = useMutateCategory();
const isDialogOpen = ref(false);

async function onEdit(values: CreateCategory) {
  try {
    const res = await editCategory({ ...values, categoryID: category.categoryID });
    isDialogOpen.value = false;
    toast.success(`Profile with ID ${res.categoryID} updated successfully!`);
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
        <DialogTitle>Edit Category</DialogTitle>
        <DialogDescription> Edit a Category. Click edit when you're done </DialogDescription>
      </DialogHeader>
      <EditCategoryForm @submit="onEdit" :category="category.category" />
    </DialogContent>
  </Dialog>
</template>
