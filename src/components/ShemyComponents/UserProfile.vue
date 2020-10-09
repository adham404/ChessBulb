<template>
    <div>
        <!-- TODO ADD [Header] (2min)
        TODO ADD [Courses] and [Academies] to the right of [Header] pass the two boolean values as router props (AllAcademies = false) and (AllCourses = false) (5MIN)
        TODO Add [Notifications] under the the Upper Div  -->
        <div v-if="UserLogged" style="display:flex;">
        <Header></Header>
        <div>
            <button>My Courses</button>
            <button>Joined Academies</button>
        </div>
        </div>
        <div v-else>
            <div>User Not Logged in for his Data to be shown</div>
            <router-link to="/Login">
            <button>Login</button>            
            </router-link>
        </div>
        <Notifications></Notifications>
        <router-view></router-view>
    </div>
</template>

<script>
import firebase from "firebase"
import Header from "../ShemyComponents/Header";
import Notifications from "../ShemyComponents/Notifications";
    export default {
        data:function()
        {
            return{
                UserLogged:true,
                UserID:""
            }
        },
        mounted()
        {
            let self = this
        firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
            self.UserID = user.uid;
            self.UserLogged = true;
				// User is signed in.
			} else {
				console.log("No User Signed in")
		// No user is signed in.
			}

        })
        },
        components:{
            Header,
            Notifications
        }
    }
</script>

<style scoped>

</style>