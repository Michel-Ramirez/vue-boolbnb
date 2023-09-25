import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
<<<<<<< HEAD
import "./style.css";
import App from "./App.vue";
import { router } from "./router";

const app = createApp(App);
=======
import "./assets/scss/style.scss";
import App from "./App.vue";
import AppHeader from "./components/AppHeader.vue";
import { router } from "./router";

const app = createApp(App);
app.component("AppHeader", AppHeader);
>>>>>>> 21b2492 (make scaffonding and add component home/header)
// app.component("AppLoader", AppLoader);
// app.component("AppAlert", AppAlert);
//utilizzo il router
app.use(router);
app.mount("#app");
