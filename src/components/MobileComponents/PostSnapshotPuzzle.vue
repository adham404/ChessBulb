<template>
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
          <v-textarea
            v-model="StoryDescription"
            solo
            name="input-7-4"
            placeholder="Add a comment"
            flat
            rows="2"
          >
          </v-textarea>
          <v-row justify="space-around" class="my-1">
            <v-btn rounded class="primary" @click="Post">Post</v-btn>
            <v-btn rounded class="primary" @click="Discard">Discard</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-sheet>

    <v-sheet class="mt-8 py-3">
      <v-row class="mt-1 mb-1" justify="center">
        <v-col>
          <div id="board1"></div>
          <!-- <ChessBoardDisplay id ="2"/> -->
        </v-col>
      </v-row>
      <v-row class="mb-1 mt-1" justify="center">
        <v-btn cols="2" @click="emitcontrol('back')">
          <v-icon>
            fa-caret-left
          </v-icon>
        </v-btn>
        <v-btn cols="2" @click="emitcontrol('next')">
          <v-icon>
            fa-caret-right
          </v-icon>
        </v-btn>
        <v-btn cols="2" @click="emitcontrol('first')">
          <v-icon>
            fa-backward
          </v-icon>
        </v-btn>
        <v-btn cols="2" @click="emitcontrol('end')">
          <v-icon>
            fa-forward
          </v-icon>
        </v-btn>
      </v-row>
      <v-row v-if="MoveClicked" justify="space-around" class="my-1">
        <v-btn @click="OverWriteMove" rounded class="primary"
          >OverWrite Old Move</v-btn
        >
        <v-btn @click="OpenLine" rounded class="primary">Open New Line</v-btn>
      </v-row>
      <hr />
      <div style="height: 200px; overflow-y: scroll">
        <v-sheet
          color="primary"
          width="95%"
          class="ml-2 mt-2 mb-2 px-2"
          rounded="lg"
          v-for="(Line, x) in ChessMoveObject"
          :key="x"
        >
          <!-- <PgnReviewOutput  :pgn="Match.PGN" :id="Match.MatchId" :key ='Match.MatchId' class="text-subtitle-2" style="color: white;"/> -->
          <span class="text-h6" style="color: white">
            <v-icon @click="DeleteLine(Line.Line)" left color="white"
              >fa-close</v-icon
            ><span @click="GoToLine(Line.Line)">Line {{ x + 1 }}</span></span
          >
          <br />
          <span style="color: white">
            <div class="Line">
              <div class="ColorCol">
                <div style="color:white">White Moves</div>
                <div
                  style="color:white"
                  v-for="(WhiteMove, x) in Line.WhiteMoves"
                  v-bind:key="x"
                >
                  <div
                    style="color:white"
                    @click="WhiteMoveClicked(Line.Line, WhiteMove)"
                  >
                    {{ WhiteMove }}
                  </div>
                </div>
              </div>
              <div class="ColorCol">
                <div>Black Moves</div>
                <div v-for="(BlackMove, x) in Line.BlackMoves" v-bind:key="x">
                  <div
                    style="color:black"
                    @click="BlackMoveClicked(Line.Line, BlackMove)"
                  >
                    {{ BlackMove }}
                  </div>
                </div>
              </div>
            </div>
          </span>
        </v-sheet>
      </div>
    </v-sheet>
  </div>
</template>

<script>
// import ChessBoardDisplay from "@/components/MobileComponents/ChessBoardDisplay"
import Board from "chessboardjs-vue";
import { mapGetters, mapActions } from "vuex";
import * as Chess from "chess.js";

export default {
  data() {
    return {
      ChessBoard: "",
      StoryDescription: "",
      ChessMoveObject: [
        // Array Of Object that contain all lines of moves
        {
          Line: 0,
          Moves: [],
          WhiteMoves: [],
          BlackMoves: [],
          LastFen: "",
          ChessEngine: "", //Every Line has ChessGame instance
          MoveClicked: false
        }
      ],
      MoveClicked: false,
      PuzzleFormFlag: false,
      LineCounter: 0,
      square1: "",
      square2: "",
      ChessCurrentMovePos: "", //Hold the Position value of the White Move in the White moves array of the current child in the main object
      OverWriteType: "" //Hold the Type overwrite if it's an overwrite for White Moves or black moves
    };
  },
  computed: {
    ...mapGetters([
      "GetChessBoardStartingPositionForSnapshots",
      "GetSnapshotPostingType",
      "GetProfilePicUrl",
      "GETUserFullName"
    ])
  },
  mounted() {
    var config = {
      draggable: true,
      touchSquare: this.touchSquare,
      dropOffBoard: "trash",
      position: this.GetChessBoardStartingPositionForSnapshots,
      showErrors: "alert",
      onDrop: this.onDrop,
      onDragStart: this.onDragStart
    };
    this.ChessBoard = Board("board1", config);
    //Create a Chess.js Object with the Recieved Fen from the PositionSetup
    this.ChessMoveObject[this.LineCounter].ChessEngine = new Chess(
      this.GetChessBoardStartingPositionForSnapshots
    );
  },
  methods: {
    ...mapActions(["PostThisPuzzleSnapShotToTheDatabase"]),
    WhiteMoveClicked(
      LineCounter,
      WhiteMove //This Function Update the status of the Move and Line ready for action when a White move is clicked
    ) {
      this.MoveClicked = !this.MoveClicked;
      if (this.ChessMoveObject[LineCounter].MoveClicked) {
        //Toogle Between the MoveClicked Flag to Show the Two buttons Overwrite and OpenNewLine
        this.ChessMoveObject[LineCounter].MoveClicked = false;
      } else {
        this.ChessMoveObject[LineCounter].MoveClicked = true;
      }

      var WhiteLength = this.ChessMoveObject[LineCounter].WhiteMoves.length;
      for (let i = 0; i < WhiteLength; i++) {
        if (this.ChessMoveObject[LineCounter].WhiteMoves[i] == WhiteMove) {
          //Search for the Position of the passed move inside the array of moves
          this.ChessCurrentMovePos = i; // assign the Position of the White Move
          break;
        }
      }
      this.OverWriteType = "white"; //Assign OverWriteType as White
      this.LineCounter = LineCounter; //Assign the LineCounter property to the Line number passed
    },
    Post() {
      //Post It
      if (this.StoryDescription == "") {
        //TODO professional popup
        alert("Where is the description you fat head");
      } else {
        var DataToSend = {
          Description: this.StoryDescription,
          ChessMoveObject: this.ChessMoveObject
        };
        this.PostThisPuzzleSnapShotToTheDatabase(DataToSend);
        //TODO POP up you did it sucessfully
        this.$router.push("/");
      }
    },
    DeleteLine(LineCounter) {
      console.log("Line is deleted");
      if (LineCounter != 0) {
        this.ChessMoveObject.splice(LineCounter, 1);
      }
    },
    GoToLine(
      LineCounter //This Function triggered when the title of the line is clicked to navigate smoothly between Lines
    ) {
      this.LineCounter = LineCounter;
      this.LoadTargetFen(LineCounter);
    },
    LoadTargetFen(
      LineCounter //Function Used to Load the Fen inside the array of Object according to the index of the General Line Property
    ) {
      var CurrentFen = this.ChessMoveObject[LineCounter].ChessEngine.fen();
      this.ChessBoard.position(CurrentFen);
    },
    BlackMoveClicked(
      LineCounter,
      BlackMove //This Function Update the status of the Move and Line ready for action when a Black move is clicked
    ) {
      this.MoveClicked = !this.MoveClicked;
      if (this.ChessMoveObject[LineCounter].MoveClicked) {
        //Toogle Between the MoveClicked Flag to Show the Two buttons Overwrite and OpenNewLine
        this.ChessMoveObject[LineCounter].MoveClicked = false;
      } else {
        this.ChessMoveObject[LineCounter].MoveClicked = true;
      }
      var BlackLength = this.ChessMoveObject[LineCounter].BlackMoves.length;
      for (let i = 0; i < BlackLength; i++) {
        if (this.ChessMoveObject[LineCounter].BlackMoves[i] == BlackMove) {
          //Search for the Position of the passed move inside the array of moves
          this.ChessCurrentMovePos = i; // assign the Position of the White Move
          break;
        }
      }
      this.OverWriteType = "Black"; //Assign OverWriteType as Black
      this.LineCounter = LineCounter; //Assign the LineCounter property to the Line number passed
    },
    OverWriteMove() {
      //This Function OverWrite the Selected Move
      console.log("We are on Line: " + this.LineCounter);
      var WhiteLength = 0;
      var BlackLength = 0;
      WhiteLength = this.ChessMoveObject[this.LineCounter].WhiteMoves.length;
      BlackLength = this.ChessMoveObject[this.LineCounter].BlackMoves.length;
      for (let i = BlackLength; i > this.ChessCurrentMovePos; i--) {
        var WhiteMove = this.ChessMoveObject[this.LineCounter].WhiteMoves[i];
        var BlackMove = this.ChessMoveObject[this.LineCounter].BlackMoves[i];
        var CurrentFen;
        this.ChessMoveObject[this.LineCounter].BlackMoves.pop(); // all the moves after the selected move are popped from the array
        this.ChessMoveObject[this.LineCounter].ChessEngine.undo(BlackMove); // all the moves after the selected move are undoed
        CurrentFen = this.ChessMoveObject[this.LineCounter].ChessEngine.fen();
        this.ChessBoard.position(CurrentFen); //Load the Fen after the moves are being undoed
        if (this.OverWriteType == "Black") {
          //If  a black move is tend to be overwritten then the white move array will be late by one move
          if (i != this.ChessCurrentMovePos + 1) {
            this.ChessMoveObject[this.LineCounter].WhiteMoves.pop();
            this.ChessMoveObject[this.LineCounter].ChessEngine.undo(WhiteMove);
            CurrentFen = this.ChessMoveObject[
              this.LineCounter
            ].ChessEngine.fen();
            this.ChessBoard.position(CurrentFen);
          } else {
            console.log("Bingo");
          }
        } else {
          this.ChessMoveObject[this.LineCounter].WhiteMoves.pop();
          this.ChessMoveObject[this.LineCounter].ChessEngine.undo(WhiteMove);
          CurrentFen = this.ChessMoveObject[this.LineCounter].ChessEngine.fen();
          this.ChessBoard.position(CurrentFen);
        }
      }
      if (WhiteLength > BlackLength) {
        //Incase the Length of Whitemoves array are more than the Black array we undo one extra move in the White moves array
        var pos = this.ChessCurrentMovePos;
        var ExtraMove = this.ChessMoveObject[this.LineCounter].WhiteMoves[pos];
        this.ChessMoveObject[this.LineCounter].WhiteMoves.pop();
        this.ChessMoveObject[this.LineCounter].ChessEngine.undo(ExtraMove);
        CurrentFen = this.ChessMoveObject[this.LineCounter].ChessEngine.fen();
        this.ChessBoard.position(CurrentFen);
      }
      this.ChessMoveObject[this.LineCounter].MoveClicked = false;
    },
    OpenLine() {
      //This Function to Create a new Line
      console.log("Hi From Here");
      this.ChessMoveObject[this.LineCounter].MoveClicked = false;
      var SolutionLine = this.ChessMoveObject.length;
      var ChessObject = {
        Line: SolutionLine,
        WhiteMoves: [],
        BlackMoves: [],
        Moves: [],
        MoveClicked: false,
        ChessEngine: ""
      };
      this.ChessMoveObject.push(ChessObject);
      this.ChessMoveObject[SolutionLine].ChessEngine = new Chess(
        this.GetChessBoardStartingPositionForSnapshots
      );
      for (let i = 0; i <= this.ChessCurrentMovePos; i++) {
        var WhiteMove = this.ChessMoveObject[this.LineCounter].WhiteMoves[i];
        var BlackMove = this.ChessMoveObject[this.LineCounter].BlackMoves[i];
        this.ChessMoveObject[SolutionLine].WhiteMoves.push(WhiteMove);
        this.ChessMoveObject[SolutionLine].BlackMoves.push(BlackMove);
        this.ChessMoveObject[SolutionLine].ChessEngine.move(WhiteMove);
        this.ChessMoveObject[SolutionLine].ChessEngine.move(BlackMove);
      }
      this.LineCounter = SolutionLine;
      this.LoadTargetFen(this.LineCounter);
    },
    async touchSquare(square, valid) {
      console.log("touched", square, "and it is ", valid);
      if (this.square1 != "") {
        this.square2 = square;
      } else {
        this.square1 = square;
      }
      this.ChessBoard.highlight(square);
      if (this.square2 != "") {
        this.onDrop(this.square1, this.square2);
        // this.ChessBoard.move(this.square1 + "-"+this.square2);
        this.square1 = "";
        this.square2 = "";
        this.ChessBoard.removeHightlight();
      }
    },
    // async touchSquare(square, valid)
    // {
    //   var StartMove = null
    //   console.log("touched", square, "and it is " , valid)
    //   if(valid){
    //     if(this.ChessMoveObject[this.LineCounter].ChessEngine.turn()== this.ChessMoveObject[this.LineCounter].ChessEngine.get(square).color){
    //       this.ChessBoard.removeHightlight()
    //     this.ChessBoard.highlight(square)
    //     StartMove = square
    //     }

    //   }
    //   else if(StartMove){
    //     if (this.ChessMoveObject[this.LineCounter].ChessEngine.game_over()) {
    //     alert("game is over ");
    //   } else {
    //     var moo =  await this.ChessMoveObject[this.LineCounter].ChessEngine.move(StartMove + "-"+square, { sloppy: true });
    //     if(moo){
    //       await this.ChessBoard.move(StartMove + "-"+square);
    //       await this.ChessBoard.position(this.ChessMoveObject[this.LineCounter].ChessEngine.fen());
    //       // var lastmove = game.history();
    //       // lastmove = lastmove[lastmove.length - 1];
    //       // EventBus.$emit("newmove", lastmove);
    //       StartMove = null
    //       // console.log(lastmove);
    //       this.ChessBoard.removeHightlight()
    //       // EventBus.$emit("newfen", game.fen());
    //       // EventBus.$emit("newfenAndmove", [game.fen(),lastmove]);

    //     }else{
    //       StartMove = null
    //       this.ChessBoard.removeHightlight()
    //     }

    //   }
    //     // board.move(StartMove + "-"+square)
    //     // StartMove = null
    //     // board.removeHightlight()
    //   }

    // },
    onDrop(source, target) {
      console.log("Source: " + source);
      console.log("Target: " + target);
      //DONE recieve the current move and assign it to ChessCurrentMove property(3min)
      //DONE ChessMoveObject[LineCounter].Moves.push(ChessCurrentMove) (1min)
      // this.ChessCurrentMove = target;
      console.log("This Move PGN is: ");
      console.log(this.ChessMoveObject[this.LineCounter].ChessEngine.pgn());
      var move = this.ChessMoveObject[this.LineCounter].ChessEngine.move({
        from: source,
        to: target,
        promotion: "q"
      });
      // illegal move
      if (move === null) return "snapback";
      console.log(this.ChessMoveObject[this.LineCounter].ChessEngine.fen());
      console.log("A test for a move is ");
      console.log(move);
      if (move.color === "w") {
        console.log("E7M the pure move of the white piece is " + move.san);
        this.ChessMoveObject[this.LineCounter].WhiteMoves.push(move.san);
        console.log("Current Line is: " + this.LineCounter);
      } else if (move.color === "b") {
        console.log("E7M the pure move of the black piece is " + move.san);
        this.ChessMoveObject[this.LineCounter].BlackMoves.push(move.san);
        console.log("Current Line is: " + this.LineCounter);
      }
      if (this.square2 != "") {
        this.ChessBoard.move(source + "-" + target);
        this.square2 = "";
      }
      console.log("Chess Moves hoped to be like:");
      console.log(this.ChessMoveObject[this.LineCounter].ChessEngine.ascii());
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    },
    // only pick up pieces for the side to move
    onDragStart(source, piece) {
      if (
        (this.ChessMoveObject[this.LineCounter].ChessEngine.turn() === "w" &&
          piece.search(/^b/) !== -1) ||
        (this.ChessMoveObject[this.LineCounter].ChessEngine.turn() === "b" &&
          piece.search(/^w/) !== -1)
      ) {
        return false;
      }
    }
  },
  components: {
    // ChessBoardDisplay,
  }
};
</script>

<style>
.Line {
  list-style-type: none;
  padding-left: 20px;
  white-space: nowrap;
  justify-content: space-between;
  display: flex;
}
.ColorCol {
  display: flex;
  width: 40%;
  flex-direction: column;
  /* border: 1px solid #ccc; */
  cursor: pointer;
  font-family: "Quicksand", sans-serif;
  font-weight: lighter;
  white-space: nowrap;
  font-size: 1.3rem;
  color: black;
}
</style>
