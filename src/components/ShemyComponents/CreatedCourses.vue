<template>
  <div> 
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
                var db = firebase.firestore();
                var DBref = db.collection('Courses').where('InstructorId', '==', user.uid)
                DBref.get().then((query) => {
                    query.forEach((doc) => {
                        self.Courses.push(doc.data());
                    })
                })
                // await firebase.firestore().collection('Courses').where('InstructorId', '==', user.uid).get().then((query)=>{
                // });
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

<style scoped src="@/assets/CSS/Courses.css">

</style>
//FIXME there is no flow chart because it is a vertion from anthor component
