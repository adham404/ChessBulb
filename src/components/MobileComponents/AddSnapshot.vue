<template>
  <div>
    <v-tabs
      centered
      color="white"
      class="px-0"
      background-color="white"
      slider-color="primary"
    >
      <v-layout justify-space-around class="px-0" size="10">
        <v-tab
          class="mx-0 px-0"
          retain-focus-on-click="false"
          @click="PostSnap()"
        >
          <!-- <v-icon size = "28" color="primary">{{link}}</v-icon> -->
          <span style="color: black">Post a Snapshot</span>
        </v-tab>
        <v-tab
          class="mx-0 px-0"
          retain-focus-on-click="false"
          @click="PostPuzzle()"
        >
          <!-- <v-icon size = "28" color="primary">{{link}}</v-icon> -->
          <span style="color: black">Post a Puzzle</span>
        </v-tab>
      </v-layout>
    </v-tabs>
    <!-- <button @click="fetchUserInfo()">Sorry</button> -->
    <!-- <v-sheet class="my-8">
            <v-row>
                <v-col cols = "2">
                <v-avatar class="ml-2">
                    <img src="@/assets/ProfilePic2.jpg" alt="" style="object-fit: cover">
                </v-avatar>
            </v-col>
            <v-col cols="9" >
                    <span class="text-h6 ml-3">Mostafa Hamido</span>
                    <v-textarea
                    solo
                    name="input-7-4"
                    placeholder = "Add a comment"
                    flat
                    rows = "2"
                    >
                    </v-textarea>
                    <v-row justify="space-around" class="my-1">
                        <v-btn rounded class="primary">Post</v-btn>
                        <v-btn rounded class="primary">Discard</v-btn>
                    </v-row>
            </v-col>
            </v-row>
            
       </v-sheet> -->
    <!-- <v-sheet > -->
    <PositionSetup2 v-if="!GetValidatyChessBoardPosition" />
    <!-- <v-row justify="space-around" class="my-1">
            <v-btn @click="Save">
                Save
            </v-btn>
            <v-btn @click="Empty">
                Empty
            </v-btn>
            <v-btn @click="Start">
                Start
            </v-btn>
        </v-row> -->
    <!-- <div style="height: 200px; overflow-y: scroll">
                <v-sheet color="primary" width="95%" class="ml-2 mt-2 mb-2 px-2" rounded = "lg" v-for="n in 3" :key="n">
                <span class="text-h6" style="color: white">Line 1</span>
                <br>
                <span style = "color: white">Lorem ipsum dolor sit amet consectetur adipisicing elit. In doloribus impedit voluptas eveniet quos rem, esse modi laboriosam tenetur sunt. Tenetur fugit itaque minus amet aliquid recusandae expedita numquam quas!</span>
                </v-sheet>
            </div> -->
    <!-- </v-sheet> -->
    <!-- <v-sheet class="mt-8 py-3"> -->
    <PostSnapshotPuzzle
      v-if="GetValidatyChessBoardPosition"
    ></PostSnapshotPuzzle>
    <!-- <v-row class = "mt-1 mb-1" justify="center">
                <v-col>
                    <ChessBoardDisplay id ="2"/>
                </v-col>
                    
            </v-row>
            <v-row class="mb-1 mt-1" justify="center">
                <v-btn cols = "2" @click="emitcontrol('back')">
                    <v-icon>
                        fa-caret-left
                    </v-icon>
                </v-btn>
                <v-btn cols = "2" @click="emitcontrol('next')">
                    <v-icon>
                        fa-caret-right
                    </v-icon>
                </v-btn>
                <v-btn cols = "2" @click="emitcontrol('first')">
                    <v-icon>
                        fa-backward
                    </v-icon>
                </v-btn>
                <v-btn cols = "2" @click="emitcontrol('end')">
                    <v-icon>
                        fa-forward
                    </v-icon>
                </v-btn>
            </v-row>
            <div style="height: 200px; overflow-y: scroll">
                <v-sheet color="primary" width="95%" class="ml-2 mt-2 mb-2 px-2" rounded = "lg" v-for="n in 3" :key="n"> -->
    <!-- <PgnReviewOutput  :pgn="Match.PGN" :id="Match.MatchId" :key ='Match.MatchId' class="text-subtitle-2" style="color: white;"/> -->
    <!-- <span class="text-h6" style="color: white"> <v-icon left color="white">fa-close</v-icon>Line 1</span>
                <br>
                <span style = "color: white">Lorem ipsum dolor sit amet consectetur adipisicing elit. In doloribus impedit voluptas eveniet quos rem, esse modi laboriosam tenetur sunt. Tenetur fugit itaque minus amet aliquid recusandae expedita numquam quas!</span> -->
    <!-- </v-sheet> -->
    <!-- </div> -->

    <!-- </v-sheet> -->
  </div>
</template>

<script>
// import PositionSetup from "@/components/MobileComponents/PositionSetup"
// import ChessBoardDisplay from "@/components/MobileComponents/ChessBoardDisplay"
import PostSnapshotPuzzle from "@/components/MobileComponents/PostSnapshotPuzzle";
import PositionSetup2 from "@/components/MobileComponents/PositionSetup2";

import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  components: {
    // PositionSetup,
    PositionSetup2,
    // ChessBoardDisplay,
    PostSnapshotPuzzle
  },
  methods: {
    ...mapActions(["fetchUserInfo"]),
    ...mapMutations([
      "SetSnapshotPostingType",
      "SetStartingPositionForSnapShot",
      "SetChessBoardPositionValidationStatus"
    ]),
    PostPuzzle() {
      this.SetSnapshotPostingType("Puzzle");
    },
    PostSnap() {
      this.SetSnapshotPostingType("Move");
    }
  },
  async mounted() {
    //FetchUserData
    this.SetStartingPositionForSnapShot("8/8/8/8/8/8/8/8 w - - 0 1");
    await this.fetchUserInfo();
  },
  beforeDestroy() {
    this.SetChessBoardPositionValidationStatus(false);
  },
  computed: {
    ...mapGetters(["GetValidatyChessBoardPosition"])
  },
  data: () => ({})
};
</script>

<style scoped></style>
