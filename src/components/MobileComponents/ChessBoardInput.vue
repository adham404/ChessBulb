<template>
  <div>
    <div class="" :id="id" style=" "></div>
  </div>
</template>

<script>
//DONE import ChessBoardDisplay (5min)

import Chessboard from "chessboardjs-vue";
import * as Chess from "chess.js";


var board = null;
import { EventBus } from "@/main.js";
export default {
  props: ["move", "start", "id","multi"],
  data() {
    return {
      board: null,
      startpos: null,
    };
  },
  beforeDestroy(){
    EventBus.$off("boradfen")
    EventBus.$off("boardmove")
  },

  mounted() {
    var isboeardactive = true
    //FIXME add to the docs
    EventBus.$on('boardactive',data =>{
      isboeardactive = data
    })
    
    EventBus.$on("boradfen", async (infen) => {
      game = await new Chess(infen);

      await board.position(game.fen());
      EventBus.$emit("newfen", infen);
    });
    EventBus.$on("boardmove", async (inmove) => {
      if (game.game_over()) {
        alert("game is over ");
      } else {
        await game.move(inmove, { sloppy: true });
        await board.move(inmove);
        await board.position(game.fen());
        var lastmove = game.history();
        lastmove = lastmove[lastmove.length - 1];
        EventBus.$emit("newmove", lastmove);
        // console.log(lastmove);
        EventBus.$emit("newfen", game.fen());
        EventBus.$emit("newfenAndmove", [game.fen(),lastmove]);
      }
    });
    var game;
    if (this.start == null) {
      this.startpos = "start";
      game = new Chess();
    } else {
      this.startpos = this.start;
      game = new Chess(this.start);
    }

    //DONE creat new board(3min)

    
    //DONE get if the match ended and if disable the input(5min)
    function onDragStart(source, piece /*, position, orientation*/) {
      if (game.game_over()) {
        return false;
      } else if (
        (game.turn() === "w" && piece.search(/^b/) !== -1) ||
        (game.turn() === "b" && piece.search(/^w/) !== -1)
      ) {
        return false;
      }else if(!isboeardactive){
        return false
      }
      // console.log(position)
      // console.log(orientation)
    }

    function onDrop(source, target) {
      // see if the move is legal
      var move = game.move({
        from: source,
        to: target,
        promotion: "q",
        // note: always promote to a queen for example simplicity
      });
      // illegal move
      if (move === null) {
        return "snapback";
      }
      //DONE emit the move(5min)
    }
    function onSnapEnd() {
      board.position(game.fen());
      var lastmove = game.history();
      lastmove = lastmove[lastmove.length - 1];
      if(this.multi){
        EventBus.$emit("newmoveInMulti", lastmove,this.id);
        EventBus.$emit("newfen", game.fen(),this.id);
      }else{
      EventBus.$emit("newmove", lastmove);
      EventBus.$emit("newfen", game.fen());
      EventBus.$emit("newfenAndmove", [game.fen(),lastmove]);
      }
      
    }
    var StartMove = null
    var touchSquare= async function(square , valid){
      console.log("touched", square, "and it is " , valid)
      if( valid){
        if(game.turn()== game.get(square).color){
          board.removeHightlight()
        board.highlight(square)
        StartMove = square
        }
        
      }
      else if(StartMove){
        if (game.game_over()) {
        alert("game is over ");
      } else {
        var moo =  await game.move(StartMove + "-"+square, { sloppy: true });
        if(moo){
          await board.move(StartMove + "-"+square);
          await board.position(game.fen());
          var lastmove = game.history();
          lastmove = lastmove[lastmove.length - 1];
          EventBus.$emit("newmove", lastmove);
          StartMove = null
          // console.log(lastmove);
          board.removeHightlight()
          EventBus.$emit("newfen", game.fen());
          EventBus.$emit("newfenAndmove", [game.fen(),lastmove]);

        }else{
          StartMove = null
          board.removeHightlight()
        }
        
      }
        // board.move(StartMove + "-"+square)
        // StartMove = null
        // board.removeHightlight()
      }
      
    }

    //DONE valitade move(20min)
    var config = {
      draggable: true,
      touchSquare : touchSquare,
      position: this.startpos,
      onDragStart: onDragStart,
      onDrop: onDrop,
      onSnapEnd: onSnapEnd,
      showErrors: "alert",
      
    };
    //DONE display move(10min)
    board = new Chessboard(this.id, config);
    // window.addEventListener("resize", function() {board.resize()});
  },
  methods: {
    printmove() {
      // console.log(this.newmove)
    },
  },
  watch: {
    //DONE get move from the board or stock fish (5min)
    move: function() {
      board.move(this.move);
    },
  },
};
</script>

<style></style>
