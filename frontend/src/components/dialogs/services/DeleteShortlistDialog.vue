<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-vue-next";
import { useMutateService } from "@/composables/mutations/service";
import { toast } from "vue-sonner";
import type { Service } from "@/types/service";
import { useStorage } from "@vueuse/core";

const { service } = defineProps<{ service: Service }>();
const userIdStorage = useStorage("userId", -1);

const { removeServiceShortlist } = useMutateService();

async function onDelete() {
  try {
    const data = {
      service,
      hownerID: userIdStorage.value,
    };
    await removeServiceShortlist(data);
    toast.success(`Successfully removed shortlist`);
  } catch (error) {
    toast.error("Failed to remove shortlist: " + error);
  }
}
</script>
<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <Button variant="outline" size="icon" class="mr-2">
        <Trash class="h-4 w-4 text-red-500" />
      </Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete the service.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction @click="onDelete">Remove</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
