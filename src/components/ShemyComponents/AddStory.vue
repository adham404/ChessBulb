<template>
  <div class="Container">
    <div class="ChessBoard">
      <PositionSetup/>
    </div>
    <div class="StoryData">
      <h1>Please Setup the game position</h1>
      <button class="Shadow">Save Position</button>
    </div>
  </div>
</template>

<script>
import PositionSetup from '@/components/ShemyComponents/PositionSetup.vue'
  export default {
    components: {
      PositionSetup
    }
    
  }
</script>

<style scoped>
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
	}
.Shadow{
		-webkit-box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
		-moz-box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
		box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
}
h1{
  font-family: 'Raleway', sans-serif;
  font-weight: bold;
  color: black;
}
.Container{
	display: flex;
	height: 100vh;
	width: 100%;
}
.ChessBoard{
	/* padding-top: 1px; */
    padding-left: 20px; 
	width: 45%;
	/* background-color: blue; */
}
.StoryData{
	display: flex;
	flex-direction: column;
	width: 55%;
    background-color: white;
  /* background-color: red; */
  justify-content: center;
  align-items: center;
}
</style>