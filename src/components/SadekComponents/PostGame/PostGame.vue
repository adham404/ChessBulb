<template>
	<div class="Productive">
		<div v-if="Mounted" class="ChessBoard">
			<ChessBoardInput id =1  />

		</div>
		<div class="GameData">
			<div class="EnginePlayers">
				<div class="ChessEngine">
					<StockFish/>
				</div>
				<div class="PlayerInput">
					<label for="WhitePlayer">White Player</label>
					<input type="text" v-model="whitePlayer" />	
					<label for="BlackPlayer">Black Player</label>
					<input type="text" v-model="blackPlayer" />
				</div>
			</div>
		<div class="PgnReview">
				<div class="Text">
		<PgnReviewInput />
				</div>
				<div class="Buttons">
					<button>Upload Pgn</button>
					<button @click="Share">Share Game</button>
				</div>
		<!-- //(Done) make hidden POP UP message, with router link directs to HomePage (2 minutes) -->
		<!-- <div v-if="showPop">
			<p>
				Your post has been posted on chessbulb we hope your students
				enjoy it
			</p>
			<router-link to="/Home">Go back to the Homepage</router-link>
		</div> -->
	</div>
		</div>
	</div>
</template>


<script>
// (Done) importing firebase (1 minute)
import firebase from "firebase";
import { EventBus } from "@/main";
// import Chess from "chess.js";
import PgnReviewInput from "../../MarawanComponents/PgnReview/PgnReviewInput";
import ChessBoardInput from "../../MarawanComponents/ChessBoard/ChessBoardInput";
const flatten = require("flat");
import StockFish from "../../MarawanComponents/StockFish";
// TODO importing Upload Component (1 minute)
import Chess from "chess.js";
export default {
	name: "PostGame",
	components: {
		PgnReviewInput,
		ChessBoardInput,
		StockFish
	},
	data() {
		return {
			whitePlayer: "",
			blackPlayer: "",
			// (Done) Make a variable that stores the PGN of the game  (1 minute)
			PGN: null,
			MatchId: null,
			//(Done) Make a variable that stores the UserID (1 minute)
			// UserId: firebase.auth().currentUser,
			UserId: "",
			noOfBrilliants: 0,
			noOfAnalysis: 0,
			UserName:"",
			//(Done) make a boolean variable for showing the pop up message and assign it to false (1 minute)
			showPop: false,
			Mounted: false,
		};
	},
	methods: {
		// (Done) make a fuction when the (Share Game button) is clicked {2. make the boolean variable true and show the pop up message 3. sending the Matches object to firebase} (5 minutes)
		async Share() {
			var game = await new Chess();
			await game.load_pgn(this.PGN, { sloppy: true });
			game.header('White Player', this.whitePlayer, 'Black Player', this.blackPlayer)
			this.PGN = game.pgn();
			console.log(this.PGN);
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
						WhitePlayer: this.whitePlayer,
						BlackPlayer: this.blackPlayer,
						UserName:this.UserName
					});
				firebase
					.database()
					.ref(`Matches/${this.MatchId}`)
					.set(
						flatten(
							{
								name: "MainLine",
								PGN: this.PGN,
							},
							{ delimiter: "-" }
						)
					);
				this.showPop = true;
				this.$router.push({path:"/Home"})
			}
		},
		//(Done) make a function generates random MatchID and assign it to the variable in the Matches object (20 minutes)
		generateUID() {
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
	async mounted() {
		//Using Event Bus to Activate the SideBar
		setTimeout(() => {this.Mounted = true}, 200)
		EventBus.$emit("Toggle", true);
		//Calling the generateUID function
		this.generateUID();
		EventBus.$on("newPgn", (data) => { 
				this.PGN = data;
				console.log(data);
			});
		console.log(this.MatchId);
		let self = this;
	await firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        console.log(user.uid);
        self.UserId = user.uid;
        
      } else {
        console.log("no log in");
      }
    });
		firebase
			.firestore()
			.collection("Users")
			.where("UserId", "==", this.UserId)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc)=>{
				self.UserName = doc.data().FirstName;
				})
			});
			console.log(this.UserName)
	},
};
</script>

<style scoped>
h1{
	margin: 0px;
	font-family: 'Raleway', sans-serif;
	font-weight: bold;
	border-bottom: 3px solid black;
	width: 50%;
	padding-left: 10px;
	color: black;
	font-size: 1.6rem;
}
.ChessEngine{
	width: 60%;
	/* background-color: lightcoral; */
	height: 100%;
}
.EnginePlayers{
	display: flex;
	height: 30%;
	/* background-color: lawngreen; */
	border-bottom: 3px solid grey;
}
.Productive{
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: white;
}
.ChessBoard{
  padding-top: 2px;
  padding-left: 3px; 
  width: 50.6%;
  /* background-color: tomato; */
  background-color:  #00112c;
}
.GameData{
  display: flex;
  flex-direction: column;
  width: 49.4%;
  /* background-color: turquoise; */
}
.PlayerInput{
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 40%;

	/* background-color: lightseagreen; */
	padding-top: 40px;
	border-left: 2px solid grey;
}
input{
	margin-bottom: 30px;
	border-radius: 5px;
	border: 1px solid #cac7c7;
	font-family: 'Raleway', sans-serif;
	font-weight: lighter;
	border: 1px solid #cac7c7;
	height: 22px;
	width: 200px;
}
label{
	font-family: 'Raleway', sans-serif;
	font-weight: lighter;
	font-size: 1.2rem;
	margin-bottom: 5px;
	color: black;
}
.PgnReview{
	color: black;
	overflow: hidden;
	height: 70%;
}
.Text{
	margin: 0px;
	font-family: 'Quicksand', sans-serif;
	font-weight: lighter;
	color: black;
	height: 90%;
	overflow-y: scroll;
}
.Buttons{
	display: flex;
	height: 10%;
	/* background-color: lime; */
	align-items: center;
}
button{
		height: 35px;
		width: 150px;
		border: none;
		outline: none;
		border-radius: 1.2rem;
		font-size: 0.9rem;
		font-family: 'Raleway', sans-serif;
		background-color: #022A68;
		color: white;
		margin-left: 20px;
	}

</style>

//TODO TESTING (10 minutes)
//TODO Expected Time (82 minutes)