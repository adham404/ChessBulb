<template>
<div>
    <!-- DONE Create Basic HTML div template for About Instructor  -->
    <div>#Intstructor Photo</div>
    <!-- DONE Fill the div Template with Data Property that hold the content of Instructor (5min) -->
    <div>About Instructor: {{AboutInstructor}} </div>
</div>

</template>

<script>
//DONE Import Firebase(1min)
import firebase from "firebase";
import {EventBus} from "../../main";
export default {
    data:function()
    {
        return{
            AboutInstructor:"",
        }
    },
    mounted(){
            //DONE Get Instructor ID from EventBus signal(2min)
            //Recieve Instructor ID using EventBus and use this ID to query through the Firestore doc inside the EventBus as Passing props doesn't work due to a synchronization problem 
            EventBus.$on("InstructorID", (ID)=>{
            console.log("Signal Recieved with an ID of " + ID);
            var db = firebase.firestore();
            var Dbref = db.collection("Users").doc(ID);
            Dbref.get().then((doc) => {
            if(doc.exists)
            {
                //DONE Assign the returned value to the Data Property (1min)
                this.AboutInstructor = doc.data().AboutInstructor;
            }
            else
            {
                console.log("No Doc in Her");
            }
            }).catch((error)=>{
            console.log("Some sort of an error: "+error);
        })
        })
    }

}
</script>

<style>
/* TODO Import Styling css (1min)  */

</style>

//TODO Estimated time to finish the component is 15min