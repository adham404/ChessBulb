<template>
  <div class="NewsFeedContainer Shadow">
    <div class="NewsFeedHeader">
      <div class = "NewsFeedUser">
        <img src="../../../assets/ProfilePic.jpg" alt="">
        <h2>John Smith</h2>
      </div>
      <div class="NewsFeedGamePlayers">
        <img src="../../../assets/ProfilePic.jpg" alt="">
        <h2>John Smith vs John Smith</h2>
        <img src="../../../assets/ProfilePic.jpg" alt="">
      </div>
    </div>
    <div class="NewsFeedGame">
      <div class="NewsFeedChessBoard">
        <ChessBoardDisplay :id = 'id' :fen= 'boardfen' :key = 'id' />
      </div>
      <div class="NewsFeedGamePreview">
        <div class="NewsFeedPgn">
          <p>
            1.e4 {Notes by J. R. Capablanca.} e5 2.Nf3 Nc6 3.Bb5 Nf6 4.O-O
            d6 5.d4 Bd7 6.Nc3 Be7 7.Re1 exd4 8.Nxd4 O-O 9.Bf1 Re8 10.f3
            Bf8 11.Bg5 h6 12.Bh4 g6 13.Nd5 Bg7 {I cannot very highly
            recommend the system of defense adopted by me in this
            variation.} 14.Nb5 {The combinations beginning with this move
            are all wrong. White's proper move was simply to hold the
            position by playing c3. After the text move, Black should get
            the better game.} g5 15.Ndxc7 {If 15.Bf2, Nxd5 would give
            Black the better game. The combination indulged in by White is
            good only in appearence.} gxh4 16.Nxa8 Qxa8 17.Nc7 Qd8 18.Nxe8
            Nxe8 19.Rb1 Be6 20.c3 Bxa2 {A mistake. Black had here a won
            game by playing Be5. The question of time at this point was
            not properly appreciated by Black, who went in to recover a
            Pawn, which was of no impotance whatever. Worse yet, the
            capture of the Pawn only helped White.} 21.Ra1 Be6 22.Qd2 a6
            {h3 was better. After the text move Black has an extremely
            difficult game to play.} 23.Qf2 h5 {Qg5 would have given Black
            better chances to win. After the text move there is nothing
            better than a draw.} 24.f4 Bh6 25.Be2 Nf6 26.Qxh4 Nxe4
            27.Qxd8+ Nxd8 28.Bxa6 d5 29.Be2 Bxf4 30.Bxh5 Bc7 31.Rad1
            {Having had twenty-four hours to consider the position, we
            both came to the conclusion that there was nothing in it but a
            draw.} 1/2-1/21.e4 {Notes by J. R. Capablanca.} e5 2.Nf3 Nc6 3.Bb5 Nf6 4.O-O
            d6 5.d4 Bd7 6.Nc3 Be7 7.Re1 exd4 8.Nxd4 O-O 9.Bf1 Re8 10.f3
            Bf8 11.Bg5 h6 12.Bh4 g6 13.Nd5 Bg7 {I cannot very highly
            recommend the system of defense adopted by me in this
            variation.} 14.Nb5 {The combinations beginning with this move
            are all wrong. White's proper move was simply to hold the
            position by playing c3. After the text move, Black should get
            the better game.} g5 15.Ndxc7 {If 15.Bf2, Nxd5 would give
            Black the better game. The combination indulged in by White is
            good only in appearence.} gxh4 16.Nxa8 Qxa8 17.Nc7 Qd8 18.Nxe8
            Nxe8 19.Rb1 Be6 20.c3 Bxa2 {A mistake. Black had here a won
            game by playing Be5. The question of time at this point was
            not properly appreciated by Black, who went in to recover a
            Pawn, which was of no impotance whatever. Worse yet, the
            capture of the Pawn only helped White.} 21.Ra1 Be6 22.Qd2 a6
            {h3 was better. After the text move Black has an extremely
            difficult game to play.} 23.Qf2 h5 {Qg5 would have given Black
            better chances to win. After the text move there is nothing
            better than a draw.} 24.f4 Bh6 25.Be2 Nf6 26.Qxh4 Nxe4
            27.Qxd8+ Nxd8 28.Bxa6 d5 29.Be2 Bxf4 30.Bxh5 Bc7 31.Rad1
            {Having had twenty-four hours to consider the position, we
            both came to the conclusion that there was nothing in it but a
            draw.} 1/2-1/2
          </p>
        </div>
        <div class="NewsFeedGameControls">
          <svg class="GameControls" xmlns="http://www.w3.org/2000/svg" width="11.859" height="20.911" viewBox="0 0 11.859 20.911">
            <path id="Icon_awesome-caret-left" data-name="Icon awesome-caret-left" d="M13.5,8.953V27.047a1.406,1.406,0,0,1-2.4.994L2.053,18.994a1.406,1.406,0,0,1,0-1.989L11.1,7.959a1.406,1.406,0,0,1,2.4.994Z" transform="translate(-1.641 -7.544)"/>
          </svg>
          <svg class="GameControls" xmlns="http://www.w3.org/2000/svg" width="11.859" height="20.911" viewBox="0 0 11.859 20.911">
            <path id="Icon_awesome-caret-left" data-name="Icon awesome-caret-left" d="M13.5,8.953V27.047a1.406,1.406,0,0,1-2.4.994L2.053,18.994a1.406,1.406,0,0,1,0-1.989L11.1,7.959a1.406,1.406,0,0,1,2.4.994Z" transform="translate(13.5 28.456) rotate(180)"/>
          </svg>
          <svg class="GameControls" xmlns="http://www.w3.org/2000/svg" width="31.5" height="20.531" viewBox="0 0 31.5 20.531">
            <path id="Icon_ionic-md-rewind" data-name="Icon ionic-md-rewind" d="M17.55,28.266V7.734L2.25,18ZM18.45,18l15.3,10.266V7.734Z" transform="translate(-2.25 -7.734)" />
          </svg>
          <svg class="GameControls" xmlns="http://www.w3.org/2000/svg" width="31.5" height="20.531" viewBox="0 0 31.5 20.531">
            <path id="Icon_ionic-md-rewind" data-name="Icon ionic-md-rewind" d="M17.55,28.266V7.734L2.25,18ZM18.45,18l15.3,10.266V7.734Z" transform="translate(33.75 28.266) rotate(180)" />
          </svg>

        </div>
      </div>
    </div>
    <div class="NewsFeedData">
      <p>100 Brilliants</p>
      <p>100 lines of analysis</p>
    </div>
    <div class="NewsFeedInteraction">
      <div class="Brilliant">
        <svg id="Group_7" data-name="Group 7" xmlns="http://www.w3.org/2000/svg" width="18.977" height="25.527" viewBox="0 0 18.977 25.527">
          <path id="Icon_awesome-exclamation" data-name="Icon awesome-exclamation" d="M9.1,21.539A3.989,3.989,0,1,1,5.114,17.55,3.993,3.993,0,0,1,9.1,21.539ZM1.587,1.256l.678,13.561a1.2,1.2,0,0,0,1.2,1.137H6.767a1.2,1.2,0,0,0,1.2-1.137L8.641,1.256A1.2,1.2,0,0,0,7.445,0H2.782A1.2,1.2,0,0,0,1.587,1.256Z" transform="translate(-1.125)"/>
          <path id="Icon_awesome-exclamation-2" data-name="Icon awesome-exclamation" d="M9.1,21.539A3.989,3.989,0,1,1,5.114,17.55,3.993,3.993,0,0,1,9.1,21.539ZM1.587,1.256l.678,13.561a1.2,1.2,0,0,0,1.2,1.137H6.767a1.2,1.2,0,0,0,1.2-1.137L8.641,1.256A1.2,1.2,0,0,0,7.445,0H2.782A1.2,1.2,0,0,0,1.587,1.256Z" transform="translate(9.875)"/>
        </svg>
        <h2>Brilliant</h2>
      </div>
      <div class="Analyze">
        <router-link to="/Posts/:id"><h2>Analyze</h2></router-link>
      </div>
      <div class="Share">
        <svg xmlns="http://www.w3.org/2000/svg" width="26.271" height="30.024" viewBox="0 0 26.271 30.024">
          <path id="Icon_awesome-share-alt" data-name="Icon awesome-share-alt" d="M20.642,18.765a5.605,5.605,0,0,0-3.506,1.225l-6.01-3.756a5.662,5.662,0,0,0,0-2.444l6.01-3.756a5.619,5.619,0,1,0-1.99-3.182l-6.01,3.756a5.63,5.63,0,1,0,0,8.809l6.01,3.756a5.63,5.63,0,1,0,5.5-4.407Z"/>
        </svg>
        <h2>Share</h2>
      </div>
    </div>
  </div>
</template>

<script>
  import ChessBoardDisplay from "@/components/MarawanComponents/ChessBoard/ChessBoardDisplay.vue"
  export default {
    data(){
      return {
        boardfen: "rnbqkb1r/ppppppnp/6p1/8/8/4P3/PPPPQPPP/RNB1KBNR b KQkq - 0 1",
        id: "hello"
      }
    },
    components: {
      ChessBoardDisplay
    },
    mounted(){
      this.id = new Date().getTime().toString() + "hi"
      console.log(this.id)
    }
  }
</script>

<style scoped>
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