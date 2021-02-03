<template>
  <!-- <div class="ChessEngine" > -->
  <v-sheet
    color="primary"
    min-height="40"
    width="95%"
    class="ml-2 mt-2 mb-2"
    rounded="lg"
  >
    <v-chip-group class="pl-2" >
      <!-- <p v-if="loading" > Loading...</p> -->
      <v-skeleton-loader
        dark
        v-if="loading"
        class="py-1 mx-1"
        type="chip"
      ></v-skeleton-loader>
      <v-skeleton-loader
        dark
        v-if="loading"
        class="py-1 mx-1"
        type="chip"
      ></v-skeleton-loader>
      <v-chip
        v-for="(line, index) in lines"
        :key="index"
        @click="emitmove(line.move)"
      >
        {{ line.score }} {{ GetCorrectMoveFormat(fen, line.move) }}
      </v-chip>
    </v-chip-group>
  </v-sheet>
  <!-- <h2 id="SmallHeader">StockFish</h2>
      <p v-if="loading" > Loading...</p>
      <p  v-for="(line,index) in lines" :key="index" @click="emitmove(line.move)" > {{GetCorrectMoveFormat(fen,line.move)}}  {{line.score}}</p>   -->
  <!-- </div> -->
</template>

<script>
import { send, massage } from "./fish.js";
import { EventBus } from "@/main.js";
import Chess from "chess.js";
var engineStatus = {};
// var isEngineRunning
// var engine
var newfen;
export default {
  data() {
    return {
      fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      debugging: true,
      lines: [],
      isEngineRunning: false,
      showmoves: true,
      loading: false
    };
  },
  watch: {
    isEngineRunning: function() {
      if (!this.isEngineRunning) {
        if (newfen) {
          send(`position fen ${newfen}`);
          send("go depth 20");
          this.lines = [];
          this.showmoves = true;
          this.loading = false;

          newfen = null;
          console.log("the engine stoped now run new fen");
        }
      }
    }
  },
  beforeDestroy() {
    EventBus.$off("newfen");
  },
  mounted() {
    send(`position startpos `);
    send("go depth 20");

    EventBus.$on("newfen", fen1 => {
      console.log("move happend from event bus in the stockfish");
      this.lines = [];
      this.fen = fen1;
      if (!this.isEngineRunning) {
        console.log("the engine was not running sent the fen ", fen1);
        send(`position fen ${fen1}`);
        send("go depth 20");
      } else {
        send("stop");
        console.log(
          "the engine was running show loading and send stop and wait to stop"
        );
        this.loading = true;
        self.showmoves = false;
        newfen = fen1;
      }
      // console.log(fen1)
    });
    let self = this;
    massage.onmessage = function receive(event) {
      var line;
      if (event && typeof event === "object") {
        line = event.data;
      } else {
        line = event;
      }

      // console.log("Reply: " + line)

      if (line == "uciok") {
        engineStatus.engineLoaded = true;
        console.log("The Engine is Loaded");
      } else if (line == "readyok") {
        engineStatus.engineReady = true;
      } else {
        var match = line.match(/^bestmove ([a-h][1-8])([a-h][1-8])([qrbn])?/);
        /// Did the AI move?
        if (match) {
          self.isEngineRunning = false;
          // console.log(isEngineRunning)
          engineStatus.bestmove = match[1] + match[2];
          // console.log(match)

          // game.move({from: match[1], to: match[2], promotion: match[3]});
          // prepareMove();
          // uciCmd("eval", evaler)
          // evaluation_el.textContent = "";
          //uciCmd("eval");
          /// Is it sending feedback?
        } else if (line.match(/^info .*\bdepth (\d+) .*\bnps (\d+)/)) {
          self.isEngineRunning = true;
          match = line.match(/^info .*\bdepth (\d+) .*\bnps (\d+)/);
          engineStatus.search = "Depth: " + match[1] + " Nps: " + match[2];
        }

        /// Is it sending feed back with a score?
        if (line.match(/^info .*\bscore (\w+) (-?\d+)/)) {
          match = line.match(/^info .*\bscore (\w+) (-?\d+)/);
          var score = parseInt(match[2]);
          /// Is it measuring in centipawns?
          if (match[1] == "cp") {
            engineStatus.score =
              (score > 0 ? "+" : "") + (score / 100.0).toFixed(2);
            /// Did it find a mate?
          } else if (match[1] == "mate") {
            engineStatus.score = "Mate in " + Math.abs(score);
          }

          /// Is the score bounded?
          // if(match = line.match(/\b(upper|lower)bound\b/)) {
          //     engineStatus.score = ((match[1] == 'upper') == (game.turn() == 'w') ? '<= ' : '>= ') + engineStatus.score
          // }
        }
        if (line.match(/^info .*\bpv ([a-h][1-8])([a-h][1-8])([qrbn])?/)) {
          var m = line.match(/^info .*\bpv ([a-h][1-8])([a-h][1-8])([qrbn])?/);
          // console.log(m[1]+m[2]+' '+engineStatus.score )
          var po = { move: m[1] + "-" + m[2], score: engineStatus.score };
          if (self.showmoves) {
            // self.lines.unshift(po)
            self.AddNewLine(po);
            // console.log(po.move)
          }
        } else if (line == "info depth 0 score mate 0") {
          console.log("gameover");
        }
      }
    };

    send("uci");
  },
  methods: {
    async AddNewLine(NewLine) {
      if (this.lines.length > 0 && NewLine.move == this.lines[0].move) {
        await this.lines.shift();
      }
      var idindex = await this.lines.findIndex(x => x.move == NewLine.move);
      if (idindex > -1) {
        await this.lines.splice(idindex, 1);
      }
      await this.lines.unshift(NewLine);
    },

    GetCorrectMoveFormat(thefen, move) {
      if (thefen && move) {
        const chess = new Chess(thefen);
        chess.move(move, { sloppy: true });
        return chess.history()[0];
      }
    },
    emitmove(move) {
      EventBus.$emit("boardmove", move);
    }
  }
};
</script>

<style scoped>
/* p{
  margin: 5px 0px 5px 10px;
  font-family: 'QuickSand', sans-serif;
  font-weight: bold;
  color: black;
}
#SmallHeader{
  border-bottom: 3px solid white;
  font-size: 1.3rem;
}
h2{
  margin: 2px 0px 10px 2px;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  color: black;
  font-size: 1.7rem;
} */
.ChessEngine {
  width: 95%;
  height: 100%;
  background-color: #0487af;
  border-radius: 10px;
  /* overflow: auto; */
  /* background-color: blueviolet; */
}
</style>
