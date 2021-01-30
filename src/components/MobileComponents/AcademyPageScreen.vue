<template>
    <div>
        <AcademyPageHeader/>
        <keep-alive>
        <component v-bind:is="component"></component>
        </keep-alive>
    </div>
</template>

<script>
import NewsFeed from "@/components/MobileComponents/Newsfeed.vue"
import AcademyPageAboutText from "@/components/MobileComponents/AcademyPageAboutText"
import AcademyPageHeader from "@/components/MobileComponents/AcademyPageHeader.vue"
import LiveCard from "@/components/MobileComponents/LiveCard"
import CourseCard from "@/components/MobileComponents/CourseCard.vue"
import LiveList from "@/components/MobileComponents/LiveList.vue"
import {EventBus} from "@/main.js"

export default {
  components: {
      AcademyPageHeader,
      NewsFeed,
      LiveCard,
      LiveList,
      CourseCard,
      AcademyPageAboutText,
  },
  data(){
    return{
      links: [
        'About',
        'Live sessions',
        'Posts',
        'Courses',
      ],
      component: "AcademyPageAboutText"
    }
      
    },
  methods: {
      ChangeComponent(NewComponent){
        this.component = NewComponent
      }
  },
  mounted(){
    EventBus.$on("ChangeComponent", (link) => {
      if(link == "About"){
        this.ChangeComponent("AcademyPageAboutText")
    } else if (link == "Posts") {
        this.ChangeComponent("NewsFeed")
    } else if (link == "Courses") {
        this.ChangeComponent("CourseCard")
    } else {
        this.ChangeComponent("LiveList")
    }
    }
    )
  }
}
</script>
