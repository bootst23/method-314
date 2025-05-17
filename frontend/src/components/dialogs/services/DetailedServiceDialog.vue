<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ZoomIn } from "lucide-vue-next";
import { type Service } from "@/types/service";
import { computed, ref } from "vue";
import { useQueryService } from "@/composables/queries/service";
import { toast } from "vue-sonner";
import { useStorage } from "@vueuse/core";
import { useViewAPI } from "@/composables/api/view";
import { useMutateService } from "@/composables/mutations/service";

const { service } = defineProps<{ service: Service }>();

const { incrementView } = useViewAPI();
const { getAllServicesByHomeOwnerId } = useQueryService();
const { createServiceShortlist, removeServiceShortlist } = useMutateService();
const userIdStorage = useStorage("userId", -1);
const { data: services } = getAllServicesByHomeOwnerId(userIdStorage.value);
const isDialogOpen = ref(false);

function onDialogUpdate(value: boolean) {
  isDialogOpen.value = value;
}

const shortlistedItem = computed(() => {
  if (!services.value) {
    return undefined;
  }
  return services.value.find((s) => s.serviceID === service.serviceID);
});

function onOpenDialog() {
  if (isDialogOpen.value) {
    try {
      incrementView(service.serviceID, userIdStorage.value);
    } catch (error) {
      console.error("Error incrementing view count: ", error);
    }
  }
}

async function handleShortlist() {
  if (shortlistedItem.value) {
    const data = {
      service: shortlistedItem.value,
      hownerID: userIdStorage.value,
    };
    await removeServiceShortlist(data);
    toast.success("Service removed from shortlist");
  } else {
    const data = {
      service: {
        serviceID: service.serviceID,
        cleanerID: service.cleanerID,
        username: service.username,
        category: service.category,
        price: service.price,
        view: service.view,
        shortlistCount: service.shortlistCount,
      },
      hownerID: userIdStorage.value,
    };
    await createServiceShortlist(data);
    toast.success("Service shortlisted");
  }
}
</script>
<template>
  <Dialog :open="isDialogOpen" @update:open="onDialogUpdate">
    <DialogTrigger as-child>
      <Button class="tracking-normal" @click="onOpenDialog">
        <ZoomIn class="mr-2 h-4 w-4" /> View Details
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Service Details</DialogTitle>
        <DialogDescription>
          View the details of a service. You can shortlist it here
        </DialogDescription>
      </DialogHeader>
      <div class="grid grid-cols-2 gap-4">
        <div class="flex flex-col">
          <Card>
            <CardHeader>
              <CardTitle>Service ID</CardTitle>
              <CardDescription>{{ service.serviceID }}</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div class="flex flex-col">
          <Card>
            <CardHeader>
              <CardTitle>Cleaner</CardTitle>
              <CardDescription>{{ service.username }}</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div class="flex flex-col">
          <Card>
            <CardHeader>
              <CardTitle>Category</CardTitle>
              <CardDescription>{{ service.category }}</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div class="flex flex-col">
          <Card>
            <CardHeader>
              <CardTitle>Price</CardTitle>
              <CardDescription>{{ service.price }}</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div class="flex flex-col">
          <Card>
            <CardHeader>
              <CardTitle>Views</CardTitle>
              <CardDescription>{{ service.view }}</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div class="flex flex-col">
          <Card>
            <CardHeader>
              <CardTitle>Shortlists</CardTitle>
              <CardDescription>{{ service.shortlistCount }}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
      <Button
        variant="default"
        class="mt-4 w-full"
        v-if="shortlistedItem === undefined"
        @click="handleShortlist"
      >
        Shortlist
      </Button>
      <Button variant="outline" class="mt-4 w-full" v-else @click="handleShortlist">
        Remove Shortlist
      </Button>
    </DialogContent>
  </Dialog>
</template>
