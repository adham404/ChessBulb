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
        <TimeStampDisplay class="TimeStamps" :ID= "CourseID" />
        <!-- <div class="TimeStamps">
          <h2 id="SmallHeader">TimeStamps</h2>
          <p>14:00 Nf3</p>
          <p>14:00 Nf3</p>
          <p>14:00 Nf3</p>
          <p>14:00 Nf3</p>
        </div> -->
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
  import TimeStampDisplay from "../ShemyComponents/TimeStampDisplay";
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
p{
  margin: 5px 0px 5px 10px;
  font-family: 'QuickSand', sans-serif;
  font-weight: bold;
  color: black;
}
#SmallHeader{
  border-bottom: 3px solid white;
  font-size: 1.3rem;
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
</style>