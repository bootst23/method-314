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
import DetailedServiceDialog from "@/components/dialogs/services/DetailedServiceDialog.vue";

const { getAllServices } = useQueryService();
const { data: services } = getAllServices();
</script>

<template>
  <div class="flex items-center justify-between">
    <div>
      <p class="text-xl text-muted-foreground">A list of offered services</p>
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
            <DetailedServiceDialog :service="service" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<style scoped></style>
