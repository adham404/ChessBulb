<template>
  <div class="Container">
    <div class="ChessBoard">
      <ChessBoardDisplay id="grggr" ></ChessBoardDisplay>
    </div>
    <div class="StoryData">
      <div class="DescriptionHeader">
        <div class="Header">
          <div class="UserImage">
            <img src="@/assets/ProfilePic.jpg" alt="" />
          </div>
          <div class="UserBio">
            <div class="TextBox Shadow">
              <h3 id="MessageHeader">You</h3>
              <!-- <p id="Message">{{ moves.StoryExplanation }}</p> -->
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="Buttons">
        <button class="Shadow">Show Solution</button>
      </div> -->
      <div class="StoryMoves">
        <div  class="Scroller">
          <svg @click="ee.$emit('moveStory','lift')"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="103.13"
            height="103.13"
            viewBox="0 0 103.13 103.13"
          >
            <defs>
              <filter
                id="Icon_ionic-md-arrow-dropright-circle"
                x="0"
                y="0"
                width="103.13"
                height="103.13"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" input="SourceAlpha" />
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood flood-opacity="0.161" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g
              transform="matrix(1, 0, 0, 1, 0, 0)"
              filter="url(#Icon_ionic-md-arrow-dropright-circle)"
            >
              <path
                id="Icon_ionic-md-arrow-dropright-circle-2"
                data-name="Icon ionic-md-arrow-dropright-circle"
                d="M45.94,88.505A42.565,42.565,0,1,0,3.375,45.94,42.565,42.565,0,0,0,45.94,88.505Zm-6.548-22.92V26.295L59.037,45.94Z"
                transform="translate(97.51 94.51) rotate(180)"
                fill="#00112c"
              />
            </g>
          </svg>
        </div>
        <div class="StorySheet Shadow">
            <div class="addstorycontaner">
               <h1>No more stories</h1>
            <router-link to="PostStory">
                <button>Add your own story</button>
            </router-link> 
            </div>
            
          
        </div>
        <div class="Scroller">
          <svg @click="ee.$emit('moveStory','right')"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="103.625"
            height="103.625"
            viewBox="0 0 103.625 103.625"
          >
            <defs>
              <filter
                id="Icon_ionic-md-arrow-dropright-circle"
                x="0"
                y="0"
                width="103.625"
                height="103.625"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="3" input="SourceAlpha" />
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood flood-opacity="0.161" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g
              transform="matrix(1, 0, 0, 1, 0, 0)"
              filter="url(#Icon_ionic-md-arrow-dropright-circle)"
            >
              <path
                id="Icon_ionic-md-arrow-dropright-circle-2"
                data-name="Icon ionic-md-arrow-dropright-circle"
                d="M46.187,89A42.812,42.812,0,1,0,3.375,46.187,42.813,42.813,0,0,0,46.187,89ZM39.6,65.947V26.428l19.76,19.76Z"
                transform="translate(5.63 2.63)"
                fill="#00112c"
              />
            </g>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {EventBus} from "@/main.js"
import ChessBoardDisplay from "@/components/MarawanComponents/ChessBoard/ChessBoardDisplay";
export default {
  data() {
    return {
      movesdata: "",
      newpos: "",
      alllines: null,
      chossedline: 0,
      ee : EventBus
    };
  },
  components: {
    
    ChessBoardDisplay,
  },
  methods: {
    
  },
  props: ["moves"],
  mounted() {
   
  },
  watch: {
   
  },
};
</script>

<style scoped>
.addstorycontaner{
    margin: auto;
    justify-content: center;
}
.addstorycontaner button{
    margin-left: 2.4vw;
    margin-top: 2vw ;
}
.TextBox {
  width: 95%;
  /* height: 40px; */
  background-color: white;
  height: 110px;
  border-radius: 12px;
  padding-top: 5px;
  padding-left: 5px;
  color: black;
  font-family: "Raleway", sans-serif;
}
#MessageHeader {
  font-size: 1.1rem;
  margin: 0px;
}
#Message {
  font-size: 0.9rem;
  margin: 1px;
}
.ChessBoard {
  /* padding-top: 1px; */
  padding-left: 3px;
  width: 50.6%;
  /* background-color: blue; */
}
.StoryData {
  display: flex;
  flex-direction: column;
  width: 49.4%;
  background-color: white;
  /* background-color: red; */
}
img {
  height: 100px;
  width: 100px;
  border-radius: 100px;
}
.Header {
  display: flex;
  width: 90%;
  height: 60px;
  /* background-color: aqua; */
  margin-left: 2%;
}
.UserImage {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 16%;
  height: 100%;
  /* background-color: red; */
}
.UserBio {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 84%;
  height: 100%;
  /* background-color: royalblue; */
}
.StorySheet {
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 68%;
  height: 90%;
  background-color: white;
  border-radius: 8px;
}
.Scroller {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16%;
  height: 100%;
  /* background-color: coral; */
}
.StoryMoves {
  display: flex;
  height: 70%;
  width: 100%;
  /* background-color: chartreuse; */
}
.Buttons {
  display: flex;
  align-items: center;
  height: 10%;
  width: 100%;
  /* background-color: cadetblue; */
  padding-left: 20px;
}
.DescriptionHeader {
  display: flex;
  align-items: center;
  height: 20%;
  widows: 100%;
  /* background-color: blue; */
}

.Container {
  display: flex;
  height: 100vh;
  width: 100%;
}
.Controls {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
h3 {
  margin: 0px;
  font-family: "Quicksand", sans-serif;
  font-weight: lighter;
}
h1 {
  margin: 0px;
  font-family: "Quicksand", sans-serif;
  font-weight: lighter;
}
svg {
  width: 80px;
}
button {
  /* align-self: center; */
  height: 32px;
  width: 155px;
  border: none;
  outline: none;
  border-radius: 1.2rem;
  font-size: 0.85rem;
  font-family: "Raleway", sans-serif;
  background-color: #022a68;
  color: white;
}
.Shadow {
  -webkit-box-shadow: 0px 0px 21px -10px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 0px 21px -10px rgba(0, 0, 0, 1);
  box-shadow: 0px 0px 21px -10px rgba(0, 0, 0, 1);
}
</style>