<template>
	<div class="Container">
		<!-- //TODO paragraph tag for user name (1 minute) -->
		<!-- <p>{{ UserName }}}</p>
		<p>{{PGN}}</p>
		<br> -->
		<!-- //TODO use the (PGNReview Component) passing data (2 minute) -->
				<div class="ChessBoard">
		<ChessBoardInput id="555"/>
				</div>
		<div class="AddAnalysisLine">
			<div  class="SingleAnalysisCard">
					<div class="LineOwner">
					<h2>You</h2>
					</div>
					<div class="AddBox Shadow">
						<div class="AnalysisPgn">
									<PgnDisplay :pgn="this.$route.params.Line.PGN" :Move="this.$route.params.Move" />

		</div>
		</div>
					</div>
					</div>
		<!-- //Done Save analysis button @click save function (2 minute) -->
		<div class="ControlButtons">
		<button @click="Save">Save Analysis</button>
		</div>
	</div>
</template>

<script>
import { EventBus } from "@/main";
//TODO import firebase (1 minute)
import firebase from "firebase";
// const flatten = require("flat");
//TODO import PGNReview (1 minute)
// import PgnReviewInput from "../../MarawanComponents/PgnReview/PgnReviewInput";
import ChessBoardInput from "../../MarawanComponents/ChessBoard/ChessBoardInput";
import PgnDisplay from "./PgnDisplay";
const flatten = require("flat");
var _ = require('lodash');
export default {
	name: "AddAnalysis",
	//Done use props and get the data passed (3 minutes)
	components: {
		// PgnReviewInput,
		PgnDisplay,
		ChessBoardInput,
	},
	data() {
		return {
			PGN: null,
			LineId: null,
			UserId:"",
			UserName: null,
			Line: this.$route.params.Line,
			MainLine: this.$route.params.MainLine,
			Move: this.$route.params.Move,
			mainMove: this.$route.params.mainMove,
			Moves: this.$route.params.Moves,
			MatchId: this.$route.params.MatchId,
		};
	},
	//TODO get user id (5 minutes)
	//FIXME make save function that get the pgn and save the line with the right structure using "ref" (30 minutes)
	methods: {
		getPath(obj, value, path) {
			try {
				if (typeof obj !== "object") {
					return;
				}
				for (var key in obj) {
					if (Object.prototype.hasOwnProperty.call(obj, key)) {
						var t = path;
						var v = obj[key];
						if (!path) {
							var newPath = key;
						} else {
							newPath = path + "." + key;
						}
						if (v === value) {
							return newPath;
						} else if (typeof v !== "object") {
							newPath = t;
						}
						var res = this.getPath(v, value, newPath);
						if (res) {
							return res;
						}
					}
				}
			} catch (e) {
				console.log(e.message);
			}
		},
		generateUID() {
			this.LineId = "Line-";
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
				this.LineId = this.LineId + r.toString(16);
			}
		},
		AddLine() {
		if("Analyze" in this.Line){
					if(this.mainMove in this.Line.Analyze){
						this.Line.Analyze[this.mainMove].push({
							name: this.UserName,
							LineId: this.LineId,
							PGN: this.PGN,
					})
					}
					else{
						this.Line.Analyze[this.mainMove] =  [{
							name: this.UserName,
							LineId: this.LineId,
							PGN: this.PGN,
					}]
					
					}
				}
				else{
					this.Line["Analyze"] = {
					[this.mainMove] : [{
							name: this.UserName,
							LineId: this.LineId,
							PGN: this.PGN,
					}]
					}
				}
		},
		Save() {
			this.generateUID();
			console.log(this.PGN);
				// this.Line.Analyze = {test: "test"};
				if(this.PGN != null){
				var check = _.isEqual(this.MainLine, this.Line)
				console.log(check)
				if(check){
					this.AddLine();
					firebase
					.database()
					.ref(`Matches/${this.MatchId}`)
					.set(flatten(this.Line,{ delimiter: "-" })); 
					// EventBus.$emit("SeeLine", this.Line);
				}
				else{		
				this.AddLine()		
				var path = this.getPath(this.MainLine, this.Line.LineId);
				console.log(path)
				var objectPath = require("object-path");
				objectPath.set(
					this.MainLine, 
					path.substring(0, path.length - 7),
					this.Line
				);
				console.log(this.Line)
				this.MainLine = flatten(this.MainLine, { delimiter: "-" })
				firebase
					.database()
					.ref(`Matches/${this.MatchId}`)
					.set(this.MainLine); 
					console.log(this.MainLine)
					// EventBus.$emit("SeeLine", this.MainLine);
					}
			const increment = firebase.firestore.FieldValue.increment(1);
			firebase
				.firestore()
				.collection("Matches")
				.doc(this.MatchId)
				.update("noOfAnalysis", increment);
				this.$router.push({path: "/Home"});
				}
		},
	},
	mounted() {
		EventBus.$on("Toggle", true)
		EventBus.$on("newpgn", (data) => {
				this.PGN = data;
				console.log(this.PGN)
			});
		// EventBus.$on("index", (index) => {
		// 		this.Move = index + this.Move
		// 		console.log(this.Move)
		// 	});
				console.log(this.mainMove)
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
			.collection("Users")
			.where("UserId", "==", this.UserId)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc)=>{
				self.UserName = doc.data().FirstName;
				})
				
			});
			// var jangoFett = { LineId: 1, Name: "MainLine", PGN: "1. f3 f6 2. e3" };
			// var bobaFett =  { "LineId": 1, "Name": "MainLine", "PGN": "1. f3 f6 2. e3" }; 
			console.log(_.isEqual(this.MainLine, this.Line));
	},
};
</script>

<style  scoped>
.Container{
	display: flex;
	height: 100vh;
	width: 100%;
}
.ChessBoard{
	padding-top: 1px;
    padding-left: 3px; 

	width: 50.6%;
	/* background-color: blue; */
}
.AddAnalysisLine{
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 85%;
	/* background-color: pink; */
	padding-bottom: 20px;
}
.SingleAnalysisCard{
	margin-top: 10px;
    width: 95%;
    display: flex;
	flex-direction: row;
	padding-bottom: 20px;
  }
  .AddBox{
	display: flex;
    flex-direction: column;
    background-color: white;
    width: 90%;
    height: 580px;
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 10px;
}
.Shadow{
		-webkit-box-shadow: 0px 0px 16px -10px rgba(0,0,0,1);
		-moz-box-shadow: 0px 0px 16px -10px rgba(0,0,0,1);
		box-shadow: 0px 0px 16px -10px rgba(0,0,0,1);
}
.AnalysisPgn{
    height: 100%;
    width: 10%;
    all: unset;
    color: black;
    font-size: 0.9rem;
    font-family: 'Raleway',sans-serif;
    padding-left: 5px;
    padding-top: 5px;
    overflow-wrap: break-word;
}
.ControlButtons{
	height: 10%;
	/* background-color: rebeccapurple; */
}
.ControlButtons svg{
	width: 200px;
	/* margin-left: 30px; */
}
.ControlButtons h2{
	font-family: 'Raleway', sans-serif;
	font-weight: normal;
	font-size: 1.2rem;
	margin: 0 0 20px 50px;
	color: black;
}
button{
		height: 30px;
		width: 150px;
		border: none;
		outline: none;
		border-radius: 1.2rem;
		font-size: 0.9rem;
		font-family: 'Raleway', sans-serif;
		background-color: #022A68;
		color: white;
		margin: 2px 5px 10px 5px
}
.ControlButtons{
	display: flex;
	align-items: flex-end;
	
}
h1{
	font-family: 'QuickSand', sans-serif;
	font-size: 2rem;
	color: black;
	font-weight: lighter;
	margin: auto;
}
p{
	margin: 2px 0px 0px 0px;
	font-family: 'Raleway', sans-serif;
}
/*TODO use the css ids from tettra (2 minutes)*/
</style>

//TODO Testing Time (1 day)
//TODO Expected Time (1 day + 45 minutes)