<template>
  <div>
      <div>
          pgn review
          <div id="header">
              <div v-for="(i,index) in header" :key="index" >
                  <div>[{{i}}]</div>
              </div>
          </div>
          <div id="png">
              <span v-for="(i,index) in pgnoutput  " :key="index" >
                  <span>{{i.number}}.</span>
                  <span class="pgnmove" @click="moveto(i.move1num)" >{{i.move1}} </span>
                  <span class="pgnmove" @click="moveto(i.move2num)">{{i.move2}} </span>
                  <span>{{i.comment}} </span>
              </span>
          </div>
         
      </div>
  </div>
</template>

<script>
//DONE import chess.js(3min)

//DONE add every move to an array(10min)
import {EventBus} from "@/main.js"
import Chess from "chess.js"
var game ;
var moves ;
var chess;
var currentmove = -1 ;
var comments = []
export default {
    props:['pgn'],
    data(){
        return{
            header : [],
            pgnoutput : [],

        }
    },
    destroyed(){
        EventBus.$emit('Toggle',false)
    },
    async mounted(){
        // console.log(this.pgn)
        EventBus.$on('Link', link=>{
            this.$router.push({ path: link })
        })
        game = await new Chess()
        chess = await new Chess()
        var commentsengine = await new Chess()
        //DONE check if there is a png(3min)
        //DONE add pgn to chess.js(5min)
        await commentsengine.load_pgn(this.pgn,{sloppy: true})
        await console.log(commentsengine.ascii())
        console.log(await game.load_pgn(this.pgn,{sloppy: true}))
        moves = await game.history()
        console.log(this.pgn)
        console.log(moves)
        setTimeout(()=>{EventBus.$emit('Toggle',true)},100)
        var headert = await  game.header()
        for (const property in headert) {
            console.log(`${property}: ${headert[property]}`);
            this.header.push(`${property}: ${headert[property]}`)
            
        }
        console.log(this.header)
        //------------------------------------------------------------
        for(var i = 0 ; i <= moves.length;){
            if(commentsengine.get_comment() == undefined){
                await comments.unshift(null)
            }else {
                await comments.unshift('{'+commentsengine.get_comment()+'}')
            }
            
            await commentsengine.undo()
            await i++
        }
        console.log(comments)
        //-------------------------------------------------------------
        //DONE get the move to every move in png(5min) 
        var counter = 1
       moves.forEach((value, index) => {
           if(index % 2 == 0){
               var p = {
               number : counter , 
               move1 : moves[index],
               move2 : moves[index +1],
               move1num : index,
               move2num : index+1,
               comment : comments[index] || comments[index+1]
           }
           this.pgnoutput.push(p)
           counter++
           }
           
       });
       console.log(this.pgnoutput)
        //--------------------------------------------------------------
        EventBus.$on('Control', async data =>{
            console.log("comment:-") 
            console.log(chess.get_comment()) 
            if(data =='next'){
                if(currentmove < moves.length ){
                    await currentmove++
                    await chess.move(moves[currentmove],{ sloppy: true })
                    console.log(moves[currentmove])
                    //DONE find out which is best to send fen or the move"B2B5"
                    await EventBus.$emit("displayboardfen",chess.fen())
                    console.log('moved++')
                    console.log(currentmove)
                    console.log(chess.ascii())
                }
                
                
                
            }else if(data=='back'){
                
                if(currentmove > -1){
                    await currentmove--
                    await chess.undo()
                    await EventBus.$emit("displayboardfen",chess.fen())
                    console.log(chess.ascii()) 
                }
                
            }else if(data=='first'){
                this.moveto(-1);
                
            }else if(data=='end'){
                 this.moveto(moves.length);
            }
        })
    },
    methods:{
        async moveto(i){
            if(currentmove<i){
                for (let index = currentmove; index <= i; index++) {
                await chess.move(moves[index],{ sloppy: true })
                // console.log(moves[index])
                
               
                
                    
                }
                await EventBus.$emit("displayboardfen",chess.fen())
                currentmove = i
                console.log('moved++')
                console.log(currentmove)
                console.log(chess.ascii())
                
            }else if(currentmove>i){
                for (let index = currentmove; index > i; index--) {
                await chess.undo()
                // console.log(moves[index])
                // console.log(index)
                }
                await EventBus.$emit("displayboardfen",chess.fen())
                currentmove = i
                console.log('moved++')
                console.log(currentmove)
                console.log(chess.ascii())
            }
        },
        createnewpgn(){
            
        }
    }
    
    
 
}
</script>

<style scoped>
.pgnmove{
    cursor: pointer;

}


</style>

//TODO add to every move number field in the object(5min)
//TODO create a div to show the moves
//TODO make the div have a scroll
//TODO create a v for (3min)
//TODO creat a div for every move(3min)
//TODO add a v-on click for every move(3min)
//TODO add funcation to take the number of the move from the click(5min)
//TODO get the fen of this move(10min)
//TODO send the fen to the board(5min)
//TODO add controls funcation :-
//TODO add functoin to move + in the array (5min)
//TODO add functoin to move - in the array (5min)
//TODO add functoin to move to the start of the array (5min)
//TODO add functoin to move to the end of the array (5min)
//TODO create the controls buttons (5min)
//TODO link the functions to the buttons 
//TODO send the out put of the funcations to the chessboard(10min)