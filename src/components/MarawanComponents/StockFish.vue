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
  </div>
</template>

<script>

import {StockFish} from '@/main.js'
export default {
    mounted(){
        
    },
    methods:{
        fish(){
        // var engine = new Worker('StockFish/stockfish.js')
        var engine = StockFish
        engine.onmessage = function(event) {console.log(event.data);}
        function send(uci){
            engine.postMessage(uci);
        }
        send("uci")
        }
    }

}
</script>

<style>

</style>