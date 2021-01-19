<template>
  <div>
      hi
      <div id="board1ddwdwdzaxsw" style="width: 400px"></div>
      <button @click="Previous" > Previous </button>
      <button @click="Next" > Next </button>
  </div>
</template>

<script>
import ChessBoard from "chessboardjs-vue";
import displayChess from "./displaychess"
import CheckPgn from "./checkPgn"
export default {
    data(){
        return{
            engine : null,
            theboard :  null,
        }
    },
    mounted(){
        var pgn = `[SetUp "1"]
[FEN "rnbqkbnr/p1ppp1p1/8/1p5p/P2Pp1P1/8/1PP2P1P/RNBQKBNR w KQkq - 0 1"]

1. d5 e3 2. axb5 Kf7`
        var bb = CheckPgn(pgn)
        console.log(bb.Text)
        console.log(bb.IsPgn)
        this.engine = displayChess(pgn)
        this.theboard = ChessBoard('board1ddwdwdzaxsw',"start");
        this.theboard.position(this.engine.getFEN())
    },
    methods:{
        Next(){
            this.engine.NextMove()
            this.theboard.position(this.engine.getFEN())
        },
        Previous(){
            this.engine.PreviousMove()
            this.theboard.position(this.engine.getFEN())
        },
    }

}
</script>

<style>

</style>