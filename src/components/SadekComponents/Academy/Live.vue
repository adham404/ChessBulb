<template>
  <div class="Productive">
    <div class="ChessBoard">
      <ChessBoardDisplay :id = 'id' />
    </div>

    <div class="CourseStream">
      <div class="VideoPlayer">
        <VideoPlayer :VID = 'CourseID'/>
        <h2>The sicillian najdorf by Mostafa Hamido</h2>
      </div>
      <div class="CourseData">
        <div  class="ChatRoom">
          <h2 id="SmallHeader">Chat Room</h2>
          <div class="Messages">
              <div v-for= "n in 60" :key="n" class="Container">
                <div class="UserImageAndSignOut">
                    <img src="@/assets/ProfilePic.jpg" alt="">
                </div>
                <div class="UserBio">
                    <div class="TextBox Shadow">
                        <h3 id="MessageHeader">Adham Elshafei</h3>
                        <p id="Message">I was a great player in a lot of tournaments</p>
                    </div>
                </div>
              </div>

          </div>
          <input type="text" id="MessageInput">
          <br/>
          <button>Send</button>
        </div>
        
        <div class="ChessEngine">
          <h2 id="SmallHeader">StockFish</h2>
          <p>Nf3 +3</p>
          <p>Nf3 +3</p>
          <p>Nf3 +3</p>
          <p>Nf3 +3</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  /*eslint-disable*/
  import ChessBoardDisplay from '@/components/MarawanComponents/ChessBoard/ChessBoardDisplay'
  import VideoPlayer from '@/components/ShemyComponents/VideoPlayer'
  import TimeStampDisplay from "@/components/ShemyComponents/TimeStampDisplay";
  import {EventBus} from '@/main.js'
  export default {
    data(){
      return{
        id: '1',
        VID: '7C5NPltqtKoSxj3DHiMw',
        boardfen: 'rnbqkb1r/ppppppnp/6p1/8/8/4P3/PPPPQPPP/RNB1KBNR b KQkq - 0 1'

      }
    },
    props:["CourseID"],    
    components:{
      ChessBoardDisplay,
      VideoPlayer,
      TimeStampDisplay
    },
    mounted(){
      EventBus.$emit('Toggle', true)
    }

  }
</script>

<style scoped>
input{
    width: 80%;
    margin-left: 10%;
    border-radius: 5px;
    border: 2px solid rgb(167, 166, 166);
    margin-top: 10px;
    margin-bottom: 5px;
    height: 20px;
}
.Messages{
    overflow-y: scroll;
    height: 64%;
    /* background-color: green; */
}
#MessageHeader{
    font-size: 0.9rem;
    margin: 0px;
}
#Message{
    font-size: 0.8rem;
}
p{
  margin: 5px 0px 5px 10px;
  font-family: 'QuickSand', sans-serif;
  font-weight: bold;
  color: black;
}
#SmallHeader{
  border-bottom: 3px solid white;
  font-size: 1.3rem;
  width: 35%;
}
h2{
  margin: 2px 0px 10px 2px;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  color: black;
  font-size: 1.7rem;
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
.CourseStream{
  display: flex;
  flex-direction: column;
  width: 49.4%;
  /* background-color: turquoise; */
}
.VideoPlayer{
  height: 55%;
  /* background-color:violet; */
  /* border-bottom: 3px solid grey; */
}
.CourseData{
  display: flex;
  height: 45%;
  width: 100%;
  /* background-color: yellowgreen; */
}
.TimeStamps{
  width: 50%;
  background-color:#1DACA8 ;
  border-radius: 10px;
  /* background-color: aqua; */
}
.ChessEngine{
  width: 50%;
  background-color:#0487af;
  border-radius: 10px;
  /* background-color: blueviolet; */
}
.ChatRoom{
  width: 50%;
  /* background-color:#0487af; */
  border-radius: 10px;
  border: 2px solid rgb(180, 178, 178);
}
 h3{
        margin: 0px;
        margin-bottom: 2px;
        font-weight: normal;
    }
    p{
        margin: 0px;
        font-weight: bold;

    }
    .Shadow{
		-webkit-box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
		-moz-box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
		box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
    }
    .TextBox{
        width: 95%;
        /* height: 40px; */
        background-color: white;
        border-radius: 12px;
        padding-top: 5px;
        padding-left: 5px;
        color: black;
        font-family: 'Raleway', sans-serif;
    }
    img{
    height: 50px;
    width: 50px;
    border-radius: 50px;
    }
    .Container{
        display: flex;
        width: 90%;
        height: 60px;
        /* background-color: aqua; */
        margin-left: 2%;
    }
    .UserImageAndSignOut{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 16%;
        height: 100%;
        /* background-color: red; */
    }
    .UserBio{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 84%;
        height: 100%;
        /* background-color: royalblue; */
    }
    .Buttons{
        justify-content: space-evenly;
        width: 20%;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-color: purple;
    }
    button{
		height: 35px;
		width: 120px;
		border: none;
		outline: none;
		border-radius: 1.2rem;
		font-size: 0.8rem;
		font-family: 'Raleway', sans-serif;
		background-color: #022A68;
		color: white;
    margin-left: 230px;
	}

</style>