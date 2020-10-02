<template>
  <div>
      <div id="instructorheader">Instructor profile</div>
      <div id="instructorSignup">Don't have and account?<router-link to="/SignUp">SignUp.</router-link> </div>
      <div id="error">{{error}}</div>
      <div id="emailheader">Email</div>
      <input type="email" :class="errors.email" v-model="instructor.email">
      <div id="instructorinfo">A few word about yourself</div>
      <textarea :class="errors.info" id="w3review" v-model="instructor.info" name="w3review" rows="4" cols="50"></textarea>
      <div id="instructorphone">Phone number</div>
      <input :class="errors.phone" type="tel" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" v-model="instructor.phone"><br/>
      <input type="submit" @click="validate" value="Register as an instructor">
  </div>
</template>

<script>
import firebase from "firebase"
export default {
    data(){
        return{
            error: '',
           instructor :{
               email : '',
               info : '',
               phone: ''
           },
           loggedin : false ,
           errors : {
                email : 'ok',
                info : 'ok',
                phone : 'ok' ,
            },
            userid : null  
        }
    },
    mounted(){
        var user = firebase.auth().currentUser;
        
        if (user) {
        this.userid = user.uid
        this.error = ''
        // User is signed in.
        this.loggedin = true
        } else {
        this.loggedin = false
        this.error = "Please Login First"
        }
    },
    methods:{
        validate(){
            var go = 0 ;
            this.errors.email = (this.instructor.email.length >= 5 ) ? 'ok' :  'error' ; 
            this.errors.info = (this.instructor.info.length >= 5 ) ? 'ok' :  'error' ; 
            this.errors.phone = (this.instructor.phone.length >= 5 ) ? 'ok' :  'error' ; 
            console.log(this.errors)
            for(var i in this.errors){
                if(this.errors[i]== 'ok' ){
                    go += 1 
                }

            }
            if(go == 3 && this.loggedin ){
                this.submit()
            }   
        },
        async submit(){
            await firebase.firestore().collection('Users').doc(this.userid).update({
                Instructor : true,
                AboutInstructor : this.instructor.info,
                InstructorEmail : this.instructor.email,
                InstructorPhone : this.instructor.phone,
            })
        }        
    },

}
</script>

<style>
.error{
    border: red 2px solid;
}
.ok {
    border: white ;
}

</style>
//TODO create html inputs (10min) 
//TODO create data object (5min)
//TODO link the object to the ui(5min)
//TODO Validate the input (20min)
//TODO display errors(10min)
//TODO Verify phone number(15min)
//TODO save data in firebase firestore(5min)
//TODO