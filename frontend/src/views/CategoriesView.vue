<script setup lang="ts">
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import AddCategoryDialog from "@/components/dialogs/categories/AddDialog.vue";
import EditCategoryDialog from "@/components/dialogs/categories/EditDialog.vue";
import DeleteCategoryDialog from "@/components/dialogs/categories/DeleteDialog.vue";
import { ref } from "vue";
import { toast } from "vue-sonner";
import { useQueryCategory } from "@/composables/queries/category";
import type { CreateCategory } from "@/types/category";
import { useMutateCategory } from "@/composables/mutations/category";

const { createCategory } = useMutateCategory();
const { getAllCategories } = useQueryCategory();

const { data: categories } = getAllCategories();

const isAddDialogOpen = ref(false);

async function onSubmit(values: CreateCategory) {
  try {
    const res = await createCategory(values.category);
    isAddDialogOpen.value = false;
    toast.success(`Category with ID ${res.categoryID} created successfully!`);
  } catch (error) {
    toast.error("Failed to create category: " + error);
  }
}
</script>

<template>
  <div class="flex items-center justify-between">
    <div>
      <p class="text-xl text-muted-foreground">A list of categories</p>
    </div>
    <AddCategoryDialog @submit="onSubmit" :open="isAddDialogOpen" @open="isAddDialogOpen = true" />
  </div>
  <div class="flex grow justify-center">
    <Table v-if="categories">
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Category</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="category in categories" :key="category.categoryID">
          <TableCell>{{ category.categoryID }}</TableCell>
          <TableCell>{{ category.category }}</TableCell>
          <TableCell>
            <EditCategoryDialog :category="category" />
            <DeleteCategoryDialog :category-i-d="category.categoryID" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<style scoped></style>
