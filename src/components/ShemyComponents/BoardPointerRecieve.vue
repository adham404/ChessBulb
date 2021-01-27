<template>
  <div class="ChessBoard">
    <div id="canvas-wrap" style="color:white">
        <div :style="ChessBoardStyle" ref="BoardChess" id="Board2">
        </div>
        <canvas  id="Canva1" :width="CanvaWidth" :height="CanvaHeight"  style="border:1px solid #000000; position:absolute; top:0px; left:0px;">
        </canvas>
    </div>
    <button @click="test">Test Draw</button>
  </div>
</template>

<script>
import {EventBus} from "../../main"
import Chessboard from "chessboardjs-vue"

export default {
data(){
    return{
        CanvaWidth:"",
        CanvaHeight:"",
        ActiveWidth:0,
        Board:"",
        context:"",
        ChessBoardStyle:{
            width:"30%"
        },
    }
},
methods:{
    DrawPointer(fromx, fromy, tox, toy, ArrowData)
    {
        var canv = document.getElementById("Canva1");
        var context = canv.getContext("2d");
        var ratio = this.ActiveWidth/ArrowData.StreamerBoardWidth;
        console.log("am beggin");
            console.log(fromx);
            console.log(fromy);
            console.log(tox);
            console.log(toy);
            console.log(ArrowData);
            fromx = fromx * ratio;
            fromy = fromy * ratio;
            tox = tox * ratio;
            toy = toy * ratio;
            context.beginPath();
            context.strokeStyle = ArrowData.ArrowColor;
            context.lineWidth = ArrowData.ArrowThickness;
            var dx = tox - fromx;
            var headlen = 10; // length of head in pixels
            var dy = toy - fromy;
            var angle = Math.atan2(dy, dx);
            context.moveTo(fromx, fromy);
            context.lineTo(tox, toy);
            context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
            context.moveTo(tox, toy);
            context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
            // this.context.lineWidth = 2;
            context.stroke();
            context.closePath();
            console.log("done hypothetically");
    },
    Erase()
    {
           var canvas = document.getElementById("Canva1");
           var context = canvas.getContext("2d");
           context.clearRect(0,0,canvas.width,canvas.height);

    },
    test()
    {

    }
},
async mounted()
{
    //Synchronizing canvas and board width and height 
    this.ActiveWidth = this.$refs.BoardChess.clientWidth;
    this.CanvaWidth = this.ActiveWidth + "px";
    this.CanvaHeight = this.ActiveWidth + "px";
    window.addEventListener("resize", () => {
        //So when a resize occurs
    this.ActiveWidth = this.$refs.BoardChess.clientWidth;
    this.CanvaWidth = this.ActiveWidth + "px";
    this.CanvaHeight = this.ActiveWidth + "px";
    })
    //Define the Reciever Board
        var config = {
        draggable: true,
        dropOffBoard: 'trash',
        showErrors : 'alert',
        position: 'start',
        sparePieces: false
        }
        this.Board = Chessboard('Board2',config);
    //Initialize canva
    console.log("I am alive un fortunate ");
    EventBus.$on("Send", () => {
        console.log("wasssap");
    })
    await EventBus.$on("PointerDrawn",(PointerData) => { 
        console.log("Data Recieved baby");
        this.DrawPointer(PointerData.x1,PointerData.y1,PointerData.x2,PointerData.y2,PointerData.ArrowData);
    })
    EventBus.$on("EraseCanvas",() => {
        this.Erase()
    })
}
}
</script>

<style>
#canvas-wrap { position:relative } /* Make this a positioned parent */
</style>