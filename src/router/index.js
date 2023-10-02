import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: HomePage },

    // { path: "/not-found", name: "not-found", component: NotFoundPage },
    // { path: "/:pathMatch(.*)*", redirect: "/not-found" },
  ],
});
export { router };
