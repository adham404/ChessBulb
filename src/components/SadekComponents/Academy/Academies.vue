<template>
	<div>
		<!-- <router-link to="/Sadek">Sadek Testing Page</router-link> -->
		<!-- // (DONE) using the (SearchEngine Component) (2 minutes) -->
		<SearchEngine SearchIndex="Academies"/>
		<!-- //(DONE) loop through the object (5 minutes) -->
		<div v-if="this.search" class="Container">
			<div v-for="Academy in SearchedAcademies" :key="Academy.id">
				<!-- //(DONE) using the (AcademiesCard Component) pass the object of each academy and the boolean userId (2 minutes) -->
				<AcademiesCard
					:Academy="Academy"
					:allAcademies="allAcademies"
					:AcademiesId="AcademiesId"
				/>
			</div>
		</div>
		<div v-else>
			<div v-for="Academy in Academies" :key="Academy.id">
				<!-- //(DONE) using the (AcademiesCard Component) pass the object of each academy and the boolean userId (2 minutes) -->
				<AcademiesCard
					:Academy="Academy"
					:allAcademies="allAcademies"
					:AcademiesId="AcademiesId"
				/>
			</div>
		</div>
		<!--  -->
	</div>
</template>
<script>
//(DONE) importing the firebase (1 minute)
import firebase from "firebase";
import { EventBus } from "@/main";
//(DONE) importing the (SearchEngine Component) (1 minute)
import SearchEngine from "../../MarawanComponents/SearchEngine/SearchEngine";
//(DONE) importing the (AcademiesCard Component) (1 minute)
import AcademiesCard from "./AcademiesCard";
// import { EventBus } from "@/main";
export default {
	name: "Academies",
	//(Done) using props to get the passed boolean userID(2 minute)
	props: {
		allAcademies: {
			type: Boolean,
			default: true,
		},
	},
	components: {
		AcademiesCard,
		SearchEngine,
	},
	data() {
		return {
			data: "",
			Academies: [],
			SearchedAcademies: [],
			AcademiesId: [],
			search: false,
			UserId:""
		};
	},
	//(Done) in "mounted" if user id == false then get  the whole academies object from database and assign it to the "Academies" variable, else get every academy id that contains the user id and then get the Academies object and assign it to the variable (15 minutes)
	mounted() {
		EventBus.$emit("Toggle", false);
		//(Done) get current user
		// var user = firebase.auth().currentUser;
		firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
	console.log(user.uid);
	self.UserId = user.uid
	} else {
		console.log("no log in")
	}
  });
		var self = this;
		firebase
			.firestore()
			.collection("AcademyEnrollments")
			.where("UserId", "==", this.UserId)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					self.AcademiesId.push(doc.data().AcademyId);
					console.log(self.AcademiesId);
				});
			});
		if (this.allAcademies == true) {
			firebase
				.firestore()
				.collection("Academies")
				.get()
				.then(function (querySnapshot) {
					querySnapshot.forEach(function (doc) {
						self.Academies.push(doc.data());
						console.log(self.Academies);
					});
				});
		} else {
			firebase
				.firestore()
				.collection("Academies")
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						for (var a = 0; a < self.AcademiesId.length; a++) {
							if (self.AcademiesId[a] == doc.data().AcademyId) {
								self.Academies.push(doc.data());
								console.log(self.Academies);
							}
						}
					});
				});
		}
		EventBus.$on("TheSearchResult",res =>{
    //res is an array of id 
	// res = ['re5845','teffg556','fgdw459648' ......]
	this.search = true
	console.log(res)
	firebase
				.firestore()
				.collection("Academies")
				.get()
				.then((querySnapshot) => {
					querySnapshot.forEach((doc) => {
						for (var a = 0; a < res.length; a++) {
							if (res[a] == doc.data().AcademyId) {
								self.SearchedAcademies.push(doc.data());
								console.log(self.SearchedAcademies);
							}
						}
					});
				});

})
	}
};
</script>
/*TODO use the css ids from tettra (3 minutes) */
<style scoped src = '@/assets/CSS/Academies.css'/>

//TODO Testing Time (10 minutes)
//TODO Expected Time (32 minutes)