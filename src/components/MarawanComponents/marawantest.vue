<template>
  <div style="width:100%">
  
  <SmallChess/>
  <SmallChessPreview/>  
  </div>
</template>

<script>
import SmallChess from "@/components/MarawanComponents/ChessCommentandLive/Live/SmallChessType.vue"
import SmallChessPreview from "@/components/MarawanComponents/ChessCommentandLive/Live/SmallChessPreview.vue"
// import ChessBoardInput from "@/components/MarawanComponents/ChessBoard/ChessBoardInput"
// import MovePreviewInput from "@/components/MarawanComponents/MovePreview/MovePreviewInput"
// import StoryDisplayheader from "@/components/MarawanComponents/StoryScrolling/StoryDisplayheader"
// import StockFish from "@/components/MarawanComponents/StockFish.vue"
// import {EventBus} from "@/main.js"
import firebase from "firebase"
// import StockFish from './StockFish.vue';
export default {
  components:{
    SmallChess,
    SmallChessPreview
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
    async addlive(){
      var db = await firebase.firestore()
      await db.collection('Lives').add({
        AcademyId : "f0oTA57O4GxJOpdWV29I",
        LiveDate : Date.now().toString() ,
        LiveDescription : "This is the First live in ChessBulb",
        // LiveId : "4587",
        LiveTitle : "Learn Chess Now",
      });
      console.log('added')

    }
    
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
