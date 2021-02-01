<template>
  <div>
      <ChessBoardDisplay id="pop" style="width:150px"/>
          <v-sheet  scrollable  >
      <!-- <v-sheet
        class="text-center"
        height="100vh"
      > -->
      
        
        
        <v-card  >
        
      
          <v-card-text  class="mt-3">
            <div v-for="n in 1" :key = "n">
              <v-row>
            <v-col cols = "2">
                <v-avatar class="ml-2">
                    <img src="@/assets/ProfilePic2.jpg" alt="" style="object-fit: cover">
                </v-avatar>
            </v-col>
            <v-col cols="9" >
                    <v-textarea
                    solo
                    name="input-7-4"
                    placeholder = "Add a comment"
                    flat
                    readonly
                    background-color="grey lighten-2"
                    rounded = "xl"
                    class="text-subtitle-1"
                    value = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, quos amet velit quis fuga veniam ipsam nesciunt error ut incidunt illo! Reprehenderit, sapiente sequi optio eos deleniti culpa voluptatum earum.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus eos non voluptates! Consequuntur expedita consequatur, iure asperiores veniam ex maxime amet! Unde, ducimus rem. Aperiam aliquam asperiores tenetur similique pariatur.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, enim praesentium aliquam nemo, eaque explicabo illum, doloremque ab cupiditate incidunt quidem dignissimos ratione. Animi molestias corporis cupiditate. Blanditiis, eum beatae."
                    >
                    
                    </v-textarea>

            </v-col>
            </v-row>
            <v-btn text v-if="!SeeReplies" @click="SeeReplies = !SeeReplies">
              <span class="text-capitalize">See Replies</span>
            </v-btn>
              <div v-if="SeeReplies">
                  <v-row justify="end" class="pr-10" v-for="n in 2" :key = "n" >
            <v-col cols = "2">
                <v-avatar class="ml-2">
                    <img src="@/assets/ProfilePic2.jpg" alt="" style="object-fit: cover">
                </v-avatar>
            </v-col>
            <v-col cols="8" >
                    <v-textarea
                    solo
                    name="input-7-4"
                    flat
                    readonly
                    background-color="grey lighten-2"
                    rounded = "xl"
                    class="text-subtitle-1"
                    value = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, quos amet velit quis fuga veniam ipsam nesciunt error ut incidunt illo! Reprehenderit, sapiente sequi optio eos deleniti culpa voluptatum earum.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus eos non voluptates! Consequuntur expedita consequatur, iure asperiores veniam ex maxime amet! Unde, ducimus rem. Aperiam aliquam asperiores tenetur similique pariatur.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, enim praesentium aliquam nemo, eaque explicabo illum, doloremque ab cupiditate incidunt quidem dignissimos ratione. Animi molestias corporis cupiditate. Blanditiis, eum beatae."
                    >
                    
                    </v-textarea>

            </v-col>

          </v-row>
              </div>
            </div>
            <!-- <v-row v-for="n in 10" :key = "n">
            <v-col cols = "2">
                <v-avatar class="ml-2">
                    <img src="@/assets/ProfilePic2.jpg" alt="" style="object-fit: cover">
                </v-avatar>
            </v-col>
            <v-col cols="9" >
                    <v-textarea
                    solo
                    name="input-7-4"
                    placeholder = "Add a comment"
                    flat
                    readonly
                    background-color="grey lighten-2"
                    rounded = "xl"
                    class="text-subtitle-1"
                    value = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, quos amet velit quis fuga veniam ipsam nesciunt error ut incidunt illo! Reprehenderit, sapiente sequi optio eos deleniti culpa voluptatum earum.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus eos non voluptates! Consequuntur expedita consequatur, iure asperiores veniam ex maxime amet! Unde, ducimus rem. Aperiam aliquam asperiores tenetur similique pariatur.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, enim praesentium aliquam nemo, eaque explicabo illum, doloremque ab cupiditate incidunt quidem dignissimos ratione. Animi molestias corporis cupiditate. Blanditiis, eum beatae."
                    >
                    
                    </v-textarea>

            </v-col>
            </v-row> -->
            
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions >
            <v-btn fab text>
                <v-icon>
                  fa-chess-board
                </v-icon>
              </v-btn>
              <v-text-field
                rounded
                background-color = "grey lighten-2"
                width = "300px"
                type="text"
                browser-autocomplete="new-password"
              >
              </v-text-field>
              <v-btn fab text>
                <v-icon >
                  fa-paper-plane
                </v-icon>
              </v-btn>

          </v-card-actions>
        </v-card>
              

          
      <!-- </v-sheet> -->
    </v-sheet>
  </div>
</template>

<script>
import ChessBoardDisplay from "@/components/MobileComponents/ChessBoardDisplay"
export default {
    components:{
        ChessBoardDisplay
    }

}
</script>

<style>

</style>