<template>
    <div>
        <div>

        
         <span v-for="(i,index) in pgnoutput  " :key="index" >
                  <span>{{i.number}}.</span>
                  <span class="pgnmove" @click="moveto(i.move1num)" >{{i.move1}} </span>
                  <span class="pgnmove" @click="moveto(i.move2num)">{{i.move2}} </span>
                  <span>{{i.comment}} </span>
              </span>
              </div>
 
    </div>
</template>

<script>
import Chess from "chess.js";
import { EventBus } from "@/main.js";
var currentmove,chess,game,first;
export default {
    name:"PgnDisplay",
    props:["pgn","Move"],
    data(){
        return{
            PGN:"",
            pgnoutput:[],
            Moves:[]
        }
    },
    async mounted(){
        
        game = await new Chess();
        chess = await new Chess();
        first = await new Chess();
        first.load_pgn(this.pgn, { sloppy: true })
        this.Moves = first.history();
        console.log(this.Moves)
        console.log(this.Move)
       var index = this.Moves.indexOf(this.Move);
       currentmove = index;
       this.Moves = this.Moves.slice(0 ,index + 1)
       console.log(this.Moves)
       this.Moves.forEach(element => {
           chess.move(element);
       });
       console.log(this.PGN)
       await EventBus.$emit("boradfen", chess.fen());
       await EventBus.$on("newmove", async (move) => {
       chess.move(move)
        await game.load_pgn(chess.pgn(), { sloppy: true });
       this.Moves = await game.history();
       console.log(this.Moves)
        currentmove++;
               this.displaypgn()
                  EventBus.$emit('newpgn',game.pgn())

       });
              this.displaypgn()
                EventBus.$emit('index',index)

    EventBus.$on("Control", async (data) => {
      if (data == "next") {
        // await console.log("currentmove = " + currentmove);
        // console.log("moves.length = " + moves.length);
        if (currentmove < this.Moves.length - 1) {
          await currentmove++;
          await chess.move(this.Moves[currentmove], { sloppy: true });
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
        this.moveto(this.Moves.length -1);
      }
    });
  }
  ,
  methods: {
      save(){
          EventBus.$on("newpgn", data =>{
              console.log(data)
          })
          console.log(game.pgn())
      },
    async moveto(i) {
      if (currentmove < i) {
        for (let index = currentmove; index <= i; index++) {
          await chess.move(this.Moves[index], { sloppy: true });
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
      this.Moves.forEach((value, index) => {
        if (index % 2 == 0) {
          var p = {
            number: counter,
            move1: this.Moves[index],
            move2: this.Moves[index + 1],
            move1num: index,
            move2num: index + 1,
            
          };
          this.pgnoutput.push(p);
          counter++;
        }
      });
      console.log(this.pgnoutput);
    }
    }
}
</script>


<style scoped>

</style>