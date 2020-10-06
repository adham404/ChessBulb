<template>
	<div>
		<img class="ProfileImage" src="../../../assets/ProfilePic.jpg" alt="">
		<h1 class="PlayerName">Player's Name</h1>
		<h4 :style="TextColor">Email: {{email}}</h4>
		<h3 class="Links">My Profile</h3>
		<h3 class="Links">Joined Academies</h3>
		<h3 class="Links">Purchased Courses</h3>
		<h3 class="Links">My Posts</h3>
	</div>
</template>

<script>
import firebase from "firebase"
export default {
    data:function(){
      return{
      email:"",
      TextColor:{
       color:"red"
      },
	}
	},
	mounted()
	{
	let self = this;
	firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
	console.log("Current User Logged in is: ")
	console.log(user.email);
	console.log(user.uid);
	// self.UserID = user.uid;
	self.email = user.email;
	self.TextColor.color = "green";
		// User is signed in.
	} else {
		console.log("Bateee5")
		// self.UserID = "";
		self.email = "No Email Here"
		self.TextColor.color = "red";
		// No user is signed in.
	}
	});		
		
	}
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
	}
</style> 
