<template>
  <div class="Chat">
      <v-bottom-sheet v-model="sheet" scrollable>
           <v-card  min-height="40vh"  max-height="60vh">
          <!-- <v-card-title>Chat</v-card-title> -->
          <v-card-text  >
              <v-row class="mt-4" no-gutters justify="start"  v-for="(i,index) in messages" :key="index">
                  
                      <v-col class="mt-2 pr-1" cols="4">
                  {{i.name}}

                      </v-col>
                      <v-col cols="7" > 

                  <v-sheet color="grey lighten-2" class="pa-2 rounded-xl" max-width="350px"  >

             
                     {{i.message}}
              
                  </v-sheet>
                      </v-col>
                  

              </v-row>
          </v-card-text>
          <v-divider></v-divider>
        <v-card-actions>
          <v-btn fab text>
            <v-icon>
              fa-chess-board
            </v-icon>
          </v-btn>
          <v-text-field
          v-model="ChatMassage"
          v-on:keyup.enter="SendMassage"
            rounded
            background-color="grey lighten-2"
            width="300px"
            type="text"
            browser-autocomplete="new-password"
          >
          </v-text-field>
          <v-btn  @click="SendMassage" fab text>
            <v-icon>
              fa-paper-plane
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-bottom-sheet>
     
          <!-- <h2 id="SmallHeader">Chat</h2>
          <div class="Messages"  v-chat-scroll="{always: false, smooth: true}">
            <p v-for="(i,index) in messages" :key="index" >{{i.name}} : {{i.message}}</p>
          </div>          
          <div class="sendmessage" > -->
            
            
              <!-- <ChessBoardInput v-if="ShowChatBoard" id="fhefhefh" style="position:absolute;width: 200px; bottom: 0;right:0"  /> -->
              <!-- <input type="text" v-model="message" v-on:keyup.enter = "sendmessage"> -->
            
            
          <!-- <button @click="sendmessage" >Send</button>
          <button @click="ShowChatBoard = !ShowChatBoard" >Show Board</button> -->
    <!-- </div>  -->
  </div>
</template>

<script>
import { EventBus } from "../../main";

// import { EventBus } from "../../main";

export default {
    // prop:["messages"],
    // computed:{
    //     massa:function(){
    //         return this.messages
    //     }
    // },
    data(){
        return{
            sheet: false,
            messages : [],
            ChatMassage: ""
        }
    },
    mounted(){
        
        EventBus.$on("ShowLiveChat",()=>{
            this.sheet = true
        })
        EventBus.$on("NewChatMassage",(e)=>{
            this.messages.push(e)
        })
    },
    methods:{
        SendMassage(){
            //console.log("ddddddddddddddddddd")
            EventBus.$emit("SendChatMassage", this.ChatMassage)
            this.ChatMassage = ""
        }
    }

}
</script>

<style>
  

</style>