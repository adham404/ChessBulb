<template>
  <div>
    <v-row justify="space-around" class="my-1 px-1">
      <v-sheet rounded="lg" width="30%" height="200px" class="px-2">
        <span class="text-subtitle-2 text-decoration-underline">Stockfish</span>
        <br />
        <div style="overflow-y: scroll; height: 80%">
          <div v-for="n in 10" :key="n">
            <span class="text-caption">move score</span>
            <br />
          </div>
        </div>
      </v-sheet>
      <div style="height: 250px; width: 65%">
        <VideoPlayer />
      </div>
    </v-row>

    <v-row>
      <v-col cols="8">
        <v-sheet class="px-2 py-2">
          <ChessBoardDisplay id="1" />
        </v-sheet>
      </v-col>
      <v-col align-self="center">
        <v-btn class="white text-capitalize mb-2 ml-1" rounded>
          Leave
        </v-btn>
        <v-btn rounded class="text-capitalize" id="Review">
          Refresh
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="space-around" class="px-2 mt-1">
      <v-sheet rounded="lg" width="100%" class="px-2" height="200px">
        <span class="text-subtitle-2 text-decoration-underline">Chat room</span>
        <br />
        <div style="overflow-y: scroll; height: 80%">
          <div v-for="n in 10" :key="n">
            <span class="text-caption">Adham Elshafei: hello</span>
            <br />
          </div>
        </div>
        <v-row class="mt-1 white">
          <v-btn fab text>
            <v-icon>
              fa-chess-board
            </v-icon>
          </v-btn>
          <v-text-field
            rounded
            background-color="grey lighten-2"
            width="300px"
            type="text"
          >
          </v-text-field>
          <v-btn fab text>
            <v-icon>
              fa-paper-plane
            </v-icon>
          </v-btn>
        </v-row>
      </v-sheet>
    </v-row>
  </div>
</template>

<script>
import VideoPlayer from "@/components/MobileComponents/VideoPlayer";
import ChessBoardDisplay from "@/components/MobileComponents/ChessBoardDisplay";
export default {
  data() {
    return {
      dialog: false
    };
  },
  components: {
    VideoPlayer,
    ChessBoardDisplay
  }
};
</script>

<style scoped></style>
