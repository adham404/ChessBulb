<template>
  <div>
    <ProfilePageHeader />
    <keep-alive>
      <component v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>

<script>
import NewsFeed from "@/components/MobileComponents/Newsfeed.vue";
import AcademyPageAboutText from "@/components/MobileComponents/AcademyPageAboutText";
import ProfilePageHeader from "@/components/MobileComponents/ProfilePageHeader.vue";
import LiveCard from "@/components/MobileComponents/LiveCard";
import CourseCard from "@/components/MobileComponents/CourseCard.vue";
import { EventBus } from "@/main.js";
import AcademyCard from "@/components/MobileComponents/AcademyCard";
import PlayerCard from "@/components/MobileComponents/PlayerCard";
import UsersList from "@/components/MobileComponents/UsersList.vue";
import CourseList from "@/components/MobileComponents/CourseList.vue";
import AcademiesList from "@/components/MobileComponents/AcademiesList.vue";
import ProfileSettings from "@/components/MobileComponents/ProfileSettings.vue";

export default {
  components: {
    ProfilePageHeader,
    AcademiesList,
    ProfileSettings,
    NewsFeed,
    CourseList,
    LiveCard,
    UsersList,
    CourseCard,
    AcademyPageAboutText,
    AcademyCard,
    PlayerCard
  },
  data() {
    return {
      links: ["About", "Live sessions", "Posts", "Courses"],
      component: "AcademyCard"
    };
  },
  methods: {
    ChangeComponent(NewComponent) {
      this.component = NewComponent;
    }
  },
  mounted() {
    EventBus.$on("ChangeComponent", link => {
      if (link == "Academies") {
        this.ChangeComponent("AcademiesList");
      } else if (link == "Posts") {
        this.ChangeComponent("NewsFeed");
      } else if (link == "Courses") {
        this.ChangeComponent("CourseList");
      } else if (link == "Explore") {
        this.ChangeComponent("UsersList");
      } else {
        this.ChangeComponent("ProfileSettings");
      }
    });
  }
};
</script>
