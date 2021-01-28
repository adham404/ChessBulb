<template>
    <div>
        <ProfilePageHeader/>
        <keep-alive>
        <component v-bind:is="component"></component>
        </keep-alive>
    </div>
</template>

<script>
import NewsFeed from "@/components/MobileComponents/Newsfeed.vue"
import AcademyPageAboutText from "@/components/MobileComponents/AcademyPageAboutText"
import ProfilePageHeader from "@/components/MobileComponents/ProfilePageHeader.vue"
import LiveCard from "@/components/MobileComponents/LiveCard"
import CourseCard from "@/components/MobileComponents/CourseCard.vue"
import {EventBus} from "@/main.js"
import AcademyCard from "@/components/MobileComponents/AcademyCard"
import PlayerCard from "@/components/MobileComponents/PlayerCard"
export default {
  components: {
      ProfilePageHeader,
      NewsFeed,
      LiveCard,
      CourseCard,
      AcademyPageAboutText,
      AcademyCard,
      PlayerCard
  },
  data(){
    return{
      links: [
        'About',
        'Live sessions',
        'Posts',
        'Courses',
      ],
      component: "AcademyCard"
    }
      
    },
  methods: {
      ChangeComponent(NewComponent){
        this.component = NewComponent
      }
  },
  mounted(){
    EventBus.$on("ChangeComponent", (link) => {
      if(link == "Academies"){
        this.ChangeComponent("AcademyCard")
    } else if (link == "Posts") {
        this.ChangeComponent("NewsFeed")
    } else if (link == "Courses") {
        this.ChangeComponent("CourseCard")
    } else {
        this.ChangeComponent("PlayerCard")
    }
    }
    )
  }
}
</script>
