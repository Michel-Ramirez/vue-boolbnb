import { createRouter, createWebHistory } from "vue-router";
<<<<<<< HEAD
import HelloWorld from "../components/HelloWorld.vue";
=======
import AppHomePage from "../pages/AppHomePage.vue";
>>>>>>> 21b2492 (make scaffonding and add component home/header)

const router = createRouter({
  history: createWebHistory(),
  routes: [
<<<<<<< HEAD
    { path: "/", name: "home", component: HelloWorld },
=======
    { path: "/", name: "home", component: AppHomePage },
>>>>>>> 21b2492 (make scaffonding and add component home/header)

    // { path: "/not-found", name: "not-found", component: NotFoundPage },
    // { path: "/:pathMatch(.*)*", redirect: "/not-found" },
  ],
});
export { router };
