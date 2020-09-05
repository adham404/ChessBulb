<template>
  <div>
        <div style="border:1px solid #ccc">
        <!-- TODO Create Div with a background image of Template image which Diplay the Following Properties (CourseData.CourseTitle) and (CourseData.Rating) (5MIN) -->
          <div>#CourseIMG</div>
          <!-- <div>Test Name</div> -->
          <div>{{CourseName}}</div>
        <!-- FIXME Show Star Rating according to the Rating Number ................. Search for Star ratings plugins in js (10min) -->
          <!-- <div>Test Price</div> -->
          <div> Rate: {{CourseRate}}</div>
        </div>
  </div>
</template>

<script>
export default {
    //TODO Assign Data Properties in the vue data object which are (CourseData(O)) (1min)
    data: function()
    {
      return{

      }
    },
    props:[
      "CourseRate",
      "CourseName"
    ]
    //TODO Assign EventBus (1min) 
    //TODO Assign Firebase (1min) 
    //TODO Declare Mounted Property (1min)
    //TODO Recieve and assign (CourseData) from firebase using Passed Course ID returned from the props (10min) 
}
</script>

<style>
  /* TODO import Styling script from Documentation and Adjust the Component (5min) */

</style>

//Total Time 34Min