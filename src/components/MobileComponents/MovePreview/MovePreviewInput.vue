<template>
  <div> 
    <div class="NewsFeedPgn font-weight-light">
     
      
        
        <span  v-for="(i, index) in movesdata" :key="index"  class="font-weight-medium text-subtitle-2" :class=" currentmove==index ? 'active': '' "  id="pgnmove" @click="moveto(index)">{{ i }} </span>
      
      
    </div>
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
            console.warn("New Move in Move Preview")
            if (self.currentmove == moves.length - 1) {
            await game.move(move)
            // console.log(move);
            moves = await game.history();
            await self.currentmove++;
            //this.movesdata = await game.history()
            // console.log(self.currentmove);
            // console.log(moves.length);
            await chess.move(move);
            
            } else {
            await chess.move(move);
            game = await new Chess();
            await game.load_pgn(chess.pgn(), { sloppy: true });
            moves = await game.history();
            await self.currentmove++;
            // console.log("currentmove=" + self.currentmove);
            // console.log("moves.length" + moves.length);
            }
            self.movesdata = await game.history()
            console.log("added new history", self.movesdata)
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
        EventBus.$off('Control')
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
#pgnmove {
  cursor: pointer;
}
.active{
    background-color: white;
    color: #000;
    border-radius: 7px;
}
.NewsFeedPgn{
    height: 85%;
    /* background-color: pink; */
    width: 100%;
    /* overflow-y: scroll ; */
    font-family: 'open-sans',sans-serif;
    color: black;
  }
  span{
    margin: 0px;
    font-family: 'Raleway',sans-serif;
    font-weight: 600;
    color: white;
    font-size: 0.9rem;
  }
</style>