<script setup lang="ts">
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import type { Role } from "@/types/account";
import { hasAccess } from "@/utils/hasAccess";
import type { LucideIcon } from "lucide-vue-next";

const { routes } = defineProps<{
  routes: {
    name: string;
    path: string;
    icon: LucideIcon;
    role: Role;
  }[];
}>();
</script>

<template>
  <SidebarGroup class="group-data-[collapsible=icon]:hidden">
    <SidebarMenu>
      <div v-for="item in routes" :key="item.name">
        <SidebarMenuItem v-if="hasAccess(item.role)">
          <SidebarMenuButton as-child>
            <RouterLink
              :to="item.path"
              active-class=" bg-primary text-primary-foreground"
              class="transition-colors duration-300"
            >
              <component :is="item.icon" />
              <span>{{ item.name }}</span>
            </RouterLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </div>
    </SidebarMenu>
  </SidebarGroup>
</template>

<style scoped></style>
