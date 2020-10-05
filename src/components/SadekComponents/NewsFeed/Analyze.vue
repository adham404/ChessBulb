<template>
	<div class="Container">
		<div class="ChessBoard">
			<ChessBoardDisplay :id = 'id'/>
		</div>
		<div class="Analyze">
			<div class="BreadCrumbs">
				<p>Analysis Lines</p>
				<div v-for="n in 2" :key="n" id="Lines">
					<svg xmlns="http://www.w3.org/2000/svg" width="16.748" height="27.971" viewBox="0 0 16 27.971">
						<line id="Line_10" data-name="Line 10" x1="15" y2="27" transform="translate(0.874 0.486)" fill="none" stroke="#707070" stroke-width="2"/>
					</svg>
					<p>Main Line</p>
				</div>
			</div>
			<div v-if = "fasle" class="AnalysisCards">
				<h2 id="Players">Ahmed vs Mostafa</h2>
				<div  class="SingleAnalysisCard" v-for="n in 20" :key="n">
					<div class="LineOwner">
					<h2>Mostafa</h2>
					</div>
					<div class="AnalysisBox Shadow">
						<div class="AnalysisPgn">
							<p>
								1.e4 Notes by Raymond Keene *** 1. e4 No surprise; Leko plays little else. I felt
								a pang of sympathy for those commenting live on this game. After the combinational 
								flurry ending on move 23, it was too easy to reach for the script that was titled 
								"And White converts his material advantage". However, that account had to be shelved 
								"And White converts his material advantage". However, that account had to be shelved 
							</p>
						</div>
						<div class="PgnControls">
							<svg @click="SeeReplies = true" xmlns="http://www.w3.org/2000/svg" width="24.539" height="22.641" viewBox="0 0 24.539 22.641">
								<path id="Icon_ionic-ios-text" data-name="Icon ionic-ios-text" d="M15.639,4.5C8.864,4.5,3.375,8.934,3.375,14.405c0,3.826,2.689,7.146,6.621,8.8a7.705,7.705,0,0,1-1.975,3.567.234.234,0,0,0,.212.371,9.486,9.486,0,0,0,3.007-.749,9.3,9.3,0,0,0,2.73-2.176,15.7,15.7,0,0,0,1.68.094c6.774,0,12.264-4.434,12.264-9.905S22.413,4.5,15.639,4.5Z" transform="translate(-3.375 -4.5)"/>
							</svg>
							<svg xmlns="http://www.w3.org/2000/svg" width="24.571" height="21.5" viewBox="0 0 24.571 21.5">
								<path id="Icon_awesome-reply" data-name="Icon awesome-reply" d="M.4,9.825,8.845,2.531a1.153,1.153,0,0,1,1.9.872V7.244c7.709.088,13.821,1.633,13.821,8.939a9.811,9.811,0,0,1-4,7.4.855.855,0,0,1-1.347-.894c2.176-6.959-1.032-8.807-8.475-8.914v4.219a1.153,1.153,0,0,1-1.9.872L.4,11.568a1.152,1.152,0,0,1,0-1.743Z" transform="translate(0 -2.25)"/>
							</svg>
						</div>
					</div>
				</div>
			</div>
			<div v-if= "false" class="Replies">
				<h2 id="Players">Ahmed vs Mostafa</h2>
				<div  class="SingleAnalysisCard">
					<div class="LineOwner">
					<h2>Mostafa</h2>
					</div>
					<div class="AnalysisBox Shadow">
						<div class="AnalysisPgn">
							<p>
								1.e4 Notes by Raymond Keene *** 1. e4 No surprise; Leko plays little else. I felt
								a pang of sympathy for those commenting live on this game. After the combinational 
								flurry ending on move 23, it was too easy to reach for the script that was titled 
								"And White converts his material advantage". However, that account had to be shelved 
								"And White converts his material advantage". However, that account had to be shelved 
							</p>
						</div>
						<div class="PgnControls">
							<svg @click="SeeReplies = true" xmlns="http://www.w3.org/2000/svg" width="24.539" height="22.641" viewBox="0 0 24.539 22.641">
								<path id="Icon_ionic-ios-text" data-name="Icon ionic-ios-text" d="M15.639,4.5C8.864,4.5,3.375,8.934,3.375,14.405c0,3.826,2.689,7.146,6.621,8.8a7.705,7.705,0,0,1-1.975,3.567.234.234,0,0,0,.212.371,9.486,9.486,0,0,0,3.007-.749,9.3,9.3,0,0,0,2.73-2.176,15.7,15.7,0,0,0,1.68.094c6.774,0,12.264-4.434,12.264-9.905S22.413,4.5,15.639,4.5Z" transform="translate(-3.375 -4.5)"/>
							</svg>
							<svg xmlns="http://www.w3.org/2000/svg" width="24.571" height="21.5" viewBox="0 0 24.571 21.5">
								<path id="Icon_awesome-reply" data-name="Icon awesome-reply" d="M.4,9.825,8.845,2.531a1.153,1.153,0,0,1,1.9.872V7.244c7.709.088,13.821,1.633,13.821,8.939a9.811,9.811,0,0,1-4,7.4.855.855,0,0,1-1.347-.894c2.176-6.959-1.032-8.807-8.475-8.914v4.219a1.153,1.153,0,0,1-1.9.872L.4,11.568a1.152,1.152,0,0,1,0-1.743Z" transform="translate(0 -2.25)"/>
							</svg>
						</div>
					</div>
				</div>
				<div  class="SingleAnalysisCard">
					<div class="LineOwner">
					<h2>Replies</h2>
					</div>
					<div class="AnalysisReplies">
						<h2 id="Players">Mostafa's Line</h2>
						<div  class="SingleAnalysisCard" v-for="n in 20" :key="n">
							<div class="LineOwner">
								<h2>Mostafa</h2>
							</div>
							<div class="AnalysisBox Shadow">
								<div class="AnalysisPgn">
									<p>
										1.e4 Notes by Raymond Keene *** 1. e4 No surprise; Leko plays little else. I felt
										a pang of sympathy for those commenting live on this game. After the combinational 
										flurry ending on move 23, it was too easy to reach for the script that was titled 
									</p>
								</div>
								<div class="PgnControls">
									<svg @click="SeeReplies = true" xmlns="http://www.w3.org/2000/svg" width="24.539" height="22.641" viewBox="0 0 24.539 22.641">
										<path id="Icon_ionic-ios-text" data-name="Icon ionic-ios-text" d="M15.639,4.5C8.864,4.5,3.375,8.934,3.375,14.405c0,3.826,2.689,7.146,6.621,8.8a7.705,7.705,0,0,1-1.975,3.567.234.234,0,0,0,.212.371,9.486,9.486,0,0,0,3.007-.749,9.3,9.3,0,0,0,2.73-2.176,15.7,15.7,0,0,0,1.68.094c6.774,0,12.264-4.434,12.264-9.905S22.413,4.5,15.639,4.5Z" transform="translate(-3.375 -4.5)"/>
									</svg>
									<svg xmlns="http://www.w3.org/2000/svg" width="24.571" height="21.5" viewBox="0 0 24.571 21.5">
										<path id="Icon_awesome-reply" data-name="Icon awesome-reply" d="M.4,9.825,8.845,2.531a1.153,1.153,0,0,1,1.9.872V7.244c7.709.088,13.821,1.633,13.821,8.939a9.811,9.811,0,0,1-4,7.4.855.855,0,0,1-1.347-.894c2.176-6.959-1.032-8.807-8.475-8.914v4.219a1.153,1.153,0,0,1-1.9.872L.4,11.568a1.152,1.152,0,0,1,0-1.743Z" transform="translate(0 -2.25)"/>
									</svg>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if= "fasle" class="AddAnalysisLine">
				<div  class="SingleAnalysisCard">
					<div class="LineOwner">
					<h2>You</h2>
					</div>
					<div class="AddBox Shadow">
						<div class="AnalysisPgn">
							<textarea name="" id="" cols="75" rows="29"></textarea>
						</div>
					</div>
				</div>
			</div>
			<div v-if= "false" class="FocusCard">
				<div  class="SingleAnalysisCard">
					<div class="LineOwner">
					<h2>Mostafa</h2>
					</div>
					<div class="FocusBox Shadow">
						<div class="AnalysisPgn">
							<p>
								1.e4 Notes by Raymond Keene *** 1. e4 No surprise; Leko plays little else. I felt
								a pang of sympathy for those commenting live on this game. After the combinational 
								flurry ending on move 23, it was too easy to reach for the script that was titled 
								"And White converts his material advantage". However, that account had to be shelved 
								"And White converts his material advantage". However, that account had to be shelved 
							</p>
						</div>
						<div class="PgnControls">
							<svg @click="SeeReplies = true" xmlns="http://www.w3.org/2000/svg" width="24.539" height="22.641" viewBox="0 0 24.539 22.641">
								<path id="Icon_ionic-ios-text" data-name="Icon ionic-ios-text" d="M15.639,4.5C8.864,4.5,3.375,8.934,3.375,14.405c0,3.826,2.689,7.146,6.621,8.8a7.705,7.705,0,0,1-1.975,3.567.234.234,0,0,0,.212.371,9.486,9.486,0,0,0,3.007-.749,9.3,9.3,0,0,0,2.73-2.176,15.7,15.7,0,0,0,1.68.094c6.774,0,12.264-4.434,12.264-9.905S22.413,4.5,15.639,4.5Z" transform="translate(-3.375 -4.5)"/>
							</svg>
							<svg xmlns="http://www.w3.org/2000/svg" width="24.571" height="21.5" viewBox="0 0 24.571 21.5">
								<path id="Icon_awesome-reply" data-name="Icon awesome-reply" d="M.4,9.825,8.845,2.531a1.153,1.153,0,0,1,1.9.872V7.244c7.709.088,13.821,1.633,13.821,8.939a9.811,9.811,0,0,1-4,7.4.855.855,0,0,1-1.347-.894c2.176-6.959-1.032-8.807-8.475-8.914v4.219a1.153,1.153,0,0,1-1.9.872L.4,11.568a1.152,1.152,0,0,1,0-1.743Z" transform="translate(0 -2.25)"/>
							</svg>
						</div>
					</div>
				</div>
			</div>
			<div class="NoAnalysis">
				<h2 id="Players">Ahmed vs Mostafa</h2>
				<h1>There is no analysis for the following moves</h1>
			</div>
			<div class="ControlButtons">
				<button>Download Pgn</button>
				<button @click= "AddAnalysisLine = true">Add an Analysis Line</button>
				<h2>Powered by </h2>
				<svg xmlns="http://www.w3.org/2000/svg" width="321" height="85" viewBox="0 0 321 85">
					<g id="Group_53" data-name="Group 53" transform="translate(-75 -35)">
						<path id="Icon_awesome-lightbulb" data-name="Icon awesome-lightbulb" d="M11.444,54.13a3.814,3.814,0,0,0,.639,2.108L14.119,59.3A3.811,3.811,0,0,0,17.293,61h7.352a3.811,3.811,0,0,0,3.174-1.7l2.036-3.061a3.811,3.811,0,0,0,.639-2.108l0-4.569H11.438ZM0,20.968A20.851,20.851,0,0,0,5.19,34.762a34.238,34.238,0,0,1,6.22,10.9c0,.031.008.062.013.093H30.514c0-.031.008-.061.013-.093a34.238,34.238,0,0,1,6.22-10.9A20.964,20.964,0,1,0,0,20.968Zm20.968-9.531a9.542,9.542,0,0,0-9.531,9.531,1.906,1.906,0,1,1-3.812,0A13.358,13.358,0,0,1,20.968,7.625a1.906,1.906,0,0,1,0,3.812Z" transform="translate(80.777 57.001)" fill="#1daca8"/>
						<text id="Chessbulb" transform="translate(75 103)" fill="#000" font-size="68" font-family="Quicksand-Regular, Quicksand"><tspan x="0" y="0">Chessbulb</tspan></text>
					</g>
				</svg>

			</div>
		</div>
	</div>
</template>

<script>
import {EventBus} from '@/main.js'
import ChessBoardDisplay from '@/components/MarawanComponents/ChessBoard/ChessBoardDisplay'
	export default {
		data(){
			return{
				id: '1',
				SeeReplies: true,
				AddAnalysisLine: false,
			}
		},
		components: {
			ChessBoardDisplay
		},
		mounted(){
				EventBus.$emit('Toggle', true)
		}
	}
</script>

<style scoped>
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
.AnalysisCards{
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 85%;
	/* background-color: pink; */
	overflow-y: scroll;
	padding-bottom: 20px;
}
.NoAnalysis{
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 85%;
	/* background-color: pink; */
	padding-bottom: 20px;
}
.FocusCard{
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 85%;
	/* background-color: pink; */
	padding-bottom: 20px;
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
.SingleAnalysisCard{
	margin-top: 10px;
    width: 95%;
    display: flex;
	flex-direction: row;
	padding-bottom: 20px;
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
.FocusBox{
	display: flex;
    flex-direction: column;
    background-color: white;
    width: 90%;
    height: 580px;
    margin-left: 15px;
    margin-right: 15px;
	border-radius: 10px;
}
.AnalysisReplies{
	display: flex;
	flex-direction: column;
	align-items: center;
    width: 90%;
    height: 130px;
    margin-left: 15px;
    margin-right: 15px;
	border-radius: 10px;
	margin-bottom: 20px;
	padding-bottom: 50px;
}
h2{
	font-family: 'Raleway', sans-serif;
	font-weight: normal;
	font-size: 1.2rem;
	margin: 0 0 0 4px;
	color: black;
}
.PgnControls{
	display: flex;
	justify-content: space-between;
	margin-top: auto;
}
.PgnControls svg{
	margin: 5px;
	width: 20px;
}
.Shadow{
		-webkit-box-shadow: 0px 0px 16px -10px rgba(0,0,0,1);
		-moz-box-shadow: 0px 0px 16px -10px rgba(0,0,0,1);
		box-shadow: 0px 0px 16px -10px rgba(0,0,0,1);
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
.Replies{
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 85%;
	/* background-color: pink; */
	overflow-y: scroll;
	padding-bottom: 20px;
}
.AddAnalysisLine{
	display: flex;
	flex-direction: column;
	align-items: center;
	height: 85%;
	/* background-color: pink; */
	padding-bottom: 20px;
}
textarea{
    height: 100%;
    all: unset;
    color: black;
    font-size: 1rem;
    font-family: 'Raleway',sans-serif;
    padding-left: 5px;
    padding-top: 5px;
    overflow-wrap: break-word;
  }

</style>