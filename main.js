import { createApp, h } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
import App from "./App.js";

const routes = [
  { path: "/", component: () => import("./views/Home.js") },
  { path: "/cart", component: () => import("./views/Cart.js") },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const app = createApp({
  render: () => h(App),
});

app.use(router);
app.mount(`#app`);
