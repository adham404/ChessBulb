
<template>
  <div>
      <!-- //DONE create board div(5min) -->
      <div class="" :id="id" style=" width: 50vw;"  ></div>
      </div>
</template>

<script>
//DONE import chessboard and jqary in index.html (5min)
import  Chessboard from "chessboardjs";
// jquery
global.jQuery = require('jquery');
import {EventBus} from "@/main.js"
var $ = global.jQuery;
window.$ = $; 
export default {
//DONE add a fen prop
    props:['fen','id'],
    data(){
        return{
            board : null,
        }
    },
    mounted(){
        EventBus.$on("displayboardfen",move =>{
            this.board.position(move)

        })
        
        //DONE creat new board(3min)
        //this toke about 2 hours because a problem with pieces images
        function piecelink(piece){
                return require('@/assets/img/chesspieces/wikipedia/' + piece + '.png') 
            }
            var config = {
            draggable: false,
            position: 'start',
            showErrors : 'alert',
            pieceTheme: piecelink,
           
            
        }
         this.board = Chessboard(this.id, config)

    },
    methods:{
       
    },
    //DONE wath the fen prop for change and update the board
    watch:{
        fen:function(){
            this.board.position(this.fen)
        }
    }

}


</script>

<style>


</style>