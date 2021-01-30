import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import NotFound from '../views/NotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    components: {
      Desktop: ()=> import('@/components/DesktopComponents/Development.vue'), //SignUp
      Mobile: ()=> import('@/views/MobileViews/Home.vue')
    } 
  },
  {
    path: '/Profile',
    name: 'Profile',
    components: {
      Desktop: ()=> import('@/components/DesktopComponents/Development.vue'), //SignUp
      Mobile: ()=> import('@/views/MobileViews/Profile.vue')
    } 
  },
  {
    path: '/AddSnapshot',
    name: 'AddSnapshot',
    components: {
      Desktop: ()=> import('@/components/DesktopComponents/Development.vue'), //SignUp
      Mobile: ()=> import('@/views/MobileViews/PostSnapshot.vue')
    } 
  },
  {
    path: '/Snapshots',
    name: 'Snapshots',
    components: {
      Desktop: ()=> import('@/components/DesktopComponents/Development.vue'), //SignUp
      Mobile: ()=> import('@/views/MobileViews/Snapshot.vue')
    } 
  },
  {
    path: '/LiveViewer',
    name: 'LiveViewer',
    components: {
      Desktop: ()=> import('@/components/DesktopComponents/Development.vue'), //SignUp
      Mobile: ()=> import('@/views/MobileViews/LiveViewer.vue')
    } 
  },
  {
    path: '/Academies',
    name: 'Academies',
    components: {
      Desktop: ()=> import('@/components/DesktopComponents/Development.vue'), //SignUp
      Mobile: ()=> import('@/views/MobileViews/Academies.vue')
    } 
  },
  {
    path: '/Academies/AcademyPage',
    name: 'AcademyPage',
    components: {
      Desktop: ()=> import('@/components/DesktopComponents/Development.vue'), //SignUp
      Mobile: ()=> import('@/views/MobileViews/AcademyPage.vue')
    } 
  },
  {
    path: '/Learn',
    name: 'Learn',
    components: {
      Desktop: ()=> import('@/components/DesktopComponents/Development.vue'), //SignUp
      Mobile: ()=> import('@/views/MobileViews/Learn.vue')
    } 
  },
  {
    path: '/CourseStreaming/:CourseID',
    props: true,
    name: 'CourseStreaming',
    components: {
      Desktop: ()=> import('@/components/DesktopComponents/Development.vue'), //SignUp
      Mobile: ()=> import('@/views/MobileViews/CourseStreaming.vue')
    } 
  },
  {
    path: '/CoursePage/:CourseID',
    name: 'CoursePage',
    props: true,
    components: {
      Desktop: ()=> import('@/components/DesktopComponents/Development.vue'), //SignUp
      Mobile: ()=> import('@/views/MobileViews/Course.vue')
    } 
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    components: {
      Desktop: ()=> import('@/components/DesktopComponents/SignUp.vue'), //SignUp
      Mobile: ()=> import('@/views/MobileViews/SignUp.vue')
    } 
  },
  {
    path: '/Instructors',
    name: 'Instructors',
    components: {
      Desktop: ()=> import('@/components/DesktopComponents/SignUp.vue'), //SignUp
      Mobile: ()=> import('@/views/MobileViews/InstructorPage.vue')
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
      Mobile: () => import(/* webpackChunkName: "about" */ "@/views/MobileViews/Login.vue")
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
