<template>
  <div>
      <h1>Welcome to Marwan Testing Page</h1>
      <p> if your name is Shemy please leave the page </p>
      
      <ChessBoardInput id="1" />
      <StockFish />
  </div>
</template>

<script>
import StockFish from '@/components/MarawanComponents/StockFish.vue'
import ChessBoardInput from '@/components/MarawanComponents/ChessBoard/ChessBoardInput.vue'


export default {
    components:{
        StockFish,
        ChessBoardInput
    },

}
</script>

<style>
div{
    color: white;
}

</style>