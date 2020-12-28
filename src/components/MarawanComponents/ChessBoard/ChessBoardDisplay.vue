
<template>
  <div>
      <!-- //DONE create board div(5min) -->
      <div  :id="id" ></div>
      </div>
</template>

<script>
//DONE import chessboard and jqary in index.html (5min)
import Chessboard from "chessboardjs-vue";

import {EventBus} from "@/main.js"

export default {
//DONE add a fen prop
    props:['fen','id','hideNotation'],
    data(){
        return{
            board : null,
            
        }
    },
    mounted(){
        
        EventBus.$on("displayboardfen", move =>{
            this.board.position(move)
           
        });
        EventBus.$on("displayboardfenbyid", (move,idd) =>{
            // console.log('resiving data : '+ idd + 'my id is ' + this.id)
            if(idd == this.id){
                this.board.position(move)
            }
            
           
        });

        
        
        //DONE creat new board(3min)
        
            var config = {
            showNotation: this.hideNotation ? false : true,
            draggable: false,
            position: this.fen ? this.fen : 'start',
            showErrors : 'alert',
            
           
            
        }
         this.board = Chessboard(this.id, config)
        
    },
    beforeDestroy () {
    EventBus.$off('displayboardfen')
    EventBus.$off('displayboardfenbyid')
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