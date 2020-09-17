<template>
  <div>
        <div>
    <div style="display :flex" >
      <ChessBoardInput id="1" />
      <div>
        <VideoRecording />
        <TimeStampsRecording/>
        <UploadPgn/>
        <PostCourse/>
      </div>
      
    </div>
    <CourseForm/>
    
  </div>
     
  </div>
</template>

<script>
import { EventBus } from "@/main.js";
import ChessBoardInput from "@/components/MarawanComponents/ChessBoard/ChessBoardInput.vue";
import VideoRecording from "@/components/MarawanComponents/VideoRecording.vue";
import UploadPgn from "@/components/MarawanComponents/UploadPgn.vue";
import PostCourse from "@/components/MarawanComponents/PostCourse.vue";
import CourseForm from "@/components/MarawanComponents/CourseForm.vue";
import TimeStampsRecording from "@/components/MarawanComponents/TimeStamps/TimeStampsRecording.vue";
export default {
  components: {
   
    ChessBoardInput,
    VideoRecording,
    TimeStampsRecording,
    UploadPgn,
    CourseForm,
    PostCourse
  },
  mounted() {
    setTimeout(() => {
      EventBus.$emit("Toggle", true);
    }, 100);
    EventBus.$on("Link", (link) => {
      this.$router.push({ path: link });
    });
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
}
</script>

<style>
  /* TODO import Styling script from Documentation and Adjust the Component (5min) */

</style>

//TODO finish component total time 53min



   <!-- TODO add [ChessBoard] to the left (2min) -->
        <!-- TODO add [VideoRecording] to the right (2min)  -->
        <!-- TODO add (CourseData.Title) under the [VideoRecording] (2min)  -->
        <!-- TODO add [PGNReview] under (CourseData.Title) (2min) -->
        <!-- TODO add Two buttons one of them 'Upload Pgn' the other is 'Post Course' (2min) -->
        <!-- TODO assign {UploadPgn} and {PostCourse} to the buttons (2min) -->