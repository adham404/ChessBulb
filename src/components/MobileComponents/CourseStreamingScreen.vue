<template>
    <div>
        <div style="height: 250px; width: 100%">
            <VideoPlayer/>
        </div>
        <v-row>
            <v-col cols="8">
                <v-sheet class="px-2 py-2">
                    <ChessBoardDisplay id = "1"/>
                </v-sheet>
            </v-col>
            <v-col align-self="center">
                <v-btn class="white text-capitalize mb-2 ml-1" rounded>
                    Close
                </v-btn>
                <v-btn rounded class="text-capitalize" id="Review">
                    Review
                </v-btn>
            </v-col>
        </v-row>
        <v-row justify="space-around" class="px-2 mt-1">
            <v-sheet  rounded="lg" width="45%" class="px-2" height="200px" >
                <span class="text-subtitle-2 text-decoration-underline">TimeStamps</span>
                <br>
                <div style="overflow-y: scroll; height: 80%">
                    <div  v-for="n in 10" :key="n" >
                    <span class="text-caption">stamp</span>
                    <br>
                    </div>
                </div>
            </v-sheet>
            <v-sheet  rounded="lg" width="45%" height="200px" class="px-2">
                <span class="text-subtitle-2 text-decoration-underline">Stockfish</span>
                <br>
                <div style="overflow-y: scroll; height: 80%">
                    <div  v-for="n in 10" :key="n" >
                    <span class="text-caption">move score</span>
                    <br>
                    </div>
                </div>
            </v-sheet>
        </v-row>
        <v-dialog
      v-model="dialog"
      width="500"
      activator= "#Review"
    >

      <v-card class="py-3" rounded="lg">

  
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
                    placeholder = "Add a review"
                    flat
                    >
                    </v-textarea>
            </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-rating
                        hover
                        length="5"
                        size="20"
                        value="3"
                    >

                    </v-rating>
          <v-btn
            color="primary"
            @click="dialog = false"
            flat
            rounded
            width="100"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>

<script>
import VideoPlayer from "@/components/MobileComponents/VideoPlayer"
import ChessBoardDisplay from "@/components/MobileComponents/ChessBoardDisplay"
    export default {
        data(){
            return{
                dialog: false
            }
        },
        components: {
            VideoPlayer,
            ChessBoardDisplay

        }
    }
</script>

<style scoped>

</style>