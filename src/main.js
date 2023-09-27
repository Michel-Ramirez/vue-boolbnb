import { createApp } from "vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/scss/style.scss";
import App from "./App.vue";
import AppHeader from "./components/AppHeader.vue";
import { router } from "./router";

const app = createApp(App);
app.component("AppHeader", AppHeader);
// app.component("AppLoader", AppLoader);
// app.component("AppAlert", AppAlert);
//utilizzo il router
app.use(router);
app.mount("#app");
