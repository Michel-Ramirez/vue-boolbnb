import { createRouter, createWebHistory } from "vue-router";
import AppHomePage from "../pages/AppHomePage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: AppHomePage },

    // { path: "/not-found", name: "not-found", component: NotFoundPage },
    // { path: "/:pathMatch(.*)*", redirect: "/not-found" },
  ],
});
export { router };
