<template>
	<div >
		<h2 id="Players">{{WhitePlayer}} vs {{BlackPlayer}}</h2>
		<div class="SingleAnalysisCard">
			<div class="LineOwner">
			<p>{{ Line.name }}</p>
			</div>
			<div class="AnalysisBox Shadow">
				<div class="AnalysisPgn">
			<p>{{ Line.PGN }}</p>
			</div>
			<div class="PgnControls">
					<svg @click="SeeLine(Line)" xmlns="http://www.w3.org/2000/svg" width="24.539" height="22.641" viewBox="0 0 24.539 22.641">
								<path id="Icon_ionic-ios-text" data-name="Icon ionic-ios-text" d="M15.639,4.5C8.864,4.5,3.375,8.934,3.375,14.405c0,3.826,2.689,7.146,6.621,8.8a7.705,7.705,0,0,1-1.975,3.567.234.234,0,0,0,.212.371,9.486,9.486,0,0,0,3.007-.749,9.3,9.3,0,0,0,2.73-2.176,15.7,15.7,0,0,0,1.68.094c6.774,0,12.264-4.434,12.264-9.905S22.413,4.5,15.639,4.5Z" transform="translate(-3.375 -4.5)"/>
							</svg>
							<svg @click="SeeLine(Line)" xmlns="http://www.w3.org/2000/svg" width="24.571" height="21.5" viewBox="0 0 24.571 21.5">
								<path id="Icon_awesome-reply" data-name="Icon awesome-reply" d="M.4,9.825,8.845,2.531a1.153,1.153,0,0,1,1.9.872V7.244c7.709.088,13.821,1.633,13.821,8.939a9.811,9.811,0,0,1-4,7.4.855.855,0,0,1-1.347-.894c2.176-6.959-1.032-8.807-8.475-8.914v4.219a1.153,1.153,0,0,1-1.9.872L.4,11.568a1.152,1.152,0,0,1,0-1.743Z" transform="translate(0 -2.25)"/>
							</svg>
			</div>
		</div>
		</div>
		<!-- //TODO loop through the anlayse (2 minutes) -->
		<div  class="SingleAnalysisCard">
					<div class="LineOwner">
					<h2>Replies</h2>
					</div>
					<div class="AnalysisReplies">
						<h2 id="Players">{{Line.name}}'s Line</h2>
			<div class="SingleAnalysisCard" v-for="i in keys" :key="i">
				<div v-for="j in Line.Analyze[i].length" :key="j">
					<!-- //TODO Paragraph tag for the line user name (1 minute) -->
					<div class="LineOwner">
					<p>{{ Line.Analyze[i][j - 1].name }}</p>
					</div>
					<div class="AnalysisBox Shadow">
								<div class="AnalysisPgn">
					<p>{{ Line.Analyze[i][j - 1].PGN }}</p>
					</div>
					<div class="PgnControls">
					<svg @click="SeeLine(Line)" xmlns="http://www.w3.org/2000/svg" width="24.539" height="22.641" viewBox="0 0 24.539 22.641">
								<path id="Icon_ionic-ios-text" data-name="Icon ionic-ios-text" d="M15.639,4.5C8.864,4.5,3.375,8.934,3.375,14.405c0,3.826,2.689,7.146,6.621,8.8a7.705,7.705,0,0,1-1.975,3.567.234.234,0,0,0,.212.371,9.486,9.486,0,0,0,3.007-.749,9.3,9.3,0,0,0,2.73-2.176,15.7,15.7,0,0,0,1.68.094c6.774,0,12.264-4.434,12.264-9.905S22.413,4.5,15.639,4.5Z" transform="translate(-3.375 -4.5)"/>
							</svg>
							<svg @click="SeeLine(Line)" xmlns="http://www.w3.org/2000/svg" width="24.571" height="21.5" viewBox="0 0 24.571 21.5">
								<path id="Icon_awesome-reply" data-name="Icon awesome-reply" d="M.4,9.825,8.845,2.531a1.153,1.153,0,0,1,1.9.872V7.244c7.709.088,13.821,1.633,13.821,8.939a9.811,9.811,0,0,1-4,7.4.855.855,0,0,1-1.347-.894c2.176-6.959-1.032-8.807-8.475-8.914v4.219a1.153,1.153,0,0,1-1.9.872L.4,11.568a1.152,1.152,0,0,1,0-1.743Z" transform="translate(0 -2.25)"/>
							</svg>
			</div>
				</div>
			</div>
			
		</div>
				</div>
	</div>
	<div class="ControlButtons">
		<button @click="Add">Add Analysis</button>
		</div>
	</div>
</template>

<script>
//TODO import AnalysisLine Component (2 minutes)
//TODO import EventBus (1 minutes)
import { EventBus } from "@/main";
export default {
	//TODO use props to get the data specified for this component (3 minutes)
	props: ["Line", "MainLine","Move","MatchId","WhitePlayer","BlackPlayer"],
	data() {
		return {
			keys: [],
			key: false,
		};
	},
	//TODO see line Function, EventBus.$emit to (Analyze Component) with data to switch to (AnalysisLines Component)
	methods: {
		SeeLine(ref) {
			EventBus.$emit("SeeLine", ref);
		},
		Reply(ref) {
			EventBus.$emit("Reply", ref);
		},
		Add() {
			this.$router.push( { name: "AddAnalysis", params:{Line:this.Line,MainLine:this.MainLine,Move:this.Move,Moves:this.Moves,mainMove:this.mainMove,MatchId:this.MatchId,WhitePlayer:this.WhitePlayer,BlackPlayer:this.BlackPlayer} } );
		},
	},
	//DONE check if the line have Analyze key or not
	mounted() {
		if ("Analyze" in this.Line) {
			this.key = true;
			this.keys = Object.keys(this.Line.Analyze);
			console.log((this.keys = Object.keys(this.Line.Analyze)));
		} else {
			this.key = false;
		}
		console.log(this.Move)
	},
	
};
</script>

<style scoped>
.Replies{
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 85%;
	/* background-color: pink; */
	overflow-y: scroll;
	padding-bottom: 20px;
}
.SingleAnalysisCard{
	margin-top: 10px;
    width: 95%;
    display: flex;
	flex-direction: row;
	padding-bottom: 20px;
  }
  .AnalysisBox{
    display: flex;
    flex-direction: column;
    background-color: white;
    width: 90%;
    height: 130px;
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
.PgnControls{
	display: flex;
	justify-content: space-between;
	margin-top: auto;
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
/*TODO use the css ids from tettra (2 minutes) */
</style>
//TODO Testing Time (1 day)
//TODO Expected Time (1 day + 30 minutes)