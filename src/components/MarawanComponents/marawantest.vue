<template>
  <div style="width:100%">
  <h1>Marwan Page</h1>
  <!-- <SmallChess/>
  <SmallChessPreview/>   -->
  <Testing/>
  </div>
</template>

<script>
// import SmallChess from "@/components/MarawanComponents/ChessCommentandLive/Live/SmallChessType.vue"
// import SmallChessPreview from "@/components/MarawanComponents/ChessCommentandLive/Live/SmallChessPreview.vue"
// import ChessBoardInput from "@/components/MarawanComponents/ChessBoard/ChessBoardInput"
// import MovePreviewInput from "@/components/MarawanComponents/MovePreview/MovePreviewInput"
// import StoryDisplayheader from "@/components/MarawanComponents/StoryScrolling/StoryDisplayheader"
// import StockFish from "@/components/MarawanComponents/StockFish.vue"
// import {EventBus} from "@/main.js"
// import firebase from "firebase"
// import StockFish from './StockFish.vue';
import Testing from "@/components/MarawanComponents/Analysis/Testing.vue"
export default {
  components:{
    Testing,
    // SmallChess,
    // SmallChessPreview
    // StoryHeader,
    // MovePreviewInput,
    // ChessBoardInput,
    // StockFish,
    
  },
  data(){
    return{
      filters: true,
      movess : null
    }
  },
  methods:{
    

    
    
  },
  async mounted(){
    // var data = await firebase.firestore().collection('ChessStories').doc('u64MSwDqiNTwUF1tuSvm').get()
    // this.movess = data.data()
    //      setTimeout(() => {
    //   EventBus.$emit("Toggle", true);
    // }, 100);
    // EventBus.$on("Link", (link) => {
    //   this.$router.push({ path: link });
    // });
  },
  destroyed(){
    // EventBus.$emit("Toggle", false);
  }
  
    
  
  
};
</script>

<style scoped>
div {
  color: white;
}
</style>
