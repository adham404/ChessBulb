<template>
  <v-dialog    v-model="ShowBoard" >
      <v-sheet   class="rounded-lg ma-0 pa-0" >
          <v-row no-gutters class="ma-auto">
              <v-col>
              <ChessBoardInput style="width:80vw" multi= true class="ml-4 my-3" id="ugv8gvb8g" />

              </v-col>
          </v-row>
         
          <v-row no-gutters  justify="center">
              <v-col cols="2">
                  <v-btn @click="Undo" icon >
                      <v-icon size="30">
                      mdi-chevron-left
                      </v-icon>
                  </v-btn>
              </v-col>
              <v-col cols="8">
                  <v-btn text block >
                      {{DisplayedData}}
                  <v-icon right  >
                      fa-paper-plane
                  </v-icon>
                  
              </v-btn>
              </v-col>
              <v-col cols="2">
                  <v-btn @click="Redo" icon  >
                      <v-icon size="30">
                      mdi-chevron-right
                      </v-icon>
                  </v-btn>
              </v-col>
          </v-row>
          
      </v-sheet>
  </v-dialog>
</template>

<script>
import ChessBoardInput from "@/components/MobileComponents/ChessBoardInput"
import SmollBoard from "./ChatinputBoard"
import {EventBus} from "@/main"
import Chess from "chess.js"
var logic 
export default {
    data(){
        return{
            DisplayedData: "",
            id :"ugv8gvb8g" ,
            ShowBoard:false,
            CurrentFen : "rnbqkbnr/p1pp1ppp/8/1p2p3/3P1P1P/8/PPP1P1P1/RNBQKBNR b KQkq f3 0 3"
        }
    },
    components:{
        ChessBoardInput,
    },
    async mounted(){
        let self = this
        console.log("ChatBoard is Mounted")
        // logic= await SmollBoard("rnbqkbnr/p1pp1ppp/8/1p2p3/3P1P1P/8/PPP1P1P1/RNBQKBNR b KQkq f3 0 3")
        //await EventBus.$emit('boradfen',logic.TheFen())
        EventBus.$on("ShowSmallBoard" , async (e)=>{
            self.ShowBoard =true
            //console.log(e)
            logic= await SmollBoard(e||this.CurrentFen)
            await EventBus.$emit('boradfen',logic.TheFen())
        })
        EventBus.$on("newmoveInMulti",async data=>{
            console.log("gggggggg",data.lastmove)
            if(data.id == self.id){
               await logic.PlayMove(data.lastmove)
               // console.log(await logic.TheFen())
                //EventBus.$emit('boradfen',logic.TheFen())
                self.DisplayedData =await  self.RemoveHeaders(logic.ThePgn())
                // console.log(logic.ThePgn())
                // console.log(self.RemoveHeaders(logic.ThePgn()))
            }
        })
    },
    beforeDestroy(){
        EventBus.$off("newmoveInMulti")
        EventBus.$off("ShowSmallBoard")
    },
    methods:{
        async Undo(){
            await logic.Undo()
            await EventBus.$emit('boradfen',logic.TheFen())
        },
        async Redo(){
            await logic.Redo()
            await EventBus.$emit('boradfen',logic.TheFen())
        },
        RemoveHeaders(pgn){
            const engine = new Chess();
            engine.load_pgn(pgn)
            var headers = engine.header()
            //console.log('headers',Object.keys(headers).length )
            if(Object.keys(headers).length >0){
            var headersSize = headers.toString().split(",").length
            //console.log("headersSize",headersSize)
            var pgnList = engine.pgn().split("\n")
            // console.log(headersSize)
            return pgnList.slice(headersSize+1).join("\n")
            }else{
                return  engine.pgn()
            }
            
        }
    }

}
</script>

<style>

</style>