<template>
  <div>hi i am CreatedCourses 
      <div class="CourseList">
        <router-link v-for="(Course, i) in Courses" v-bind:key="i" :to="{
          path: `/Courses/CoursePreview/${Course.CourseId}`,
          params: {CoursesID: Course.CourseId}
          }"><CourseCard  :CourseName="Course.CourseName" :CourseRate="Course.Rating"></CourseCard>
        </router-link>

      </div>
  </div>
</template>

<script>
import firebase from "firebase";
import CourseCard from "@/components/ShemyComponents/CourseCard"
export default {
    components:{
        CourseCard
    },
    data(){
        return{
            userid : null,
            Courses :[],
        }
    },
    async mounted(){
        // var data ;
        let self = this
        firebase.auth().onAuthStateChanged(async function(user) {
            if (user) {
                self.userid = user.uid
                await firebase.firestore().collection('Courses').where('InstructorId', '==', user.uid).get().then((query)=>{
                    self.Courses.push(query.data())
                });
            } else {
                // No user is signed in. 
                console.log('No Created Courses')
            }
        });
         
        
    },
    methods:{

    },

}
</script>

<style>

</style>
//FIXME there is no flow chart because it is a vertion from anthor component
