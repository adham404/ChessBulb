<template>
  <div style="width:100%">
  
   <router-link to="/LiveStreamer/kMWEHAaf7z1BY6AlpeUC" >LiveStreamer</router-link><br/>
   <router-link to="/LiveViewer/kMWEHAaf7z1BY6AlpeUC" >LiveViewer</router-link><br/>
   <router-link to="/InstructorRegistration" >Instructor Registration</router-link><br/>
   
   <router-link to="/AcademyForm" >Academy Form</router-link><br/>
  
   <storypuzzel style="width:100%" v-if="movess" :moves='movess' />
  </div>
</template>

<script>
// import ChessBoardInput from "@/components/MarawanComponents/ChessBoard/ChessBoardInput"
// import MovePreviewInput from "@/components/MarawanComponents/MovePreview/MovePreviewInput"
import storypuzzel from "@/components/MarawanComponents/StoryScrolling/storypuzzel"
// import StockFish from "@/components/MarawanComponents/StockFish.vue"
import {EventBus} from "@/main.js"
import firebase from "firebase"
export default {
  components:{
    storypuzzel
    // StoryHeader,
    // MovePreviewInput,
    // ChessBoardInput,
    // StockFish
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
    var data = await firebase.firestore().collection('ChessStories').doc('u64MSwDqiNTwUF1tuSvm').get()
    this.movess = data.data()
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

<style scoped>
div {
  color: white;
}
</style>
