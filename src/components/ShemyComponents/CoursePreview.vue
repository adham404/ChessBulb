<template>
<div>
    <div>This is a good course mate {{ CoursesID }}</div>
    <!-- DONE Create Div on the left that contain the following data properties (CourseData.CourseTitle) and (CourseData.Rating) (5min) -->
    <div style="border:1px solid #ccc">
    <div>CourseName: {{Courses.CourseName}}</div>
    <div>Rating: {{Courses.Rating}}</div>
    </div>
    <!-- DONE Create Div on the Right that contain the following data property (CourseData.CourseDescription) (5min) -->
    <div style="border:1px solid #ccc">
        {{Courses.Privileges}}
    </div>
    <!-- TODO Create under The Right Div a swaping DIV passed on v-if = data property (PurchaseFlag) (2min) -->
    <!-- TODO First Div When (PurchaseFlag) is true ... is text and button 'Purchase Course' when button is clicked (CourseData.ID) is passed and a router to [Purchase] is made (5min) -->
    <!-- TODO Second Div When (PurchaseFlag) is false ... is text and button 'Stream Course' when button is clicked (CourseData.ID) is passed and a router to [Streaming] is made (5min) -->
    <div style="border:1px solid #ccc">
        Price: {{Courses.Price}}
    </div>
    <!-- <router-link :to="{
        path:`/Purchase/${CoursesID}`,
        params:{CourseID: CoursesID}
    }">
        <button>Purchase Course</button>
    </router-link> -->
    <router-link  :to="{
        path:`/Courses/CourseStreaming/${CoursesID}`,
        params:{CourseID: CoursesID}
        }">
    <button >Stream Course</button>
    </router-link>
    <hr>
    <!-- DONE Right To the Left DIV put [AboutInstructor] and pass user id (5min)  -->
    <AboutInstructor></AboutInstructor>
    <!-- <component :ID="Courses.InstructorId" :is="AboutInstructor"></component> -->
    <hr>
    <!-- DONE Under the Left DIV put [Reviews] and pass (CourseData.ID) (5min) -->
    <Reviews></Reviews>
    <!-- DONE Under [Reviews] put [Rate] and pass Boolean Value (PreviewFlag) (5min) -->
    <RateCourse :CourseID="Courses.CourseId"></RateCourse>
</div>
  
</template>

<script>
import firebase from "firebase";
import { EventBus } from "../../main";
import AboutInstructor from "../ShemyComponents/AboutInstructor"
import Reviews from "../ShemyComponents/Reviews"
import RateCourse from "../ShemyComponents/RateCourse"
    //TODO Assign Data Properties in the vue data object which are (PurchaseFlag(B), CourseData(O), PreviewFlag(B)) (1min)
export default {
    data: function()
    {
        return{
            Courses:{},
            PurchaseFlag:false,
            AboutInstructor:"AboutInstructor"
        }
    },
    components:{
        AboutInstructor,
        Reviews,
        RateCourse
    },
    methods:{
        async RecieveCoursesData()
        {
            var id = this.CoursesID;
            let self = this;
            var db = firebase.firestore();  
            //DONE Recieve and assign (CourseData) from firebase using Passed Course ID returned from the props (10min)
            var docRef = db.collection("Courses").doc(id);
            let response = await docRef.get().then((query)=>{
                if(query.exists)
                {
                    self.Courses = query.data();
                    //Send Instructor ID to AboutInstructor component
                    EventBus.$emit("InstructorID",self.Courses.InstructorId);
                    //Send CourseID to Review and Rate component
                    EventBus.$emit("CourseIDToReview",self.Courses.CourseId);
                    EventBus.$emit("Rate",self.Courses.CourseId);
                    // EventBus.$emit("Streaming",self.Courses.CourseId);
                }
                else
                {
                    console.log("No Doc in here");
                }
            }).catch((error)=>{
                console.log("Error getting document: ", error);
            });
            console.log(response);
        }
    },
    props:["CoursesID"],
    //DONE Declare Mounted Property (1min)
    mounted(){
        this.RecieveCoursesData();
    }
    //FIXME Check For the (CourseData.ID) if it matches one of the courses ID inside the User Object using UserID (10min)
    //TODO If it's True set (PurchaseFlag) False else set True (2min)  
}
</script>

<style>
/* TODO Import Styling css (5min)  */

</style>





//TODO Estimated time to finish the component is 61min