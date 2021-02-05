<template>
  <div>
    <v-sheet height="93vh">
      <v-row no-gutters justify="center">
        <v-col>
          <ChessBoardDisplay class="ma-auto pa-0" style="width:100%" id="id" />
        </v-col>
      </v-row>
      <v-row class="ma-0" no-gutters justify="space-around">
        <video style="max-hight:30vh" class="VideoPlayer" id="fffd"></video>
        <v-btn v-if="ShowPlaybtn" @click="palyvideo">Play</v-btn>
      </v-row>
      <v-row no-gutters>
        <StockFish v-if="ShowOrhideEngine" />
      </v-row>

      <!-- <v-row no-gutters style="width:100vw" > 
        <Chat />
      </v-row> -->
    </v-sheet>
    <v-footer max-height="7.1vh" min-height="7vh">
      <v-row>
        <v-btn @click="() => e.$emit('ShowLiveChat')" rounded x-large text>
          <v-icon size="40">
            mdi-chevron-up
          </v-icon>
          Open Chat
        </v-btn>
      </v-row>
    </v-footer>
    <LiveChat :messages="messages" sheet="true" />
  </div>
</template>

<script>
// import {EventBus} from "@/main.js"
import ChessBoardDisplay from "@/components/MobileComponents/ChessBoardPointerReciever.vue";
import LiveChat from "./LiveChatp";
import StockFish from "./StockFish";
// import Chat from "@/components/MarawanComponents/LiveChat.vue"
// import ChessBoardInput from "@/components/MarawanComponents/ChessBoard/ChessBoardInput"
import { EventBus } from "@/main.js";
import firebase from "firebase";
var userid;
import io from "socket.io-client";
import Peer from "peerjs";
var mypeer;
var socket;
var iceServer;
var livedata;
var username;
export default {
  components: {
    ChessBoardDisplay,
    LiveChat,
    StockFish
    // Chat
    // ChessBoardInput,
  },

  data() {
    return {
      ShowPlaybtn: false,
      e: EventBus,
      sheet: false,
      uid: null,
      room: null,
      message: null,
      messages: [],
      live: false,
      Mounted: false,
      ShowChatBoard: false,
      ShowOrhideEngine: true
    };
  },
  async mounted() {
    // var element = window.document.body.querySelector("#app");
    //     console.log(element)
    //     if(element){
    //     console.log(element.scrollHeight)
    //     element.scrollTop = element.scrollHeight*2;
    //     }
    // EventBus.$on("SendMsgInChat",(e)=>{

    // })
    EventBus.$on("SendChatMassage", e => {
      this.sendmessage(e);
    });
    setTimeout(() => {
      this.Mounted = true;
    }, 1000);
    iceServer = {};
    let self = this;
    await firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        userid = user.uid;
        self.uids = user.uid;
        var currentlive = self.$route.params.id;
        livedata = await firebase
          .firestore()
          .collection("Lives")
          .doc(currentlive)
          .get();
        var userdata = await firebase
          .firestore()
          .collection("Users")
          .doc(userid)
          .get();
        username = userdata.data().FirstName + " " + userdata.data().LastName;
        console.log(livedata.data());
        self.room = currentlive;
        if (livedata.data().iceServers) {
          iceServer.stun = await livedata.data().iceServers[0].url;
          iceServer.turn = await livedata.data().iceServers[1].url;
          iceServer.username = await livedata.data().iceServers[1].username;
          iceServer.credential = await livedata.data().iceServers[1].credential;
          console.log(iceServer);
        } else {
          console.log("error: iceServer Not ready yet");
        }
        if (userid && livedata.data().iceServers) {
          console.log("connecting ...");
          self.connect();
        } else {
          alert("missing data ");
        }
      } else {
        console.log("login");
      }
    });

    setTimeout(() => {
      EventBus.$emit("Toggle", true);
    }, 100);
    EventBus.$on("Link", link => {
      this.$router.push({ path: link });
    });
  },
  destroyed() {
    EventBus.$emit("Toggle", false);
  },
  async beforeDestroy() {
    if (mypeer) {
      mypeer.destroy();
      //  console.log('ddd')
    }
    if (socket) {
      await socket.emit("left-room", this.uids);
      await socket.close();
      // console.log('a7a a7a a7a')
    }
    EventBus.$off("Link");
    EventBus.$off("SendChatMassage");
  },
  methods: {
    async connect() {
      this.messages = [];
      if (mypeer) {
        await mypeer.destroy();
      }
      if (socket) {
        await socket.close();
      }
      var url = "livechessbulbdd.herokuapp.com";
      // var url = "localhost"
      mypeer = await new Peer(userid, {
        host: url,
        secure: true,
        port: 443,
        path: "/peerjs/myapp",
        config: {
          iceServers: [
            { url: iceServer.stun },
            {
              url: iceServer.turn,
              username: iceServer.username,
              credential: iceServer.credential
            }
          ]
        } /* Sample servers, please use appropriate ones */
      });
      console.log(mypeer);
      socket = await io("https://livechessbulbdd.herokuapp.com");
      console.log("socket Connection", socket);
      // if(!socket.connected){
      //   socket =  io("https://livechessbulbdd.herokuapp.com")
      // }
      await socket.emit("joined-room", this.room, userid);
      await mypeer.on(
        "call",
        async call => {
          console.log("fdwd");
          await call.answer();
          this.live = true;
          console.log("answer");
          await call.on("stream", async userVideoStream => {
            var vv = await document.getElementById("fffd");
            vv.srcObject = userVideoStream;
            await vv.addEventListener("loadedmetadata", () => {
              var promise = vv.play();
              if (promise !== undefined) {
                promise
                  .then(() => {
                    // Autoplay started!
                    console.log("playinng");
                  })
                  .catch(() => {
                    console.log("notplaying ");
                    vv.setAttribute("controls", "controls");
                    this.ShowPlaybtn = true;
                    // Autoplay was prevented.
                    // Show a "Play" button so that user can start playback.
                  });
              }
            });
          });
        },
        e => {
          console.log(e);
        }
      );
      socket.on("chat-message", data => {
        this.messages.push(data);
        EventBus.$emit("NewChatMassage", data);
        console.log(data);
      });
      socket.on("chess-move", data => {
        EventBus.$emit("displayboardfen", data);
        EventBus.$emit("newfen", data);
        EventBus.$emit("ClearArrows");
        console.log(data);
      });
      socket.on("HideOrShowTheEngine", data => {
        this.ShowOrhideEngine = data;
      });
      socket.on("DrawArrrow", data => {
        EventBus.$emit("SendArrow", data);
      });
    },
    sendmessage(e) {
      if (socket && e != "") {
        socket.emit("send-chat-message", { message: e, name: username });
        EventBus.$emit("NewChatMassage", { message: e, name: username });
        // this.messages.push()
        // this.message = ''
      }
    },
    palyvideo() {
      var vv = document.getElementById("fffd");
      vv.play();
      this.ShowPlaybtn = false;
    }
  }
};
</script>

<style scoped></style>
