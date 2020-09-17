<template>
  <div>
    <div>Reviews and Ratings</div>
    <div v-for="Review in Reviews" v-bind:key="Review">
    <!-- FIXME Add Star rating system that takes the value (ContentRate.NumberOfStars) and turns them to NumberOfStars (10MIN) -->
    <!-- DONE Add container that contain (ContentRate.UserName) (ContentRate.ReviewDate) (2min)  -->
      <div>{{Review.FirstName}} {{Review.LastName}} | {{Review.DateOfReview}} | Rate: {{Review.NumberOfStars}}</div>
    <!-- DONE Add (ContentRate.RateComment) (3MIN) -->
      <div>{{Review.Comment}}</div>
      <hr>
    </div>
  </div>
</template>

<script>
//DONE assign Firebase (1min)
import firebase from "firebase";
import { EventBus } from "../../main";
export default {
    //DONE Assign Data Properties in the vue data object which are (ContentRate(O), Purchased(B)) (1min)
    data: function()
    {
      return{
        ReviewObject:"",
        Reviews:[]
      }
    },
    props:["CourseID"],
    mounted()
    {
      EventBus.$on("CourseIDToReview",(ID)=>{
        console.log("The Course ID of The following courses is: "+ ID);
        console.log("Holla")
      var db = firebase.firestore()
      let self = this;
      var DbRef = db.collection("Reviews").where("CourseId", "==", ID);
      DbRef
      .get()
      .then((query)=>{
        query.forEach((doc)=>{
        //DONE When Mount Recieve from the firestore the Review data object and assign it to (ContentRate) (10min) 
          self.Reviews.push(doc.data());
        })
      })
      .catch((error)=>{
        console.log("Error Getting Document "+ error);
      })
      })
    },
    methods:{
      // CreateReview()
      // {
      //   var db = firebase.firestore()
      //   var DbRef = db.collection("Reviews")
      //   DbRef.doc("12345699").set({
      //       AcademyId:"12345678",
      //       Comment:"Well the course works in a very basic way but i do hope that people will find it well functional for them",
      //       CourseId:"123456789",
      //       DateOfReview:"12 May 2020 at 02:02:02 UTC+2 ",
      //       FirstName:"Nacho",
      //       LastName:"Varga",
      //       NumberOfStars:3,
      //       ReviewId:"12345699",
      //       UserID:"12345699"
      //   })

      // }
    }
}
</script>

<style>
    /* TODO import Styling script from Documentation and Adjust the Component (5min) */

</style>

//TODO Total time to finish component (32MIN)