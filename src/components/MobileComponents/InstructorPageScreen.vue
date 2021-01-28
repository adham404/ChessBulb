<template>
  <div>
    <InstructorPageHeader/>
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>

<script>
import firebase from "firebase"
import {EventBus} from "@/main.js"
import InstructorPageHeader from "@/components/MobileComponents/InstructorPageHeader"
import InstructorPageAboutText from "@/components/MobileComponents/InstructorPageAboutText"
import LiveCard from "@/components/MobileComponents/LiveCard"
import CourseCard from "@/components/MobileComponents/CourseCard.vue"
import NewsFeed from "@/components/MobileComponents/Newsfeed.vue"

export default {
  components: {
      InstructorPageHeader,
      InstructorPageAboutText,
      LiveCard,
      CourseCard,
      NewsFeed
  },
  data(){
    return{
      links: [
        'About',
        'Posts',
        'Courses',
      ],
      component: "InstructorPageAboutText"
    }
      
    },
  methods: {
      SignOut(){
          const auth = firebase.auth();
          auth.signOut();
          alert("the User ID right now is " + this.UserID);
          this.$router.push('/SignUp')                
      },
      ChangeComponent(NewComponent){
        this.component = NewComponent
      }
},
mounted(){
    EventBus.$on("ChangeComponent", (link) => {
      if(link == "About"){
        this.ChangeComponent("InstructorPageAboutText")
    } else if (link == "Posts") {
        this.ChangeComponent("NewsFeed")
    } else if (link == "Courses") {
        this.ChangeComponent("CourseCard")
    } else {
        this.ChangeComponent("LiveCard")
    }
    }
    )
  }
}
</script>

