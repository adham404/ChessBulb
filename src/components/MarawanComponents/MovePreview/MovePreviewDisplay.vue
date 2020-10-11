<template>
  <div class="Moves">
      <ul>
          <!-- <div    v-for="(i,index) in movesdata" :key="index" > -->
          <li  v-for="(i,index) in movesdata" :key="index" :class=" currentmove==index ? 'active': '' "  @click="moveto(index)">{{i}}</li> 
      <!-- </div> -->
      </ul>
      
  </div>
</template>

<script>
import {EventBus} from '@/main.js'
import Chess from "chess.js"
var chess = new  Chess()
var moves1 = [];
// var currentmove = -1 ; 
export default {
    props:["moves","startpos"],
    data(){
        return{
            movesdata :null,
            currentmove : -1
        }
    },
    watch:{
        moves:async function(){
          this.movesdata = this.moves
          moves1 = this.moves
          console.log(moves1)
          chess = await new  Chess(this.startpos);
        await EventBus.$emit("displayboardfen", chess.fen())
        this.currentmove = -1
        },
        startpos:async function(){
            if(this.startpos){
                chess = await new  Chess(this.startpos);
                await EventBus.$emit("displayboardfen", chess.fen())
            }
            
        }
    },
    mounted(){
        let self = this
        self.currentmove = -1;
        EventBus.$on('Control', async data =>{
           
            if(data =='next'){
                console.log(self.currentmove)
                if(self.currentmove < moves1.length-1 ){
                    self.moveto(self.currentmove+1)
                }
                
                
                
            }else if(data=='back'){
                console.log(self.currentmove)
                if(self.currentmove > 0){
                    self.moveto(self.currentmove-1)
                }
                
            }else if(data=='first'){
                self.moveto(0)
                

                
            }else if(data=='end'){
                self.moveto(moves1.length-1)
                

            }
        })

    },
    methods:{
        async moveto(i){
            let self = this
            console.log(self.currentmove)
            if(self.currentmove<i){
                for (let index = self.currentmove; index <= i; index++) {
                await chess.move(moves1[index],{ sloppy: true })
                }
                await EventBus.$emit("displayboardfen",chess.fen())
                self.currentmove = i   
            }else if(self.currentmove>i){
                for (let index = self.currentmove; index > i; index--) {
                await chess.undo()
                }
                await EventBus.$emit("displayboardfen",chess.fen())
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