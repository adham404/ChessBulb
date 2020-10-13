<template>
	<div class="Container">
		<!-- //(Done) using the (ChessBoard component) passing data (2 minutes) -->
		<div class="ChessBoard" v-if="Mounted">
		<ChessBoardDisplay :fen="fen" :id='id' />
		</div>
		<div class="Analyze">
		<div class="BreadCrumbs">
				<p>Analysis Lines</p>
				<div v-for="n in BreadCrumbs.length" :key="n" id="Lines">
					<svg xmlns="http://www.w3.org/2000/svg" width="16.748" height="27.971" viewBox="0 0 16 27.971">
						<line id="Line_10" data-name="Line 10" x1="15" y2="27" transform="translate(0.874 0.486)" fill="none" stroke="#707070" stroke-width="2"/>
					</svg>
					<p  @click="breadClicked(n-1)">{{BreadCrumbs[n-1].name}}</p>
				</div>
		</div>
		<!-- //TODO using the (BreadCrumbs Component) passing data (2 minutes)  -->
		<!-- //TODO paragraph tag for the players' names using pgn file (2 minutes)  -->
		<!-- //Done Component flag for switching the middle view (passing data)(2 minutes) -->
		<div class="AnalysisCards">
			<component
			:is="ComponentName"
			:Line="Line"
			:Move="CurrentMove"
			:mainMove="mainMove"
			:Moves="Moves"
			:MainLine="MainLine"
			:MatchId="MatchId"
			:add="add"
			:WhitePlayer="WhitePlayer"
			:BlackPlayer="BlackPlayer"
			>
			</component>
		</div>
		
		<!-- //TODO using the (SideBar Component) (2 minutes) -->
		<!-- //TODO using the (DownloadPgn Component) (2 minutes)  -->
		<!-- <p>{{ Line.PGN }}</p>
		<p>{{ CurrentMove }}</p>
		<p /> -->
		<!-- <div class="ControlButtons">
				<button>Download Pgn</button>
				<h2>Powered by </h2>
				<svg xmlns="http://www.w3.org/2000/svg" width="321" height="85" viewBox="0 0 321 85">
					<g id="Group_53" data-name="Group 53" transform="translate(-75 -35)">
						<path id="Icon_awesome-lightbulb" data-name="Icon awesome-lightbulb" d="M11.444,54.13a3.814,3.814,0,0,0,.639,2.108L14.119,59.3A3.811,3.811,0,0,0,17.293,61h7.352a3.811,3.811,0,0,0,3.174-1.7l2.036-3.061a3.811,3.811,0,0,0,.639-2.108l0-4.569H11.438ZM0,20.968A20.851,20.851,0,0,0,5.19,34.762a34.238,34.238,0,0,1,6.22,10.9c0,.031.008.062.013.093H30.514c0-.031.008-.061.013-.093a34.238,34.238,0,0,1,6.22-10.9A20.964,20.964,0,1,0,0,20.968Zm20.968-9.531a9.542,9.542,0,0,0-9.531,9.531,1.906,1.906,0,1,1-3.812,0A13.358,13.358,0,0,1,20.968,7.625a1.906,1.906,0,0,1,0,3.812Z" transform="translate(80.777 57.001)" fill="#1daca8"/>
						<text id="Chessbulb" transform="translate(75 103)" fill="#000" font-size="68" font-family="Quicksand-Regular, Quicksand"><tspan x="0" y="0">Chessbulb</tspan></text>
					</g>
				</svg>

			</div> -->
	</div>
	</div>
</template>

<script>
import Chess from "chess.js";
//TODO importing the (ChessBoard Component)(3 minutes)
import ChessBoardDisplay from "../../MarawanComponents/ChessBoard/ChessBoardDisplay";
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
var chess2;
var game2;
var moves = [];
var currentMove = -1;
export default {
	name: "Analyze",
	//TODO making props object to get the match (2 minutes)
	//TODO making the component object (2 minutes)
	components: {
		AddAnalysis,
		SeeReplies,
		AnalysisLines,
		ChessBoardDisplay,
	},
	//TODO making the ComponentName variable and set its default to "AnalysisLines" (2 minutes)
	//TODO making a variable that stores the analysisLine object (2 minutes)
	//TODO making a variable that stores the Current Move (2 minutes)
	data() {
		return {
			ComponentName: "",
			Line: {},
			MainLine: {},
			MatchId: this.$route.params.id,
			fen: null,
			CurrentMove: moves[currentMove],
			mainMove: "",
			BreadCrumbs:[],
			Moves:moves,
			add:currentMove,
			id:"123",
			WhitePlayer:this.$route.query.WhitePlayer,
			BlackPlayer:this.$route.query.BlackPlayer,
			Mounted: false,
		};
	},
	//TODO in "mounted" using EventBus.$on see replies is clicked and assign the recieving  data to the object and switch the boolean variable to true, if true change the ComponentName to "SeeReplies" (5 minutes)
	//TODO in "mounted" using EventBus.$on Reply clicked and assign the recieving data and switch the boolean variable to true, if true change the ComponentName to "AddAnalysis" (5 minutes)
	//TODO in "mounted" using EventBus.$on Add Analysis Line clicked and assign the recieving data switch the boolean variable to true, if true change the ComponentName to "AddAnalysis" (5 minutes)
	async mounted() {
		// chess = new chess();
		setTimeout(() => {this.Mounted = true}, 200)
		EventBus.$emit("Toggle", true);
		console.log(this.WhitePlayer = this.$route.query.WhitePlayer)
		console.log(this.BlackPlayer = this.$route.query.BlackPlayer)
		currentMove = -1;
				this.mainMove = currentMove + this.CurrentMove

		firebase
			.database()
			.ref(`Matches/${this.$route.params.id}`)
			.on("value", (snapshot) => {
				this.Line = unflatten(snapshot.val(), { delimiter: "-" });
				this.MainLine = unflatten(snapshot.val(), { delimiter: "-" });
				console.log(this.Line);
				console.log(this.MainLine);
				this.BreadCrumbs.push(this.MainLine)
				console.log(this.BreadCrumbs[0].name)
				this.getLine();
			});		
						this.ComponentName= "AnalysisLines"
	// let self = this;
		// this.getLine();
		EventBus.$on("Control", async (data) => {
			if (data == "next") {
				// await console.log("currentmove = " + currentmove);
				// console.log("moves.length = " + moves.length);
				if(this.ComponentName == "SeeReplies"){
					game2 = await new Chess();
			await game2.load_pgn(this.Line.PGN, { sloppy: true });
			moves = await game2.history();
			console.log(moves);
			chess2 = await new Chess();
			await chess2.move(moves[currentMove]);
			this.CurrentMove = moves[currentMove]
			this.mainMove = currentMove + this.CurrentMove;
			console.log(this.Line)
			this.ComponentName = "AnalysisLines"
							EventBus.$emit("checkAdd", currentMove);

				}
				if (currentMove < moves.length - 1) {
					await currentMove++;
					await chess2.move(moves[currentMove], {
						sloppy: true,
					});
					// console.log(moves[currentmove]);
					//DONE find out which is best to send fen or the move"B2B5"
					this.fen = chess2.fen();
					this.CurrentMove = moves[currentMove]
					this.mainMove = currentMove + this.CurrentMove;
					await EventBus.$emit("displayboardfen", chess2.fen());
					// console.log('moved++')
					this.ComponentName = "AnalysisLines";
									EventBus.$emit("checkAdd", currentMove);

					// console.log(chess.ascii())
					console.log(currentMove)
				}
				// EventBus.$emit("checkAdd", currentMove);
			} else if (data == "back") {
				if (currentMove > -1) {
					// console.log(currentmove);
					await currentMove--;

					await chess2.undo();
					// this.fen = chess.fen();
					this.CurrentMove = moves[currentMove]
					this.mainMove = currentMove + this.CurrentMove;
			EventBus.$emit("displayboardfen", chess2.fen());
			console.log(currentMove)
					// console.log(chess.ascii())
				}
				EventBus.$emit("checkAdd", currentMove);
			} else if (data == "first") {
				EventBus.$emit("checkAdd", currentMove);
				this.moveto(-1);
			} else if (data == "end") {
				this.moveto(moves.length - 1);
			}
		});
		EventBus.$on("SeeReplies", (data) => {
			(this.Line = data), (this.ComponentName = "SeeReplies");
			this.BreadCrumbs.push(data)
			console.log(this.BreadCrumbs)
			this.id = "12";
			currentMove = 0;
			EventBus.$emit("checkAdd", currentMove);
			this.getLine();
			this.newLine = true;
		});
		EventBus.$on("AddAnalysis", (data) => {
			(this.Line = data), (this.ComponentName = "AddAnalysis");
		});
		EventBus.$on("Reply", (data) => {
			(this.Line = data), (this.ComponentName = "AddAnalysis");
		});
		EventBus.$on("SeeLine", (data) => {
			if(this.ComponentName == "SeeReplies"){
				(this.Line = data), (this.ComponentName = "AnalysisLines");
			this.PGN = this.Line.PGN;
			console.log(this.Line.PGN)
			this.id = "1288";
			currentMove = 0;
			this.getLine();
			EventBus.$emit("checkAdd", currentMove);
		}
		else{
			(this.Line = data), (this.ComponentName = "AnalysisLines");
			this.PGN = this.Line.PGN;
			console.log(this.Line.PGN)
			this.BreadCrumbs.push(data)
			console.log(this.BreadCrumbs)
			this.id = "1288";
			currentMove = 0;
			this.getLine();
			EventBus.$emit("checkAdd", currentMove);
			this.newLine = true;
		}
			
		});	
			console.log(this.WhitePlayer)
			console.log(this.BlackPlayer)
	},
	methods: {
		async moveto(i) {
			if (currentMove < i) {
				for (let index = currentMove; index <= i; index++) {
					await chess2.move(moves[index], { sloppy: true });
					// console.log(moves[index])
				}
				this.fen = chess2.fen()
				await EventBus.$emit("displayboardfen", chess2.fen());
				currentMove = i;
				this.CurrentMove = moves[currentMove]
				this.mainMove = currentMove + this.CurrentMove;
				console.log("moved++");
				console.log(currentMove);
				// console.log(chess.ascii())
			} else if (currentMove > i) {
				for (let index = currentMove; index > i; index--) {
					await chess2.undo();
					// console.log(moves[index])
					// console.log(index)
				}
				this.fen = chess2.fen();
				await EventBus.$emit("displayboardfen", chess2.fen());
				currentMove = i;
				this.CurrentMove = moves[currentMove]
				this.mainMove = currentMove + this.CurrentMove;
				console.log("moved++");
				console.log(currentMove);
				// console.log(chess.ascii())
			}
		},
		async getLine() {
			game2 = await new Chess();
			await game2.load_pgn(this.Line.PGN, { sloppy: true });
			moves = await game2.history();
			console.log(moves);
			chess2 = await new Chess();
			await chess2.move(moves[currentMove]);
			this.CurrentMove = moves[currentMove]
			this.mainMove = currentMove + this.CurrentMove;
			console.log(this.mainMove)
			console.log(this.CurrentMove)
			console.log(chess2.fen());
			this.fen = chess2.fen();
			EventBus.$emit("displayboardfen", chess2.fen());
			EventBus.$emit("checkAdd", currentMove);
			// this.ComponentName= "AnalysisLines"
		},
		breadClicked(index){
			this.Line = this.BreadCrumbs[index];
			console.log(this.Line)
			this.BreadCrumbs.length = index + 1;
			if(this.Line.name == "MainLine"){
				currentMove = -1;
			}
			else{
				currentMove = 0;
			}
			this.id = "1244";
			this.ComponentName="AnalysisLines"
			this.getLine()
			EventBus.$emit("checkAdd", currentMove);
			
		}
	},
};
</script>


<style scoped>
/*TODO using the css ids from tettra (2 minutes)*/
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
.Analyze{
	display: flex;
	flex-direction: column;
	width: 49.4%;
	background-color: white;
}
.BreadCrumbs{
	height: 5%;
	display: flex;
	/* background-color: darkgreen; */
	align-items: center;
	padding-left: 5px;
	color: black;
	border-bottom: 2px solid black;
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
#Lines{
	display: flex;
	align-items: center;
	color: black;
}
#Lines svg{
	width: 20px;
}
.AnalysisCards{
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 85%;
	/* background-color: pink; */
	overflow-y: scroll;
	padding-bottom: 20px;
}
</style>

//TODO Testing time (30 minutes)
//TODO Expected Time (100 minutes)