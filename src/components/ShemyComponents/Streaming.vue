<template>
  <div style="display:flex;" >
      <!-- DONE add [ChessBoard] to the left (10min) -->
      <ChessBoardDisplay id='1' />
      <!-- DONE add [VideoPlayer] to the right (5min) -->
      <div>
      <VideoPlayer :VID="CourseID" />
      </div>
  </div>
</template>

<script>
import ChessBoardDisplay from "../MarawanComponents/ChessBoard/ChessBoardDisplay";
import VideoPlayer from "../ShemyComponents/VideoPlayer";
export default {
    props:["CourseID"],
    components:{
      ChessBoardDisplay,
      VideoPlayer
    }
    //DONE Recieve CourseID from props and pass it to VideoPlayer using props
}
</script>

<style>
  /* TODO import Styling script from Documentation and Adjust the Component (5min) */
</style>

//Total Time is 70min 