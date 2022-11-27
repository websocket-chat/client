import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Messenger - Home",
      restricted: true,
    },
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "Messenger - Login",
      restricted: false,
    },
    component: () => import("@/views/LoginAndSignUp"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
