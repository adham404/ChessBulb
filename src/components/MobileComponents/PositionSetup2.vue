<template>
  <!-- <div> -->
  <div>
    <v-sheet class="my-8">
      <v-row>
        <v-col cols="2">
          <v-avatar class="ml-2">
            <img
              :src="
                GetProfilePicUrl
                  ? GetProfilePicUrl
                  : '/img/icons/pexels-pixabay-220453.jpg'
              "
              alt=""
              style="object-fit: cover"
            />
          </v-avatar>
        </v-col>
        <v-col cols="9">
          <span class="text-h6 ml-3">{{ GETUserFullName }}</span>
          <hr>
          <hr>
          <span>Setup Your SnapShot Position first!</span>
          <hr>
          <hr>
          <!-- <v-textarea
            solo
            name="input-7-4"
            placeholder="Add a comment"
            flat
            rows="2"
          >
          </v-textarea> -->
          <v-row justify="space-around" class="my-1">
            <!-- <v-btn rounded class="primary">Post</v-btn>
            <v-btn rounded class="primary">Discard</v-btn> -->
          </v-row>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet>
      <div class="Container">
        <div  class="ChessBoard">
          <v-dialog v-model="dialog" width="500">
            <v-card class="py-3" rounded="lg">
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-card-text>
                  Wrong Chess Start Position please, Reset the Position again!
                </v-card-text>
                <v-btn
                  color="primary"
                  @click="dialog = false"
                  flat
                  rounded
                  width="100"
                >
                  OK
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- <PositionSetup/> -->
        </div>
        <div id="board1"></div>
        <!-- <div class="StoryData">
      <h1>Please Setup the game position</h1>
      <button @click="Save" class="Shadow">Save Position</button>
    </div> -->
        <v-row justify="space-around" class="my-1">
          <v-btn @click="Save">
            Save
          </v-btn>
          <v-btn @click="Empty">
            Empty
          </v-btn>
          <v-btn @click="Start">
            Start
          </v-btn>
        </v-row>
        <div style="height: 200px; overflow-y: scroll">
          <v-sheet
            color="primary"
            width="95%"
            class="ml-2 mt-2 mb-2 px-2"
            rounded="lg"
            v-for="n in 1"
            :key="n"
          >
            <span class="text-h6" style="color: white"
              >Welcome To Posting Chess Snapshots</span
            >
            <br />
            <span style="color: white"
              >This Snapshot Feature is basically like a Facebook story where
              you can post a brilliant snapshot about some intersting techniques
              and stats in chess as well as puzzles where you can challenge your
              firends solving your puzzles
            </span>
          </v-sheet>
        </div>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import ic from "isepic-chess";
import Board from "chessboardjs-vue";

export default {
  data() {
    return {
      board: "",
      ChessGame: "",
      dialog:false,
      Fen: "",
      square1: "",
      square2: ""
    };
  },
  computed: {
    ...mapGetters(["GetProfilePicUrl", "GETUserFullName","GetChessBoardStartingPositionForSnapshots"])
  },
  methods: {
    ...mapMutations([
      "SetStartingPositionForSnapShot",
      "SetChessBoardPositionValidationStatus"
    ]),
    GetImgUrl() {},
    Save() {
      this.Fen = this.board.fen() + " w - - 0 1";
      this.FenValidate = ic.fenApply(this.Fen, "isLegalFen");
      if (!this.FenValidate) {
        this.dialog = true;
      } else {
        this.SetStartingPositionForSnapShot(this.Fen);
        this.SetChessBoardPositionValidationStatus(true);
      }
    },
    Empty() {
      this.board.clear(false);
    },
    Start() {
      this.board.start();
    },
    async touchSquare(square, valid) {
      console.log("touched", square, "and it is ", valid);
      if (this.square1 != "") {
        this.square2 = square;
      } else {
        this.square1 = square;
      }
      this.board.highlight(square);
      if (this.square2 != "") {
        await this.board.move(this.square1 + "-" + this.square2);
        this.square1 = "";
        this.square2 = "";
        this.board.removeHightlight();
      }
    }
  },
  async mounted() {
    var config = {
      draggable: true,
      dropOffBoard: "trash",
      position: this.GetChessBoardStartingPositionForSnapshots,
      touchSquare: this.touchSquare,
      showErrors: "alert",
      sparePieces: true
    };
    //Define New Board
    this.board = await Board("board1", config);
  }
};
</script>

<style></style>
