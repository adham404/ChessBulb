<template>
    <div>
        <v-sheet class="my-8">
            <v-row>
                <v-col cols = "2">
                <v-avatar class="ml-2">
                    <img :src="GetProfilePicUrl ? GetProfilePicUrl: ' @/assets/ProfilePic2.jpg'  " alt="" style="object-fit: cover">
                </v-avatar>
            </v-col>
            <v-col cols="9" >
                    <span class="text-h6 ml-3">{{GETUserFULLDATA.FirstName +' '+ GETUserFULLDATA.LastName}}</span>
                    <v-textarea
                    solo
                    name="input-7-4"
                    placeholder = "Add a comment"
                    flat
                    rows = "2"
                    v-model="PostComment"
                    >
                    </v-textarea>
                    <v-row justify="space-around" class="my-1">
                        <v-btn @click="ShareTheGame" rounded class="primary">Post</v-btn>
                        <v-btn @click="$router.push('/')" rounded class="primary">Discard</v-btn>
                    </v-row>
            </v-col>
            </v-row>
            <v-text-field
            label="White Player"
            outlined
            persistent-hint
            v-model="whitePlayer"
          ></v-text-field>
          <v-text-field
            label="Black Player"
            outlined
            v-model="blackPlayer"
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
                <v-sheet color="primary" min-height="30%" width="95%" class="ml-2 mt-2 mb-2 px-2 py-2" rounded = "lg" >
                <PgnReviewInput  />
                <!-- <br>
                <span style = "color: white">Lorem ipsum dolor sit amet consectetur adipisicing elit. In doloribus impedit voluptas eveniet quos rem, esse modi laboriosam tenetur sunt. Tenetur fugit itaque minus amet aliquid recusandae expedita numquam quas!</span> -->
                </v-sheet>
            </div>
            
        </v-sheet>
        

    </div>
</template>

<script>
import ChessBoardInput from "@/components/MobileComponents/ChessBoardInput"
import PgnReviewInput from "@/components/MobileComponents/PgnReviewInput"
import { mapActions,mapGetters } from "vuex"
import firebase from 'firebase'
import {EventBus} from "@/main"
import Chess from "chess.js"
    export default {
        components: {
            ChessBoardInput,
            PgnReviewInput
        },
        computed:{
            ...mapGetters(['GETUserFULLDATA','GetProfilePicUrl','GETUserFullName'])
        },
        methods:{
            ...mapActions(['fetchUserInfo','fetchProfilePic']),
            
            emitcontrol(data){
			    EventBus.$emit('Control',data)
			    //console.log(data)
            },
            async ShareTheGame(){
                if(this.PGN){
                    var game = await new Chess();
			        await game.load_pgn(this.PGN, { sloppy: true });
			        game.header('White Player', this.whitePlayer, 'Black Player', this.blackPlayer)
                    this.PGN = game.pgn();
                    var res = await firebase.firestore().collection("Matches").doc()
                    await res.set({
                        MatchId: res.id,
						noOfAnalysis: 0,
						noOfBrilliants: 0,
						PGN: this.PGN,
                        UserId: this.GETUserFULLDATA.UserId,
                        UserPhotoUrl :this.GetProfilePicUrl,
						WhitePlayer: this.whitePlayer,
						BlackPlayer: this.blackPlayer,
						UserName:this.GETUserFullName,
                        BrilliantUsers: [],
                        Time : firebase.firestore.Timestamp.fromDate( new Date()),
                        PostText : this.PostComment
                    })
                    this.$router.push('/')
                }
                
            }

        },
        data(){
            return{
                PGN :null,
                whitePlayer : null,
                blackPlayer : null,
                PostComment : null
            }
        },
        async mounted(){
            let self = this
            firebase.auth().onAuthStateChanged(async (user)=>{
                if(user){
                    await self.fetchUserInfo()
                    await self.fetchProfilePic()

                }
            })
            EventBus.$on("newPgn", (data) => { 
				this.PGN = data;
				console.log(data);
			});

        },
        beforeDestroy(){
            EventBus.$off("newPgn")
        }
        
    }
</script>

<style scoped>

</style>