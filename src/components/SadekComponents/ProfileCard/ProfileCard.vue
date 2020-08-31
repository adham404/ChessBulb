<template>
	<div>
		<!-- //(Done) make img tag for the profile icon (2 minutes) -->
		<!-- <img :src="User.photo" alt="user photo" /> -->
		<!-- //(Done) paragraph tag for the user name (1 minutes) -->
		<!-- <p>{{ User.UserName }}</p> -->
		<!-- //(Done) make "Profile" routerLink direct to Profile passing
		props{UserID} (3 minutes) -->
		<router-link
			:to="{
				path: `/profile/${123453789}`,
			}"
			><h3>Pofile</h3></router-link
		>
		<!-- //(Done) make "My Courses" routerLink direct to Courses passing
		props{allCourses} (3 minutes) -->
		<router-link
			:to="{
				name: 'MyCourses',
				params: { allCourses: false },
			}"
			><h3>My Courses</h3></router-link
		>
		<!-- //(Done) make "Joined Academies" routerLink direct to "MyAcademies" passing {allAcademies} (3
		minutes) -->
		<router-link
			:to="{
				name: 'MyAcademies',
				params: { allAcademies: false },
			}"
			><h3>Joined Academies</h3></router-link
		>
		<!-- //(Done) make "Notification" routerLink direct to Notification passing(3 minutes) -->
		<router-link to="UserNotifications">Notifications</router-link>
	</div>
</template>

<script>
export default {
	//(Done) get the user id (5 minutes)
	name: "ProfileCard",
	props: ["User"],
};
</script>

<style scoped>
/*TODO use the css ids from tettra (2 minutes) */
</style> 
//TODO Expected Time (31 minutes)