<template>
  <div style="border: 1px solid #ccc">
      <!-- TODO Create container that Contain Input Field assigned to (RateComment) (2MIN) -->
      <input v-model="Review.Comment" placeholder="Enter your review" type="text">
      <!-- FIXME Create Star rating interface that assign number of Stars to (NumberOfStars) (10MIN) -->
      <div>Select Rate: 
        <select v-model="Review.Rate">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
      <!-- TODO Create Button 'Submit' which is assigned to the function {Submit} (2min) -->
      <button @click="Submit">Submit</button>
  </div>

</template>
<script>
  import firebase from "firebase";
  import { EventBus } from "../../main";
export default {
    //TODO Assign Data Properties in the vue data object which are (RateComment(S), NumberOfStars(I), DateOfReview(D), ContentRate(O)) (1min)
    data:function(){
      return{
        Review:{
          Comment:"",
          Rate:0,
          CourseID:""
        },
        UserPurchased:true
      }
    },
    methods:{
      Submit(){
        console.log("The User's Review is");
        console.log("Comment: "+ this.Review.Comment);
        console.log("The User's Rate is");
        console.log("Rate: "+ this.Review.Rate);
        EventBus.$on("Rate",(ID)=>{
          console.log("ID is: "+ ID);
          this.Review.CourseID = ID
          if(this.UserPurchased)
          {
            //Post Review to FireStore
          var Db = firebase.firestore();
          var DbRef = Db.collection("Reviews");
          DbRef.doc("123456777").set({
            AcademyId:"12345678",
            Comment:this.Review.Comment,
            CourseId:this.Review.CourseID,
            DateOfReview:"15 Sep 2020 at 11:11:43 UTC+2 ",
            FirstName:"Gustavo",
            LastName:"Fring",
            NumberOfStars:this.Review.Rate,
            ReviewId:"12345699",
            UserID:"12345699"
          })
        }
        })
        }
    }    
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