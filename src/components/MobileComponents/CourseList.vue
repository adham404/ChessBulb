<template>
  <div>
    <!-- <v-row class="px-8 mt-1">
      <v-text-field
        height="40"
        color="white"
        background-color="white"
        rounded
        placeholder="search for a course by instructor or topic"
        type="text"
      ></v-text-field>
      <v-icon right color="white">
        fa-search
      </v-icon>
    </v-row>
    <v-sheet
      class="white "
      height="100"
      width="100%"
      rounded="lg"
      elevation="5"
    >
      <v-row class="ml-1 text-subtitle-1 font-weight-bold">
        <span>Choose course difficulty for further filtering</span>
      </v-row>
      <v-row justify="space-around">
        <v-checkbox v-model="checkbox" label="Beginner"></v-checkbox>
        <v-checkbox v-model="checkbox" label="Intermediate"></v-checkbox>
        <v-checkbox v-model="checkbox" label="Advanced"></v-checkbox>
      </v-row>
    </v-sheet> -->
    <SearchEngine SearchIndex="Courses" :ShowFilters="true"></SearchEngine>

    <CourseCard
      v-for="(course, x) in GetListOfCourses"
      :order="x"
      :key="x"
      :preview="true"
    />
  </div>
</template>

<script>
import CourseCard from "@/components/MobileComponents/CourseCard";
import SearchEngine from "../MarawanComponents/SearchEngine";
import { mapActions, mapGetters, mapMutations } from "vuex";
import { EventBus } from "../../main";
import firebase from "firebase";
export default {
  mounted() {
    //Fetch Courses List
    // this.FetchAllCourses();
    //Recieve Search Signal
    EventBus.$on("TheSearchResult", ids => {
      console.log("Hey:  " + ids);
      this.FetchIdsQuick(ids);
    });
  },
  beforeDestroy() {
    EventBus.$off("SearchIndex");
  },
  data: function() {
    return {
      Courses: []
    };
  },
  methods: {
    ...mapActions(["FetchAllCourses"]),
    ...mapMutations(["SetCoursesDataToTheGeneralArray"]),
    async FetchIdsQuick(ids) {
      this.Courses = [];
      var db = firebase.firestore();
      ids.forEach(async id => {
        await db
          .collection("Courses")
          .doc(id)
          .get()
          .then(doc => {
            this.Courses.push(doc.data());
          });
      });
      this.SetCoursesDataToTheGeneralArray(this.Courses);
    }
  },
  computed: {
    ...mapGetters(["GetListOfCourses"])
  },
  components: {
    CourseCard,
    SearchEngine
  }
};
</script>

<style scoped></style>