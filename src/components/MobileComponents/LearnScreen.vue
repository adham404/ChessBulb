<template>
  <div>
    <LearnScreenHeader />
    <keep-alive>
      <component :General="true" v-bind:is="component"></component>
    </keep-alive>
  </div>
</template>

<script>
import LearnScreenHeader from "@/components/MobileComponents/LearnScreenHeader";
import InstructorList from "@/components/MobileComponents/InstructorList";
import CourseList from "@/components/MobileComponents/CourseList";
import { EventBus } from "@/main.js";
export default {
  data() {
    return {
      component: "CourseList"
    };
  },
  components: {
    LearnScreenHeader,
    InstructorList,
    CourseList
  },
  methods: {
    ChangeComponent(NewComponent) {
      this.component = NewComponent;
    }
  },
  mounted() {
    EventBus.$on("ChangeComponent", link => {
      if (link == "Instructors") {
        this.ChangeComponent("InstructorList");
      } else if (link == "Courses") {
        this.ChangeComponent("CourseList");
      }
    });
  }
};
</script>

<style scoped></style>
