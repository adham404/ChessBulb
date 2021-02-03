<template>
  <div class="Productive">
    <CourseForm  />
    <!-- <div    v-if="!form" > -->

    <div v-if="Mounted " class="ChessBoard">
      <ChessBoardInput id="1" />
    </div>
    <div  class="CourseStream">
      <div class="VideoPlayer">
        <VideoRecording />
      </div>
      <div class="CourseData">
        <TimeStampsRecording class="TimeStamps" />
        <StockFish />
      </div>
      <UploadPgn />
      <PostCourse />
    </div>
    <!-- </div> -->
  </div>
</template>

<script>
/*eslint-disable*/
import { EventBus } from "@/main.js";
import StockFish from "@/components/MarawanComponents/StockFish.vue"
import ChessBoardInput from "../ChessBoardPointer.vue"
import VideoRecording from "./VideoRecording.vue";
import UploadPgn from "./UploadPgn.vue";
import PostCourse from "./PostCourse.vue";
import CourseForm from "./CourseForm.vue";
import TimeStampsRecording from "./TimeStamps/TimeStampsRecording.vue";
export default {
  data(){
    return{
      form:true,
      Mounted: false,
    }
  },
  components: {
    ChessBoardInput,
    VideoRecording,
    TimeStampsRecording,
    UploadPgn,
    CourseForm,
    PostCourse,
    StockFish
  },
  
  mounted() {
    setTimeout(() => {this.Mounted = true}, 200)
    this.form = true
    var formdata ;
    setTimeout(() => {
      EventBus.$emit("Toggle", true);
    }, 100);
    EventBus.$on("Link", (link) => {
      this.$router.push({ path: link });
    });
    EventBus.$on("CourseForm", (data) => {
      formdata = data
      this.form = false
    });
    EventBus.$on('gitTheForm',()=>{
      console.log('we want the form ')
      EventBus.$emit('CourseForm',formdata)
    })
  },
  methods: {},
  destroyed() {
    EventBus.$emit("Toggle", false);
  },
  //TODO Assign Data Properties in the vue data object which are (CourseData(O), ChessPGN(s)) (2min)
  //TODO define UploadPgn function (1min)
  //FIXME Upload PGN file from the user's internal storage and validate it and assign it to (ChessPGN) and send it to [ChessBoard] (20min)
  //TODO define PostCourse function (1min)
  //TODO Upload Fen object with timestamp to cloud firestore and Upload Course Video to Cloud Storage (10min)
};
</script>

<style scoped>
p{
  margin: 5px 0px 5px 10px;
  font-family: 'QuickSand', sans-serif;
  font-weight: bold;
  color: black;
}
#SmallHeader{
  border-bottom: 3px solid white;
  font-size: 1.3rem;
}
h2{
  margin: 2px 0px 10px 2px;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  color: black;
  font-size: 1.7rem;
}
.Productive{
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: white;
}
.ChessBoard{ 
  padding-top: 2px;
  padding-left: 3px; 
  width: 50.6%;
  /* background-color: tomato; */
  background-color:  #00112c;
}
.CourseStream{
  display: flex;
  flex-direction: column;
  width: 49.4%;
  /* background-color: turquoise; */
}
.VideoPlayer{
  height: 55%;
  /* background-color:violet; */
  /* border-bottom: 3px solid grey; */
}
.CourseData{
  display: flex;
  height: 40%;
  width: 100%;
  /* background-color: yellowgreen; */
}
.TimeStamps{
  width: 50%;
  background-color:#1DACA8 ;
  border-radius: 10px;
  /* background-color: aqua; */
}
.ChessEngine{
  width: 50%;
  background-color:#0487af;
  border-radius: 10px;
  /* background-color: blueviolet; */
}
</style>

//TODO finish component total time 53min

<!-- TODO add [ChessBoard] to the left (2min) -->
<!-- TODO add [VideoRecording] to the right (2min)  -->
<!-- TODO add (CourseData.Title) under the [VideoRecording] (2min)  -->
<!-- TODO add [PGNReview] under (CourseData.Title) (2min) -->
<!-- TODO add Two buttons one of them 'Upload Pgn' the other is 'Post Course' (2min) -->
<!-- TODO assign {UploadPgn} and {PostCourse} to the buttons (2min) -->
