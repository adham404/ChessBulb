import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/Development",
    name: "Development",
    components: {
      Desktop: () => import(/* webpackChunkName: "about" */ "../components/DesktopComponents/Development.vue"),
      Mobile: () => import(/* webpackChunkName: "about" */ "../components/MobileComponents/Development.vue")
    }
     
  },
  {
    path: '*',
    name: 'Not Found',
    component: NotFound
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
