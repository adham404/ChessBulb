//TODO make html (5min)
//TODO add the stock fish files to the public folder(2min)
//TODO import the stockfish engine(2min)
//TODO insert the fen to the engine(3min)
//TODO get the best move(3min)
//TODO pase the info to get evaluation(10min)
//TODO calculate the evaluation(3min)

<template>
  <div>
      Stock Fish Engine
      <button @click="fish" >Run StockFish</button>
      <button @click="re" >reinit StockFish</button>
  </div>
</template>

<script>

import {send , massage} from '@/ChessEngine/fish.js'
// var engine
export default {
    data(){
        return{
        }
    },
    mounted(){
        // engine = new Worker('')
    },
    methods:{
        fish(){
        
        massage.onmessage = function(event) {console.log(event.data);}
        
        send("uci")
        },
        re(){
            
        }
    }

}
</script>

<style>
div{
    color: white ;
}

</style>