<template>
    <div>
        <v-sheet class="mt-8">
            <v-row>
                <v-col cols="2">
                    <v-avatar size="50" class = "mb-1 ml-1">
                        <img :src="Match.UserPhotoUrl ? Match.UserPhotoUrl :'@/assets/ProfilePic2.jpg'" alt="" style="object-fit: cover">
                    </v-avatar>
                </v-col>
                <v-col cols="7">
                    <span class="text-h6">{{Match.UserName}}</span>
                </v-col>
            </v-row>
            <v-row class="mb-1">
                <span class="mx-5" style="width:90%;">
                {{Match.PostText}}
                </span>
            </v-row>
            <v-row class = "mt-1 mb-1" justify="center">
                <v-col>
                    <ChessBoardDisplay :id ='Match.MatchId'  :key ='Match.MatchId'/>
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
            <v-sheet color="primary" width="95%" class="ml-2 mt-2 mb-2 px-2" rounded = "lg">
                <PgnReviewOutput  :pgn="Match.PGN" :id="Match.MatchId" :key ='Match.MatchId' class="text-subtitle-2" style="color: white;"/>
            </v-sheet>
            <v-divider></v-divider>
            <v-row class="mt-1 mb-1" justify="space-between">
                <span cols = "4" class="ml-4 text-subtitle-2">{{ Match.noOfBrilliants }} brilliants</span>
                <span cols = "4" class="mr-4 text-subtitle-2">{{ Match.noOfAnalysis }} Analyses</span>
            </v-row>
            <v-divider>

            </v-divider>
            <v-row class="mt-1 mb-1" justify="space-around" >
                <v-btn cols="4" text @click="BrilliantClicked">
                    <v-icon left>
                    fa-exclamation
                    </v-icon>
                    
                    brilliant
                </v-btn>
                <v-btn cols="4" text @click="OpenCommentSheet">
                    <v-icon left>
                        fa-comment
                    </v-icon>
                    comment
                </v-btn>
                <v-btn cols="4" text id = "share" @click="OpenShare">
                    <v-icon left>
                        fa-share-alt
                    </v-icon>
                    share
                </v-btn>
            </v-row>
        </v-sheet>
        <!-- <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Open Dialog
        </v-btn>
      </template>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
    </v-dialog> -->
    
    </div>
</template>

<script>
import ChessBoardDisplay from "@/components/MobileComponents/ChessBoardDisplay"
import PgnReviewOutput from "@/components/MobileComponents/PgnReviewOutput.vue"
import firebase from "firebase";
import { EventBus } from "@/main";

    export default {
        props: ["Match","UserId"],
        components: {
            ChessBoardDisplay,
            PgnReviewOutput
        },
        data(){
            return{
                brilliant: false,
                Shareflag: false,
                id:"",
                ShareId:null,
                comment:"",
                link:"http://localhost:8080/Posts/",
                dialog: false,
            }
        },
        methods: {
            BrilliantClicked() {
                if (this.Match.BrilliantUsers.includes(this.UserId) && !this.Match.noOfBrilliants == 0){
                    this.Match.noOfBrilliants--;
                    this.brilliant = false;
                    let self = this
                    this.Match.BrilliantUsers.filter(function(currentValue, index, arr){
                    console.log(self.UserId + "hello from batee5")
                    if (currentValue == self.UserId) {
                        arr.splice(index)
                        console.log("user no longer likes post")
                    }
                    })
                } else{
                    this.Match.noOfBrilliants++;
                    this.brilliant = true;
                    this.Match.BrilliantUsers.push(this.UserId);
                    console.log(this.UserId)
                }
            },
            sharePost(){
			    this.share = true
            },
            OpenShare(){
                EventBus.$emit("OpenShare", true)
            },

            copy () {
                this.$copyText(this.link + this.Match.MatchId
                ).then(function (e) {
                alert('Copied')
                console.log(e)
                }, function (e) {
                alert('Can not copy')
                console.log(e)
                })
            },
            OpenCommentSheet(){
                EventBus.$emit("OpenCommentSheet", true)
            },
            generateUID() {
                this.ShareId = "Share-";
                var d = new Date().getTime(); //Timestamp
                var d2 =
                    (performance && performance.now && performance.now() * 1000) ||
                    0; //Time in microseconds since page-load or 0 if unsupported
                for (var i = 0; i < 5; i++) {
                    var r = Math.random() * 16; //random number between 0 and 16
                    if (d > 0) {
                        //Use timestamp until depleted
                        r = (d + r) % 16 | 0;
                    } else {
                        //Use microseconds since page-load if supported
                        r = (d2 + r) % 16 | 0;
                    }
                    this.ShareId = this.ShareId + r.toString(16);
                }
            },
            emitcontrol(data){
			EventBus.$emit('Controlbyid',data,this.Match.MatchId)
			console.log(data)
            },
            mounted(){
                this.id = new Date().getTime().toString() + "hi"
                console.log(this.id)
            },
            updated() {		
                firebase
                .firestore()
                .collection("Matches")
                .doc(this.Match.MatchId)
                .update({
                    noOfBrilliants: this.Match.noOfBrilliants,
                    BrilliantUsers: this.Match.BrilliantUsers,
                });
            },

            

        }
    }
</script>

<style scoped>

</style>