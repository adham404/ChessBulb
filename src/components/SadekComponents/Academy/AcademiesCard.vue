<template>
	<div>
		<!-- //(Done) make an img tag for the academy photo (2 minutes) -->
		<!-- <img src=""> -->
		<!-- //(Done) Make paragraph tag for the Academy Name (2 minutes) -->
		<p>{{ Academy.AcademyName }}</p>
		<!-- //(Done) Make a paragraph tag for displaying the describtion (2 minutes) -->
		<p>{{ Academy.About }}</p>
		<!-- //(Done) make Check it out button @click run the CheckItOut function (2 minutes) -->
		<router-link
			:to="{
				path: `/Academies/${Academy.AcademyId}`,
				query: { Academy: Academy },
			}"
			><h3>Check It Out</h3></router-link
		>
		<!-- //(Done) make Enroll button @click run the Enroll function (hide if userId true) (2 minutes) -->
		<router-link
			v-if="notEnrolled"
			:to="{ name: 'Purchase', params: { AcademyId: Academy.AcademyId } }"
			><h3>Enroll</h3></router-link
		>
	</div>
</template>
<script>
// import firebase from "firebase";
export default {
	name: "AcademiesCard",
	//(Done) use props for getting the passed data (3 minutes)
	props: ["Academy", "allAcademies", "AcademiesId"],
	data() {
		return {
			notEnrolled: false,
		};
	},
	mounted() {
		if (this.allAcademies) {
			for (let index = 0; index < this.AcademiesId.length; index++) {
				if (this.AcademiesId[index] != this.Academy.AcademyId) {
					this.notEnrolled = true;
				}
			}
		}
	},
};
</script>
<style scoped>
/*TODO use the css ids from tettra (3 minuts) */
</style>

//TODO Testing Time (10 minutes)
//TODO Expected Time (36 minutes)