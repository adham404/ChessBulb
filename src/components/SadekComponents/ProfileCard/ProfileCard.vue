<template>
	<div>
		<img class="ProfileImage" :src="getImgUrl()" alt="">
		<h1 :style="TextColor" class="PlayerName">{{GETUserFullName}}</h1>
		<!-- <h4 :style="TextColor">Email: {{email}}</h4> -->
		<router-link
		class="Links"
			:to="{
				path: `/profile/${GETUserID}`,
				query: {Type: 'FindPlayers'}
			}"
			><h3 class="Links">Profile</h3></router-link
		>
		<router-link
		class="Links"
			:to="{
				path: `/profile/${GETUserID}`,
				query: {Type: 'Academies'}
			}"
			><h3 @click="Academies" class="Links">Joined Academies</h3></router-link
		>
		<router-link :to="{
			path: `/profile/${GETUserID}`,
			query: {Type: 'MyCourses'}
			}" class="Links"><h3 @click="PurchasedCourses" class="Links">Purchased Courses</h3></router-link>
		<router-link :to="{
			path: `/profile/${GETUserID}`,
			query: {Type: 'NewsFeed'}			
			}" class="Links"><h3 class="Links">My Posts</h3></router-link>
		<!-- <router-link class="Links" ><h3>Purchased Courses</h3></router-link>
		<router-link class="Links"><h3>My Posts</h3></router-link> -->
		<router-link class="Links" 	:to="{
				path: `/profile/${GETUserID}`,
				query: {Type: 'FindPlayers'}
			}"
><h3 class="Links">Find Players</h3></router-link>
	</div>
</template>

<script>
// import firebase from "firebase"
import {EventBus} from "../../../main"
import {mapActions,mapGetters} from "vuex"
export default {
	name: "ProfileCard",
	props: ["User"],
	data() {
		return {
			email:"",
			UserId:"",
			ImgSrc:"",
			UserData:"",
			UserName:"",
			Url:"",
			TextColor:{
			color:"white"
    },
	}
	},
	methods:{
		...mapActions(['fetchUserInfo','fetchProfilePic']),
		getImgUrl()
		{
			return this.Url || require('../../../assets/ProfilePic.jpg') 
		},
		MyCourses()
		{
			EventBus.$emit("MyCourses");
		},
		Academies()
		{
			EventBus.$emit("Academies");
		},
		PurchasedCourses()
		{
			EventBus.$emit("PurchasedCourses");

		},
		Posts()
		{
			EventBus.$emit("Posts");
		}
	},
	computed:{
		...mapGetters(['GETUserFullName','GetProfilePicUrl','GETUserID'])
	},
	async mounted() {
		//------New Code--------------//
		//Get User Data
		await this.fetchUserInfo();
		await this.fetchProfilePic();
		this.Url = this.GetProfilePicUrl;
		this.getImgUrl();
	// 	let self = this;
	// await firebase.auth().onAuthStateChanged(function(user) {
	// 	if (user) {
	// self.ImgSrc = user.photoURL
	// console.log("Current User Logged in is: ")
	// console.log(user.email);
	// console.log(user.uid);
	// // self.UserID = user.uid;
	// self.email = user.email;
	// // self.TextColor.color = "green";
	// self.UserId = user.uid
	// 	// User is signed in.
	// } else {
	// 	console.log("Bateee5")
	// 	// self.UserID = "";
	// 	self.UserName = "No User Here"
	// 	self.TextColor.color = "red";
	// 	// No user is signed in.
	// }
	// });	
	// await firebase
	// 		.firestore()
	// 		.collection("Users")
	// 		.where("UserId", "==", this.UserId)
	// 		.get()
	// 		.then((querySnapshot) => {
	// 			querySnapshot.forEach((doc)=>{
	// 			self.UserData = doc.data()
	// 			self.UserName = doc.data().FirstName + " " + doc.data().LastName;
	// 			})
				
	// 		});	
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
		color: white;
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
	.Links:hover{
		color: #1daca8;
	}
	/* .Links:visited{
		color: inherit;
	} */
	</style> 
//TODO Expected Time (31 minutes)