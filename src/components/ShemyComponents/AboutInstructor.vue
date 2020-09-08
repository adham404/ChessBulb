<template>
<div>
    <!-- TODO Create Basic HTML div template for About Instructor  -->
    <div>#Intstructor Photo</div>
    <!-- TODO Fill the div Template with Data Property that hold the content of Instructor (5min) -->
    <div>About Instructor: </div>
    <div>I am a good instructor and this is my id: {{ID}}</div>
</div>

</template>

<script>
//DONE Import Firebase(1min)
// import firebase from "firebase";
export default {
    data:function()
    {
        return{

        }
    },
    props:["ID"]
    //TODO Get Course ID from props value(2min)
    //TODO Create Function to Recieve and query the Course Instructor data according to it's ID(5min)
    //TODO Assign the returned value to the Data Property (1min)

}
</script>

<style>
/* TODO Import Styling css (1min)  */

</style>

//TODO Estimated time to finish the component is 15min