import Vue from 'vue'
import VueRouter from 'vue-router'
// import ProductiveToggle from '@/components/Skeleton/ProductiveToggle.vue'
import HomePage from '@/components/Skeleton/HomePage.vue'
// import CourseForm from '@/components/MarawanComponents/CourseForm.vue';
import CreateCourse from '@/components/MarawanComponents/CreateCourse.vue';
import LiveForm from '@/components/MarawanComponents/LiveForm.vue';
import LiveStreamer from '@/components/MarawanComponents/liveStreaming/Streamer.vue';
import LiveViewer from '@/components/MarawanComponents/liveStreaming/Viewer.vue';
import PostGame from '@/components/SadekComponents/PostGame/PostGame.vue'
import AddStory from '@/components/ShemyComponents/AddStory.vue'
import Analyze from '@/components/SadekComponents/NewsFeed/Analyze.vue'
import AddAnalysis from '@/components/SadekComponents/NewsFeed/AddAnalysis.vue'
import StoryDisplayWindow from '@/components/MarawanComponents/StoryScrolling/StoryScrollingTab.vue'
import StoryPreview from '@/components/MarawanComponents/StoryScrolling/Stortypreview.vue'
import Courses from '@/components/ShemyComponents/Courses.vue'
import MyCourses from '@/components/MarawanComponents/MyCourses.vue'
import CoursePreview from '@/components/ShemyComponents/CoursePreview.vue'
import Streaming from '@/components/ShemyComponents/Streaming.vue'
import Academies from '@/components/SadekComponents/Academy/Academies.vue'
import CheckItOut from '@/components/SadekComponents/Academy/CheckItOut.vue'
import Login from '@/components/ShemyComponents/Login.vue'
import SignUp from '@/components/ShemyComponents/SignUp.vue'
import UserProfile from '@/components/ShemyComponents/UserProfile.vue'
import Notifications from '@/components/ShemyComponents/Notifications.vue'
import InstructorProfile from '@/components/MarawanComponents/InstructorProfile.vue'
import Purchase from '@/components/MarawanComponents/Purchase/Purchase.vue'
import Subscribe from '@/components/MarawanComponents/Purchase/Subscribe.vue'
import PurchaseSuccess from '@/components/MarawanComponents/Purchase/PurchaseSuccess.vue'
import PurchaseCancel from '@/components/MarawanComponents/Purchase/PurchaseCancel.vue'
import MarwanTest from '@/components/MarawanComponents/marawantest.vue'
import AcademyForm from '@/components/MarawanComponents/AcademyForm.vue'
import SadekTest from '@/components/SadekComponents/SadekTest.vue'
import FindPlayers from '@/components/MarawanComponents/FindPlayers.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/Home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/CreateCourse',
    name: 'CreateCourse',
    component: CreateCourse,
  },
  {
    path: '/AddAnalysis',
    name: 'AddAnalysis',
    component: AddAnalysis,
  },
  {
    path: '/PostGame',
    name: 'PostGame',
    component: PostGame,
  },
  {
    path: '/LiveStreamer/:id',
    name: 'LiveStreamer',
    component: LiveStreamer,
  },
  {
    path: '/LiveForm',
    name: 'LiveForm',
    component: LiveForm,
  },
  {
    path: '/LiveViewer/:id',
    name: 'LiveViewer',
    component: LiveViewer,
  },
  {
    path: '/PostStory',
    name: 'PostStory',
    component: AddStory
  },
  {
    path: '/AcademyForm',
    name: 'AcademyForm',
    component: AcademyForm
  },
  {
    path: '/Marwan',
    name: 'Marwan',
    component: MarwanTest,
    
  },
  {
    path: '/Posts/:id',
    name: 'Post',
    component: Analyze
  },
  {
    path: '/Stories/',
    name: 'Stories',
    component: StoryDisplayWindow,
    props: true,
    children:[
      {
        path : ':id',
        name : "StoryPreview",
        component : StoryPreview

      }
    ]
  },
  {
    path: '/Courses',
    name: 'Courses',
    component: Courses
  },
  {
    path: '/Courses/CoursePreview/:CoursesID',
    name: 'CoursePreview',
    component: CoursePreview,
    props: true
  },
  {
    path: '/Courses/CourseStreaming/:CourseID',
    name: 'CourseStreaming',
    props: true,
    component: Streaming
  },
  {
    path: '/Academies',
    name: 'Academies',
    component: Academies,
    props: true
  },
  {
    path: '/Academies/:id',
    name: 'AcademyPage',
    component: CheckItOut,
  },
  {
    path: '/Login',
    name: Login,
    component: Login,
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    props: true,
    component: UserProfile,
    children: [
      {
        path: 'Courses',
        name: 'UserCourses',
        component: MyCourses
      },
      {
        path: 'Academies',
        name: 'UserAcademies',
        component: Academies
      },
      {
        path: 'Notifications',
        name: 'UserNotifications',
        component: Notifications
      }
    ]
  },
  {
    path: '/InstructorRegistration',
    name: 'InstructorRegistration',
    component: InstructorProfile
  },
  {
    path: '/Purchase/:id',
    name: 'Purchase',
    props: true,
    component: Purchase,
    
  },
  {
    path: '/Subscribe/:id',
    name: 'Subscribe',
    props: true,
    component: Subscribe,
    
  },
  
  {
    path:'/Success/:id',
    name:'Success',
    component : PurchaseSuccess
  },
  {
    path:'/Cancel/:id',
    name:'Cancel',
    component : PurchaseCancel
  },

  {
    path: '/FindPlayers',
    name: 'Explore',
    component: FindPlayers
  },
  {
    path: '/Sadek',
    name: 'Sadek',
    component: SadekTest
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
