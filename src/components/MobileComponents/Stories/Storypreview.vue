<template>
    <div>
      <v-sheet class="mt-8 py-3">
      <v-row class="mt-1 mb-1" justify="center">
        <v-col>
          <ChessBoardDisplay id="1" />
        </v-col>
      </v-row>
      <v-row class="mb-1 mt-1" justify="center">
        <v-btn cols="2" @click="emitcontrol('back')">
          <v-icon>
            fa-caret-left
          </v-icon>
        </v-btn>
        <v-btn cols="2" @click="emitcontrol('next')">
          <v-icon>
            fa-caret-right
          </v-icon>
        </v-btn>
        <v-btn cols="2" @click="emitcontrol('first')">
          <v-icon>
            fa-backward
          </v-icon>
        </v-btn>
        <v-btn cols="2" @click="emitcontrol('end')">
          <v-icon>
            fa-forward
          </v-icon>
        </v-btn>
      </v-row>
      <div style="height: 200px; overflow-y: scroll">
        <v-sheet
          color="primary"
          width="95%"
          class="ml-2 mt-2 mb-2 px-2"
          rounded="lg"
          v-for="(Line, index) in TheStoryData.Moves"
          :key="index"
          @click="changeline(index)"
        >
          
          <span class="text-h6" style="color: white">Line {{ index+1 }} {{ CurrentLine ==index ? "*" : '' }}</span>
          <br />
          <MovePreviewOutput key="index" :moves="Line.Moves" :startpos="TheStoryData.StartingFen" :activeLine="  CurrentLine ==index  "   />
          
        </v-sheet>
      </div>
    </v-sheet>
    
    </div>    
</template>

<script>
import MovePreviewOutput from "@/components/MobileComponents/MovePreview/MovePreviewOutput.vue"
import ChessBoardDisplay from "@/components/MobileComponents/ChessBoardDisplay";
//import { EventBus1 } from "@/main.js";
import { EventBus } from '../../../main';
export default {
    components:{
        ChessBoardDisplay,
        MovePreviewOutput
    },
    props:["TheStoryData"],
    data(){
        return{
            //EventBus : EventBus1,
            CurrentLine: 0 ,
        }
    },
    methods:{
        emitcontrol(data){
			EventBus.$emit('Control',data)
			//console.log(data)
        },
        changeline(index){
            //console.log('pop in line',index)
            this.CurrentLine = index
        }
    }

}
</script>

<style>

</style>