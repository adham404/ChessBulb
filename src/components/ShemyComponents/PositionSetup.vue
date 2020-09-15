<template>
  <div>
      <!-- DONE add ChessBoard.js To the left with sparepieces property set to true value (5min) -->
      <div id="Board1"></div>
      <!-- DONE Create div containing Instruction (1min) -->
      <div>Please Setup the game position</div>
      <!-- DONE Create Save Button (1min) -->
      <button @click="Save">Save Position</button>
      <!-- TODO Create div that contains the Validation content with v-if a (PoisitionCorrect) data property and holding the Message as string intorplation with a data property called (PositionValidationMsg) (1min) -->
  </div>
</template>

<script>
  //DONE assign EventBus method (1min)
  import {EventBus} from "../../main"
  import Chessboard from "chessboardjs";
  // import { ChessGame } from "../../main"
  import * as Chess from "chess.js";

export default {
    //TODO Assign Data Properties in  the vue data object which are (PoisitionCorrect(B), PositionValidationMsg(S), StartupObject(o), SwapFlag(B)) (3min) 
    data: function()
    {
      return{
        ChessBoard:"",  //a ChessBoard.js instance object
        ChessGame:"", //a Chess.js instance object
        Fen:"" //The Fen object of the ChessBoard
      }
    },
    methods:{
      //TODO create Save Function (1min)
    Save: function()
    {
      this.Fen = this.Chessboard.fen() + ' w - - 0 1';  // Convert ChessBoard.js Fen format to Chess.js Fen format
      this.ChessGame = new Chess();  //Create Chess.js instance
      //FIXME Validate Fen Object using Chess.js because of the format of the fen object genereated by Chessboard.js
      var ValidateFenObject = this.ChessGame.load(this.Fen); //Create a variable that holds the message of chess.js fen validation
      console.log("The Fen Status:");
      console.log(ValidateFenObject);
      //DONE If the Fen Object is not empty and validated Send Fen Object data to [PostStoryContent] component and send SwapFlag Property to [AddStory] Component using EventBus Sending Signals (5min) 
      EventBus.$emit("PositionIsSet");
      EventBus.$emit("SendPosition",this.Fen);
      //FIXME Validate Fen Object if it contains content (2min)
      // if(Object.entries(objectvalidate).length == 0)
      // { 
      //   //DONE If the Chess Object is empty Launch a Validation Msg (1min) 
      //   alert("Position is empty ... please setup chess position in board then submit");
      // }
      // else{

      // }
    }
    },
    mounted(){
    //Taken from [ChessBoardDisplay] component
    function piecelink(piece){
          return require('@/assets/img/chesspieces/wikipedia/' + piece + '.png') 
      }
      var config = {
        draggable: true,
        dropOffBoard: 'trash',
        showErrors : 'alert',
        sparePieces: true,
        pieceTheme: piecelink,

      }
    //DONE Recieve Chess Object with the Setup Position From ChessBoard.js (2min)
    var Board = Chessboard('Board1', config); //Create a ChessBoard.js instance
    this.Chessboard = Board;
    }
}
</script>

<style>
/* TODO import Styling script from Documentation and Adjust the Component (5min) */
 #Board1{
 width: 50%;
 height: 50%;
}
</style>

// TODO Total Time is 25min 