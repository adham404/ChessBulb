<template>
  <div v-if="getStories.length > 1">
    <StoryDescriptionHeader :TheStoryData="getCurrentStory" />
    <StoryPreview
      v-if="getCurrentStory.Type == 'Move'"
      :TheStoryData="getCurrentStory"
    />
    <PuzzelPreview
      v-if="getCurrentStory.Type == 'Puzzle'"
      :TheStoryData="getCurrentStory"
    />
  </div>
</template>

<script>
import StoryDescriptionHeader from "./StoryDescriptionHeader";
//import ChessBoardDisplay from "@/components/MobileComponents/ChessBoardDisplay";
import StoryPreview from "./Storypreview";
import PuzzelPreview from "./PuzzelPreview";
import { EventBus } from "@/main.js";
import { mapActions, mapGetters } from "vuex";
import firebase from "firebase";
export default {
  data() {
    return {
      sheet: false
    };
  },
  components: {
    StoryDescriptionHeader,
    StoryPreview,
    PuzzelPreview
    //ChessBoardDisplay,
  },
  computed: {
    ...mapGetters(["getStories", "getStoriesbyindex", "getCurrentStory"])
  },

  async mounted() {
    let self = this;
    //console.log( self.getStories, this.getStories)
    // EventBus.$on("OpenSeen", (data) => {
    //   this.sheet = data;
    // });
    await firebase.auth().onAuthStateChanged(async function(user) {
      if (user && self.getStories.length == 0) {
        await self.fetchStories();
        console.log("fetch Story from stories window");
      }
    });
    EventBus.$on("moveStory", data => {
      if (data == "lift") {
        self.MoveToPrevioustStory();
      } else if (data == "right") {
        self.MoveToNextStory();
      }
    });
  },
  beforeDestroy() {
    EventBus.$off("OpenSeen");
    EventBus.$off("moveStory");
  },
  methods: {
    ...mapActions(["fetchStories", "MoveToNextStory", "MoveToPrevioustStory"])
  }
};
</script>

<style scoped></style>
