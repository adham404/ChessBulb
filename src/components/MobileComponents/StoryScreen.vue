<template>
    <div>
        <StoryDescriptionHeader/>
<v-sheet class="mt-8 py-3">
            <v-row class = "mt-1 mb-1" justify="center">
                <v-col>
                    <ChessBoardDisplay id ="1"/>
                </v-col>
                    
            </v-row>
            <v-row class="mb-1 mt-1" justify="center">
                <v-btn cols = "2" @click="emitcontrol('back')">
                    <v-icon>
                        fa-caret-left
                    </v-icon>
                </v-btn>
                <v-btn cols = "2" @click="emitcontrol('next')">
                    <v-icon>
                        fa-caret-right
                    </v-icon>
                </v-btn>
                <v-btn cols = "2" @click="emitcontrol('first')">
                    <v-icon>
                        fa-backward
                    </v-icon>
                </v-btn>
                <v-btn cols = "2" @click="emitcontrol('end')">
                    <v-icon>
                        fa-forward
                    </v-icon>
                </v-btn>
            </v-row>
            <div style="height: 200px; overflow-y: scroll">
                <v-sheet color="primary" width="95%" class="ml-2 mt-2 mb-2 px-2" rounded = "lg" v-for="n in 3" :key="n">
                <!-- <PgnReviewOutput  :pgn="Match.PGN" :id="Match.MatchId" :key ='Match.MatchId' class="text-subtitle-2" style="color: white;"/> -->
                <span class="text-h6" style="color: white">Line 1</span>
                <br>
                <span style = "color: white">Lorem ipsum dolor sit amet consectetur adipisicing elit. In doloribus impedit voluptas eveniet quos rem, esse modi laboriosam tenetur sunt. Tenetur fugit itaque minus amet aliquid recusandae expedita numquam quas!</span>
                </v-sheet>
            </div>
            
        </v-sheet>
        <v-bottom-sheet v-model="sheet" scrollable >
      <!-- <v-sheet
        class="text-center"
        height="100vh"
      > -->
      
        
        
        <v-card height = "80vh">
          <v-card-title height = "20px" class="py-0">
        <v-row class="my-1">
          <v-btn
          text
          @click="sheet = !sheet"
          >
            <v-icon>
              fa-arrow-left
            </v-icon>
          </v-btn>
          <span class="text-capitalize text-h6">Seen By</span>
        </v-row>
      </v-card-title>
      <v-divider></v-divider>
          <v-card-text  class="mt-3">
            <v-sheet class="mb-8" v-for="n in 10" :key = "n">
      <v-row class="mt-1 px-1 pb-1">
        <v-col>
          <v-avatar size="70" cols= "2" class="mx-0 px-0">
            <img src="img\icons\pexels-pixabay-220453.jpg" alt="" style="object-fit: cover">
          </v-avatar>
        </v-col>
        <v-col cols="9">
          <span class="text-h6">Mostafa Hamido</span>
          <br>
          <span class="text-caption">Ace chess player 😉 </span>
          <br>
          <v-btn xs class="text-capitalize primary"  height="25">follow</v-btn>
          <!-- <v-btn xs class="text-capitalize primary"  height="25">follow</v-btn> -->
        </v-col>
      </v-row>
    </v-sheet>
          </v-card-text>
        </v-card>
              

          
      <!-- </v-sheet> -->
    </v-bottom-sheet>


    </div>
</template>

<script>
import StoryDescriptionHeader from "@/components/MobileComponents/StoryDescriptionHeader"
import ChessBoardDisplay from "@/components/MobileComponents/ChessBoardDisplay"
import {EventBus} from "@/main.js"

    export default {
        data(){
            return{
                sheet: false
        }
        },
        components: {
            StoryDescriptionHeader,
            ChessBoardDisplay
        },
        mounted(){
            EventBus.$on("OpenSeen", (data) => {
                this.sheet = data
            } )
        }
    }
</script>

<style scoped>

</style>