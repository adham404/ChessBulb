<template>
  <div>
   <router-link to="/Purchase/price_1HVqJXC7X3YpNau36qSerzer" >CheckOut</router-link><br/>
   <router-link to="/Subscribe/price_1HWe12C7X3YpNau3GI4EWGwI" >Subscribe</router-link><br/>
   <router-link to="/InstructorRegistration" >Instructor Registration</router-link><br/>
   <router-link to="/profile/1/Courses" >My Courses</router-link><br/>
   <router-link to="/AcademyForm" >Academy Form</router-link><br/>
   <StoryHeader></StoryHeader>
   <ChessBoardInput id='ddd' ></ChessBoardInput>
   <MovePreviewInput startpos="3k4/2qrb3/8/8/8/8/2QRB3/3K4 w - - 0 1"></MovePreviewInput>
   <router-view></router-view>
   <StockFish></StockFish>
   <!-- <button @click="addlive" >add live</button> -->
  </div>
</template>

<script>
import ChessBoardInput from "@/components/MarawanComponents/ChessBoard/ChessBoardInput"
import MovePreviewInput from "@/components/MarawanComponents/MovePreview/MovePreviewInput"
import StoryHeader from "@/components/MarawanComponents/StoryScrolling/StoryDisplayheader"
import StockFish from "@/components/MarawanComponents/StockFish.vue"
import {EventBus} from "@/main.js"
// import firebase from "firebase"
export default {
  components:{
    StoryHeader,
    MovePreviewInput,
    ChessBoardInput,
    StockFish
  },
  data(){
    return{
      filters: true
    }
  },
  methods:{
    // async addlive(){
    //   var db = await firebase.firestore()
    //   await db.collection('Lives').add({
    //     name : "testlive",
    //     userid : "4587"
    //   });
    //   console.log('added')

    // }
    
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
