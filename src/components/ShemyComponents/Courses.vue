<template>
  <div class="Courses">
      <!-- DONE Create Courses Header Div That Includes [CreateCourse] [SearchEngine] [Filter] 5MIN -->
      <div class = "CoursesNav" >
      <!-- DONE Router link to [CreateCourse] when 'Create a Course' button is clicked 2MIN -->
        <router-link to="/CreateCourse">
        <button>Create Course</button>
        </router-link>
        <button @click="TestC">Test Cloud Function</button>
        <SearchEngine SearchIndex="Courses" :ShowFilters="true"></SearchEngine>
        <!-- <input type="text" placeholder="Search Engine">
        <FilterSearch></FilterSearch> -->
      </div>
      <div class="CourseList">
      <!-- DONE Create Div that loops over the (CoursesID) Array and pass (CoursesID) to [CourseCard] 5MIN  -->
      <!-- DONE Router link to [CoursePreview] to each [CourseCard] and pass CourseID using Router props 4MIN -->
        <router-link v-for="Course in Courses" v-bind:key="Course" :to="{
          path: `/Courses/CoursePreview/${Course.CourseId}`,
          
          }"><component class="ListRow" :is="ComponentName" :CourseName="Course.CourseName" :CourseRate="Course.Rating" :CourseId = "Course.CourseId"></component>
        </router-link>
      </div>
  </div>
</template>

<script>
import CourseCard from "../ShemyComponents/CourseCard";
import FilterSearch from "../ShemyComponents/FilterSearch";
import SearchEngine from "../MarawanComponents/SearchEngine/SearchEngine";
//DONE Assign Firebase (1min) 
import firebase from "firebase";
import { EventBus } from '../../main';
export default {
    //TODO Assign Data Properties in the vue data object which are ( Courses(A), FilterationInput(A) ) 3min
    data: function()
    {
      return {
        ComponentName: "CourseCard",
        Courses:[],
      }
    },
    components:{
      CourseCard,
      FilterSearch,
      SearchEngine
    },
    methods:{
      async RecieveCoursesID()
      {
        // let self = this;
        var db = firebase.firestore();
        var docRef =  db.collection("Courses");
        for (let i = 0; i < this.CourseID.length; i++) {          
            await docRef.doc(this.CourseID[i]).get().then((query) => {
              this.Courses.push(query.data());
            })
        }
      },
      TestC()
      {
        var data = {
          Email:"TestCloud@gmail.com",
          FirstName:"Test",
          LastName:"Cloud",
          id:"1234333",
        }
        const Test = firebase.functions().httpsCallable('CreateDocs-CreateDocs');
        Test(data).then(result => {
          console.log('data is: ', result.data);
        }).catch(error => {
          console.log('Error is ',error);
        }) 
      }
    },
  //DONE Declare Mounted Property (1min)
    async mounted()
    {
      EventBus.$on("TheSearchResult", res => {
          this.Courses = [];
          this.CourseID = res;
          this.RecieveCoursesID();
      })      
    }
    //TODO Assign EventBus (1min) 
    //TODO According to the props recieved Indicate Whether it's Courses from Homepage, Profile or Academies
    //TODO Recieve Course name using EventBus signal from [SearchEngine] and assign it to (FilterationInput[0]) (2min)
    //TODO Recieve Difficulty level using EventBus signal from [Filter] and assign it to (FilterationInput[1]) (2min)     
    //FIXME Create Firebase cloud function {FindCourseIconID} that  takes Two parameters .. the first parameter is the (CourseType) the second parameter is (FilterationInput[]) and recieve the filtered courses IDs and assign it to (CoursesID) 30min      
}

</script>

<style scoped src="@/assets/CSS/Courses.css">
  /* TODO import Styling script from Documentation and Adjust the Component (5min) */
</style>

//Total Time 64Min