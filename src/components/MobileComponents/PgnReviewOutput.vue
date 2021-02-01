<template>
  <div>
    <div class="NewsFeedPgn font-weight-light">
      <!-- <div v-for="(i, index) in header" :key="index">
        <span class="font-weight-medium text-subtitle-2" style="color: white">[{{ i }}]</span>
      </div> -->
      <span v-for="(i, index) in pgnoutput" :key="index">
        <span class="font-weight-medium text-subtitle-2" style="color: white"
          >{{ i.number }}.</span
        >
        <span
          class="font-weight-medium text-subtitle-2"
          style="color: white"
          id="pgnmove"
          @click="moveto(i.move1num)"
          >{{ i.move1 }}
        </span>
        <span class="font-weight-medium text-subtitle-2" style="color: white"
          >{{ i.comment1 }}
        </span>
        <span
          class="font-weight-medium text-subtitle-2"
          style="color: white"
          id="pgnmove"
          @click="moveto(i.move2num)"
          >{{ i.move2 }}
        </span>
        <span class="font-weight-medium text-subtitle-2" style="color: white"
          >{{ i.comment2 }}
        </span>
      </span>
    </div>
  </div>
</template>

<script>
//DONE import chess.js(3min)

//DONE add every move to an array(10min)
import { EventBus } from "@/main.js";
import Chess from "chess.js";
// var game;
// var moves;
// var chess;
// var currentmove = -1;
// var comments = [];
export default {
  props: ["pgn", "id"],
  data() {
    return {
      game: null,
      moves: null,
      chess: null,
      currentmove: -1,
      comments: [],
      header: [],
      pgnoutput: [],
      current: this.currentmove
    };
  },

  async mounted() {
    let self = this;
    console.log(self.pgn);
    self.game = await new Chess();
    self.chess = await new Chess();
    var commentsengine = await new Chess();
    //DONE check if there is a png(3min)
    //DONE add pgn to chess.js(5min)
    await commentsengine.load_pgn(self.pgn, { sloppy: true });
    await self.game.load_pgn(self.pgn, { sloppy: true });
    self.moves = await self.game.history();
    // console.log(self.moves)
    //-----------------------------------------------------------------
    //DONE get the headers from the pgn and store them in an array
    var headert = await self.game.header();
    for (const property in headert) {
      self.header.push(`${property}: ${headert[property]}`);
    }
    //------------------------------------------------------------
    self.comments = [];
    for (var i = 0; i <= self.moves.length - 1; ) {
      if (commentsengine.get_comment() == undefined) {
        await self.comments.unshift(null);
      } else {
        await self.comments.unshift("{" + commentsengine.get_comment() + "}");
      }

      await commentsengine.undo();
      await i++;
    }
    console.log(self.comments);
    //-------------------------------------------------------------
    //DONE get the move to every move in png(5min)
    var counter = 1;
    self.moves.forEach((value, index) => {
      if (index % 2 == 0) {
        var p = {
          number: counter,
          move1: self.moves[index],
          move2: self.moves[index + 1],
          move1num: index,
          move2num: index + 1,
          comment1: self.comments[index],
          comment2: self.comments[index + 1]
        };
        self.pgnoutput.push(p);
        counter++;
      }
    });
    //--------------------------------------------------------------
    if (self.id) {
      EventBus.$on("Controlbyid", async (data, id) => {
        if (self.id == id) {
          // console.log('data control by id :'+id + '   -  ' +self.id)
          if (data == "next") {
            if (self.currentmove < self.moves.length - 1) {
              await self.currentmove++;
              await self.chess.move(self.moves[self.currentmove], {
                sloppy: true
              });
              // console.log(self.moves[self.currentmove])
              //DONE find out which is best to send fen or the move"B2B5"
              await self.EmitNewFen(self.chess.fen());
              // console.log('moved++')
              console.log(self.currentmove);
              // console.log(self.chess.ascii())
            }
          } else if (data == "back") {
            if (self.currentmove > -1) {
              await self.currentmove--;
              await self.chess.undo();
              await self.EmitNewFen(self.chess.fen());
              // console.log(self.chess.ascii())
              // console.log(self.currentmove)
            }
          } else if (data == "first") {
            self.moveto(-1);
          } else if (data == "end") {
            self.moveto(self.moves.length - 1);
          }
        }
      });
    } else {
      EventBus.$on("Control", async data => {
        if (data == "next") {
          if (self.currentmove < self.moves.length - 1) {
            await self.currentmove++;
            await self.chess.move(self.moves[self.currentmove], {
              sloppy: true
            });
            // console.log(self.moves[self.currentmove])
            //DONE find out which is best to send fen or the move"B2B5"
            await self.EmitNewFen(self.chess.fen());
            // console.log('moved++')
            console.log(self.currentmove);
            // console.log(self.chess.ascii())
          }
        } else if (data == "back") {
          if (self.currentmove > -1) {
            await self.currentmove--;
            await self.chess.undo();
            await self.EmitNewFen(self.chess.fen());
            // console.log(self.chess.ascii())
            // console.log(self.currentmove)
          }
        } else if (data == "first") {
          self.moveto(-1);
        } else if (data == "end") {
          self.moveto(self.moves.length - 1);
        }
      });
    }
  },
  beforeDestroy() {
    EventBus.$off("Control");
    EventBus.$off("Controlbyid");
  },
  methods: {
    EmitNewFen(fen) {
      // console.log('sending data '+ this.id)
      if (this.id) {
        EventBus.$emit("displayboardfenbyid", fen, this.id);
      } else {
        EventBus.$emit("displayboardfen", this.chess.fen());
      }
    },
    async moveto(i) {
      let self = this;
      if (self.currentmove < i) {
        for (let index = self.currentmove; index <= i; index++) {
          await self.chess.move(self.moves[index], { sloppy: true });
        }
        await self.EmitNewFen(self.chess.fen());
        self.currentmove = i;
      } else if (self.currentmove > i) {
        for (let index = self.currentmove; index > i; index--) {
          await self.chess.undo();
        }
        await self.EmitNewFen(self.chess.fen());
        self.currentmove = i;
      }
    }
  }
};
</script>

<style scoped>
#pgnmove {
  cursor: pointer;
}
.NewsFeedPgn {
  height: 85%;
  /* background-color: pink; */
  width: 100%;
  /* overflow-y: scroll ; */
  font-family: "open-sans", sans-serif;
  color: black;
}
span {
  margin: 0px;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  color: black;
  font-size: 0.9rem;
}
</style>

// DONE add to every move number field in the object(5min) // DONE create a div
to show the moves // DONE make the div have a scroll // DONE create a v for
(3min) // DONE creat a div for every move(3min) // DONE add a v-on click for
every move(3min) // DONE add funcation to take the number of the move from the
click(5min) // DONE get the fen of this move(10min) // DONE send the fen to the
board(5min) // DONE add controls funcation :- // DONE add functoin to move + in
the array (5min) // DONE add functoin to move - in the array (5min) // DONE add
functoin to move to the start of the array (5min) // DONE add functoin to move
to the end of the array (5min) // DONE create the controls buttons (5min) //
DONE link the functions to the buttons // DONE send the out put of the
funcations to the chessboard(10min)
