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
		<router-view></router-view>
	</div>
</template>

<script>
/*eslint-disable*/
import StoryScrollingTab from "@/components/MarawanComponents/StoryScrolling/StoryScrollingTab.vue";
import ProfileCard from "@/components/SadekComponents/ProfileCard/ProfileCard.vue";
import NewsFeed from "@/components/SadekComponents/NewsFeed/NewsFeed.vue";
export default {};
</script>

<style scoped>
</style>
