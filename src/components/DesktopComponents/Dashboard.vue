<template>
  <div class="mt-5">
    <v-row justify="space-around">
      <v-col cols="2">
        <v-sheet rounded="lg" elevation="4" height="640">
          <v-avatar size="100" cols="2" class="ml-16 mt-2">
            <img
              :src="
          CurrentProfileUrl ? CurrentProfileUrl : '/img/icons/pexels-pixabay-220453.jpg'
              " 
              alt=""
              style="object-fit: cover"
            />
          </v-avatar>
          <br />
          <span class="text-h6 ml-4">{{
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
            <v-btn @click="UploadProfilePic" v-if="!ToUpdatePic" class="text-capitalize primary mb-2 " rounded elevation="2">
              Upload Profile Photo
            </v-btn>
            <v-btn @click="Save" v-if="ToUpdatePic" class="text-capitalize primary mb-2" rounded elevation="2">
              Save
            </v-btn>
            <v-btn @click="Discard" v-if="ToUpdatePic" class="text-capitalize primary mb-2" rounded elevation="2">
              Discard
            </v-btn>
            <input
            @change="BrowsePhoto"
            type="file"
            enctype="multipart/form-data"
            style="display: none"
            accept="image/*"
            ref="input1"
           />
            <v-spacer></v-spacer>
            <v-btn @click="UploadCover" v-if="!ToUpdatePic" class="text-capitalize primary" rounded elevation="2">
              Upload cover photo
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="Remove(true)" v-if="!ToUpdatePic" class="text-capitalize primary mt-2" rounded elevation="2">
              Remove Profile
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="Remove(false)" v-if="!ToUpdatePic" class="text-capitalize primary mt-2" rounded elevation="2">
              Remove Cover
            </v-btn>
            <v-btn @click="SignOut" class="text-capitalize primary mt-2" rounded elevation="2" height="25">
              Sign Out
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
              :src="
              CurrentCoverUrl ? CurrentCoverUrl : GetCover()
              "
              class="mb-1"
            ></v-img>
          </v-col>
        </v-row>
        <v-row>
          <!-- <v-col v-if="false">
            <v-sheet cols="5" rounded="lg" height="100" class="px-2">
              <p class="text-h6">Monthly Income</p>

              <p class="text-subtitle-1">200 Egp</p>
            </v-sheet>
          </v-col> -->
          <!-- <v-col v-if="false">
            <v-sheet cols="5" rounded="lg" height="100" class="px-2">
              <p class="text-h6">Number of Members</p>

              <p class="text-subtitle-1">10</p>
            </v-sheet>
          </v-col> -->
        </v-row>
        <v-row>
          <v-col>
            <v-sheet style="overflow-y:auto; overflow-x: hidden" rounded="lg" height="300">
              <component v-bind:is="component"></component>
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>
      <!-- <v-col cols="2" v-if="false">
        <v-sheet rounded="lg" height="500" class="px-2">
          <span class="text-h6">List of Members</span>
          <MemberList />
        </v-sheet>
      </v-col> -->
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
    PicData:"",
    ToUpdatePic:false,
    PicType:"",
    CurrentCoverUrl:"",
    CurrentProfileUrl:"",
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
        await this.FetchAcademyPhotos();
        this.CurrentProfileUrl = this.GetAcademyProfileUrl
        this.CurrentCoverUrl =  this.GetAcademyCoverUrl        
      }
    });
  },
  computed: {
    ...mapGetters(["GetFirstTimeLoggedIn", "GetAcademyData","GetAcademyProfileUrl","GetAcademyCoverUrl"])
  },
  methods: {
    ...mapActions(["FetchMyAcademyData","RemovePic", "CheckInstructorValidaty","UploadAcademyPic","FetchAcademyPhotos"]),
    UploadProfilePic()
    {
      this.PicType = true;
      this.ToUpdatePic = true;
      this.$refs.input1.click();

    },
    Remove(flag)
    {
      this.RemovePic(flag);
      if(flag)
      {
        this.CurrentProfileUrl = ""
      }
      else 
      {
        this.CurrentCoverUrl = ""
      }
    },
    Discard()
    {
      this.ToUpdatePic = false;
      if(this.PicType)
      {
        this.CurrentProfileUrl = this.GetAcademyProfileUrl;        
      }
      else{
        this.CurrentCoverUrl = this.GetAcademyCoverUrl;
      }
    },
    UploadCover()
    {
      this.ToUpdatePic = true;
      this.PicType = false;
      this.$refs.input1.click();
    },
    BrowsePhoto(e)
    {
      //Fetch File object and preview it before uploading
      this.PicData = e.target.files;
      let reader = new FileReader();
      reader.onload = (e) => {
        if(this.PicType)
        {
          this.CurrentProfileUrl = e.target.result;
        }
        else
        {
          this.CurrentCoverUrl = e.target.result;
        }
      };
      // console.log("Pic data is: ", this.PicData[0]);
      reader.readAsDataURL(this.PicData[0]);
      // console.log("the Url is: " + this.CurrentImgUrl);
      // this.UpdateMyProfile = true;
    },
    async Save()
    {
      var PhotoData = {
        //Object to hold the photo info
        Url: "",
        FileObject: "",
        PhotoType:false
      };
      PhotoData.PhotoType = this.PicType 
      if(this.PicType)
      {
      PhotoData.Url =
        "AcademyPics/" +
        this.GetAcademyData.AcademyId +
        "/Profile" + "/" +
        this.PicData[0].name +
        ".jpg";
      PhotoData.FileObject = this.PicData[0];
      await this.UploadAcademyPic(PhotoData);
      //TODO Progress Loading Bar
      //DONE Trigger Action to get the uploaded profile pic
      await this.FetchAcademyPhotos()
      this.ToUpdatePic = false;
      // this.CurrentImgUrl =  await this.GetProfilePicUrl;
      }
      else
      {
      PhotoData.Url =
        "AcademyPics/" +
        this.GetAcademyData.AcademyId +
        "/Cover" + "/" +
        this.PicData[0].name +
        ".jpg";
      PhotoData.FileObject = this.PicData[0];
      await this.UploadAcademyPic(PhotoData);
      //TODO Progress Loading Bar
      //DONE Trigger Action to get the uploaded profile pic
      await this.FetchAcademyPhotos()
      this.ToUpdatePic = false;
      // this.CurrentImgUrl =  await this.GetProfilePicUrl;
      }

    },
    GetCover()
    {
      return require("@/assets/ChessAcademy.jpg");
    },
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
   async SignOut() {
      //TODO pop up "sorry to see you leave"
      const auth = firebase.auth();
      await auth.signOut();
      this.ClearAllUserDataField();
      // alert("Passwords don't match");
      this.$router.push("/Login");
    },
    ChangeComponent(NewComponent) {
      this.component = NewComponent;
    }
  }
};
</script>

<style scoped></style>
