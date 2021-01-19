//TODO if the change event tregared in the board (5min) 
//TODO get the pgn from the board(5min) 
//TODO import pgnreview output(5min) 
//TODO make the last movehighlight(5min)
<template>
<div class="NewsFeedPgn">
          <span v-for="(i,index) in pgnoutput  " :key="index" >
              <span>{{i.number}}.</span>
              <span class="pgnmove" @click="moveto(i.move1num)" >{{i.move1}} </span>
              <span class="pgnmove" @click="moveto(i.move2num)">{{i.move2}} </span>
              <span>{{i.comment}} </span>
          </span>
      </div>

</template>

<script>
import { EventBus } from "@/main.js";
import Chess from "chess.js";
var game;
var moves = [];
var chess;
var currentmove = -1;

export default {
  data() {
    return {
      
      pgnoutput:[],
    };
  },
  beforeDestroy(){
    EventBus.$off('newmove');
    EventBus.$off('Control');

  },
  async mounted() {
    chess = await new Chess();
    game = await new Chess();
    await EventBus.$on("newmove", async (move) => {
      if (currentmove == moves.length - 1) {
        console.log(await game.move(move));
        console.log(move);
        moves = await game.history();
        currentmove++;
        console.log(currentmove);
        console.log(moves.length);
        chess.move(move);
      } else {
        await chess.move(move);
        game = await new Chess();
        await game.load_pgn(chess.pgn(), { sloppy: true });
        moves = await game.history();
        currentmove++;
        console.log("currentmove=" + currentmove);
        console.log("moves.length" + moves.length);
      }
      this.displaypgn()
      EventBus.$emit('newPgn',game.pgn())
    });
    EventBus.$on("Control", async (data) => {
      console.log(moves);
      if (data == "next") {
        // await console.log("currentmove = " + currentmove);
        // console.log("moves.length = " + moves.length);
        if (currentmove < moves.length - 1) {
          await currentmove++;
          await chess.move(moves[currentmove], { sloppy: true });
          // console.log(moves[currentmove]);
          //DONE find out which is best to send fen or the move"B2B5"
          await EventBus.$emit("boradfen", chess.fen());
          // console.log('moved++')

          // console.log(chess.ascii())
        }
      } else if (data == "back") {
        if (currentmove > -1) {
          // console.log(currentmove);
          await currentmove--;

          await chess.undo();
          await EventBus.$emit("boradfen", chess.fen());
          // console.log(chess.ascii())
        }
      } else if (data == "first") {
        this.moveto(-1);
      } else if (data == "end") {
        this.moveto(moves.length -1);
      }
    });
  },
  methods: {
    async moveto(i) {
      if (currentmove < i) {
        for (let index = currentmove; index <= i; index++) {
          await chess.move(moves[index], { sloppy: true });
          // console.log(moves[index])
        }
        await EventBus.$emit("boradfen", chess.fen());
        currentmove = i;
        console.log("moved++");
        console.log(currentmove);
        // console.log(chess.ascii())
      } else if (currentmove > i) {
        for (let index = currentmove; index > i; index--) {
          await chess.undo();
          // console.log(moves[index])
          // console.log(index)
        }
        await EventBus.$emit("boradfen", chess.fen());
        currentmove = i;
        console.log("moved++");
        console.log(currentmove);
        // console.log(chess.ascii())
      }
    },
    displaypgn() {
      var counter = 1;
      this.pgnoutput = []
      moves.forEach((value, index) => {
        if (index % 2 == 0) {
          var p = {
            number: counter,
            move1: moves[index],
            move2: moves[index + 1],
            move1num: index,
            move2num: index + 1,
            
          };
          this.pgnoutput.push(p);
          counter++;
        }
      });
      console.log(this.pgnoutput);
    },
  },
};
</script>

<style scoped>
.NewsFeedPgn{
    height: 85%;
    /* background-color: pink; */
    width: 100%;
    overflow-y: scroll ;
    font-family: 'open-sans',sans-serif;
    color: black;
  }
  span{
    margin: 0px;
    font-family: 'Raleway',sans-serif;
    font-weight: 600;
    color: black;
    font-size: 0.9rem;
  }
</style>
