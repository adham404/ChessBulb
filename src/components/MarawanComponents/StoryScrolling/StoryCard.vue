<template>
  <div style="width:8vw">
      
      <ChessBoardDisplay   :fen='startpos' :id='chessid' ></ChessBoardDisplay>
  </div>
</template>

<script>
import ChessBoardDisplay from "@/components/MarawanComponents/ChessBoard/ChessBoardDisplay"
export default {
    props:["startpos","chessid"],
    components:{
        ChessBoardDisplay
    },
    mounted(){
        console.log(this.startpos)
        console.log(this.chessid)
    }

}
</script>

<style scoped>


</style>