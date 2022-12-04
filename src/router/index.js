import Vue from "vue";
import VueRouter from "vue-router";
import Store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      title: "Messenger - Home",
      restricted: true,
    },
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/login",
    name: "LoginAndSignUp",
    meta: {
      title: "Messenger - Login",
      restricted: false,
    },
    component: () => import("@/views/LoginAndSignUp.vue"),
  },
  {
    path: "/messenger",
    name: "Messenger",
    meta: {
      restricted: false,
      title: "Messenger"
    },

  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let authenticated = Store.getters["user/checkAuthentication"];

  if (!authenticated && to.path !== "/login") {
    next({ name: "LoginAndSignUp" });
  } else {
    next();
  }
});

export default router;
