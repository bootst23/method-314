<script setup lang="ts">
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
} from "@/components/ui/table";
import { useQueryService } from "@/composables/queries/service";
import AddServiceDialog from "@/components/dialogs/services/AddDialog.vue";
import EditServiceDialog from "@/components/dialogs/services/EditDialog.vue";
import DeleteServiceDialog from "@/components/dialogs/services/DeleteDialog.vue";
import type { CreateService } from "@/types/service";
import { ref } from "vue";
import { useStorage } from "@vueuse/core";
import { useMutateService } from "@/composables/mutations/service";
import { toast } from "vue-sonner";

const { getAllServicesByCleanerId } = useQueryService();
const { createService } = useMutateService();
const userIdStorage = useStorage("userId", -1);

const { data: services } = getAllServicesByCleanerId(userIdStorage.value);

const isAddDialogOpen = ref(false);

async function onSubmit(values: CreateService) {
  try {
    const res = await createService({
      ...values,
      cleanerID: userIdStorage.value,
    });
    isAddDialogOpen.value = false;
    toast.success(`Service with ID ${res.serviceID} created successfully!`);
  } catch (error) {
    toast.error("Failed to create service: " + error);
  }
}
</script>

<template>
  <div class="flex items-center justify-between">
    <div>
      <p class="text-xl text-muted-foreground">A list of your offered services</p>
    </div>
    <AddServiceDialog @submit="onSubmit" :open="isAddDialogOpen" @open="isAddDialogOpen = true" />
  </div>
  <div class="flex grow justify-center">
    <Table v-if="services">
      <TableHeader>
        <TableRow>
          <TableHead>Service</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Views</TableHead>
          <TableHead>Shortlists</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="service in services" :key="service.serviceID">
          <TableCell>{{ service.category }}</TableCell>
          <TableCell>{{ service.price }}</TableCell>
          <TableCell>{{ service.view }}</TableCell>
          <TableCell>{{ service.shortlistCount }}</TableCell>
          <TableCell>
            <EditServiceDialog
              :category="service.category"
              :price="Number(service.price)"
              :service-i-d="service.serviceID"
              :view="service.view"
              :shortlist-count="service.shortlistCount"
            />
            <DeleteServiceDialog :service-i-d="service.serviceID" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<style scoped></style>
