<template>
	<div>
		<!-- //TODO using the (ChessBoard component) passing data (2 minutes) -->
		<!-- //TODO using the (BreadCrumbs Component) passing data (2 minutes)  -->
		<!-- //TODO paragraph tag for the players' names using pgn file (2 minutes)  -->
		<!-- //Done Component flag for switching the middle view (passing data)(2 minutes) -->
		<component
			:is="ComponentName"
			:Line="Line"
			:Move="CurrentMove"
		></component>
		<!-- //TODO using the (SideBar Component) (2 minutes) -->
		<!-- //TODO using the (DownloadPgn Component) (2 minutes)  -->
		<!-- //TODO make Add Analysis line button @click using fuction to switch to (AddAnalysis Component) (2 minutes) -->
	</div>
</template>

<script>
//TODO importing the (ChessBoard Component)(3 minutes)
//TODO importing the (PGNReview Component)(3 minutes)
//TODO importing the (BreadCrumbs Component)(3 minutes)
//TODO importing the (SideBar Component)(3 minutes)
//TODO importing the (DownloadPgn Component)(3 minutes)
//TODO importing the (AddAnalysis Component)(3 minutes)
import AddAnalysis from "./AddAnalysis";
//TODO importing the (SeeReplies Component)(3 minutes)
import SeeReplies from "./SeeReplies";
//TODO importing the (AnalysisLines Component)(3 minutes)
import AnalysisLines from "./AnalysisLines";
//TODO importing EventBus (1 minute)
import { EventBus } from "@/main";
import firebase from "firebase";
const unflatten = require("flat").unflatten;
export default {
	//TODO making props object to get the match (2 minutes)
	//TODO making the component object (2 minutes)
	components: {
		AddAnalysis,
		SeeReplies,
		AnalysisLines,
	},
	//TODO making the ComponentName variable and set its default to "AnalysisLines" (2 minutes)
	//TODO making a variable that stores the analysisLine object (2 minutes)
	//TODO making a variable that stores the Current Move (2 minutes)
	data() {
		return {
			ComponentName: "AnalysisLines",
			Line: {},
			CurrentMove: "move_1e4",
		};
	},
	//TODO in "mounted" using EventBus.$on see replies is clicked and assign the recieving  data to the object and switch the boolean variable to true, if true change the ComponentName to "SeeReplies" (5 minutes)
	//TODO in "mounted" using EventBus.$on Reply clicked and assign the recieving data and switch the boolean variable to true, if true change the ComponentName to "AddAnalysis" (5 minutes)
	//TODO in "mounted" using EventBus.$on Add Analysis Line clicked and assign the recieving data switch the boolean variable to true, if true change the ComponentName to "AddAnalysis" (5 minutes)
	mounted() {
		EventBus.$on("SeeReplies", (data) => {
			(this.Line = data), (this.ComponentName = "SeeReplies");
		});
		EventBus.$on("AddAnalysis", (data) => {
			(this.Line = data), (this.ComponentName = "AddAnalysis");
		});
		EventBus.$on("Reply", (data) => {
			(this.Line = data), (this.ComponentName = "AddAnalysis");
		});
		EventBus.$on("Analyze", (data) => {
			(this.Line = data), (this.ComponentName = "AnalysisLines");
		});
		firebase
			.database()
			.ref("Matches/123456789/Analyze")
			.on("value", (snapshot) => {
				this.Line = unflatten(snapshot.val(), { delimiter: "-" });
				console.log(this.Line);
			});
	},
};
</script>


<style scoped>
/*TODO using the css ids from tettra (2 minutes)*/
</style>

//TODO Testing time (30 minutes)
//TODO Expected Time (100 minutes)