<template>
  <div>
    <div>Reviews and Ratings</div>
    <!-- TODO Add container that contain (ContentRate.UserName) (ContentRate.ReviewDate) (2min)  -->
    <!-- <button @click="CreateReview">Create Review</button> -->
    <!-- FIXME Add Star rating system that takes the value (ContentRate.NumberOfStars) and turns them to NumberOfStars (10MIN) -->
    <!-- TODO Add (ContentRate.RateComment) (3MIN) -->
  </div>
</template>

<script>
import firebase from "firebase";
export default {
    //TODO Assign Data Properties in the vue data object which are (ContentRate(O), Purchased(B)) (1min)
    data: function()
    {
      return{
        Reviews:[
          {
            FirstName:"",
            LastName:"",
            Review:"",
            Rate:""
          }
        ]
      }
    },
    props:["CourseID"],
    mounted()
    {
      var db = firebase.firestore()
      var DbRef = db.collection("Reviews").where("CourseId", "==", this.CourseID)
      .get()
      .then((query)=>{
        query.forEach((doc)=>{
          this.Reviews.push(doc.data());
          console.log("The ID of this Review is "+ this.Reviews.ReviewId);
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
    //TODO assign Firebase (1min)
    //TODO When Mount Recieve from the firestore the Review data object and assign it to (ContentRate) (10min) 
}
</script>

<style>
    /* TODO import Styling script from Documentation and Adjust the Component (5min) */

</style>

//TODO Total time to finish component (32MIN)