<template>
	<div>
		<!-- //TODO Make div for the (ChessBoard Component) (2 minutes)  -->
		<!-- //TODO Make div for the (StockFish Component) (2 minutes)  -->
		<!-- //(Done) Make div for the white player and black player inputs (2 minutes) -->
		<div>
			<input type="text" v-model="whitePlayer" />
			<input type="text" v-model="blackPlayer" />
		</div>
		<!-- //TODO Make div for the (PGNReview Component) (2 minutes) -->
		<!-- //FIXME Make div for the (Upload Component) (2 minutes)  -->
		<!-- //(Done) Make div for the Share Game button (2 minutes) -->
		<button @click="Share">Share Game</button>
		<!-- //TODO make hidden POP UP message, with router link directs to HomePage (2 minutes) -->
		<div v-if="showPop">
			<p>
				Your post has been posted on chessbulb we hope your students
				enjoy it
			</p>
			<router-link to="/Home">Go back to the Homepage</router-link>
		</div>
	</div>
</template>


<script>
// (Done) importing firebase (1 minute)
import firebase from "firebase";
import { EventBus } from "@/main";
// TODO importing ChessBoard Component (1 minute)

// TODO importing StockFish Component (1 minute)

// TODO importing PGNReview Component (1 minute)

// TODO importing Upload Component (1 minute)

export default {
	data() {
		return {
			whitePlayer: "",
			blackPlayer: "",
			// (Done) Make a variable that stores the PGN of the game  (1 minute)
			PGN:
				"1.e4 Notes by Raymond Keene *** 1. e4 No surprise; Leko plays little else. I felt a pang of sympathy for those commenting live on this game. After the combinational flurry ending on move 23, it was too easy to reach for the script that was titled",
			MatchId: null,
			//(Done) Make a variable that stores the UserID (1 minute)
			// UserId: firebase.auth().currentUser,
			UserId: "123456789",
			noOfBrilliants: 0,
			noOfAnalysis: 0,
			//(Done) make a boolean variable for showing the pop up message and assign it to false (1 minute)
			showPop: false,
		};
	},
	methods: {
		// (Done) make a fuction when the (Share Game button) is clicked {2. make the boolean variable true and show the pop up message 3. sending the Matches object to firebase} (5 minutes)
		Share() {
			// const chess = new Chess()
			// chess.header('White', this.whitePlayer, 'Black', this.blackPlayer)
			if (this.PGN != "") {
				firebase
					.firestore()
					.collection("Matches")
					.doc(this.MatchId)
					.set({
						MatchId: this.MatchId,
						noOfAnalysis: this.noOfAnalysis,
						noOfBrilliants: this.noOfBrilliants,
						PGN: this.PGN,
						UserId: this.UserId,
					});
				this.showPop = true;
			}
		},
		//(Done) make a function generates random MatchID and assign it to the variable in the Matches object (20 minutes)
		generateUID() {
			// Public Domain/MIT
			this.MatchId = "Match-";
			var d = new Date().getTime(); //Timestamp
			var d2 =
				(performance && performance.now && performance.now() * 1000) ||
				0; //Time in microseconds since page-load or 0 if unsupported
			for (var i = 0; i < 5; i++) {
				var r = Math.random() * 16; //random number between 0 and 16
				if (d > 0) {
					//Use timestamp until depleted
					r = (d + r) % 16 | 0;
				} else {
					//Use microseconds since page-load if supported
					r = (d2 + r) % 16 | 0;
				}
				this.MatchId = this.MatchId + r.toString(16);
			}
		},
	},
	mounted() {
		//Using Event Bus to Activate the SideBar
		EventBus.$emit("Toggle", true);
		//Calling the generateUID function
		this.generateUID();
		console.log(this.MatchId);
	},
};
</script>

<style scoped>
/* TODO using the css properties from tettra (1minute)

/* TODO Add the html Ids from tettra (2 minute) */
</style>

//TODO TESTING (10 minutes)
//TODO Expected Time (82 minutes)