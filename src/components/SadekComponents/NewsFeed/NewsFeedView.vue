<template>
	<div class="NewsFeedContainer Shadow">
		<div v-if="Shareflag" class="ShareNewsFeed Shadow">
      <div class="ShareData">
        <div class="ImageAndTextArea">
          <div class="UserImage">
            <img src="../../../assets/ProfilePic.jpg" id="ShareImage" alt="">
          </div>
          <div class="CommentArea">
            <textarea v-model="comment" name="" id="" cols="70" rows="9" placeholder="Add a comment"></textarea>
          </div>
        </div>
        <p>Share External</p>
        <input style="display:none;" type="text" :value="link" ref="copylink">
        <div class="ShareControls">
          <div class="SocialSvg">
            <svg @click="copy()" xmlns="http://www.w3.org/2000/svg" width="31.5" height="31.5" viewBox="0 0 31.5 31.5">
              <path id="Icon_awesome-facebook-square" data-name="Icon awesome-facebook-square" d="M28.125,2.25H3.375A3.375,3.375,0,0,0,0,5.625v24.75A3.375,3.375,0,0,0,3.375,33.75h9.65V23.041H8.6V18h4.43V14.158c0-4.37,2.6-6.784,6.586-6.784a26.836,26.836,0,0,1,3.9.34V12h-2.2a2.521,2.521,0,0,0-2.842,2.723V18h4.836l-.773,5.041H18.475V33.75h9.65A3.375,3.375,0,0,0,31.5,30.375V5.625A3.375,3.375,0,0,0,28.125,2.25Z" transform="translate(0 -2.25)"/>
            </svg>
            <svg @click="copy()" xmlns="http://www.w3.org/2000/svg" width="36" height="29.239" viewBox="0 0 36 29.239">
              <path id="Icon_awesome-twitter" data-name="Icon awesome-twitter" d="M32.3,10.668c.023.32.023.64.023.959,0,9.754-7.424,20.992-20.992,20.992A20.85,20.85,0,0,1,0,29.307a15.263,15.263,0,0,0,1.782.091,14.776,14.776,0,0,0,9.16-3.152,7.391,7.391,0,0,1-6.9-5.117,9.3,9.3,0,0,0,1.393.114,7.8,7.8,0,0,0,1.942-.251,7.379,7.379,0,0,1-5.916-7.241V13.66A7.431,7.431,0,0,0,4.8,14.6,7.389,7.389,0,0,1,2.513,4.728a20.972,20.972,0,0,0,15.213,7.721,8.329,8.329,0,0,1-.183-1.69A7.385,7.385,0,0,1,30.312,5.711a14.526,14.526,0,0,0,4.683-1.782,7.358,7.358,0,0,1-3.244,4.066A14.791,14.791,0,0,0,36,6.853a15.86,15.86,0,0,1-3.7,3.815Z" transform="translate(0 -3.381)"/>
            </svg>
            <svg @click="copy()" xmlns="http://www.w3.org/2000/svg" width="32.301" height="30.507" viewBox="0 0 32.301 30.507">
              <path id="Icon_awesome-reddit-alien" data-name="Icon awesome-reddit-alien" d="M30.018,13.926a3.626,3.626,0,0,0-2.58,1.082,17.5,17.5,0,0,0-9.334-2.88l1.886-8.5,6,1.348a2.673,2.673,0,0,0,2.669,2.669,2.7,2.7,0,1,0-2.4-3.908L19.629,2.27a.634.634,0,0,0-.749.483l-2.07,9.368a17.716,17.716,0,0,0-9.279,2.914,3.59,3.59,0,1,0-4.173,5.705,7.621,7.621,0,0,0-.177,1.682C3.18,28.127,9.607,32.75,17.5,32.75c7.925,0,14.351-4.623,14.351-10.328a6.5,6.5,0,0,0-.211-1.709A3.584,3.584,0,0,0,30.018,13.926ZM8.852,21.1a2.686,2.686,0,1,1,2.7,2.669,2.692,2.692,0,0,1-2.7-2.669Zm14.59,6.366c-2.478,2.478-9.47,2.478-11.948,0a.634.634,0,0,1,0-.933.654.654,0,0,1,.9,0c1.893,1.94,8.17,1.974,10.144,0a.654.654,0,0,1,.9,0A.629.629,0,0,1,23.441,27.467Zm-.054-3.69a2.686,2.686,0,1,1,2.7-2.669A2.673,2.673,0,0,1,23.387,23.777Z" transform="translate(-1.319 -2.243)"/>
            </svg>
          </div>
          <button class="Shadow" @click="share" id="Clickable">Share</button>
        </div>

      </div>

    </div>
		<div class="NewsFeedHeader">
      <div class = "NewsFeedUser">
        <img src="../../../assets/ProfilePic.jpg" alt="">
        <h2>{{Match.UserName}}lnpm</h2>
      </div>
      <div class="NewsFeedGamePlayers">
        <img src="../../../assets/ProfilePic.jpg" alt="">
        <h2>{{Match.WhitePlayer}} vs {{Match.BlackPlayer}}</h2>
        <img src="../../../assets/ProfilePic.jpg" alt="">
      </div>
    </div>
	<div class="NewsFeedGame">
	<div class="NewsFeedChessBoard">
        <ChessBoardDisplay :id = 'Match.MatchId'  :key = 'id' />
      </div>
	<div class="NewsFeedGamePreview">
        <div class="NewsFeedPgn">
		<PgnReviewOutput :pgn="Match.PGN"  />
        </div>
		<div class="NewsFeedGameControls">
          <svg @click="emitcontrol('back')" class="GameControls" xmlns="http://www.w3.org/2000/svg" width="11.859" height="20.911" viewBox="0 0 11.859 20.911">
            <path id="Icon_awesome-caret-left" data-name="Icon awesome-caret-left" d="M13.5,8.953V27.047a1.406,1.406,0,0,1-2.4.994L2.053,18.994a1.406,1.406,0,0,1,0-1.989L11.1,7.959a1.406,1.406,0,0,1,2.4.994Z" transform="translate(-1.641 -7.544)"/>
          </svg>
          <svg @click="emitcontrol('next')" class="GameControls" xmlns="http://www.w3.org/2000/svg" width="11.859" height="20.911" viewBox="0 0 11.859 20.911">
            <path id="Icon_awesome-caret-left" data-name="Icon awesome-caret-left" d="M13.5,8.953V27.047a1.406,1.406,0,0,1-2.4.994L2.053,18.994a1.406,1.406,0,0,1,0-1.989L11.1,7.959a1.406,1.406,0,0,1,2.4.994Z" transform="translate(13.5 28.456) rotate(180)"/>
          </svg>
          <svg @click="emitcontrol('first')" class="GameControls" xmlns="http://www.w3.org/2000/svg" width="31.5" height="20.531" viewBox="0 0 31.5 20.531">
            <path id="Icon_ionic-md-rewind" data-name="Icon ionic-md-rewind" d="M17.55,28.266V7.734L2.25,18ZM18.45,18l15.3,10.266V7.734Z" transform="translate(-2.25 -7.734)" />
          </svg>
          <svg @click="emitcontrol('end')" class="GameControls" xmlns="http://www.w3.org/2000/svg" width="31.5" height="20.531" viewBox="0 0 31.5 20.531">
            <path id="Icon_ionic-md-rewind" data-name="Icon ionic-md-rewind" d="M17.55,28.266V7.734L2.25,18ZM18.45,18l15.3,10.266V7.734Z" transform="translate(33.75 28.266) rotate(180)" />
          </svg>
	</div>
	</div>
        </div>
		<div class="NewsFeedData">
		<p>{{ Match.noOfBrilliants }} brilliant</p>
		<p>{{ Match.noOfAnalysis }} Analysis</p>
		</div>
		<div class="NewsFeedInteraction">
    <div class="Brilliant">
        <svg id="Group_7" data-name="Group 7" xmlns="http://www.w3.org/2000/svg" width="18.977" height="25.527" viewBox="0 0 18.977 25.527">
        <path id="Icon_awesome-exclamation" data-name="Icon awesome-exclamation" d="M9.1,21.539A3.989,3.989,0,1,1,5.114,17.55,3.993,3.993,0,0,1,9.1,21.539ZM1.587,1.256l.678,13.561a1.2,1.2,0,0,0,1.2,1.137H6.767a1.2,1.2,0,0,0,1.2-1.137L8.641,1.256A1.2,1.2,0,0,0,7.445,0H2.782A1.2,1.2,0,0,0,1.587,1.256Z" transform="translate(-1.125)"/>
        <path id="Icon_awesome-exclamation-2" data-name="Icon awesome-exclamation" d="M9.1,21.539A3.989,3.989,0,1,1,5.114,17.55,3.993,3.993,0,0,1,9.1,21.539ZM1.587,1.256l.678,13.561a1.2,1.2,0,0,0,1.2,1.137H6.767a1.2,1.2,0,0,0,1.2-1.137L8.641,1.256A1.2,1.2,0,0,0,7.445,0H2.782A1.2,1.2,0,0,0,1.587,1.256Z" transform="translate(9.875)"/>
        </svg>
		<h2 id="Clickable" @click="BrilliantClicked">brilliant</h2>
		</div>
		<div id="Clickable" class="Analyze">
		<router-link
			:to="{
				path: `Posts/${Match.MatchId}`,
        query: { WhitePlayer: Match.WhitePlayer, BlackPlayer:Match.BlackPlayer }
			}"
			><h2>Analyze</h2></router-link>
		</div>
		<div class="Share">
        <svg xmlns="http://www.w3.org/2000/svg" width="26.271" height="30.024" viewBox="0 0 26.271 30.024">
        <path id="Icon_awesome-share-alt" data-name="Icon awesome-share-alt" d="M20.642,18.765a5.605,5.605,0,0,0-3.506,1.225l-6.01-3.756a5.662,5.662,0,0,0,0-2.444l6.01-3.756a5.619,5.619,0,1,0-1.99-3.182l-6.01,3.756a5.63,5.63,0,1,0,0,8.809l6.01,3.756a5.63,5.63,0,1,0,5.5-4.407Z"/>
        </svg>
		<h2 @click="Shareflag = true" id="Clickable">Share</h2>
		</div>
    </div>
	</div>
</template>


<script>
//TODO importing the (Header Component)  (3 minutes)
import ChessBoardDisplay from "../../MarawanComponents/ChessBoard/ChessBoardDisplay";
import PgnReviewOutput from "../../MarawanComponents/PgnReview/PgnReviewOutput";
//TODO importing the (Share Component)(3 minutes)
import firebase from "firebase";
import { EventBus } from "@/main";
export default {
	name: "NewsFeed",
	components: {
		ChessBoardDisplay,
		PgnReviewOutput,
	},
	//TODO GET the match object from props(3 minutes)
	props: ["Match","UserId"],
	data() {
		return {
      
      //(Done) make a boolean variable that linked with the brilliant button when it's clicked and set it to false(3 minutes)
    brilliant: false,
		Shareflag: false,
		id:"",
		ShareId:null,
    comment:"",
    link:"http://localhost:8080/Posts/"
		};
	},
	methods: {
		//(Done) make brilliant function, if the boolean variable is false increase the NoOfBrilliants by 1, if the brilliant button is clicked then decrease it by 1 (5 minutes)
		BrilliantClicked() {
			if (this.brilliant == false) {
				this.Match.noOfBrilliants++;
				this.brilliant = true;
			} else {
				this.Match.noOfBrilliants--;
				this.brilliant = false;
			}
		},
		sharePost(){
			this.share = true
		},
		copy () {
        this.$copyText(this.link + this.Match.MatchId
        ).then(function (e) {
          alert('Copied')
          console.log(e)
        }, function (e) {
          alert('Can not copy')
          console.log(e)
        })
      },
    generateUID() {
			this.ShareId = "Share-";
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
				this.ShareId = this.ShareId + r.toString(16);
			}
		},
    share(){
	this.generateUID();
	this.Shareflag = false
    firebase
					.firestore()
					.collection("Shares")
					.doc(this.ShareId)
					.set({
						MatchId: this.Match.MatchId,
						ShareId:this.ShareId,
            UserId: this.UserId,
            Comment:this.comment
					});
	},
	emitcontrol(data){
			EventBus.$emit('Control',data)
			console.log(data)
		},
	},
	mounted(){
      this.id = new Date().getTime().toString() + "hi"
      console.log(this.id)
    },
	//(Done) when the component is destroyed update the database.
	updated() {		
		firebase
			.firestore()
			.collection("Matches")
			.doc(this.Match.MatchId)
			.update({
				noOfBrilliants: this.Match.noOfBrilliants,
			});
	},
};
</script>


<style scoped>
  #Clickable:hover{
    cursor: pointer;
  }
  textarea{
    all: unset;
    color: black;
    font-size: 1rem;
    font-family: 'Raleway',sans-serif;
    padding-left: 10px;
    padding-top: 15px;
    overflow-wrap: break-word;
  }
  #ShareImage{
    height: 50px;
    width: 50px;
    border-radius: 50px;
  }
  .SocialSvg{
    display: flex;
    justify-content: space-between;
    width: 25%;
    height: 80%;
    /* background-color: green; */
    align-items: center;
  }
  .SocialSvg svg{
    width: 24px;
  }
  .ShareControls{
    display: flex;
    height: 18%;
    /* background-color: indianred; */
    padding-left: 15px;
    padding-right: 20px;
    justify-content: space-between;
    align-items: center;

  }
  button{
		height: 25px;
		width: 100px;
		border: none;
		outline: none;
		border-radius: 1.2rem;
		font-size: 0.8rem;
		font-family: 'Raleway', sans-serif;
		background-color: #022A68;
		color: white;
	}
  p{
    margin: 0px;
    font-family: 'Raleway',sans-serif;
    font-weight: 600;
    color: black;
    font-size: 0.9rem;
  }
  .CommentArea{
    width: 90%;
    /* background-color: green; */
    height: 100%;
  }
  .UserImage{
    width: 10%;
    height: 100%;
    /* background-color: blueviolet; */
  }
  .ImageAndTextArea{
    display: flex;
    height: 75%;
    width: 100%;
    /* background-color: red; */
  }
  .ShareData{
    width: 90%;
    height: 90%;
    /* background-color: aqua; */
    margin: auto;
    margin-top: 10px;
  }
  .ShareNewsFeed{
    height: 300px;
    width: 700px;
    background-color: white;
    position: absolute;
    z-index: 1;
    margin-left: 9.5%;
    margin-top: 10%;
    border-radius: 10px;
  }
  a{
    text-decoration: none;
  }
  .NewsFeedContainer{
    width: 100%;
    height: 600px;
    background-color: white;
    border-radius: 8px;
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .Shadow{
		-webkit-box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
		-moz-box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
		box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
  }
  .NewsFeedHeader{
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 15%;
    /* background-color: red; */
  }
  .NewsFeedGame{
    display: flex;
    flex-direction: row;
    height: 70%;
    /* background-color: blue; */

  }
  .NewsFeedChessBoard{
    width: 42%;
    height: 100%;
    /* background-color: green; */
  }
  .NewsFeedGamePreview{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 58%;
    height: 100%;
    /* background-color: chartreuse; */
  }
  .NewsFeedGameControls{
    display: flex;
    flex-direction: row;
    height: 15%;
    /* background-color:crimson; */
    align-items: center;
  }
  .GameControls{
    margin-left: 10px;
    margin-right: 10px;
    height: 15px;
  }
  .NewsFeedPgn{
    height: 85%;
    /* background-color: pink; */
    width: 100%;
    overflow-y: scroll ;
    font-family: 'open-sans',sans-serif;
    color: black;
  }
  .NewsFeedData{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 6%;
    /* background-color: purple; */
    font-family: 'Quicksand',sans-serif;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
  }
  .NewsFeedData p{
    font-weight: 100;
    font-size: 1rem;
    margin: 5px;
    color: black;
  }
  .NewsFeedInteraction{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 9%;
    /* background-color: royalblue; */
  }
  .NewsFeedInteraction svg{
    margin-left: 5px;
    margin-right: 5px;
    height: 20px;
  }
  .NewsFeedUser{
    width: 50%;
    height: 100%;
    /* background-color: sandybrown; */
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .NewsFeedGamePlayers{
    width: 50%;
    height: 100%;
    /* background-color:skyblue; */
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }
  img{
    height: 80px;
    width: 80px;
    border-radius: 80px;
  }
  .NewsFeedUser img{
    margin-left: 1rem;
    margin-right: 1rem;
  }
  h2{
    font-family: 'Quicksand', sans-serif;
    font-weight: lighter;
    color: black;
  }
  .Brilliant{
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .Share{
    display: flex;
    flex-direction: row;
    align-items: center;
  }

</style>
//TODO Testing (10 minutes)
//TODO Expected time (83 minutes)