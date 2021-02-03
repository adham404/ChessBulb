<template>
  <div class="mt-5">
    <v-row justify="space-around">
      <v-col cols="2">
        <v-sheet rounded="lg" elevation="4" height="550">
          <v-avatar size="100" cols="2" class="ml-16 mt-2">
            <img
              src="img\icons\pexels-pixabay-220453.jpg"
              alt=""
              style="object-fit: cover"
            />
          </v-avatar>
          <br />
          <span class="text-subtitle-1 ml-4">{{
            GetAcademyData.AcademyName
          }}</span>
          <v-col>
            <!-- <v-btn rounded color="primary" class="text-capitalize">
                        Edit Academy About
                    </v-btn>
                    <br>
                    <v-btn rounded color="primary" class = "text-capitalize">
                        Live sessions list
                    </v-btn>
                    <br>
                    <v-btn rounded color="primary" class = "text-capitalize">
                        Courses
                    </v-btn>
                    <br>
                    <v-btn rounded  color="primary" class = "text-capitalize">
                        Create Course
                    </v-btn>
                    <v-btn rounded  color="primary" class = "text-capitalize">
                        Create Live session
                    </v-btn> -->
            <v-card class="mx-auto" max-width="300" tile>
              <v-list dense>
                <v-subheader>Options</v-subheader>
                <v-list-item-group v-model="selectedItem" color="primary">
                  <v-list-item
                    v-for="(item, i) in items"
                    :key="i"
                    @click="Navigate(item.text)"
                  >
                    <v-list-item-icon>
                      <v-icon v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card>
            <br />
            <v-btn class="text-capitalize primary mb-2" rounded elevation="2">
              Upload Profile Photo
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn class="text-capitalize primary" rounded elevation="2">
              Upload cover photo
            </v-btn>
          </v-col>
        </v-sheet>
      </v-col>
      <v-col cols="6">
        <v-row>
          <v-col>
            <v-img
              lazy-src="@/assets/ChessAcademy.jpg"
              max-height="100"
              max-width="100%"
              src="@/assets/ChessAcademy.jpg"
              class="mb-1"
            ></v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-sheet cols="5" rounded="lg" height="150" class="px-2">
              <p class="text-h6 text-center">Monthly Income</p>

              <p class="text-h2 text-center">200 Egp</p>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet cols="5" rounded="lg" height="150" class="px-2">
              <p class="text-h6 text-center">Number of Members</p>

              <p class="text-h2 text-center">10</p>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-sheet style="overflow-y:auto;" rounded="lg" height="400">
              <component v-bind:is="component"></component>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="2">
        <v-sheet rounded="lg" height="500" class="px-2">
          <span class="text-h6">List of Members</span>
          <MemberList />
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import firebase from "firebase";
import { mapGetters, mapActions } from "vuex";
import MemberList from "@/components/DesktopComponents/MemberList";
import AcademyAboutEditing from "@/components/DesktopComponents/AcademyAboutEditing";
import LiveSessionsList from "@/components/DesktopComponents/LiveSessionsList";
import CourseList from "@/components/DesktopComponents/CourseList";
import CreateCourse from "@/components/DesktopComponents/CreateCourse";
import LiveForm from "@/components/DesktopComponents/Marwan/LiveForm.vue";
export default {
  data: () => ({
    selectedItem: 1,
    items: [
      { text: "Live Sessions List", icon: "fa-video" },
      { text: "Edit Academy Description", icon: "fa-edit" },
      { text: "Courses", icon: "fa-chalkboard-teacher" },
      { text: "Create Course", icon: "fa-chess-board" },
      { text: "Schedule live session", icon: "fa-plus-circle" }
    ],
    component: "AcademyAboutEditing"
  }),
  components: {
    MemberList,
    AcademyAboutEditing,
    LiveSessionsList,
    CourseList,
    CreateCourse,
    LiveForm
  },
  async mounted() {
    //Check for Mob Users Accident log
    // if(this.GetFirstTimeLoggedIn)
    // {
    //     this.$router.push('/Login');
    // }
    // //Fetch My Academy Data
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        await this.CheckInstructorValidaty(user.uid);
        await this.FetchMyAcademyData();
      }
    });
  },
  computed: {
    ...mapGetters(["GetFirstTimeLoggedIn", "GetAcademyData"])
  },
  methods: {
    ...mapActions(["FetchMyAcademyData", "CheckInstructorValidaty"]),
    Navigate(link) {
      if (link == "Edit Academy Description") {
        this.ChangeComponent("AcademyAboutEditing");
      } else if (link == "Live Sessions List") {
        this.ChangeComponent("LiveSessionsList");
      } else if (link == "Courses") {
        this.ChangeComponent("CourseList");
      } else if (link == "Create Course") {
        this.$router.push("/CreateCourse");
        //alert("now we are in course creating");
      } else {
        this.ChangeComponent("LiveForm");
      }
    },
    ChangeComponent(NewComponent) {
      this.component = NewComponent;
    }
  }
};
</script>

<style scoped></style>
