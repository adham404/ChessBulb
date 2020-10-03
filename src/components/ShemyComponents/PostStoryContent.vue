<template>
  <div>
            <!-- TODO add [ChessBoard] To the left and pass (ChessPGNStartup) property recieved from [PositionSetup] To Show the starting position of the game (2min) -->
            <div id="board1"></div>
            <button @click="UpdateMoves">Post Your Story</button>
            <button @click="Test">Reload Progress</button>
            <!-- TODO add AddMove div to the right of [ChessBoard] (2min) -->
            <div style="color:white">Moves:</div>
            <!-- DONE Add Lines div inside the AddMove div containing Lines of possible moves and loop through it according to the number of arrays in the (ChessMoveObject) (3min) -->
            <div class="Lines">
            <div   class="LineWithTitle" v-for="Line in ChessMoveObject" v-bind:key="Line">
            <p @click="GoToLine(Line.Line)" :style="Line.LineStyle">Solution Number {{Line.Line}}</p>
            <div class="Line">
            <div class="ColorCol">
            <!-- DONE assign the Move content to each div tag (1min) -->
                <div v-for="(WhiteMove, x) in Line.WhiteMoves" v-bind:key="x">
                    <div @click="WhiteMoveClicked(Line.Line,WhiteMove)">{{WhiteMove}}</div>
                </div>
              </div>
              <div class="ColorCol">
                  <div  v-for="(BlackMove, x) in Line.BlackMoves" v-bind:key="x">
                    <div style="color:red" @click="BlackMoveClicked(Line.Line, BlackMove)">{{BlackMove}}</div>
                  </div>
              </div>
              <div v-if="Line.MoveClicked" class="Buttons">
                  <button @click="OverWriteMove">OverWrite old move</button>
                  <button @click="OpenLine">Open new Line</button>
              </div>
            </div>
            <!-- DONE Add inside the Line div li tags that hold the Moves of each line that represent the element of each nested array with a title a head of it such as Move#1 Solution#2 etc.. (2min) -->            
            </div>
            </div>
            <!-- TODO assign {PressMove} function to each li tag and execute it when each move is clicked and pass Line.LineCounter and Move  (1min) -->
            <!-- TODO Add right to the Lines div another div inside the AddMove div that contain the two button options which is assigned to the variable (LinesOptionFlag) (2min)  -->
            <!-- TODO assign the two functions {OverWrite} and {OpenNewLine} to the buttons (1min) -->
            <!-- TODO assign a boolean flag (PressMoveFlag) data property to the div of two buttons (1min) -->
            <!-- TODO Add div right to the AddMove div that contains 3 execution buttons (2min)   -->
            <!-- TODO assign {PostMove} function to the 'Post as a move' button (2min) -->
            <!-- TODO assign {PostPuzzle} function to the 'Post as a puzzle' button (2min) -->
            <!-- TODO add PostAsMove div that contain Puzzle explanation form and Starting move input miniform assign the input field to (PuzzleDescription) (5min) -->
            <!-- TODO the PostAsMove div form is shown with the data property (MoveFormFlag) using v-if (3min) -->
            <!-- TODO add PostAsPuzzle div that contain Puzzle explanation form and Starting move input miniform assign the input field to (PuzzleDescription) (5min) -->
            <!-- TODO the PostAsPuzzle div form is shown with the data property (PuzzleFormFlag) using v-if (3min) -->
            <!-- TODO add router link to the 'Setup Position again' button that redirects to [AddStory] (2min) -->
 </div>
</template>

<script>
  //DONE Assign EventBus (1min) 
  // import {EventBus} from "../../main"
  import Chessboard from "chessboardjs";
  // import { ChessGame } from "../../main"
  import * as Chess from "chess.js";

export default {
    //TODO Assign Data Properties in  the vue data object which are (PressMoveFlag(B), Fen(S), ChessCurrentMove(S), ChessMoveObject(A), LineObject(O), LineCounter(I), LinesOptionFlag(B), OverWriteLineCounter(I), OverWriteCurrentMove(I), MovesArrayDummy(A), PuzzleFormFlag(B), MoveFormFlag(B) PuzzleDescription(S), RestOfThePGN(S), StoryData(O)) (3min)
    data: function()
    {
      return{
        Fen:"",
        ChessGame:"",
        ChessBoard:"",
        MoveClicked:false,
        ChessMoveObject:[
          {
            Line:0,
            Moves:[],
            WhiteMoves:[],
            BlackMoves:[],
            LineStyle:{
              cursor:"pointer"
            },
            LastFen:"",
            WhiteMovesFen:[],
            BlackMovesFen:[],
            MoveClicked:false
          }
        ],
        LineCounter:0,
        ChessCurrentWhiteMovePos:"",
        ChessCurrentBlackMovePos:"",
        CurrentLine:0,
        OverWriteType:"",
        PlayerMove:"white"
      }
    },
    //DONE recieve Chess Fen from [PositionSetup] and assign it to (Fen) property (2min)
    props:["FenObject"],
      //DONE Declare Mounted Property (1min)
    mounted(){
      //Function to load the Chess pieces icons
      function piecelink(piece){
        return require('@/assets/img/chesspieces/wikipedia/' + piece + '.png') 
      }
      this.Fen = this.FenObject;  //Converting the chessboard fen format to the chess.js fen format 
      //ChessBoard Config
      var config = {
        draggable: true,
        showErrors : 'alert',
        position: this.FenObject,
        onDrop: this.onDrop,
        onDragStart: this.onDragStart,
        pieceTheme: piecelink
      }
      //Create a ChessBoard object with the passed config
      this.ChessBoard = Chessboard('board1', config);
      //Create a Chess.js Object with the Recieved Fen from the PositionSetup
      this.ChessGame = new Chess(this.Fen);
    },
    updated()
    {
      console.log("New Position: ");
      console.log(this.ChessBoard.position())  
    },
      //DONE define Methods property (1min)
    methods:{
      UpdateMoves()
      {
        console.log("New Position: ");
        console.log(this.ChessBoard.position())  
      },
      WhiteMoveClicked(LineCounter,WhiteMove)
      {
        console.log("Current Line is: "+ LineCounter);
        if(this.ChessMoveObject[LineCounter].MoveClicked)
        {
          this.ChessMoveObject[LineCounter].MoveClicked = false;
        }
        else
        {
          this.ChessMoveObject[LineCounter].MoveClicked = true;
        }
        var WhiteLength = this.ChessMoveObject[LineCounter].WhiteMoves.length;
        for (let i = 0; i < WhiteLength; i++) {
          if (this.ChessMoveObject[LineCounter].WhiteMoves[i] == WhiteMove) {
            this.ChessCurrentWhiteMovePos = i;
            this.ChessCurrentBlackMovePos = i;
            break;
          }
        }
          this.OverWriteType = "white";
          this.LineCounter = LineCounter;
        console.log("White Move is clicked!");
      },
      GoToLine(LineCounter)
      {
        console.log("Hi");
        // console.log(Indicator);
        // console.log("Current Line is: "+ this.LineCounter);
        if (this.LineCounter != LineCounter) {
          console.log("General Line is: "+ this.LineCounter);
          console.log("the Passed Line is: "+ LineCounter);
          this.StoreCurrentFen();
          this.LineCounter = LineCounter;
          this.LoadTargetFen(LineCounter);
        }
      },
      Test()
      {
        this.ChessGame.load(this.Fen);
        this.ChessBoard.position(this.Fen);
      },
      StoreCurrentFen()
      {
        var CurrentFen = this.ChessGame.fen();
        this.ChessMoveObject[this.LineCounter].LastFen = CurrentFen;
      },
      LoadTargetFen(LineCounter)
      {
        var CurrentFen = this.ChessMoveObject[LineCounter].LastFen;
        this.ChessGame.load(CurrentFen);
        this.ChessBoard.position(CurrentFen);          
      },
      BlackMoveClicked(LineCounter, BlackMove)
      {
        console.log("Current Line is: "+ LineCounter);
        if(this.ChessMoveObject[LineCounter].MoveClicked)
        {
          this.ChessMoveObject[LineCounter].MoveClicked = false;
        }
        else{
          this.ChessMoveObject[LineCounter].MoveClicked = true;
        }
        var BlackLength = this.ChessMoveObject[LineCounter].BlackMoves.length;
        for (let i = 0; i < BlackLength; i++) {
          if (this.ChessMoveObject[LineCounter].BlackMoves[i] == BlackMove) {
            this.ChessCurrentWhiteMovePos = i;
            this.ChessCurrentBlackMovePos = i;
            break;
          }
        }
          this.OverWriteType = "Black";
          this.LineCounter = LineCounter;

      console.log("Black Move is clicked!");
      },
    OverWriteMove()
      {
        console.log("--------------2wlan Keda----------------");
        console.log("Current White Move Pos To be OverWritten: "+ this.ChessCurrentWhiteMovePos);
        console.log("Current Black Move Pos To be OverWritten: "+ this.ChessCurrentBlackMovePos);
        console.log("OverWrite Move Type: "+ this.OverWriteType);
        console.log("Current Line is: "+ this.CurrentLine);
        var WhiteLength = 0; 
        var BlackLength = 0;
        if (this.OverWriteType == "white") {
          WhiteLength = this.ChessMoveObject[this.LineCounter].WhiteMoves.length;
          BlackLength = this.ChessMoveObject[this.LineCounter].BlackMoves.length;
            for (let i = WhiteLength; i > this.ChessCurrentWhiteMovePos; i--) {
              var WhiteMove = this.ChessMoveObject[this.LineCounter].WhiteMoves[i];
              var BlackMove = this.ChessMoveObject[this.LineCounter].BlackMoves[i];
              var CurrentFen;              
              this.ChessMoveObject[this.LineCounter].WhiteMoves.pop()
              if(WhiteLength == BlackLength)
              {
                this.ChessGame.undo(BlackMove);
                CurrentFen = this.ChessGame.fen(); 
                this.ChessBoard.position(CurrentFen)
                this.ChessMoveObject[this.LineCounter].BlackMoves.pop()
              }
                this.ChessGame.undo(WhiteMove);              
                CurrentFen = this.ChessGame.fen(); 
                this.ChessBoard.position(CurrentFen)
                console.log(i);
            }
          this.ChessMoveObject[this.LineCounter].MoveClicked = false;
        }
        else
        {
          WhiteLength = this.ChessMoveObject[this.LineCounter].WhiteMoves.length;
          BlackLength = this.ChessMoveObject[this.LineCounter].BlackMoves.length;
          for (let i = this.ChessCurrentBlackMovePos; i < BlackLength; i++) {
                this.ChessGame.undo(BlackMove);
                CurrentFen = this.ChessGame.fen(); 
                this.ChessBoard.position(CurrentFen)
                this.ChessMoveObject[this.LineCounter].BlackMoves.pop()            
          }
          for (let i = this.ChessCurrentBlackMovePos; i < WhiteLength-1; i++) {
                this.ChessGame.undo(WhiteMove);
                CurrentFen = this.ChessGame.fen(); 
                this.ChessBoard.position(CurrentFen)
                this.ChessMoveObject[this.LineCounter].WhiteMoves.pop()            
          }
          this.ChessMoveObject[this.LineCounter].MoveClicked = false;
                              
        }
    },
    OpenLine()
    {
      console.log("Hi From Here");
      var WhiteMoves = [];
      var BlackMoves = [];
      this.ChessMoveObject[this.LineCounter].LastFen = this.ChessGame.fen();
      var ChessDummy = new Chess(this.Fen);
      for (let i = 0; i <= this.ChessCurrentWhiteMovePos; i++) {
        var WhiteMove = this.ChessMoveObject[this.LineCounter].WhiteMoves[i];
        var BlackMove = this.ChessMoveObject[this.LineCounter].BlackMoves[i];
        WhiteMoves.push(WhiteMove);
        BlackMoves.push(BlackMove);
        ChessDummy.move(WhiteMove);
        ChessDummy.move(BlackMove)        
      }
      // for (let i = 0; i <= this.ChessCurrentBlackMovePos; i++) {
      //   var BlackMove2 = this.ChessMoveObject[this.LineCounter].BlackMoves[i+1];
      // }
      // var LastBlackMove = this.ChessMoveObject[this.LineCounter].WhiteMoves[this.ChessCurrentWhiteMovePos+1]
      // ChessDummy.move()
      var DummyFen = ChessDummy.fen();
      var SolutionLine = this.ChessMoveObject.length;
      var ChessObject = 
      {
        Line: SolutionLine,
        WhiteMoves: WhiteMoves,
        BlackMoves: BlackMoves,
        MoveClicked: false,
        LastFen: DummyFen
      }
      this.ChessMoveObject.push(ChessObject)
      this.ChessMoveObject[this.LineCounter].MoveClicked = false;
      this.LineCounter = SolutionLine;
      this.LoadTargetFen(this.LineCounter);
    },
      onDrop(source, target)
      {
          console.log('Source: ' + source)
          console.log('Target: ' + target)
      //DONE recieve the current move and assign it to ChessCurrentMove property(3min)
      //DONE ChessMoveObject[LineCounter].Moves.push(ChessCurrentMove) (1min)
          // this.ChessCurrentMove = target;
          console.log("This Move PGN is: ");
          console.log(this.ChessGame.pgn());
          var move = this.ChessGame.move({
            from: source,
            to: target,
            promotion: 'q'
          })
          // illegal move
          if (move === null) return 'snapback'
          console.log(this.ChessBoard.fen());
          console.log("A test for a move is ");
          console.log(move);
          if(move.color === "w")
          {
            console.log("E7M the pure move of the white piece is "+ move.san);
            this.ChessMoveObject[this.LineCounter].WhiteMoves.push(move.san);
            console.log("Current Line is: "+ this.LineCounter);
          }
          else if(move.color === "b")
          {
            console.log("E7M the pure move of the black piece is "+ move.san);
            this.ChessMoveObject[this.LineCounter].BlackMoves.push(move.san);
            console.log("Current Line is: "+ this.LineCounter);

          }
          console.log("Chess Moves hoped to be like:")
          console.log(this.ChessGame.ascii());
          console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
      },
      // only pick up pieces for the side to move
      onDragStart(source, piece)
      {
         if ((this.ChessGame.turn() === 'w' && piece.search(/^b/) !== -1) ||
              (this.ChessGame.turn() === 'b' && piece.search(/^w/) !== -1)) {
           return false
              }
      }
      }

      // onSnapEnd()
      // {
      //   this.ChessBoard.position(ChessGame.fen())
      // }
    
    //TODO ChessMoveObject[LineCounter].NumberOfMoves++; (1min)
    //TODO Declare {PressMove} function (1min)
    //TODO When a move is clicked LinesOptionFlag is set to true (1min)
    //TODO assign passed move to (OverWriteCurrentMove) assign passed Line number to (OverWriteLineCounter) (2min)
    //TODO Declare {OverWrite} function (1min)
    //TODO assign ChessMoveObject[OverWriteLineCounter].Moves to (MovesArrayDummy) (2min)
    //TODO loop through (MovesArrayDummy) and search for (OverWriteCurrentMove) (2min)
    //TODO when found ... (MovesArrayDummy).pop() from current move to the end of the array (2min)
    //TODO recieve new move from [ChessBoard] and (MovesArrayDummy).push(new move) (3min)
    //TODO ChessMoveObject[OverWriteLineCounter].Moves = (MovesArrayDummy) (2min)
    //TODO Declare {OpenNewLine} function (1min)
    //TODO assign ChessMoveObject[OverWriteLineCounter].Moves to (MovesArrayDummy) (2min)
    //TODO loop through (MovesArrayDummy) and search for (OverWriteCurrentMove) (2min)
    //TODO when found ... (MovesArrayDummy).pop() from current move to the end of the array (2min)
    //TODO (LineCounter)++ (1min)
    //TODO ChessMoveObject[LineCounter].moves = (MovesArrayDummy) (1min)
    //TODO Declare {PostMove} function (1min)
    //TODO assign (MoveFormFlag) to true (1min)
    //FIXME Add Same Logic of starting Move like in puzzle 
    //FIXME Check For content of the ChessMoveObject if it's null show confirmation message that there are no moves (5min)
    //TODO If Validation is Ok ----> StoryData.StroyPGN = (ChessPGNStartup) &&  StoryData.Moves = (ChessMoveObject) && StoryData.Type = 'Move' (5min)
    //FIXME assign StoryID to the current StoryData object and StoryData.ID = StoryID (5min)
    //TODO Upload the StoryData object to the database in the User field according to the user ID (5min)
    //TODO show confirmation message that the move has been successfully posted (1min)
    //TODO Declare {PostPuzzle} function (1min)
    //TODO assign (PuzzleFormFlag) to true (1min)
    //FIXME Check For content of the ChessMoveObject if it's null show confirmation message that there are no moves (5min)
    //TODO assign ChessMoveObject[OverWriteLineCounter].Moves to (MovesArrayDummy) (2min)
    //TODO loop through (MovesArrayDummy) and search for (OverWriteCurrentMove) (2min)
    //TODO when found take data from (MovesArrayDummy)[0] till (MovesArrayDummy)[OverWriteCurrentMove] and assign it to (RestOfThePGN) (3min)
    //TODO when found ... (MovesArrayDummy).pop() from beginning to the Current Move (2min)
    //TODO ChessMoveObject[LineCounter].moves = (MovesArrayDummy) (1min)
    //TODO If Validation is Ok ----> StoryData.StroyPGN = (ChessPGNStartup) &&  StoryData.Moves = (ChessMoveObject) && StoryData.Type = 'Puzzle' && StoryData.Description = (PuzzleDescription) (5min)
    //TODO Upload the StoryData object to the database in the User field according to the user ID (5min)
}
</script>

<style>
  /* TODO import Styling script from Documentation and Adjust the Component (5min) */
   #board1{
 width: 50%;
 height: 50%;
}
.Lines{
  position: absolute;  
  display: flex;
}
.Line{
  display: flex;
}
.LineWithTitle{
  margin-right: 15px;
  /* border: 1px solid #ccc; */
}
.ColorCol{
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  cursor: pointer;
}

</style>

//TODO Total Time from 124min to 140min