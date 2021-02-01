<template>
  <div> 
    <div class="NewsFeedPgn font-weight-light">
     
      <span v-for="(i, index) in movesdata" :key="index" :class=" currentmove==index ? 'active': '' " >
        
        <span class="font-weight-medium text-subtitle-2" :class=" currentmove==index ? 'active': '' "  id="pgnmove" @click="moveto(index)">{{ i }} </span>
      
      </span>
    </div>
  </div>
</template>


<script>
import {EventBus} from '@/main.js'
import Chess from "chess.js"
var chess = new  Chess()
var moves1 = [];
// var currentmove = -1 ; 
export default {
    props:["moves","startpos","activeLine"],
   
    data(){
        return{
            movesdata :null,
            currentmove : -1
        }
    },
    watch:{
        activeLine: async function(){
            // console.log("active line in line", this.activeLine)
             this.movesdata = this.moves
          moves1 = this.moves
          console.log(moves1)
          chess = await new  Chess(this.startpos);
        await EventBus.$emit("displayboardfen", chess.fen())
        this.currentmove = -1
        },
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
    beforeDestroy(){
        EventBus.$off('Control')
        EventBus.$off('GoToMove')
    },
    async mounted(){
        if(this.moves && this.startpos){
            this.movesdata = this.moves
          moves1 = this.moves
          console.log(moves1)
          chess = await new  Chess(this.startpos);
            await EventBus.$emit("displayboardfen", chess.fen())
            this.currentmove = -1
        }
        let self = this
        self.currentmove = -1;
        console.log("active line in line", self.activeLine)
        EventBus.$on("GoToMove", async data=>{
            self.moveto(data)
        })
        EventBus.$on('Control', async data =>{
            if(self.activeLine){
        
                if(data =='next'){
                    console.log(self.currentmove)
                    if(self.currentmove < moves1.length-1 ){
                        self.moveto(self.currentmove+1)
                    }
                    
                    
                    
                }else if(data=='back'){
                    console.log(self.currentmove)
                    if(self.currentmove > -1){
                        self.moveto(self.currentmove-1)
                    }
                    
                }else if(data=='first'){
                    self.moveto(0)
                    

                    
                }else if(data=='end'){
                    self.moveto(moves1.length-1)
                    

                }
            }
        })
        

    },
    methods:{
        async moveto(i){
            let self = this
            //console.log(self.currentmove)
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