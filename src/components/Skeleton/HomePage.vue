<template>
	<div>
		<router-link to="/Stories/1">Stories</router-link>
		<tr></tr>
		<router-link to="/Marwan">Marwan Testing Page</router-link>
		<tr></tr>
		<router-link to="/CreateCourse">Create Course</router-link>
		<tr></tr>
		<router-link to="/Sadek">Sadek Testing Page</router-link>
		<tr></tr>
		<router-link to="/PostStory">Post Story</router-link>
		<tr></tr>
		<router-link to="/PostGame">Post Game</router-link>
		<tr></tr>
		<router-link style="color: white" to="/SignUp">Sign UP</router-link>
		<tr></tr>
		<router-link style="color: white" to="/Login">Login</router-link>
		<tr></tr>
		<button @click="Check">Check User Creditentials</button>
		<tr></tr>
		<div :style="TextColor">{{WelcomeEmail}}</div>
		<router-view></router-view>
	</div>
</template>

<script>
/*eslint-disable*/
import firebase from "firebase";
import StoryScrollingTab from "@/components/MarawanComponents/StoryScrolling/StoryScrollingTab.vue";
import ProfileCard from "@/components/SadekComponents/ProfileCard/ProfileCard.vue";
import NewsFeed from "@/components/SadekComponents/NewsFeed/NewsFeed.vue";
export default {
    data:function(){
      return{
		WelcomeEmail:"",
		TextColor:{
			color:"red"
		}
      }
    },
	methods:{
		Check()
		{
			let self = this;
			firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
			console.log("Current User Logged in is: ")
            console.log(user.email);
			console.log(user.uid);
			self.WelcomeEmail = "Welcome " + user.email;
			self.TextColor.color = "green";
				// User is signed in.
			} else {
				console.log("Bateee5")
				self.WelcomeEmail = "No account ... Please Go signup to create an account or login to an existing account"
				self.TextColor.color = "red";
		// No user is signed in.
			}
			});		
	}
	},
	mounted()
	{
		this.Check();
	}
};
</script>

<style scoped>
</style>
