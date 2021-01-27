<template>
  <!-- <div> -->
  <div class="Container">
    <div v-if="Mounted" class="ChessBoard">
      <div id="Board1" ></div>
      <!-- <PositionSetup/> -->
    </div>
    <div class="StoryData">
      <h1>Please Setup the game position</h1>
      <button @click="Save" class="Shadow">Save Position</button>
    </div>
  </div>

      <!-- DONE add ChessBoard.js To the left with sparepieces property set to true value (5min) -->
      <!-- DONE Create div containing Instruction (1min) -->
      <!-- <div>Please Setup the game position</div> -->
      <!-- DONE Create Save Button (1min) -->
      <!-- <button @click="Save">Save Position</button>
      <button @click="QuickPos">QuickPos</button> -->
      <!-- TODO Create div that contains the Validation content with v-if a (PoisitionCorrect) data property and holding the Message as string intorplation with a data property called (PositionValidationMsg) (1min) -->
  <!-- </div> -->
</template>

<script>
  //DONE assign EventBus method (1min)
  import {EventBus} from "../../main"
 
  import Chessboard from "chessboardjs-vue";
  // import { ChessGame } from "../../main"
  import * as Chess from "chess.js";

export default {
    //TODO Assign Data Properties in  the vue data object which are (PoisitionCorrect(B), PositionValidationMsg(S), StartupObject(o), SwapFlag(B)) (3min) 
    data: function()
    {
      return{
        ChessBoard:"",  //a ChessBoard.js instance object
        ChessGame:"", //a Chess.js instance object
        Fen:"", //The Fen object of the ChessBoard
        Mounted: "",
        id: "Board1"
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
    },
     QuickPos()
     {
      this.Fen = "3k4/2qrb3/8/8/8/8/2QRB3/3K4 w - - 0 1";
      EventBus.$emit("PositionIsSet");
      EventBus.$emit("SendPosition",this.Fen);
     }
    },
    mounted(){
    //Taken from [ChessBoardDisplay] component
    var Board = {}
    
		setTimeout(() => {this.Mounted = true; setTimeout(() => {Board = Chessboard('Board1', config); this.Chessboard = Board;}, 900) ;}, 800)
    EventBus.$emit("Toggle", true)
   
      var config = {
        draggable: true,
        dropOffBoard: 'trash',
        showErrors : 'alert',
        sparePieces: true,
      }
    //DONE Recieve Chess Object with the Setup Position From ChessBoard.js (2min)
     //Create a ChessBoard.js instance
    
    }
}
</script>

<style scoped>
button{
		height: 35px;
		width: 150px;
		border: none;
		outline: none;
		border-radius: 1.2rem;
		font-size: 0.9rem;
		font-family: 'Raleway', sans-serif;
		background-color: #022A68;
		color: white;
	}
.Shadow{
		-webkit-box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
		-moz-box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
		box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
}
h1{
  font-family: 'Raleway', sans-serif;
  font-weight: bold;
  color: black;
}
.Container{
	display: flex;
	height: 100vh;
	width: 100%;
}
.ChessBoard{
	/* padding-top: 1px; */
    padding-left: 20px; 
	width: 45%;
	/* background-color: blue; */
}
.StoryData{
	display: flex;
	flex-direction: column;
	width: 55%;
    background-color: white;
  /* background-color: red; */
  justify-content: center;
  align-items: center;
}
#Board1{
 width: 92%;
 height: 92%;

}
</style>
// TODO Total Time is 25min 