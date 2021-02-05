<template>
  <div class="mt-3">
    <v-sheet>
      <v-row class="mb-1 px-1" height="200">
        <v-img
          lazy-src="@/assets/ChessAcademy.jpg"
          max-height="150"
          max-width="100%"
          src="@/assets/ChessAcademy.jpg"
        ></v-img>
      </v-row>
      <v-row class="mt-1 px-1 pb-1">
        <v-col>
          <v-avatar size="70" cols="2" class="mx-0 px-0">
            <img :src="GetImgUrl()" alt="" style="object-fit: cover" />
          </v-avatar>
        </v-col>
        <v-col cols="9">
          <span class="text-h6"
            >{{ CurrentUserData.FirstName }}
            {{ CurrentUserData.LastName }}</span
          >
          <br />
          <span class="text-caption">{{ CurrentUserData.UserBio }}</span>
          <br />
          <v-btn
            v-if="VisitorFlag && !FollowingState"
            @click="Follow"
            xs
            class="text-capitalize primary"
            height="25"
            >follow</v-btn
          >
          <v-btn
            v-if="VisitorFlag && FollowingState"
            @click="UnFollow"
            xs
            class="text-capitalize primary"
            height="25"
            >Unfollow</v-btn
          >
          <v-btn
            v-if="VisitorFlag"
            @click="FetchMyData"
            xs
            class="text-capitalize primary"
            height="25"
            >Back To My Profile</v-btn
          >
        </v-col>
      </v-row>
    </v-sheet>
    <v-divider> </v-divider>
    <v-tabs
      centered
      color="white"
      class="px-0"
      background-color="white"
      slider-color="primary"
    >
      <v-layout justify-center class="px-0" size="10">
        <v-tab
          v-for="link in links"
          :key="link"
          class="mx-0 px-0"
          retain-focus-on-click="false"
          @click="emitevent(link)"
        >
          <!-- <v-icon size = "28" color="primary">{{link}}</v-icon> -->
          <span style="color: black">{{ link }}</span>
        </v-tab>
      </v-layout>
    </v-tabs>
  </div>
</template>

<script>
import { EventBus } from "@/main.js";
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data: () => ({
    links: ["Academies", "Courses", "Posts", "Explore", "Profile Settings"],
    VisitorFlag: false,
    CurrentUserData: "",
    FollowingState: false,
    Url: ""
  }),
  beforeDestroy()
  {
    EventBus.$off("ChangeComponent");
  },
  methods: {
    ...mapActions([
      "fetchUserInfo",
      "fetchProfilePic",
      "fetchUserFollowingData",
      "FollowThisProfile",
      "UnFollowThisProfile",
    ]),
    ...mapMutations(['SetProfileVisitingWatcher']),
    emitevent(link) {
      EventBus.$emit("ChangeComponent", link);
    },
    Back() {},
    GetImgUrl() {
      return this.Url || require("@/assets/ProfilePic2.jpg");
    },
    CheckFollowing() {
      this.GetUserFollowingList.forEach(doc => {
        if (doc == this.CurrentUserData.UserId) {
          this.FollowingState = true;
        }
      });
    },
    async FetchMyData() {
      //Fetch User All Data
      await this.fetchUserInfo();
      //Assign The Current Data to the Current Data Object
      this.CurrentUserData = this.GETUserFULLDATA;
      //Fetch User Profile Pic and Show it If exists
      await this.fetchProfilePic();
      this.Url = await this.GetProfilePicUrl;
      this.GetImgUrl();
      //Fetch User Following Data
      await this.fetchUserFollowingData();
      this.links = [
        "Academies",
        "Courses",
        "Posts",
        "Explore",
        "Profile Settings"
      ];
      //Zero the Visitor's Data
      this.SetProfileVisitingWatcher(false);
      this.emitevent("Academies");
      this.VisitorFlag = false;
    },
    Follow() {
      this.FollowThisProfile(this.CurrentUserData.UserId);
      this.FollowingState = true;
    },
    UnFollow() {
      this.UnFollowThisProfile(this.CurrentUserData.UserId);
      this.FollowingState = false;
    }
  },
  async mounted() {
    this.FetchMyData();
    //Visitor Profile is Visited
    EventBus.$on("HiIAmAVisitor", () => {
      this.CurrentUserData = this.GetCurrentVisitorProfileData;
      //Set Flags and Hide tabs
      this.VisitorFlag = true;
      //TODO Get Visitor Current Photo
      this.Url = "";
      this.GetImgUrl();
      this.links = ["Academies", "Courses", "Posts"];
      //Check Following
      this.CheckFollowing();
      //Show Me The Visitor Posts
      this.emitevent("Posts");
    });
  },
  computed: {
    ...mapGetters([
      "GETUserFULLDATA",
      "GETUserID",
      "GetProfilePicUrl",
      "GetCurrentVisitorProfileData",
      "GetUserFollowingList"
    ])
  }
};
</script>

<style scoped></style>
