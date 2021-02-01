<template>
  <div>
    <ChessBoardDisplay
      hideNotation="true"
      :fen="getStoriesbyindex(startpos).StartingFen"
      :id="getStoriesbyindex(startpos).StoryID"
    ></ChessBoardDisplay>
  </div>
</template>

<script>
import ChessBoardDisplay from "@/components/MobileComponents/ChessBoardDisplay";
import { mapGetters } from "vuex";
export default {
  props: ["startpos", "chessid"],
  components: {
    ChessBoardDisplay
  },
  computed: {
    ...mapGetters(["getStoriesbyindex"])
  },
  mounted() {
    console.log(this.startpos);
    console.log(this.chessid);
  }
};
</script>

<style scoped></style>
