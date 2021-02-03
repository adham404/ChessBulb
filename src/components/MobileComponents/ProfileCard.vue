<template>
  <div class="my-8">
    <v-sheet>
      <v-row class="mt-1 px-1 pb-1">
        <v-col>
          <v-avatar size="70" cols="2" class="mx-0 px-0">
            <img
              src="img\icons\pexels-pixabay-220453.jpg"
              alt=""
              style="object-fit: cover"
            />
          </v-avatar>
        </v-col>
        <v-col cols="9">
          <span class="text-h6"
            >{{ FollowerData.FirstName }} {{ FollowerData.LastName }}</span
          >
          <br />
          <span class="text-caption">{{ FollowerData.UserBio }}</span>
          <br />
          <v-row style="justify-content:space-between;" class="mt-1 px-1 pb-1">
            <v-btn
              xs
              v-if="!FollowingState"
              @click="Follow"
              class="text-capitalize primary"
              height="25"
              >follow</v-btn
            >
            <v-btn
              xs
              v-if="FollowingState"
              @click="UnFollow"
              class="text-capitalize primary"
              height="25"
              >Unfollow</v-btn
            >
            <v-btn
              style="margin-right:20%;"
              xs
              @click="VisitProfile"
              class="text-capitalize primary"
              height="25"
              >Visit Profile</v-btn
            >
          </v-row>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import { EventBus } from "@/main.js";
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  data: () => ({
    links: ["Academies", "Courses", "Posts", "Following"],
    FollowingState: false
  }),
  computed: {
    ...mapGetters(["GetUserFollowingList"])
  },
  props: ["FollowerData"],
  methods: {
    ...mapActions(["FollowThisProfile", "UnFollowThisProfile"]),
    ...mapMutations(["SetCurrentVisitorProfileId", "SetVisitorProfileData"]),
    emitevent(link) {
      EventBus.$emit("ChangeComponent", link);
    },
    Follow() {
      this.FollowThisProfile(this.FollowerData.UserId);
      this.FollowingState = true;
    },
    async VisitProfile() {
      //Visit This Person Profile
      console.log(this.FollowerData.UserId);
      // await this.SetCurrentVisitorProfileId(this.FollowerData.UserId);
      await this.SetVisitorProfileData(this.FollowerData);
      EventBus.$emit("HiIAmAVisitor");
    },
    UnFollow() {
      this.UnFollowThisProfile(this.FollowerData.UserId);
      this.FollowingState = false;
    },
    CheckFollowing() {
      //Check Whether do i follow this nigga or not
      console.log("The array to be releaved: " + this.GetUserFollowingList);
      this.GetUserFollowingList.forEach(doc => {
        if (doc == this.FollowerData.UserId) {
          this.FollowingState = true;
        }
      });
    }
  },
  async mounted() {
    //Check Following
    await this.CheckFollowing();
  }
};
</script>

<style scoped></style>
