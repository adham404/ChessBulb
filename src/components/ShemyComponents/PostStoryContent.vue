<template>
  <div class="Container">
    <div class="ChessBoard">
      <ChessBoardDisplay id = '1' />
    </div>
    <div class="StoryData">
      <div class="Moves">
                            <ul>
                                <h3>Solution #:</h3>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                            </ul>
                            <ul>
                                <h3>Solution #:</h3>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                            </ul>
                            <ul>
                                <h3>Solution #:</h3>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                            </ul>
                            <ul>
                                <h3>Solution #:</h3>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                            </ul>
                            <ul>
                                <h3>Solution #:</h3>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                                <li>1.e4 e5</li>
                            </ul>

                        </div>
                        <div class="Controls">
                          <div class="MoveControls">
                            <button>overwrite old move</button>
                            <button>open new line</button>
                          </div>
                          <div>
                            <h4>Please Add the story explanation</h4>
                            <div class="AddBox Shadow">
                              <div class="AnalysisPgn">
                                <textarea name="" id="" cols="28" rows="4"></textarea>
                              </div>
                            </div>
                          </div>
                          <div class="MoveControls">
                            <button>Post as a snapshot</button>
                            <button>Post as a Puzzle</button>
                            <button>Setup position again</button>
                          </div>
                            

                        </div>
    </div>
  </div>
</template>

<script>
import ChessBoardDisplay from '@/components/MarawanComponents/ChessBoard/ChessBoardDisplay'
  export default {
    components: {
      ChessBoardDisplay
    }
    
  }
</script>

<style scoped>
.MoveControls{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
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
.AddBox{
	display: flex;
    flex-direction: column;
    background-color: white;
    width: 90%;
    height: 100px;
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 10px;
    margin-bottom: 20px;
}
h3{
    margin: 0px;
    font-family: 'Quicksand', sans-serif;
    font-weight: normal;
    color: black;
    font-size: 1.5rem;
}
h4{
    margin: 0px;
    font-family: 'Quicksand', sans-serif;
    font-weight: bold;
    color: black;
    margin-left: 20px;
    margin-bottom: 10px;
}
ul{
    list-style-type: none;
    padding-left: 20px;
    white-space: nowrap;

}
li{
    font-family: 'Quicksand', sans-serif;
    font-weight: lighter;
    white-space: nowrap;
    font-size: 1.3rem;
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
    margin-top: 10px;
    margin-bottom: 10px;
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
.Controls{
    width: 40%;
    display: flex;
    flex-direction: column;
    /* background-color: blue; */
    justify-content: center;
    border-left: 2px solid grey;
}
.Moves{
    width: 60%;
    height: 100%;
    /* background-color: darkolivegreen; */
    display: flex;
    overflow-x: scroll;
    color: black;
}
.Container{
	display: flex;
	height: 100vh;
  width: 100%;
      overflow-x: hidden;

}
.ChessBoard{
	padding-top: 20px;
    padding-left: 20px; 
	width: 50.6%;
	/* background-color: blue; */
}
.StoryData{
	display: flex;
	width: 49.4%;
    background-color: white;
  /* background-color: red; */
  /* justify-content: center; */
  /* align-items: center; */
}
</style>