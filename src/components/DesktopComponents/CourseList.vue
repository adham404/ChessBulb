<template>
  <div>
    <CourseCard
      style="width:100%;"
      v-for="(course, x) in GetListOfCourses"
      :order="x"
      :key="x"
      :preview="true"
    />
  </div>
</template>

<script>
import CourseCard from "@/components/MobileComponents/CourseCard";
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
