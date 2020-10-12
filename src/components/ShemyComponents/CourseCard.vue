<template>
  <div class="CourseCard"> 
    <div class="CourseData">
        <!-- //FIXME need to add shadows to component -->
        <h4 id="Instructor">Garry Kasparov</h4>
        <h4 id="CourseName">{{CourseName}}</h4>
        <div class="rating">
           <!-- <i v-if="rating >= 1" class="material-icons md-18">star</i> -->
           <svg v-if="CourseRate >= 1" xmlns="http://www.w3.org/2000/svg" width="15.751" height="15.113" viewBox="0 0 15.751 15.113">
            <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M8.016.489l-1.8,3.645L2.2,4.721a.881.881,0,0,0-.487,1.5L4.618,9.06,3.93,13.065a.88.88,0,0,0,1.277.928l3.6-1.891,3.6,1.891a.881.881,0,0,0,1.277-.928L12.993,9.06,15.9,6.224a.881.881,0,0,0-.487-1.5l-4.022-.586L9.6.489A.882.882,0,0,0,8.016.489Z" transform="translate(-0.93 0.501)" stroke="#000" stroke-width="1"/>
           </svg>
           <svg v-if="CourseRate >= 2" xmlns="http://www.w3.org/2000/svg" width="15.751" height="15.113" viewBox="0 0 15.751 15.113">
            <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M8.016.489l-1.8,3.645L2.2,4.721a.881.881,0,0,0-.487,1.5L4.618,9.06,3.93,13.065a.88.88,0,0,0,1.277.928l3.6-1.891,3.6,1.891a.881.881,0,0,0,1.277-.928L12.993,9.06,15.9,6.224a.881.881,0,0,0-.487-1.5l-4.022-.586L9.6.489A.882.882,0,0,0,8.016.489Z" transform="translate(-0.93 0.501)" stroke="#000" stroke-width="1"/>
           </svg>
           <svg v-if="CourseRate >= 3" xmlns="http://www.w3.org/2000/svg" width="15.751" height="15.113" viewBox="0 0 15.751 15.113">
            <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M8.016.489l-1.8,3.645L2.2,4.721a.881.881,0,0,0-.487,1.5L4.618,9.06,3.93,13.065a.88.88,0,0,0,1.277.928l3.6-1.891,3.6,1.891a.881.881,0,0,0,1.277-.928L12.993,9.06,15.9,6.224a.881.881,0,0,0-.487-1.5l-4.022-.586L9.6.489A.882.882,0,0,0,8.016.489Z" transform="translate(-0.93 0.501)" stroke="#000" stroke-width="1"/>
           </svg>
           <svg v-if="CourseRate >= 4" xmlns="http://www.w3.org/2000/svg" width="15.751" height="15.113" viewBox="0 0 15.751 15.113">
            <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M8.016.489l-1.8,3.645L2.2,4.721a.881.881,0,0,0-.487,1.5L4.618,9.06,3.93,13.065a.88.88,0,0,0,1.277.928l3.6-1.891,3.6,1.891a.881.881,0,0,0,1.277-.928L12.993,9.06,15.9,6.224a.881.881,0,0,0-.487-1.5l-4.022-.586L9.6.489A.882.882,0,0,0,8.016.489Z" transform="translate(-0.93 0.501)" stroke="#000" stroke-width="1"/>
           </svg>
           <svg v-if="CourseRate >= 5" xmlns="http://www.w3.org/2000/svg" width="15.751" height="15.113" viewBox="0 0 15.751 15.113">
            <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M8.016.489l-1.8,3.645L2.2,4.721a.881.881,0,0,0-.487,1.5L4.618,9.06,3.93,13.065a.88.88,0,0,0,1.277.928l3.6-1.891,3.6,1.891a.881.881,0,0,0,1.277-.928L12.993,9.06,15.9,6.224a.881.881,0,0,0-.487-1.5l-4.022-.586L9.6.489A.882.882,0,0,0,8.016.489Z" transform="translate(-0.93 0.501)" stroke="#000" stroke-width="1"/>
           </svg>
           
        </div>
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

<style scoped src="@/assets/CSS/CourseCard.css">
  /* TODO import Styling script from Documentation and Adjust the Component (5min) */

</style>

//Total Time 34Min