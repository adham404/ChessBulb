<template>
  <div>
      <!-- TODO Create Courses Header Div That Includes [CreateCourse] [SearchEngine] [Filter] 5MIN -->
      <div style="display: flex">
      <!-- DONE Router link to [CreateCourse] when 'Create a Course' button is clicked 2MIN -->
        <router-link to="/CreateCourse">
        <button>Create Course</button>
        </router-link>
        <input type="text" placeholder="Search Engine">
        <FilterSearch></FilterSearch>
      </div>
      <div style="margin-top:2%; display:flex">
        <router-link v-for="Course in Courses" v-bind:key="Course" :to="{
          path: `/Courses/${Course.CourseId}/CoursePreview`
          }"><component :is="ComponentName" :CourseName="Course.CourseName" :CourseRate="Course.Rating"></component>
        </router-link>

      </div>
      <!-- TODO Create Div that loops over the (CoursesID) Array and pass (CoursesID) to [CourseCard] 5MIN  -->
      <!-- TODO Router link to [CoursePreview] to each [CourseCard] and pass CourseID using Router props 4MIN -->
  </div>
</template>

<script>
import CourseCard from "../ShemyComponents/CourseCard";
import FilterSearch from "../ShemyComponents/FilterSearch";
//DONE Assign Firebase (1min) 
import firebase from "firebase";
export default {
    //TODO Assign Data Properties in the vue data object which are ( CoursesID(A), CourseType(S), FilterationInput(A) ) 3min
    data: function()
    {
      return {
        ComponentName: "CourseCard",
        FilterComponent: "FilterSearch",
        Courses:[]
      }
    },
    components:{
      CourseCard,
      FilterSearch
    },
  //DONE Declare Mounted Property (1min)
    mounted()
    {
      let self = this;
      var db = firebase.firestore();
      var docRef = db.collection("Courses");
      docRef.get().then((query)=>{
        query.forEach((doc) => {
          self.Courses.push(doc.data());
        });
      });
      // for(let ball of self.Courses)
      // {
      //   console.log(ball)
      // }
      // console.log(self.Courses);
      // self.Courses.forEach((X) => {
      //   console.log("First Document is: ")
      //   console.log(X);
      // })
    }
    //TODO Assign EventBus (1min) 
    //TODO Recieve (CourseType) Data property using EventBus signal from [Homepage] and [Profile] (3min)
    //TODO Recieve Course name using EventBus signal from [SearchEngine] and assign it to (FilterationInput[0]) (2min)
    //TODO Recieve Difficulty level using EventBus signal from [Filter] and assign it to (FilterationInput[1]) (2min)     
    //FIXME Create Firebase cloud function {FindCourseIconID} that  takes Two parameters .. the first parameter is the (CourseType) the second parameter is (FilterationInput[]) and recieve the filtered courses IDs and assign it to (CoursesID) 30min      
}
</script>

<style>
  /* TODO import Styling script from Documentation and Adjust the Component (5min) */
</style>

//Total Time 64Min