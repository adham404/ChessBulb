<template>
  <div>
            <!-- DONE add [ChessBoard] To the left and pass (ChessPGNStartup) property recieved from [PositionSetup] To Show the starting position of the game (2min) -->
            <div id="board1"></div>
            <button>Post Your Story</button>
            <button>Undo Move</button>
            <div>
              <button @click="PostMove">Post as a Move</button>
              <button>Post as a chess puzzle</button>
              <button>Setup Position again</button>
            </div>
            <!-- DONE add AddMove div to the right of [ChessBoard] (2min) -->
            <div style="color:white">Moves:</div>
            <!-- DONE Add Lines div inside the AddMove div containing Lines of possible moves and loop through it according to the number of arrays in the (ChessMoveObject) (3min) -->
            <div class="Lines">
            <div   class="LineWithTitle" v-for="Line in ChessMoveObject" v-bind:key="Line">
            <p @click="GoToLine(Line.Line)">Solution Number {{Line.Line}}</p>
            <div class="Line">
            <div class="ColorCol">
            <!-- DONE assign the Move content to each div tag (1min) -->
                <div v-for="(WhiteMove, x) in Line.WhiteMoves" v-bind:key="x">
            <!-- DONE assign {PressMove} function to each li tag and execute it when each move is clicked and pass Line.LineCounter and Move  (1min) -->
                    <div @click="WhiteMoveClicked(Line.Line,WhiteMove)">{{WhiteMove}}</div>
                </div>
              </div>
              <div class="ColorCol">
                  <div  v-for="(BlackMove, x) in Line.BlackMoves" v-bind:key="x">
                    <div style="color:red" @click="BlackMoveClicked(Line.Line, BlackMove)">{{BlackMove}}</div>
                  </div>
              </div>
            <!-- DONE Add right to the Lines div another div inside the AddMove div that contain the two button options which is assigned to the variable (LinesOptionFlag) (2min)  -->
            <!-- DONE assign a boolean flag (PressMoveFlag) data property to the div of two buttons (1min) -->
              <div v-if="Line.MoveClicked" class="Buttons">
            <!-- DONE assign the two functions {OverWrite} and {OpenNewLine} to the buttons (1min) -->
                  <button @click="OverWriteMove">OverWrite old move</button>
                  <button @click="OpenLine">Open new Line</button>
              </div>
            </div>
            <!-- DONE Add inside the Line div li tags that hold the Moves of each line that represent the element of each nested array with a title a head of it such as Move#1 Solution#2 etc.. (2min) -->            
            </div>
            </div>
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
  import firebase from "firebase";
  // import { ChessMoveObject[this.LineCounter].ChessEngine } from "../../main"
  import * as Chess from "chess.js";

export default {
    //TODO Assign Data Properties in  the vue data object which are (PressMoveFlag(B), Fen(S), ChessCurrentMove(S), ChessMoveObject(A), LineObject(O), LineCounter(I), LinesOptionFlag(B), OverWriteLineCounter(I), OverWriteCurrentMove(I), MovesArrayDummy(A), PuzzleFormFlag(B), MoveFormFlag(B) PuzzleDescription(S), RestOfThePGN(S), StoryData(O)) (3min)
    data: function()
    {
      return{
        Fen:"",  //Fen property Holds the Fen of the Setup position passed by props
        ChessBoard:"", //ChessBoard Instance Object
        ChessMoveObject:[   // Array Of Object that contain all lines of moves
          {
            Line:0,
            Moves:[],
            WhiteMoves:[],
            BlackMoves:[],
            LastFen:"",
            ChessEngine:"",  //Every Line has ChessGame instance
            MoveClicked:false
          }
        ],
        LineCounter:0, //Hold the Counter of the Current Line in action 
        ChessCurrentMovePos:"", //Hold the Position value of the White Move in the White moves array of the current child in the main object
        OverWriteType:"" //Hold the Type overwrite if it's an overwrite for White Moves or black moves
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
      this.ChessMoveObject[this.LineCounter].ChessEngine = new Chess(this.Fen);
    },
      //DONE define Methods property (1min)
    methods:{
      PostMove()
      {
        var db = firebase.firestore()
        var StoryID = Math.floor((Math.random() * 100)) + "S" + "T";
        var UserID = Math.floor((Math.random() * 100)) + "U" + "D";
        var ArrayToSend = [];
        var TimeOfCreation = new Date();
        for (let i = 0; i < this.ChessMoveObject.length; i++) {
          var MovesObject = "";
          MovesObject = {
            WhiteMoves: this.ChessMoveObject[i].WhiteMoves,
            BlackMoves: this.ChessMoveObject[i].BlackMoves,
            Line: this.ChessMoveObject[i].Line
          }
          ArrayToSend.push(MovesObject);
        }        
        db.collection("ChessStories").doc(StoryID).set({
          Moves: ArrayToSend,
          TimeOfCreation: TimeOfCreation,
          Type: "Move",
          StartingFen: this.Fen,
          StoryID: StoryID,
          UserID: UserID
        })
      },
      WhiteMoveClicked(LineCounter,WhiteMove)  //This Function Update the status of the Move and Line ready for action when a White move is clicked
      {
        if(this.ChessMoveObject[LineCounter].MoveClicked) //Toogle Between the MoveClicked Flag to Show the Two buttons Overwrite and OpenNewLine
        {
          this.ChessMoveObject[LineCounter].MoveClicked = false;
        }
        else
        {
          this.ChessMoveObject[LineCounter].MoveClicked = true;
        }

        var WhiteLength = this.ChessMoveObject[LineCounter].WhiteMoves.length;
        for (let i = 0; i < WhiteLength; i++) {
          if (this.ChessMoveObject[LineCounter].WhiteMoves[i] == WhiteMove) {  //Search for the Position of the passed move inside the array of moves
            this.ChessCurrentMovePos = i; // assign the Position of the White Move
            break;
          }
        }
          this.OverWriteType = "white";  //Assign OverWriteType as White
          this.LineCounter = LineCounter; //Assign the LineCounter property to the Line number passed
      },
      GoToLine(LineCounter) //This Function triggered when the title of the line is clicked to navigate smoothly between Lines
      {
        this.LineCounter = LineCounter;
        this.LoadTargetFen(LineCounter);
      },
      LoadTargetFen(LineCounter) //Function Used to Load the Fen inside the array of Object according to the index of the General Line Property
      {
        var CurrentFen = this.ChessMoveObject[LineCounter].ChessEngine.fen();
        this.ChessBoard.position(CurrentFen);          
      },
      BlackMoveClicked(LineCounter, BlackMove) //This Function Update the status of the Move and Line ready for action when a Black move is clicked
      {
        if(this.ChessMoveObject[LineCounter].MoveClicked) //Toogle Between the MoveClicked Flag to Show the Two buttons Overwrite and OpenNewLine
        {
          this.ChessMoveObject[LineCounter].MoveClicked = false;
        }
        else{
          this.ChessMoveObject[LineCounter].MoveClicked = true;
        }
        var BlackLength = this.ChessMoveObject[LineCounter].BlackMoves.length;
        for (let i = 0; i < BlackLength; i++) { 
          if (this.ChessMoveObject[LineCounter].BlackMoves[i] == BlackMove) { //Search for the Position of the passed move inside the array of moves
            this.ChessCurrentMovePos = i; // assign the Position of the White Move
            break;
          }
        }
          this.OverWriteType = "Black"; //Assign OverWriteType as Black
          this.LineCounter = LineCounter; //Assign the LineCounter property to the Line number passed
      },
    OverWriteMove() //This Function OverWrite the Selected Move
      {
        console.log("We are on Line: "+ this.LineCounter);
        var WhiteLength = 0; 
        var BlackLength = 0;
          WhiteLength = this.ChessMoveObject[this.LineCounter].WhiteMoves.length;
          BlackLength = this.ChessMoveObject[this.LineCounter].BlackMoves.length;
            for (let i = BlackLength; i > this.ChessCurrentMovePos; i--) {
              var WhiteMove = this.ChessMoveObject[this.LineCounter].WhiteMoves[i];
              var BlackMove = this.ChessMoveObject[this.LineCounter].BlackMoves[i];
              var CurrentFen;              
              this.ChessMoveObject[this.LineCounter].BlackMoves.pop() // all the moves after the selected move are popped from the array
              this.ChessMoveObject[this.LineCounter].ChessEngine.undo(BlackMove);  // all the moves after the selected move are undoed 
              CurrentFen = this.ChessMoveObject[this.LineCounter].ChessEngine.fen(); 
              this.ChessBoard.position(CurrentFen) //Load the Fen after the moves are being undoed
              if(this.OverWriteType == "Black") //If  a black move is tend to be overwritten then the white move array will be late by one move
              {
                if(i != this.ChessCurrentMovePos + 1 )
                {
                this.ChessMoveObject[this.LineCounter].WhiteMoves.pop()   
                this.ChessMoveObject[this.LineCounter].ChessEngine.undo(WhiteMove);              
                CurrentFen = this.ChessMoveObject[this.LineCounter].ChessEngine.fen(); 
                this.ChessBoard.position(CurrentFen)                 
                }
                else {
                  console.log("Bingo")
                }
              }
              else 
              {
                this.ChessMoveObject[this.LineCounter].WhiteMoves.pop()   
                this.ChessMoveObject[this.LineCounter].ChessEngine.undo(WhiteMove);              
                CurrentFen = this.ChessMoveObject[this.LineCounter].ChessEngine.fen(); 
                this.ChessBoard.position(CurrentFen)
              }
            }
          if (WhiteLength > BlackLength) { //Incase the Length of Whitemoves array are more than the Black array we undo one extra move in the White moves array
            var pos = this.ChessCurrentMovePos
            var ExtraMove = this.ChessMoveObject[this.LineCounter].WhiteMoves[pos];
            this.ChessMoveObject[this.LineCounter].WhiteMoves.pop();
            this.ChessMoveObject[this.LineCounter].ChessEngine.undo(ExtraMove);
            CurrentFen = this.ChessMoveObject[this.LineCounter].ChessEngine.fen(); 
            this.ChessBoard.position(CurrentFen)
          }
          this.ChessMoveObject[this.LineCounter].MoveClicked = false;
    },
    OpenLine()  //This Function to Create a new Line 
    {
      console.log("Hi From Here");
      this.ChessMoveObject[this.LineCounter].MoveClicked = false;
      var SolutionLine = this.ChessMoveObject.length;
        var ChessObject = 
        {
          Line: SolutionLine,
          WhiteMoves: [],
          BlackMoves: [],
          MoveClicked: false,
          ChessEngine:""
        }
        this.ChessMoveObject.push(ChessObject)
        this.ChessMoveObject[SolutionLine].ChessEngine = new Chess(this.Fen);
      for (let i = 0; i <= this.ChessCurrentMovePos; i++) {
        var WhiteMove = this.ChessMoveObject[this.LineCounter].WhiteMoves[i];
        var BlackMove = this.ChessMoveObject[this.LineCounter].BlackMoves[i];
        this.ChessMoveObject[SolutionLine].WhiteMoves.push(WhiteMove);
        this.ChessMoveObject[SolutionLine].BlackMoves.push(BlackMove);
        this.ChessMoveObject[SolutionLine].ChessEngine.move(WhiteMove)
        this.ChessMoveObject[SolutionLine].ChessEngine.move(BlackMove)        
      }
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
          console.log(this.ChessMoveObject[this.LineCounter].ChessEngine.pgn());
          var move = this.ChessMoveObject[this.LineCounter].ChessEngine.move({
            from: source,
            to: target,
            promotion: 'q'
          })
          // illegal move
          if (move === null) return 'snapback'
          console.log(this.ChessMoveObject[this.LineCounter].ChessEngine.fen());
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
          console.log(this.ChessMoveObject[this.LineCounter].ChessEngine.ascii());
          console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
      },
      // only pick up pieces for the side to move
      onDragStart(source, piece)
      {
         if ((this.ChessMoveObject[this.LineCounter].ChessEngine.turn() === 'w' && piece.search(/^b/) !== -1) ||
              (this.ChessMoveObject[this.LineCounter].ChessEngine.turn() === 'b' && piece.search(/^w/) !== -1)) {
           return false
              }
      }
      }

      // onSnapEnd()
      // {
      //   this.ChessBoard.position(ChessMoveObject[this.LineCounter].ChessEngine.fen())
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
 width: 30%;
 height: 30%;
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
p{
  cursor: pointer;
}
</style>

//TODO Total Time from 124min to 140min