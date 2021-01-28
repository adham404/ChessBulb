<template>
    <div>
        <v-sheet class="my-8">
            <v-row>
                <v-col cols = "2">
                <v-avatar class="ml-2">
                    <img src="@/assets/ProfilePic2.jpg" alt="" style="object-fit: cover">
                </v-avatar>
            </v-col>
            <v-col cols="9" >
                    <span class="text-h6 ml-3">Mostafa Hamido</span>
                    <v-textarea
                    solo
                    name="input-7-4"
                    placeholder = "Add a comment"
                    flat
                    rows = "2"
                    >
                    </v-textarea>
                    <v-row justify="space-around" class="my-1">
                        <v-btn rounded class="primary">Post</v-btn>
                        <v-btn rounded class="primary">Discard</v-btn>
                    </v-row>
            </v-col>
            </v-row>
            <v-text-field
            label="White Player"
            outlined
            persistent-hint
          ></v-text-field>
          <v-text-field
            label="Black Player"
            outlined
          ></v-text-field>
        </v-sheet>
        <v-sheet class="mt-8 py-3">
            <v-row class = "mt-1 mb-1" justify="center">
                <v-col>
                    <ChessBoardInput id ="1"/>
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
                <v-sheet color="primary" width="95%" class="ml-2 mt-2 mb-2 px-2" rounded = "lg" >
                <!-- <PgnReviewOutput  :pgn="Match.PGN" :id="Match.MatchId" :key ='Match.MatchId' class="text-subtitle-2" style="color: white;"/> -->
                <br>
                <span style = "color: white">Lorem ipsum dolor sit amet consectetur adipisicing elit. In doloribus impedit voluptas eveniet quos rem, esse modi laboriosam tenetur sunt. Tenetur fugit itaque minus amet aliquid recusandae expedita numquam quas!</span>
                </v-sheet>
            </div>
            
        </v-sheet>
        

    </div>
</template>

<script>
import ChessBoardInput from "@/components/MobileComponents/ChessBoardInput"
    export default {
        components: {
            ChessBoardInput
        }
        
    }
</script>

<style scoped>

</style>