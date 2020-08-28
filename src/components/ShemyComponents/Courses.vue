<template>
  <div>
      //TODO Create Courses Header Div That Includes [CreateCourse] [SearchEngine] [Filter] 5MIN
      //TODO Router link to [CreateCourse] when 'Create a Course' button is clicked 2MIN
      //TODO Create Div that loops over the (CoursesID) Array and pass (CoursesID) to [CourseCard] 5MIN 
      //TODO Router link to [AboutCourse] to each [CourseCard] 4MIN
  </div>
</template>

<script>
export default {
    //TODO Assign Data Properties in the vue data object which are ( CoursesID(A), CourseType(S), FilterationInput(A) ) 3min
    //TODO Assign EventBus (1min) 
    //TODO Assign Firebase (1min) 
    //TODO Declare Mounted Property (1min)
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