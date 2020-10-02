<template>
	<div class="HomePage">
		<ProfileCard class="ProfileCard"/>
		<div class = "MiddleContainer">
			<h1 id="StoriesWindowHeader">Chess Snapshots</h1>
			<StoryDisplayWindow/>
			<div class="Buttons">
				<button class="Shadow">Post a Game</button>
				<button class="Shadow">Post a Puzzle/Snapshot</button>
				<button class="Shadow">Create a Course</button>
			</div>
			<div v-for="n in 20" :key="n">
				<keep-alive><NewsFeed/></keep-alive>
			</div>
			
		</div>
		
	</div>
</template>

<script>
/*eslint-disable*/
import StoryDisplayWindow from "@/components/MarawanComponents/StoryScrolling/StoryDisplayWindow.vue";
import ProfileCard from "@/components/SadekComponents/ProfileCard/ProfileCard.vue";
import NewsFeed from "@/components/SadekComponents/NewsFeed/NewsFeed.vue";
export default {
	components: {
		ProfileCard,
		NewsFeed,
		StoryDisplayWindow,
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
