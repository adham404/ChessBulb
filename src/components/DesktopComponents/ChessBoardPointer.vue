<template>
      <div class="Game">
          <div id="canvas-wrap" style="color:white">
              <div :style="ChessBoardStyle" ref="BoardChess" id="Board">
              </div>
              <canvas v-show="ShowCanva" id="Canva" :width="CanvaWidth" :height="CanvaHeight"  style="border:1px solid #000000; position:absolute; top:0px; left:0px;">
              </canvas>
          </div>
          <!-- <div class="PointerPaletee">
              <button @click="PointerLaunch">{{LaunchMessage}}</button>
              <div v-show="ShowCanva">
              <div>Pointer Tool:</div>
              <button @click="Erase">Erase All</button>
              <button>Undo</button>
              <label for="colorpicker">Pointer Color: </label>
              <input v-model="ArrowColor" type="color" name="" id="colorpicker">
              <label for="Thickness">Pointer Thickness: </label>
              <input v-model="ArrowThickness" type="range" min="1" max="20" value="1" name="" id="Thickness">
              <div style="border:5px solid black">In order to Move the Chess Pieces you have to close the pointer.</div>
              </div>
          </div> -->
          <hr>
          <!-- <BoardPointerRecieve></BoardPointerRecieve> -->
</div>
</template>

<script>
import Chessboard from "chessboardjs-vue"
import BoardPointerRecieve from "./BoardPointerRecieve"

import {EventBus} from "../../main"
export default {
    data()
    {
        return{
            Board:"",
            ArrowColor:"black",
            LaunchMessage:"Launch Pointer",
            ArrowThickness:4,
            ArrowPointerToSend:[],
            ShowCanva:false,
            ActiveWidth: 0,
            ChessboardWidth: 45,
            BoardRecieve:"BoardPointerRecieve",
            CanvaWidth:"",
            CanvaHeight:"",
            ChessBoardStyle:{
                width:"45%"
            },
            CanvaBoardStyle:{
                width:"",
                height:""
            }
        }
    },
    components:{
        BoardPointerRecieve
    },
    computed:{
        WidthMonitor()
        {
            // this.ActiveWidth = this.$refs.BoardChess.clientWidth
            return this.ActiveWidth;
            // console.log("Changing Width: "+ this.$refs.BoardChess.clientWidth);
        }
    },
    methods:{
        // PointerLaunch()
        // {
        //     this.ShowCanva = !this.ShowCanva; 
        //     this.LaunchMessage = this.ShowCanva ? "Close Pointer" : "ShowPointer"
        // },
        Send()
        {
            EventBus.$emit("Send");
        },
        Erase()
        {
           var canvas = document.getElementById("Canva");
           var context = canvas.getContext("2d");
           console.log("canvas width: ",canvas.width);
        //    context.beginPath();
           context.clearRect(0,0,canvas.width,canvas.height);

           //Send Signal to the Reciever Board
           EventBus.$emit("EraseCanvas"); 
        },
        // ShowWidth()
        // {
        //     var width = this.$refs.BoardChess.clientWidth;
        // console.log("Width Value of chessboard: "+ width);
        // },
        PointerInitialize()
        {
        let x = 0;
        let y = 0;
        let IsDrawing = false;
        var canv = document.getElementById("Canva");
        var context = canv.getContext("2d");
        // Event Listeners
        // When Mouse is Clicked on screen
        canv.addEventListener('contextmenu', e => {
            e.preventDefault();
        })
        
        canv.addEventListener('mousedown', e => {
           if(e.button == 0)
            {
                this.ShowCanva = false;
                this.Erase()
            }

            if(e.button == 2)
            {
                console.log("am down and clicked with: "+ e.button);
                x = e.offsetX;
                y = e.offsetY;  
                IsDrawing = true;
            }
        });
            canv.addEventListener('mouseup', e => {
                console.log("am up");
                if(IsDrawing === true)
                {
                    // this.drawline(context,x,y,e.offsetX,e.offsetY);
                    this.canvas_arrow(context,x,y,e.offsetX,e.offsetY);
                    x = 0;
                    y = 0;
                    IsDrawing = false;
                }
            })

        var board  = document.getElementById("Board")
        board.addEventListener("mousedown", e => {
            if(e.button == 2)
            {
                x = e.offsetX;
                y = e.offsetY;
                console.log("Yup broo: "+ x +" " + y);   
                this.ShowCanva = true;
            }
            })
            },


        //For Free Drawing 
        //When Mouse is moving on screen
        // canv.addEventListener('mousemove', e => {
        //     if(IsDrawing === true)
        //     {
        //         this.drawline(context,x,y,e.offsetX,e.offsetY);
        //         x = e.offsetX;
        //         y = e.offsetY;
        //     }
        // })
        //Draw Lines Without Arrows
        // drawline(context,x1,y1,x2,y2)
        // {
        //     context.beginPath();
        //     context.strokeStyle = 'red';
        //     context.linewidth = 20;
        //     context.moveTo(x1,y1);
        //     context.lineTo(x2,y2);
        //     context.stroke();
        //     context.closePath();
        // },
        //Draw Lines With Arrows
        async canvas_arrow(context, fromx, fromy, tox, toy) {
            context.beginPath();
            context.strokeStyle = this.ArrowColor;
            context.lineWidth = 4;
            var dx = tox - fromx;
            var headlen = 10; // length of head in pixels
            var dy = toy - fromy;
            var angle = Math.atan2(dy, dx);
            context.moveTo(fromx, fromy);
            context.lineTo(tox, toy);
            context.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
            context.moveTo(tox, toy);
            context.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
            // context.lineWidth = 2;
            context.stroke();
            context.closePath();
            var PointerData = { //Object that hold the whole details of the pointer
                x1: fromx,
                y1: fromy,
                x2: tox,
                TimeStamp:"",
                y2: toy,
                StreamerBoardWidth: this.ActiveWidth
            }

            this.ArrowPointerToSend.push(PointerData)

            /// Here You Send/Push The ArrowPointerToSend array 


            //Draw Arrow There in the Reciever Board
            await EventBus.$emit("PointerDrawn",PointerData); 
            console.log("Sent");
        },   
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
        this.PointerInitialize()
        //Define First Board 
        var config = {
        draggable: true,
        dropOffBoard: 'trash',
        showErrors : 'alert',
        position: 'start',
        sparePieces: false
        }
        this.Board = Chessboard('Board',config);
    }
}
</script>

<style>
#canvas-wrap { position:relative } /* Make this a positioned parent */
#overlay     { position:absolute; top:20px; left:30px; }
#arrow{
    position: relative;
    width:100px;
    height: 100px;
    left: 100px;
    top: 50px;
    transform: rotate(90deg);
}
.PointerPaletee{
    color: white;
}
</style>