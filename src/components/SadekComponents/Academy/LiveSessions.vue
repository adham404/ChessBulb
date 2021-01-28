<template>
	<div>
		<!-- //TODO using the (SearchEngine Component) //TODO using the (Filter -->
		<!-- Component) //TODO loop through liveSessions //TODO using the -->
		<!-- (LiveSessionCard Component) pass the data of each live session, the -->
		<!-- userId and AcademyID (2 minutes) -->
		<div v-for="(i,index) in Lives" :key="index">
			<LiveSessionCard :Academy="Academy" :Live="i" :id="Ids[index]" :notEnrolled="false"/>
		</div>
	</div>
</template>

<script>
//TODO importing the (LiveSessionCard Component)
import LiveSessionCard from "./LiveSessionCard"
// TODO importing firebase
import firebase from "firebase"
export default {
	name: "LiveSessions",
	//TODO using props to get the Academy data
	props:["Academy","notEnrolled"],
	components:{
		LiveSessionCard
	},
	data() {
		return {
			Lives:[],
			Ids:[],
			AcademyId:this.Academy.AcademyId
		}
	},
	//TODO get userID
	//TODO make an array for liveSessions
	//TODO in "mounted" get the live session of the academy using its ID and save them in the array
	mounted() {
		let self = this;
		firebase
			.firestore()
			.collection("Lives")
			.where("AcademyId", "==",self.Academy.AcademyId)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					self.Lives.push(doc.data());
					self.Ids.push(doc.id)
					console.log(self.Lives);
					console.log(self.Ids);
				});
			});
			console.log(self.Lives);
	},
};
</script>

<style scoped>
</style>