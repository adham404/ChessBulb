//TODO add sure functional (10min)
//TODO uplaoad the video to firebase storge (10min)
//TODO disable closing the page and make all routes open in new window(20min)
//FIXME how to make routes open in new tab 
//TODO dispaly the est time for upload and the persanteg (12 min)
//TODO add the pgn file and the time samp objects to the firestore doc (10min)
//TODO add the video link and corse data in firebase storge(2min)
//TODO  show confirmation massage(2min)
<template>
  <div>
      <button @click="postcourse" ref="button">Post Course</button>
      <h2>{{uplaoading}}</h2>
  </div>
</template>

<script>
import {EventBus} from "@/main.js"
import firebase from "firebase"

var blob
var uploadTask
var data = {
    Academy : false,
    CourseId : null,
    CourseName : null,
    Difficulty : null,
    InstructorId : "testing",
    TimeStamps : null,
    Price : null ,
    PriceId : null ,
    privileges :null,
    Rating : 0,
    Video : null
};
export default {
    data(){
        return{
            uplaoading: "",
        }
    },
    mounted(){
        
        var button = this.$refs["button"] 
        button.disabled = true;
        EventBus.$on("StopRecording",()=>{
            button.disabled = false; 
        })
        EventBus.$on("newvideo",blobrecording=>{
            blob = blobrecording
            // blob = new File([blobrecording], "video.mp4",{type:"video/mp4", lastModified:new Date()})
            console.log(blob)
        })
        EventBus.$on("TimeStamp",timestamp =>{
            EventBus.$emit('gitTheForm')
            console.log("hi from uploading")
            console.log(timestamp)
            data.TimeStamps = timestamp
            
          
        })
        
        EventBus.$on("CourseForm",CourseForm =>{
            data.CourseName = CourseForm.name
            data.Difficulty = CourseForm.difficulty
            data.Price = CourseForm.price
            data.privileges = CourseForm.privileges
            console.log('post course hava the form')
        })
        },
        
    methods:{
        async postcourse(){
            var db = firebase.firestore()
            let self = this
            const res = await db.collection('Courses').add(data);
            var courseid = res.id
            var ref = await firebase.storage().ref().child(`Courses/${courseid}.mp4`);
            data.CourseId = courseid
            data.Video = `Courses/${courseid}.mp4`
            uploadTask = ref.put(blob)
            uploadTask.on('state_changed', function(snapshot){
                var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress.toFixed(0) + '% done');
                self.uplaoading = 'Upload is ' + progress.toFixed(0) + '% done' 
                 switch (snapshot.state) {
                    case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                    case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
                }
            }, function(error) {
                console.log(error)
            },async function(){
                await db.collection('Courses').doc(courseid).set(data);
                self.uplaoading = "DONE"
                console.log('uploading is done')
                    
                   
                }
            );
            
        }
    }


}
</script>

<style>

</style>