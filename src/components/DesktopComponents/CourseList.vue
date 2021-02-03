<template>
  <div>
    <CourseCard
      style="width:90%; margin-left: 5%;"
      v-for="(course, x) in GetListOfCourses"
      :order="x"
      :key="x"
      :preview="true"
    />
  </div>
</template>

<script>
import CourseCard from "@/components/DesktopComponents/CourseCard";
import { mapActions, mapGetters } from "vuex";

export default {
  mounted() {
    //Fetch Courses List
    this.FetchAllCourses();
  },
  methods: {
    ...mapActions(["FetchAllCourses"])
  },
  computed: {
    ...mapGetters(["GetListOfCourses"])
  },
  components: {
    CourseCard
  }
};
</script>

<style scoped></style>
