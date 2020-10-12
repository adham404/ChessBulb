<template>
	<div class="HomePage">
		<ProfileCard class="ProfileCard"/>
		<div class = "MiddleContainer">
			<!-- <h1 id="StoriesWindowHeader">Chess Snapshots</h1> -->
			<StoryDisplayheader/>
			<div class="Buttons">
				<router-link to="/PostGame"><button class="Shadow">Post a Game</button></router-link>
				<router-link to="PostStory"><button class="Shadow">Post a Puzzle/Snapshot</button></router-link>
				<router-link to="CreateCourse"><button class="Shadow">Create a Course</button></router-link>
			</div>
				<keep-alive><NewsFeed/></keep-alive>
			
		</div>
		
	</div>
</template>

<script>
/*eslint-disable*/
import StoryDisplayheader from "@/components/MarawanComponents/StoryScrolling/StoryDisplayheader";
import ProfileCard from "@/components/SadekComponents/ProfileCard/ProfileCard.vue";
import NewsFeed from "@/components/SadekComponents/NewsFeed/NewsFeed.vue";
import firebase from "firebase"
export default {
	components: {
		ProfileCard,
		NewsFeed,
		StoryDisplayheader,
	},
	data(){
		return{
			Match:null
		}
	},
	mounted(){
		let self = this;
		firebase
			.firestore()
			.collection("Matches")
			.where("MatchId", "==", "Match-761d4")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					self.Match = doc.data();
					console.log(self.Match);
				});
			});
	}
};
</script>

<style scoped>
	.HomePage{
		display: flex;
		flex-direction: row;
	}
	.MiddleContainer{
		margin-left: 6%;
		width: 990px;
	}
	#StoriesWindowHeader{
		 margin-left: 37%;
		 margin-top: 5px;
		 font-family: 'Quicksand', sans-serif;
		 font-weight: lighter;
	}
	button{
		height: 35px;
		width: 180px;
		border: none;
		outline: none;
		border-radius: 1.2rem;
		font-size: 0.8rem;
		font-family: 'Raleway', sans-serif;
		background-color: #022A68;
		color: white;
	}
	.Buttons{
		display: flex;
		justify-content: space-around;
		align-items: center;
		margin-top: 50px;
	}
	.Shadow{
		-webkit-box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
		-moz-box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
		box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
	}
	.ProfileCard{
		margin-left: 10px;
		margin-top: 100px;
	}
</style>
