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
  //DONE assign Firebase (1min)
  import firebase from "firebase";
  // import { EventBus } from "../../main";
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
    //DONE Recieve Academy/CourseID from the router props (5min) 
    props:['CourseID'],
    methods:{
    //DONE define the function Submit (1min)
      Submit(){
        this.Review.CourseID = this.CourseID;
        //TODO Check for Current UserID with the CourseID inside the CourseOrders Table after it's added in purchase 
          if(this.UserPurchased)
          {
            //Post Review to FireStore
          //TODO Get UserID and assign User's First Name to (FirstName) and assign User's Last Name to (LastName) (10min)
          let self = this;
          var Db = firebase.firestore();
          var DbRef = Db.collection("Reviews");
          //FIXME Create ReviewID (10min)
          //DONE Send Data object (Review) to the Firestore (5min)
          DbRef.doc("123456777").set({
            AcademyId:"12345678",
            Comment: self.Review.Comment,
            CourseId: self.Review.CourseID,
            DateOfReview:"15 Sep 2020 at 11:11:43 UTC+2 ",
            FirstName:"Gustavo",
            LastName:"Fring",
            NumberOfStars: self.Review.Rate,
            ReviewId:"12345699",
            UserID:"12345699"
          })
          alert("Your Rate has been Posted Successfully thanks for your Feedback");
          this.Review.Comment="";
          this.Review.Rate = 0;
        }
        else{
          alert("You Should Purchase the Course in order to Submit your feedback and thanks!");
          this.Review.Comment="";
          this.Review.Rate = 0;
        }

        }
    }    
}
</script>

<style>
      /* TODO import Styling script from Documentation and Adjust the Component (5min) */

</style>

//TODO totall time to finish component is (90MIN)