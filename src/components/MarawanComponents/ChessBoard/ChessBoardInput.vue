<template>
  <div>
    <div class="" :id="id" style=" "></div>
  </div>
</template>

<script>
//DONE import ChessBoardDisplay (5min)
import Chessboard from "chessboardjs";
import * as Chess from "chess.js";

// jquery
global.jQuery = require("jquery");
var $ = global.jQuery;
window.$ = $;
var board = null;
import { EventBus } from "@/main.js";
export default {
  props: ["move", "start", "id"],
  data() {
    return {
      board: null,
      startpos: null,
    };
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

    function piecelink(piece) {
      return require("@/assets/img/chesspieces/wikipedia/" + piece + ".png");
    }
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
      EventBus.$emit("newmove", lastmove);
      EventBus.$emit("newfen", game.fen());
      EventBus.$emit("newfenAndmove", [game.fen(),lastmove]);
    }

    //DONE valitade move(20min)
    var config = {
      draggable: true,
      position: this.startpos,
      onDragStart: onDragStart,
      onDrop: onDrop,
      onSnapEnd: onSnapEnd,
      showErrors: "alert",
      pieceTheme: piecelink,
    };
    //DONE display move(10min)
    board = new Chessboard(this.id, config);
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
