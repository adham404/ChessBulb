<template>
  <div class="Moves">
      <ul  >
          <li v-for="(i,index) in movesdata" :key="index" :class=" currentmove==index ? 'active': '' "  @click="moveto(index)">{{i}}</li> 
      </ul>
  </div>
</template>

<script>
import {EventBus} from '@/main.js'
import Chess from "chess.js"
var chess ;
var game ;
var moves = [];
// var currentmove = -1 ; 
export default {
    props:["startpos"],
    data(){
        return{
            movesdata :null,
            currentmove : -1
        }
    },
    watch:{
        
        startpos:async function(){
            if(this.startpos){
                chess = await new  Chess(this.startpos);
                await EventBus.$emit("boradfen", chess.fen())
            }
            
        }
    },
    async mounted(){
        let self = this
        self.currentmove = -1;
        chess = await new Chess(self.startpos);
        await EventBus.$emit("boradfen", chess.fen())
        game = await new Chess(self.startpos);
        await EventBus.$on("newmove", async (move) => {
            if (self.currentmove == moves.length - 1) {
            // console.log(await game.move(move));
            // console.log(move);
            moves = await game.history();
            self.currentmove++;
            // console.log(self.currentmove);
            // console.log(moves.length);
            chess.move(move);
            } else {
            await chess.move(move);
            game = await new Chess();
            await game.load_pgn(chess.pgn(), { sloppy: true });
            moves = await game.history();
            self.currentmove++;
            // console.log("currentmove=" + self.currentmove);
            // console.log("moves.length" + moves.length);
            }
            this.movesdata = game.history()
            // console.log(game.history())
            EventBus.$emit('MovesPreviewList', game.history())
        });        
        EventBus.$on('Control', async data =>{
           
            if(data =='next'){
                // console.log(self.currentmove)
                if(self.currentmove < moves.length-1 ){
                    self.moveto(self.currentmove+1)
                }
                
                
                
            }else if(data=='back'){
                // console.log(self.currentmove)
                if(self.currentmove > -1){
                    self.moveto(self.currentmove-1)
                }
                
            }else if(data=='first'){
                self.moveto(-1)
                

                
            }else if(data=='end'){
                self.moveto(moves.length-1)
                

            }
        })

    },
    beforeDestroy(){
        EventBus.$off('newmove')
    },
    methods:{
        async moveto(i){
            let self = this
            // console.log(self.currentmove)
            if(self.currentmove<i){
                for (let index = self.currentmove; index <= i; index++) {
                await chess.move(moves[index],{ sloppy: true })
                }
                await EventBus.$emit("boradfen",chess.fen())
                self.currentmove = i   
            }else if(self.currentmove>i){
                for (let index = self.currentmove; index > i; index--) {
                await chess.undo()
                }
                await EventBus.$emit("boradfen",chess.fen())
                self.currentmove = i
            }
            
        },
    }

}
</script>

<style scoped>
ul {
  list-style-type: none;
  padding-left: 20px;
  white-space: nowrap;
}
li {
  font-family: "Quicksand", sans-serif;
  font-weight: lighter;
  white-space: nowrap;
}
.Moves{
    width: 60%;
    height: 100%;
    /* background-color: darkolivegreen; */
    display: flex;
    /* overflow-x: scroll; */
    color: black;
}
.Data{
    display: flex;
    width: 100%;
    height: 90%;
    /* background-color: green; */

}
.active{
    background-color: yellow;
}
</style>