<template>
  <div style="height:100%">
    <v-sheet  >
      <v-row>
        <v-col>
          <MovePreview :startpos="startfen" :moves="moves" />
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="mt-3">
      <v-col>
          <v-sheet min-height="459" >
              <comment v-for="i in 3" :key="i" />
          </v-sheet>
      </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
          <v-col cols="1">
            <v-btn fab text>
                <v-icon>
                    fa-chess-board
                </v-icon>
            </v-btn>
          </v-col>
          <v-col cols="9">
          <v-text-field
            rounded
            background-color="grey lighten-2"
            type="text"
          >
          </v-text-field>
          </v-col>

        <v-col cols="1">
          <v-btn fab text>
            <v-icon>
              fa-paper-plane
            </v-icon>
          </v-btn>
          </v-col>
      </v-row>
    </v-sheet>

    
  </div>
</template>

<script>
//import ChessBoardDisplay from "@/components/MobileComponents/ChessBoardDisplay"
import MovePreview from "./MovePreviewOutput";
import comment from "./comment"
export default {
  components: {
    MovePreview,
    comment
  },
  data() {
    return {
      startfen: "rnbqkbnr/pppppppp/8/8/6P1/8/PPPPPP1P/RNBQKBNR w - - 0 1",
      moves: ["f3", "f6", "Nh3", "Nh6", "g5"],
      showboard: false,
      showinierboard: false,
    };
  },
  watch: {
    showboard: function() {
      setTimeout(() => {
        this.showinierboard = this.showboard;
      }, 50);
    },
  },
};
</script>

<style></style>
