import Vue from 'vue'
import VueRouter from 'vue-router'
import ProductiveToggle from '@/components/Skeleton/ProductiveToggle.vue'
import HomePage from '@/components/Skeleton/HomePage.vue'
import CreateCourse from '@/components/ShemyComponents/CreateCourse.vue';
import PostGame from '@/components/SadekComponents/PostGame/PostGame.vue'
import AddStory from '@/components/ShemyComponents/AddStory.vue'
import Analyze from '@/components/SadekComponents/NewsFeed/Analyze.vue'
import StoryDisplayWindow from '@/components/MarawanComponents/StoryScrolling/StoryDisplayWindow.vue'
import Courses from '@/components/ShemyComponents/Courses.vue'
import CoursePreview from '@/components/ShemyComponents/CoursePreview.vue'
import Streaming from '@/components/ShemyComponents/Streaming.vue'
import Academies from '@/components/SadekComponents/Academy/Academies.vue'
import CheckItOut from '@/components/SadekComponents/Academy/CheckItOut.vue'
import Login from '@/components/ShemyComponents/Login.vue'
import SignUp from '@/components/ShemyComponents/SignUp.vue'
import UserProfile from '@/components/ShemyComponents/UserProfile.vue'
import Notifications from '@/components/ShemyComponents/Notifications.vue'
import InstructorProfile from '@/components/MarawanComponents/InstructorProfile.vue'
import Purchase from '@/components/MarawanComponents/Purchase.vue'
import FindPlayers from '@/components/MarawanComponents/FindPlayers.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ProductiveToggle',
    component: ProductiveToggle
  },
  {
    path: '/Home',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/Create Course',
    name: 'CreateCourse',
    component: CreateCourse
  },
  {
    path: '/Post Game',
    name: 'PostGame',
    component: PostGame,
  },
  {
    path: '/Post Story',
    name: 'PostStory',
    component: AddStory
  },
  {
    path: '/Posts/:id',
    name: 'Post',
    component: Analyze
  },
  {
    path: '/Stories/:id',
    name: 'Stories',
    component: StoryDisplayWindow,
  },
  {
    path: '/Courses',
    name: 'Courses',
    component: Courses
  },
  {
    path: '/Courses/:id/Course Preview',
    name: 'CoursePreview',
    component: CoursePreview
  },
  {
    path: '/Courses/CourseStreaming/:id',
    name: 'CourseStreaming',
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
    component: UserProfile,
    children: [
      {
        path: 'Courses',
        name: 'UserCourses',
        component: Courses
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
    path: '/Instructor Registration',
    name: 'InstructorRegistration',
    component: InstructorProfile
  },
  {
    path: '/Purchase',
    name: 'Purchase',
    component: Purchase
  },
  {
    path: '/Find Players',
    name: 'Explore',
    component: FindPlayers
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
