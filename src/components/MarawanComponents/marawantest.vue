<template>
  <div>
      <h1>Welcome to Marwan Testing Page</h1>
      <p> if your name is Shemy please leave the page </p>
      <DescriptionHeader/>
      <ChessBoardInput id="1" />
      <StockFish />
  </div>
</template>

<script>
import StockFish from '@/components/MarawanComponents/StockFish.vue'
import DescriptionHeader from '@/components/MarawanComponents/DescriptionHeader.vue'
import ChessBoardInput from '@/components/MarawanComponents/ChessBoard/ChessBoardInput.vue'
import {EventBus} from "@/main.js"

export default {
    components:{
        StockFish,
        ChessBoardInput,
        DescriptionHeader
    },
    mounted(){
       
        EventBus.$emit('DescriptionHeader',{img1:"https://preview.redd.it/r8xmzw56rhh41.jpg?auto=webp&s=46cd0cec9e3bcc9b859194fe6a264d06e437493a",bio1:'this is the bio of the description header'})
    },
    methods:{
        
    }

}
</script>

<style>
div{
    color: white;
}

</style>