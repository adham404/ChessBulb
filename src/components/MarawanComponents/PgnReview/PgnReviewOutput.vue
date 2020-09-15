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
                  <span>{{i.comment1}} </span>
                  <span class="pgnmove" @click="moveto(i.move2num)">{{i.move2}} </span>
                  <span>{{i.comment2}} </span>
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
            current: currentmove

        }
    },
    async mounted(){
        game = await new Chess()
        chess = await new Chess()
        var commentsengine = await new Chess()
        //DONE check if there is a png(3min)
        //DONE add pgn to chess.js(5min)
        await commentsengine.load_pgn(this.pgn,{sloppy: true})
        await game.load_pgn(this.pgn,{sloppy: true})
        moves = await game.history()
        // console.log(moves)
//-----------------------------------------------------------------
//DONE get the headers from the pgn and store them in an array 
        var headert = await  game.header()
        for (const property in headert) {
            this.header.push(`${property}: ${headert[property]}`)
            
        }
        //------------------------------------------------------------
        comments = [];
        for(var i = 0 ; i <= moves.length-1;){
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
               comment1 : comments[index] ,
               comment2 : comments[index+1],
           }
           this.pgnoutput.push(p)
           counter++
           }
           
       });
        //--------------------------------------------------------------
        EventBus.$on('Control', async data =>{
            if(data =='next'){
                if(currentmove < moves.length-1 ){
                    await currentmove++
                    await chess.move(moves[currentmove],{ sloppy: true })
                    // console.log(moves[currentmove])
                    //DONE find out which is best to send fen or the move"B2B5"
                    await EventBus.$emit("displayboardfen",chess.fen())
                    // console.log('moved++')
                    console.log(currentmove)
                    // console.log(chess.ascii())
                }
                
                
                
            }else if(data=='back'){
                
                if(currentmove > -1){
                    await currentmove--
                    await chess.undo()
                    await EventBus.$emit("displayboardfen",chess.fen())
                    // console.log(chess.ascii()) 
                    // console.log(currentmove)

                }
                
            }else if(data=='first'){
                this.moveto(-1);
                

                
            }else if(data=='end'){
                 this.moveto(moves.length-1);
                

            }
        })
    },
    methods:{
        async moveto(i){
            if(currentmove<i){
                for (let index = currentmove; index <= i; index++) {
                await chess.move(moves[index],{ sloppy: true })   
                }
                await EventBus.$emit("displayboardfen",chess.fen())
                currentmove = i   
            }else if(currentmove>i){
                for (let index = currentmove; index > i; index--) {
                await chess.undo()
                }
                await EventBus.$emit("displayboardfen",chess.fen())
                currentmove = i
            }
        },
        
    }
    
    
 
}
</script>

<style scoped>
.pgnmove{
    cursor: pointer;

}


</style>

// DONE add to every move number field in the object(5min)
// DONE create a div to show the moves
// DONE make the div have a scroll
// DONE create a v for (3min)
// DONE creat a div for every move(3min)
// DONE add a v-on click for every move(3min)
// DONE add funcation to take the number of the move from the click(5min)
// DONE get the fen of this move(10min)
// DONE send the fen to the board(5min)
// DONE add controls funcation :-
// DONE add functoin to move + in the array (5min)
// DONE add functoin to move - in the array (5min)
// DONE add functoin to move to the start of the array (5min)
// DONE add functoin to move to the end of the array (5min)
// DONE create the controls buttons (5min)
// DONE link the functions to the buttons 
// DONE send the out put of the funcations to the chessboard(10min)