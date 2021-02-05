<template>
  <div  class="Chat">
    <v-bottom-sheet  v-model="sheet" scrollable>
      <v-card  min-height="40vh" max-height="60vh">
        <!-- <v-card-title>Chat</v-card-title> -->
        <v-card-text  id="LiveChat" style=" scroll-behavior: smooth;"  >
          <ChatMassage v-for="(i, index) in messages"
            :key="index"
            :text="i" />
        </v-card-text> 
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click="ShowBoard" fab text>
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
            
          >
          </v-text-field>
          <v-btn @click="SendMassage" fab text>
            <v-icon>
              fa-paper-plane
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <SmallBoard :pos="LiveBoardPos"/>
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
import ChatMassage from "./ChatMassage"
import { EventBus } from "../../main";
import SmallBoard from "./SmallBoardChat/SmaillBoard"
// import { EventBus } from "../../main";

export default {
  components:{
    SmallBoard,
    ChatMassage
  },
  // prop:["messages"],
  // computed:{
  //     massa:function(){
  //         return this.messages
  //     }
  // },
  data() {
    return {
      e : EventBus,
      sheet: false,
      messages: [],
      ChatMassage: "",
      LiveBoardPos: null
    };
  },
  mounted() {
    console.log("Chat is Mounted")
    EventBus.$on("ShowLiveChat", () => {
      this.sheet = true;
    });
    EventBus.$on("NewChatMassage", e => {
      this.messages.push(e);
      setTimeout(()=>{
        var element = window.document.body.querySelector("#LiveChat");
        console.log(element)
        if(element){
        //console.log(element.scrollHeight)
        element.scrollTop = element.scrollHeight*2;
        }
      },100)
      
      
    });
    EventBus.$on("displayboardfen", e => {
      this.LiveBoardPos = e
    });
  },
  methods: {
    SendMassage() {
      //console.log("ddddddddddddddddddd")
      EventBus.$emit("SendChatMassage", this.ChatMassage);
      this.ChatMassage = "";
    },
    ShowBoard(){
      EventBus.$emit('ShowSmallBoard',this.LiveBoardPos)
    }
  }
};
</script>

<style></style>
