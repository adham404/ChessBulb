<template>
	<div>
		<router-link to="/Stories">Stories</router-link>
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
		<router-link style="color: white" :to="{
			path: `/profile/${UserID}`
			}">User Profile</router-link>
		<tr></tr>		
		<button @click="Check">Check User Creditentials</button>
		<tr></tr>
		<div :style="TextColor">{{WelcomeEmail}}</div>
		<!-- <button @click="CreateFollower">Create Followers Doc For all Users idiot</button> -->
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
		},
		UserID:""
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
			self.UserID = user.uid;
			self.WelcomeEmail = "Welcome " + user.email;
			self.TextColor.color = "green";
				// User is signed in.
			} else {
				console.log("Bateee5")
				self.UserID = "";
				self.WelcomeEmail = "No account ... Please Go signup to create an account or login to an existing account"
				self.TextColor.color = "red";
		// No user is signed in.
			}
			});		
	},
	// async CreateFollower()
	// {
	// 	let self = this;
    //     // await firebase.auth().onAuthStateChanged(async function(user) {
    //     //     if (user) {
    //     //         self.UserID = user.uid;
    //     //                         // User is signed in.
    //     //     } else {
    //     //         console.log("No User Signed in")
    //     //             // No user is signed in.
    //     //         }
	// 	// 	})
	// 	var db = firebase.firestore();
	// 	var DBref = db.collection("Users");
	// 	DBref.get().then((query) => {
	// 		query.forEach((userdata)=> {
	// 			var DBref2 = db.collection("Follows");
	// 			DBref2.doc(userdata.data().UserId).set({
	// 				Followers:[],
	// 				Following:[],
	// 				UserID: userdata.data().UserId	
	// 			})
	// 		})
	// 	}).catch((error) => {
	// 		console.log("Error catching doc: "+ error);
	// 	})
	 },
	mounted()
	{
		this.Check();
	}
}

</script>

<style scoped>
</style>
