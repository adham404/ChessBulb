<template>
	<div>
		<!-- //TODO paragraph tag for user name (1 minute) -->
		<p>Sadek</p>
		<!-- //TODO use the (PGNReview Component) passing data (2 minute) -->
		<div>
			<textarea cols="30" rows="10" v-model="PGN"></textarea>
		</div>
		<!-- //Done Save analysis button @click save function (2 minute) -->
		<button @click="Save">Save Analysis</button>
	</div>
</template>

<script>
//TODO import firebase (1 minute)
import firebase from "firebase";
const flatten = require("flat");
//TODO import PGNReview (1 minute)
export default {
	//Done use props and get the data passed (3 minutes)
	props: ["Line"],
	//TODO get user id (5 minutes)
	//FIXME make save function that get the pgn and save the line with the right structure using "ref" (30 minutes)
	methods: {
		Save() {
			var data = flatten(
				this.Line.Analyze.Move_1e7[
					{
						name: "Belal",
						PGN: this.PGN,
						Analyze: {},
					}
				]
			);
			firebase.database().ref("Matches/123456789/Analyze").set(data);
		},
	},
};
</script>

<style  scoped>
/*TODO use the css ids from tettra (2 minutes)*/
</style>

//TODO Testing Time (1 day)
//TODO Expected Time (1 day + 45 minutes)