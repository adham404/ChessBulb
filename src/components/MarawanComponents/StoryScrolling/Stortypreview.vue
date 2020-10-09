<template>
  <div style="display:flex">
      <ChessBoardDisplay id='grggr'  style="width : 30vw" ></ChessBoardDisplay>
      <div>
        <select name="line" id="" v-model="chossedline" @change="check" >
          <option   v-for="(i,index) in alllines " :key="index"  :value="index">{{index}}line</option>
        </select>
        <MovePreviewDisplay :moves='movesdata' :startpos='newpos'></MovePreviewDisplay>
      </div>
      
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
      alllines : null,
      chossedline : 0,
    }
  },
  components:{
    MovePreviewDisplay,
    ChessBoardDisplay
  },
  methods:{
    check(){
      this.movesdata = this.moves.Moves[this.chossedline].Moves
      console.log(this.chossedline)
    }
  },
    props:["moves"],
    mounted(){
      
    },
    watch:{
        moves:function(){
          
          if(this.moves.Moves){
            this.alllines = this.moves.Moves
            this.movesdata = this.moves.Moves[this.chossedline].Moves
            this.newpos = this.moves.StartingFen
            console.log(this.newpos)
          }
           
        },
        
    }
}
</script>

<style>

</style>