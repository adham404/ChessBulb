import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Development',
    components: {
      Desktop: ()=> import('@/components/DesktopComponents/Development.vue'), //SignUp
      Mobile: ()=> import('@/components/MobileComponents/Development.vue')
    } 
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    components: {
      Desktop: ()=> import('@/components/DesktopComponents/SignUp.vue'), //SignUp
      Mobile: ()=> import('@/components/MobileComponents/SignUp.vue')
    } 
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
    path: "/Login",
    name: "Login",
    components: {
      Desktop: () => import(/* webpackChunkName: "about" */ "../components/DesktopComponents/Login.vue"),
      Mobile: () => import(/* webpackChunkName: "about" */ "../components/MobileComponents/Login.vue")
    }
     
  },
  {
    path: '*',
    name: 'Not Found',
    components:{
      Desktop: NotFound,
      Mobile: NotFound
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
