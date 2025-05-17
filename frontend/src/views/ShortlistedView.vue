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
import DeleteShortlistDialog from "@/components/dialogs/services/DeleteShortlistDialog.vue";
import { useStorage } from "@vueuse/core";

const { getAllServicesByHomeOwnerId } = useQueryService();
const userIdStorage = useStorage("userId", -1);
const { data: services } = getAllServicesByHomeOwnerId(userIdStorage.value);
</script>

<template>
  <div class="flex items-center justify-between">
    <div>
      <p class="text-xl text-muted-foreground">A list of shortlisted services</p>
    </div>
  </div>

  <div class="flex grow justify-center">
    <Table v-if="services">
      <TableHeader>
        <TableRow>
          <TableHead>Service ID</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Cleaner</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="service in services" :key="service.serviceID">
          <TableCell>{{ service.serviceID }}</TableCell>
          <TableCell>{{ service.category }}</TableCell>
          <TableCell>{{ service.price }}</TableCell>
          <TableCell>{{ service.username }}</TableCell>
          <TableCell>
            <DeleteShortlistDialog :service="service" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<style scoped></style>
