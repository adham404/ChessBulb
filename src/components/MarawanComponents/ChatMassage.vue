<template>
  <v-row
            class="mt-4"
            no-gutters
            justify="start"
            
          >
            <v-col class="mt-2 pr-1" cols="4">
              {{ text.name }}
            </v-col>
            <v-col cols="7">
              <v-sheet
                color="grey lighten-2"
                class="pa-2 rounded-xl"
                max-width="350px"
              >
              <v-btn @click="ShowBoard" text v-if="isPgn" >
                {{MsgText}}
              </v-btn>
              <div v-if="!isPgn" >
                  {{text.message}}
              </div>
                
              </v-sheet>
            </v-col>
            <ShowSmallBoardDisplay/>
          </v-row>
</template>

<script>
import CheckPgn from "./checkPgn"
import {EventBus} from "@/main"
import ShowSmallBoardDisplay from "./SmallBoardChat/SmaillBoardDisPlay"
export default {
    components:{
        ShowSmallBoardDisplay
    },
    props:['text'],
    data(){
        return{
            MsgText: "",
            isPgn : false,
        }

    },
    async mounted(){
       var data = await CheckPgn(this.text.message)
       this.MsgText = data.Text
       this.isPgn = data.IsPgn
    },
    methods:{
        ShowBoard(){
            EventBus.$emit("ShowSmallBoardDisplay",this.text.message)
            console.log("pgn going to s cd",this.text.message)
        }
    }

}
</script>

<style>

</style>