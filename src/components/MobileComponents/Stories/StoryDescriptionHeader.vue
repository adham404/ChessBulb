<template>
    <div>
        <v-sheet class="mb-8">
      <v-row class="mt-1 px-1 pb-1">
        <v-col>
          <v-avatar size="70" cols= "2" class="mx-0 px-0">
            <img src="img\icons\pexels-pixabay-220453.jpg" alt="" style="object-fit: cover">
          </v-avatar>
        </v-col>
        <v-col cols="9">
          <span class="text-h6">{{TheStoryData.UserName}}</span>
          <br>
          <span class="text-caption">{{TheStoryData.StoryExplanation}}</span>
          <br>
          <!-- <v-btn xs class="text-capitalize primary"  height="25">follow</v-btn> -->
        </v-col>
      </v-row>
    </v-sheet>
        <v-row class="my-3 " justify="space-between">
            <v-btn
            fab
            color="white"
            cols = "2"
            class="mx-10"
            @click="EventBusA.$emit('moveStory','lift')"
            >
            <v-icon>
                fa-caret-left
            </v-icon>
            </v-btn>
            <!-- <v-sheet width="250" cols = "8" rounded = "xl" height="150">
                <v-textarea
                    solo
                    name="input-7-4"
                    flat
                    readonly
                    background-color="white"
                    rounded = "xl"
                    class="text-subtitle-1"
                    value = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, quos amet velit quis fuga veniam ipsam nesciunt error ut incidunt illo! Reprehenderit, sapiente sequi optio eos deleniti culpa voluptatum earum.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus eos non voluptates! Consequuntur expedita consequatur, iure asperiores veniam ex maxime amet! Unde, ducimus rem. Aperiam aliquam asperiores tenetur similique pariatur.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, enim praesentium aliquam nemo, eaque explicabo illum, doloremque ab cupiditate incidunt quidem dignissimos ratione. Animi molestias corporis cupiditate. Blanditiis, eum beatae."
                    >
                    
                    </v-textarea>
                
            </v-sheet> -->
                <!-- <v-btn width="200" xs color="white" @click="OpenSeen">
                seen by 80 players
            </v-btn> -->
            
            <v-btn
            fab
            color = "white"
            cols = "2"
            class="mx-10"
            @click="EventBusA.$emit('moveStory','right')"
            >
                <v-icon>
                    fa-caret-right
                </v-icon>
            </v-btn>

        </v-row>


    </div>
</template>

<script>
import {EventBus} from "@/main.js"
    export default {
        data(){
        return{
            EventBusA : EventBus,
        }
    },
        methods: {
            OpenSeen(){
                EventBus.$emit("OpenSeen", true)

            }
        },
        props:["TheStoryData"]
        
    }
</script>

<style scoped>

</style>