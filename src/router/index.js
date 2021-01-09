import Vue from 'vue'
import VueRouter from 'vue-router'
// import ProductiveToggle from '@/components/Skeleton/ProductiveToggle.vue'
// import HomePage from '@/components/Skeleton/HomePage.vue'
// import CourseForm from '@/components/MarawanComponents/CourseForm.vue';
// import CreateCourse from '@/components/MarawanComponents/CreateCourse.vue';
// import LiveForm from '@/components/MarawanComponents/LiveForm.vue';
// import paymob from '@/components/MarawanComponents/paymob.vue';
// import LiveStreamer from '@/components/MarawanComponents/liveStreaming/Streamer.vue';
// import LiveViewer from '@/components/MarawanComponents/liveStreaming/Viewer.vue';
// import PostGame from '@/components/SadekComponents/PostGame/PostGame.vue'
// import AddStory from '@/components/ShemyComponents/AddStory.vue'
// import Analyze from '@/components/SadekComponents/NewsFeed/Analyze.vue'
// import AddAnalysis from '@/components/SadekComponents/NewsFeed/AddAnalysis.vue'
// import StoryDisplayWindow from '@/components/MarawanComponents/StoryScrolling/StoryScrollingTab.vue'
// import StoryPreview from '@/components/MarawanComponents/StoryScrolling/Stortypreview.vue'
// import Courses from '@/components/ShemyComponents/Courses.vue'
// import MyCourses from '@/components/MarawanComponents/MyCourses.vue'
// import CoursePreview from '@/components/ShemyComponents/CoursePreview.vue'
// import Streaming from '@/components/ShemyComponents/Streaming.vue'
// import Academies from '@/components/SadekComponents/Academy/Academies.vue'
// import CheckItOut from '@/components/SadekComponents/Academy/CheckItOut.vue'
// import Login from '@/components/ShemyComponents/Login.vue'
// import SignUp from '@/components/ShemyComponents/SignUp.vue'
// import UserProfile from '@/components/ShemyComponents/UserProfile.vue'
// import Notifications from '@/components/ShemyComponents/Notifications.vue'
// import InstructorProfile from '@/components/MarawanComponents/InstructorProfile.vue'
// import Purchase from '@/components/MarawanComponents/Purchase/Purchase.vue'
// import Subscribe from '@/components/MarawanComponents/Purchase/Subscribe.vue'
// import PurchaseSuccess from '@/components/MarawanComponents/Purchase/PurchaseSuccess.vue'
// import PurchaseCancel from '@/components/MarawanComponents/Purchase/PurchaseCancel.vue'
// import MarwanTest from '@/components/MarawanComponents/marawantest.vue'
// import AcademyForm from '@/components/MarawanComponents/AcademyForm.vue'
// import SadekTest from '@/components/SadekComponents/SadekTest.vue'
// import FindPlayers from '@/components/MarawanComponents/FindPlayers.vue'
// import Teach from '@/components/Skeleton/Teach.vue'
// import { component } from 'vue/types/umd';


Vue.use(VueRouter)

const routes = [
  {
    path: '/Teach',
    name: 'Teach' ,
    component: ()=> import('@/components/Skeleton/Teach.vue') //Teach
  },
  {
    path: '/paymob',
    name: 'paymob' ,
    component: ()=> import('@/components/MarawanComponents/paymob.vue') //paymob
  },
  {
    path: '/',
    name: 'SignUp',
    component: ()=> import('@/components/ShemyComponents/SignUp.vue') //SignUp
  },
  {
    path: '/Home',
    name: 'Home',
    component: ()=>  import ('@/components/Skeleton/HomePage.vue'),
  },
  {
    path: '/CreateCourse',
    name: 'CreateCourse',
    component: ()=> ()=>import('@/components/MarawanComponents/CreateCourse.vue'),
  },
  {
    path: '/AddAnalysis',
    name: 'AddAnalysis',
    component: ()=> import('@/components/SadekComponents/NewsFeed/AddAnalysis.vue') //AddAnalysis,
  },
  {
    path: '/PostGame',
    name: 'PostGame',
    component: ()=> import('@/components/SadekComponents/PostGame/PostGame.vue') //PostGame,
  },
  {
    path: '/LiveStreamer/:id',
    name: 'LiveStreamer',
    component: ()=> import('@/components/MarawanComponents/liveStreaming/Streamer.vue') //LiveStreamer,
  },
  {
    path: '/LiveForm',
    name: 'LiveForm',
    component: ()=> import('@/components/MarawanComponents/LiveForm.vue') //LiveForm,
  },
  {
    path: '/LiveViewer/:id',
    name: 'LiveViewer',
    component: ()=> import('@/components/MarawanComponents/liveStreaming/Viewer.vue') //LiveViewer,
  },
  {
    path: '/PostStory',
    name: 'PostStory',
    component: ()=> import('@/components/ShemyComponents/AddStory.vue') //AddStory
  },
  {
    path: '/AcademyForm',
    name: 'AcademyForm',
    component: ()=> import('@/components/MarawanComponents/AcademyForm.vue') //AcademyForm
  },
  {
    path: '/Marwan',
    name: 'Marwan',
    component: ()=> import('@/components/MarawanComponents/marawantest.vue') //MarwanTest,
    
  },
  {
    path: '/Posts/:id',
    name: 'Post',
    component: ()=> import('@/components/SadekComponents/NewsFeed/Analyze.vue') //Analyze
  },
  {
    path: '/Stories/',
    name: 'Stories',
    component: ()=> import('@/components/MarawanComponents/StoryScrolling/StoryScrollingTab.vue'), //StoryDisplayWindow,
    props: true,
    children:[
      {
        path : ':id',
        name : "StoryPreview",
        component : ()=> import('@/components/MarawanComponents/StoryScrolling/Stortypreview.vue')

      }
    ]
  },
  {
    path: '/Courses',
    name: 'Courses',
    component: ()=> import('@/components/ShemyComponents/Courses.vue') //Courses
  },
  {
    path: '/Courses/CoursePreview/:CoursesID',
    name: 'CoursePreview',
    component: ()=> import( '@/components/ShemyComponents/CoursePreview.vue'), //CoursePreview,
    props: true
  },
  {
    path: '/Courses/CourseStreaming/:CourseID',
    name: 'CourseStreaming',
    props: true,
    component: ()=> import('@/components/ShemyComponents/Streaming.vue') //Streaming
  },
  {
    path: '/Academies',
    name: 'Academies',
    component: ()=> import('@/components/SadekComponents/Academy/Academies.vue'), //Academies,
    props: true
  },
  {
    path: '/Academies/:id',
    name: 'AcademyPage',
    component: ()=> import('@/components/SadekComponents/Academy/CheckItOut.vue') //CheckItOut,
  },
  {
    path: '/Login',
    name: "Login",
    component: ()=> import('@/components/ShemyComponents/Login.vue') //Login,
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: ()=> import('@/components/ShemyComponents/SignUp.vue') //SignUp
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    props: true,
    component: ()=> import('@/components/ShemyComponents/UserProfile.vue'), //UserProfile,
    children: [
      {
        path: 'Courses',
        name: 'UserCourses',
        component: ()=> import('@/components/MarawanComponents/MyCourses.vue') //MyCourses
      },
      {
        path: 'Academies',
        name: 'UserAcademies',
        component: ()=> import('@/components/SadekComponents/Academy/Academies.vue') //Academies
      },
      {
        path: 'Notifications',
        name: 'UserNotifications',
        component: ()=> import('@/components/ShemyComponents/Notifications.vue') //Notifications
      }
    ]
  },
  {
    path: '/InstructorRegistration',
    name: 'InstructorRegistration',
    component: ()=> import('@/components/MarawanComponents/InstructorProfile.vue') //InstructorProfile
  },
  {
    path: '/Purchase/:id',
    name: 'Purchase',
    props: true,
    component: ()=> import('@/components/MarawanComponents/Purchase/Purchase.vue') //Purchase,
    
  },
  {
    path: '/Subscribe/:id',
    name: 'Subscribe',
    props: true,
    component: ()=> import('@/components/MarawanComponents/Purchase/Subscribe.vue') //Subscribe,
    
  },

  {
    path:'/Success/:id',
    name:'Success',
    component : ()=> import('@/components/MarawanComponents/Purchase/PurchaseSuccess.vue')
  },
  {
    path:'/Cancel/:id',
    name:'Cancel',
    component : ()=>import('@/components/MarawanComponents/Purchase/PurchaseCancel.vue')
  },

  {
    path: '/FindPlayers',
    name: 'Explore',
    component: ()=> import('@/components/MarawanComponents/FindPlayers.vue') //FindPlayers
  },
  {
    path: '/Sadek',
    name: 'Sadek',
    component: ()=> import('@/components/SadekComponents/SadekTest.vue') //SadekTest
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
