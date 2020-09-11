<template>
  <div>
      <input placeholder="Enter your review" type="text">
      <!-- TODO Create container that Contain Input Field assigned to (RateComment) (2MIN) -->
      <!-- FIXME Create Star rating interface that assign number of Stars to (NumberOfStars) (10MIN) -->
      <!-- TODO Create Button 'Submit' which is assigned to the function {Submit} (2min) -->
  </div>
</template>

<script>
export default {
    //TODO Assign Data Properties in the vue data object which are (RateComment(S), NumberOfStars(I), DateOfReview(D), ContentRate(O)) (1min)
    //TODO assign Firebase (1min)
    //TODO assign EventBus (1min)
    //TODO When Mount Recieve (PreviewFlag) using router props if true Check for userID inside the Courses and if found proceed to submit Rating (10min)
    //TODO if not Pop up message indicating that user must be enrolled to submit his review (3min)
    //TODO define the function Submit (1min)
    //TODO Get UserID and assign User's First Name to (FirstName) and assign User's Last Name to (LastName) (10min)
    //FIXME Create ReviewID (10min)
    //TODO Recieve Academy/CourseID from the router props (5min) 
    //TODO set (RateComment, NumberOfStars, DateOfReview, FirstName, LastName, ReviewID, UserID, Academy/CourseID) to the object ContentRate (10min)
    //TODO Send Data object (ContentRate) to the Firestore (5min)
}
</script>

<style>
      /* TODO import Styling script from Documentation and Adjust the Component (5min) */

</style>

//TODO totall time to finish component is (90MIN)