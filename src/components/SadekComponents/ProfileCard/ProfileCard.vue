<template>
	<div>
		<img class="ProfileImage" src="../../../assets/ProfilePic.jpg" alt="">
		<h1 class="PlayerName">Player's Name</h1>
		<h3 class="Links">My Profile</h3>
		<h3 class="Links">Joined Academies</h3>
		<h3 class="Links">Purchased Courses</h3>
		<h3 class="Links">My Posts</h3>
	</div>
</template>

<script>
export default {
	
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
