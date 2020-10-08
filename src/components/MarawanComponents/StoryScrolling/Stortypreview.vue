<template>
  <div>
      <ChessBoardDisplay id='grggr'  style="width : 30vw" ></ChessBoardDisplay>
      <MovePreviewDisplay :moves='movesdata' :startpos='newpos'></MovePreviewDisplay>
  </div>
</template>

<script>
import ChessBoardDisplay from "@/components/MarawanComponents/ChessBoard/ChessBoardDisplay"
import MovePreviewDisplay from "@/components/MarawanComponents/MovePreview/MovePreviewDisplay"
export default {
  data(){
    return{
      movesdata : "",
      newpos : '',
    }
  },
  components:{
    MovePreviewDisplay,
    ChessBoardDisplay
  },
    props:["moves"],
    mounted(){
      
    },
    watch:{
        moves:function(){
          if(this.moves.Moves){
            this.movesdata = this.moves.Moves[0].Moves
            this.newpos = this.moves.StartingFen
            console.log(this.newpos)
          }
           
        },
        
    }
}
</script>

<style>

</style>