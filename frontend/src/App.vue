<script setup lang="ts">
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "vue-sonner";
import AppSidebar from "@/components/AppSidebar.vue";
import { useRouter, RouterView } from "vue-router";
import { computed } from "vue";
import { useColorMode } from "@vueuse/core";

const router = useRouter();

const isOnLoginPage = computed(() => {
  return router.currentRoute.value.name === "login";
});

const mode = useColorMode();
const isDarkMode = computed(() => {
  return mode.value === "dark";
});
</script>

<template>
  <div :class="isDarkMode ? 'dark' : ''">
    <Toaster />
    <SidebarProvider>
      <AppSidebar v-if="!isOnLoginPage" />
      <SidebarInset>
        <header class="flex h-16 shrink-0 items-center gap-2" v-if="!isOnLoginPage">
          <div class="flex items-center gap-2 px-4">
            <SidebarTrigger class="-ml-1" />
            <Separator orientation="vertical" class="mr-2 h-4" />
            {{ router.currentRoute.value.meta.title }}
          </div>
        </header>
        <div class="flex flex-1 flex-col gap-4 p-4 pt-0">
          <RouterView />
        </div>
      </SidebarInset>
    </SidebarProvider>
  </div>
</template>

<style scoped></style>
