import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
      meta: {
        title: "Login",
      },
    },
    {
      path: "/offered-services",
      name: "offered-services",
      component: () => import("../views/OfferedServicesView.vue"),
      meta: {
        title: "Offered Services",
      },
    },
    {
      path: "/services",
      name: "services",
      component: () => import("../views/ServicesView.vue"),
      meta: {
        title: "Services",
      },
    },
    {
      path: "/shortlisted",
      name: "shortlisted",
      component: () => import("../views/ShortlistedView.vue"),
      meta: {
        title: "Shortlisted",
      },
    },
    {
      path: "/accounts",
      name: "accounts",
      component: () => import("../views/AccountsView.vue"),
      meta: {
        title: "Accounts",
      },
    },
    {
      path: "/profiles",
      name: "profiles",
      component: () => import("../views/ProfilesView.vue"),
      meta: {
        title: "Profiles",
      },
    },
    {
      path: "/categories",
      name: "categories",
      component: () => import("../views/CategoriesView.vue"),
      meta: {
        title: "Categories",
      },
    },
    {
      path: "/logs",
      name: "logs",
      component: () => import("../views/LogsView.vue"),
      meta: {
        title: "Logs",
      },
    },
  ],
});

export default router;
