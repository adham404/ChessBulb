<template>
  <div>
  
   <router-link to="/LiveStreamer/hijYRNADIgvDhTgifgft" >LiveStreamer</router-link><br/>
   <router-link to="/LiveViewer/hijYRNADIgvDhTgifgft" >LiveViewer</router-link><br/>
   <router-link to="/InstructorRegistration" >Instructor Registration</router-link><br/>
   
   <router-link to="/AcademyForm" >Academy Form</router-link><br/>
  
   <button @click="addlive" >add live</button>
  </div>
</template>

<script>
// import ChessBoardInput from "@/components/MarawanComponents/ChessBoard/ChessBoardInput"
// import MovePreviewInput from "@/components/MarawanComponents/MovePreview/MovePreviewInput"
// import StoryHeader from "@/components/MarawanComponents/StoryScrolling/StoryDisplayheader"
// import StockFish from "@/components/MarawanComponents/StockFish.vue"
import {EventBus} from "@/main.js"
import firebase from "firebase"
export default {
  components:{
    // StoryHeader,
    // MovePreviewInput,
    // ChessBoardInput,
    // StockFish
  },
  data(){
    return{
      filters: true
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
  mounted(){
         setTimeout(() => {
      EventBus.$emit("Toggle", true);
    }, 100);
    EventBus.$on("Link", (link) => {
      this.$router.push({ path: link });
    });
  },
  destroyed(){
    EventBus.$emit("Toggle", false);
  }
  
    
  
  
};
</script>

<style>
div {
  color: white;
}
</style>
