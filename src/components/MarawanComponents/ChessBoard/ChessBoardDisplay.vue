
<template>
  <div>
      <!-- //DONE create board div(5min) -->
      <div class="" id="board1"  ></div>
      
      </div>
</template>

<script>
//DONE import chessboard and jqary in index.html (5min)
import  Chessboard from "chessboardjs";
// jquery
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $; 
export default {
    mounted(){
        //DONE creat new board(3min)
        //this toke about 2 hours because a problem with pieces images
        function piecelink(piece){
                return require('@/assets/img/chesspieces/wikipedia/' + piece + '.png') 
            }
            var config = {
            draggable: true,
            position: 'start',
            showErrors : 'alert',
            pieceTheme: piecelink,
           
            
        }
        Chessboard('board1', config)

    },
    methods:{
        bboe(){
            
        }
    }

}

//TODO add event bus (10min)
//TODO get the envent bus data(5min)
//TODO dispaly the insered move in the board(10min)
</script>

<style>
#board1{
    width: 50%;
}

</style>