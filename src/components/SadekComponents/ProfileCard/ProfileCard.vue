<template>
	<div>
		<img class="ProfileImage" src="../../../assets/ProfilePic.jpg" alt="">
		<h1 class="PlayerName">{{UserName}}</h1>
		<h4 :style="TextColor">Email: {{email}}</h4>
		<router-link
		class="Links"
			:to="{
				path: `/profile/${UserId}`,
			}"
			><h3 >Pofile</h3></router-link
		>
		<router-link
		class="Links"
			:to="{
				name: 'UserCourses',
				params: { allCourses: false },
			}"
			><h3 >My Courses</h3></router-link
		>
		<router-link
		class="Links"
			:to="{
				name: 'UserAcademies',
				params: { allAcademies: false },
			}"
			><h3>Joined Academies</h3></router-link
		>
		<h3 class="Links">Purchased Courses</h3>
		<h3 class="Links">My Posts</h3>
		<!-- <router-link class="Links" ><h3>Purchased Courses</h3></router-link>
		<router-link class="Links"><h3>My Posts</h3></router-link> -->
		<router-link class="Links" to="Explore"><h3>Find Players</h3></router-link>
	</div>
</template>

<script>
import firebase from "firebase"
export default {
	name: "ProfileCard",
	props: ["User"],
	data() {
		return {
			email:"",
			UserId:"",
			UserName:"",
			TextColor:{
    color:"red"
    },
		}
	},
	mounted() {
		let self = this;
	firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
	console.log("Current User Logged in is: ")
	console.log(user.email);
	console.log(user.uid);
	// self.UserID = user.uid;
	self.email = user.email;
	self.TextColor.color = "green";
	self.UserId = user.uid
		// User is signed in.
	} else {
		console.log("Bateee5")
		// self.UserID = "";
		self.email = "No Email Here"
		self.TextColor.color = "red";
		// No user is signed in.
	}
	});	
	firebase
			.firestore()
			.collection("Users")
			.where("UserId", "==", `${this.UserId}`)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc)=>{
				self.UserName = doc.data().FirstName;
				})
				
			});	
	},
};
</script>

<style scoped>
.ProfileImage{
		height: 120px;
		width: 120px;
		border-radius: 5px;
	}
	.PlayerName{
		font-family: 'Raleway', sans-serif;
		font-size: 1.3rem;
		font-weight: bold;
		margin-bottom: 5px;
	}
	.Links{
		font-family: 'Open Sans', sans-serif;
		font-size: 1rem;
		margin-top: 0px;
		margin-bottom: 0px;
		font-weight: lighter;
		color: white;
		text-decoration: none;
	}
	/* .Links:visited{
		color: inherit;
	} */
	</style> 
//TODO Expected Time (31 minutes)