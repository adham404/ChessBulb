<template>
  <div>
      //TODO add [ChessBoard] to the left and pass (PGNMOVE) with Stock fish enabled (10min)
      //TODO add [VideoPlayer] to the right (5min)
      //TODO add Course Title under the [VideoPlayer] and pass (CourseData.ID) to it (4min)
      //TODO under the [VideoPlayer] add Div containing the property (CoursePGN) to show PGN Review under the Course Title containing (CourseData.Title) (5min)
      //TODO under the div showing the PGN review add two buttons at the end under the [PGNReview] and Assign it to the two Functions {DownloadPGN} and {RateTheCourse} that routes to [Rate] after passing to it the (CourseData.ID) (10min)
  </div>
</template>

<script>
export default {
    //TODO Assign Data Properties in the vue data object which are (CourseData(O), CoursePGN(O), PGNMove(S)) (1min)
    //TODO Assign EventBus (1min) 
    //TODO Assign Firebase (1min) 
    //TODO Declare Mounted Property (1min)
    //TODO Recieve and assign (CourseData) from firebase using Passed Course ID returned from the props (10min)
    //TODO Recieve Eventbus signal from [VideoPlayer] and assign it to (PGNMove) (5min) 
    //TODO Concatenate (PGNMOVE) and assign it to (CoursePGN)
    //TODO Define {DownloadPGN} (1min)
    //FIXME Download (CoursePGN) Locally to user's device (10min)    
}
</script>

<style>
  /* TODO import Styling script from Documentation and Adjust the Component (5min) */
</style>

//Total Time is 70min 