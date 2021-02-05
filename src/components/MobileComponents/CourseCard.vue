<template>
  <div class="my-8">
    <v-sheet>
      <v-row class="my-1 px-1" height="200">
        <v-img
          lazy-src="@/assets/Academy2.jpg"
          max-height="150"
          max-width="100%"
          src="@/assets/Academy2.jpg"
        ></v-img>
      </v-row>
      <v-row class="mt-1 px-1 pb-1">
        <v-col>
          <v-avatar size="70" cols="2" class="mx-0 px-0">
            <img
              src="@/assets/ProfilePic2.jpg"
              alt=""
              style="object-fit: cover"
            />
          </v-avatar>
          <span class="text-caption text-center">{{ FullName }}</span>
        </v-col>
        <v-col cols="9">
          <span class="text-h6">{{ GetListOfCourses[order].CourseName }}</span>
          <br />
          <span class="text-caption"
            >by {{ FullName }} (instructor at Smouha Chess Academy)</span
          >
          <br />
          <v-rating
            hover
            length="5"
            size="20"
            :value="GetListOfCourses[order].Rating"
            readonly="true"
          >
          </v-rating>
          <v-btn
            v-if="preview"
            xs
            class="text-capitalize primary"
            height="25"
            @click="
              () => {
                $router.push({
                  path: `/CoursePage/${GetListOfCourses[order].CourseId}`,
                  query: { CourseID: GetListOfCourses[order].CourseId }
                });
              }
            "
            >Open</v-btn
          >
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import firebase from "firebase";

export default {
  props: ["order", "preview"],
  async mounted() {
    //Fetch the Instructor Data
    // this.FetchCourseInstructorData(this.GetListOfCourses[this.order].InstructorId);
    await this.order;
    console.log("The boolean making all the trouble: " + this.preview);
    //Get Instructor Full Name
    console.log(
      "Instructoo id: " + this.GetListOfCourses[this.order].InstructorId
    );
    var db = firebase.firestore();
    await db
      .collection("Users")
      .doc(this.GetListOfCourses[this.order].InstructorId)
      .get()
      .then(doc => {
        this.FullName = doc.data().FirstName + " " + doc.data().LastName;
      });
  },
  methods: {
    ...mapActions(["FetchCourseInstructorData"])
  },
  data() {
    return {
      FullName: ""
    };
  },
  computed: {
    ...mapGetters(["GetListOfCourses", "GetInstructorData"])
  }
};
</script>

<style scoped></style>
