<template>
  <div>
     <ChessInput id="ramdom" style="width:20%" />
     <div> 
         <button @click="undogame">Undo</button>
         <button @click="redogame">Redo</button>
         <button @click="SendData">Send</button>
     </div>
  </div>
</template>

<script>
import ChessInput from "@/components/MarawanComponents/ChessBoard/ChessBoardInput.vue"
import bb from "./ChatinputBoard"
import Cheackif from "./checkPgn"
import {EventBus} from "@/main.js"
var Logic = bb("rnbqkbnr/p1ppp1p1/8/1p5p/P2Pp1P1/8/1PP2P1P/RNBQKBNR w KQkq - 0 1")
export default {
    components:{
        ChessInput,

    },
    beforeDestroy(){
        EventBus.$off("newmove")
    },
    mounted(){
        EventBus.$emit("boradfen","rnbqkbnr/p1ppp1p1/8/1p5p/P2Pp1P1/8/1PP2P1P/RNBQKBNR w KQkq - 0 1")
        EventBus.$on("newmove",(move)=>{
            Logic.PlayMove(move)
        });
    },
    methods:{
        undogame(){
            Logic.Undo()
            EventBus.$emit("boradfen",Logic.TheFen())
        },
        redogame(){
            Logic.Redo()
            EventBus.$emit("boradfen",Logic.TheFen())
        },
        SendData(){
            console.log(Logic.ThePgn())
            console.log( Cheackif(Logic.ThePgn()))
        }
    }

}
</script>

<style>

</style>