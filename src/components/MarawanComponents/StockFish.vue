//TODO make html (5min)
//TODO add the stock fish files to the public folder(2min)
//TODO import the stockfish engine(2min)
//TODO insert the fen to the engine(3min)
//TODO get the best move(3min)
//TODO pase the info to get evaluation(10min)
//TODO calculate the evaluation(3min)

<template>
  <div >
      Stock Fish Engine<br/>
      <div> Engine is running  {{isEngineRunning}}</div>
      <div v-if="loading" > Loading...</div>
     <div id="stockcontaner">
        <div v-for="(line,index) in lines" :key="index" >
              <button @click="emitmove(line.move)" > {{line.move}} --->  {{line.score}}</button>
        </div>
      </div>
      
  </div>
</template>

<script>
import {send , massage} from '@/ChessEngine/fish.js'
import {EventBus} from '@/main.js'
// import Chess from "chess.js"
var engineStatus = {};
var isEngineRunning 
// var engine
var newfen 
export default {
    data(){
        return{
            fen : null,
            debugging : true,
            lines : [],
            isEngineRunning : false,
            showmoves:true,
            loading:false,
        }
    },
    watch:{
        isEngineRunning:function(){
            if(!this.isEngineRunning){
                if(newfen){
                send(`position fen ${newfen}`);
                send("go depth 20");
                this.lines=[]
                this.showmoves = true
                this.loading = false

                newfen = null 
                console.log('احلي تحيه من الفانكشن الشقيه ')

                }
                
            }
        }
    },
    mounted(){
        
            
        
        EventBus.$on('newfen',  fen1 => {
            console.log('move happend from event bus')
            this.lines=[]
            send('stop')
            if(!this.isEngineRunning){
                 send(`position fen ${fen1}`);
                 send("go depth 20");
            }else{
                this.loading = true
                self.showmoves = false
                newfen = fen1
            }
            console.log(fen1)
           
           
            
        });
        let self = this
            massage.onmessage = function receive (event) {
                
                var line;
                if (event && typeof event === "object") {
                    line = event.data;
                } else {
                    line = event;
                }
                
                    console.log("Reply: " + line)


                if(line == 'uciok') {
                    engineStatus.engineLoaded = true;
                    console.log('The Engine is Loaded')
                } else if(line == 'readyok') {
                    engineStatus.engineReady = true;
                } else {
                    var match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);
                    /// Did the AI move?
                    if(match) {
                        self.isEngineRunning = false;
                        console.log(isEngineRunning)
                        engineStatus.bestmove = match[1]+match[2]
                        console.log(match)

                        // game.move({from: match[1], to: match[2], promotion: match[3]});
                        // prepareMove();
                        // uciCmd("eval", evaler)
                        // evaluation_el.textContent = "";
                        //uciCmd("eval");
                    /// Is it sending feedback?
                    } else if(line.match(/^info .*\bdepth (\d+) .*\bnps (\d+)/)) {
                        self.isEngineRunning = true;
                        match = line.match(/^info .*\bdepth (\d+) .*\bnps (\d+)/)
                        engineStatus.search = 'Depth: ' + match[1] + ' Nps: ' + match[2];
                    }
                    
                    /// Is it sending feed back with a score?
                    if( line.match(/^info .*\bscore (\w+) (-?\d+)/)) {
                        match = line.match(/^info .*\bscore (\w+) (-?\d+)/)
                        var score = parseInt(match[2])
                        /// Is it measuring in centipawns?
                        if(match[1] == 'cp') {
                            engineStatus.score =(score > 0 ? '+' : '') + (score / 100.0).toFixed(2);
                        /// Did it find a mate?
                        } else if(match[1] == 'mate') {
                            engineStatus.score = 'Mate in ' + Math.abs(score);
                        }
                        
                        /// Is the score bounded?
                        // if(match = line.match(/\b(upper|lower)bound\b/)) {
                        //     engineStatus.score = ((match[1] == 'upper') == (game.turn() == 'w') ? '<= ' : '>= ') + engineStatus.score
                        // }
                    }
                    if (line.match(/^info .*\bpv ([a-h][1-8])([a-h][1-8])([qrbn])?/)) {
                        var m = line.match(/^info .*\bpv ([a-h][1-8])([a-h][1-8])([qrbn])?/)
                        // console.log(m[1]+m[2]+' '+engineStatus.score )
                        var po = { move: m[1]+'-'+m[2] , score : engineStatus.score}
                        if(self.showmoves){
                            self.lines.unshift(po)
                        }
                        
                        
                        
                    }
                }
            
            }
        
        send("uci")
    },
    methods:{
        
        move1(){
            this.lines=[]
            send(`position fen ${this.fen}`);
            send("go depth 22");
        },
        emitmove(move){
            EventBus.$emit('boardmove',move)
        }
    }

}
</script>

<style scoped >
div{
    color: white ;
}
#stockcontaner{
    
    
    width: 20vw;
    height: 15vw;
    overflow: auto;
}
#stockcontaner button{
width: 100%;
font-size: 1.5vw;

}
</style>