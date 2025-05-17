<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import NavMain from "@/components/NavMain.vue";
import NavUser from "@/components/NavUser.vue";
import { BookmarkCheck, BrushCleaning, FileText, Layers, User, Users } from "lucide-vue-next";
import { Role } from "@/types/account";
import { useStorage } from "@vueuse/core";

const routes = [
  {
    name: "Offered Services",
    path: "/offered-services",
    icon: BrushCleaning,
    role: Role.CLEANER,
  },
  {
    name: "Services",
    path: "/services",
    icon: BrushCleaning,
    role: Role.HOMEOWNER,
  },
  {
    name: "Shortlisted",
    path: "/shortlisted",
    icon: BookmarkCheck,
    role: Role.HOMEOWNER,
  },
  {
    name: "Accounts",
    path: "/accounts",
    icon: User,
    role: Role.ADMIN,
  },
  {
    name: "Profiles",
    path: "/profiles",
    icon: Users,
    role: Role.ADMIN,
  },
  {
    name: "Categories",
    path: "/categories",
    icon: Layers,
    role: Role.PLATFORMMANAGER,
  },
  {
    name: "Logs",
    path: "/logs",
    icon: FileText,
    role: Role.PLATFORMMANAGER,
  },
];

const usernameStorage = useStorage("username", "");
const roleStorage = useStorage("role", "");
</script>

<template>
  <Sidebar variant="inset">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <div>
              <div class="grid flex-1 text-left text-sm leading-tight">
                <span class="truncate font-semibold">Gleamr</span>
                <span class="truncate text-xs">Enterprise</span>
              </div>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
    <SidebarContent>
      <NavMain :routes="routes" />
    </SidebarContent>
    <SidebarFooter>
      <NavUser :user="{ username: usernameStorage, profile: roleStorage }" />
    </SidebarFooter>
  </Sidebar>
</template>

<style scoped></style>
