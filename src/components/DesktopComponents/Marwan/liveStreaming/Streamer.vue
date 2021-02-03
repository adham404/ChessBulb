<template>
  <div >
    <v-row>
      <v-col cols="6" align="center">
        <v-row justify="center" class="mt-5">
          <v-sheet width="80%">
            <ChessBoardInput id="id"/>
          </v-sheet>
        </v-row>
      </v-col>

      <v-col cols="6">
        <v-row>
          <v-sheet height="280px" class="mt-8">
            <video style="height: 100%" id="recordervideo"></video>
          </v-sheet>
          
        </v-row>
        <v-row class = "mt-7">
          <v-btn v-if="!live" @click="checkandconnect" rounded>
            <span class="text-subtitle2 text-capitalize">
              Start Streaming
            </span>
          </v-btn>
          <v-btn @click="remountStockFish" rounded class="text-subtitle-2 text-capitalize">Restart StockFish</v-btn>
          <v-btn cols="2" @click="emitcontrol('back')">
            <v-icon>
              fa-caret-left
            </v-icon>
          </v-btn>
          <v-btn cols="2" @click="emitcontrol('next')">
            <v-icon>
              fa-caret-right
            </v-icon>
          </v-btn>
        </v-row>
        <v-row>
          <v-col class="px-0">
            <v-row>
              <StockFish v-if="showStockfish"></StockFish>
            </v-row>
            <!-- <div class="TimeStamps">
                <div class="Chat">
                  <h2 id="SmallHeader">Chat</h2>
                  <div
                    class="Messages"
                    v-chat-scroll="{ always: false, smooth: true }"
                  >
                    <p v-for="(i, index) in messages" :key="index">
                      {{ i.name }} : {{ i.message }}
                    </p>
                  </div>
                  <p v-for="(i, index) in messages" :key="index">
                    {{ i.name }} : {{ i.message }}
                  </p>
                  <p v-for="i in UsersArray" :key="i.id">{{ i.name }}</p>
                  <div class="sendmessage">
                    <input
                      type="text"
                      v-model="message"
                      v-on:keyup.enter="sendmessage"
                    />
                    <button @click="sendmessage">Send</button>
                  </div>
                </div>
            </div> -->
            <v-card width="90%">
              <v-card-title height="20px" class="py-0">
                <v-row class="my-1">
                    <!-- <v-btn text @click="sheet = !sheet">
                      <v-icon>
                        fa-arrow-left
                      </v-icon>
                    </v-btn> -->
                    <span class="text-h6">Chat Room</span>
                </v-row>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text class="mt-3" >
                <div style = "overflow-y: scroll; height: 100px" v-chat-scroll="{ always: false, smooth: true }">
                  <p v-for="(i, index) in messages" :key="index">
                    {{ i.name }} : {{ i.message }}
                  </p>
                </div>
              </v-card-text>
              <v-divider></v-divider>
              <v-card-actions>
                <!-- <v-btn fab text>
                  <v-icon>
                    fa-chess-board
                  </v-icon>
                </v-btn> -->
                <v-text-field
                  rounded
                  background-color="grey lighten-2"
                  width="300px"
                  type="text"
                  browser-autocomplete="new-password"
                  v-model="message"
                  v-on:keyup.enter="sendmessage"
                >
                </v-text-field>
                <v-btn fab text @click="sendmessage">
                  <v-icon>
                    fa-paper-plane
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- <div class="ChessBoard">     
    </div> -->
    <!-- <div class="CourseStream"> -->
      <!-- <div class="VideoPlayer"> -->
      <!-- <h2>The sicillian najdorf by Mostafa Hamido</h2> -->
      <!-- <button >Start Streaming</button> -->
      <!-- </div> -->
      <!-- <div class="CourseData"> -->
      <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import ChessBoardInput from "../../ChessBoardPointer";
import StockFish from "@/components/MarawanComponents/StockFish";
import firebase from "firebase";
import { EventBus } from "@/main.js";
import io from "socket.io-client";
import Peer from "peerjs";
var mypeer;
var socket;
var userid;
var livedata;
var stopcam;
var iceServer = {};
var currentStamp = -1;
export default {
  components: {
    ChessBoardInput,
    StockFish
  },
  data() {
    return {
      showStockfish: true,
      live: false,
      uid: null,
      room: null,
      message: null,
      messages: [],
      fen: null,
      UsersArray: [],
      MovesArray: ["rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"],
      CurrentMove: 0
    };
  },
  mounted() {
    EventBus.$on("PointerDrawn", e => {
      if (socket) {
        socket.emit("NewArrow", e);
      }
    });
    iceServer = {};
    let self = this;
    firebase.auth().onAuthStateChanged(async function(user) {
      if (user) {
        userid = user.uid;
        var currentlive = self.$route.params.id;
        livedata = await firebase
          .firestore()
          .collection("Lives")
          .doc(currentlive)
          .get();
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
    if (stopcam) {
      stopcam();
    }
  },
  beforeDestroy() {
    if (mypeer) {
      mypeer.destroy();
      //  console.log('ddd')
    }
    if (socket) {
      socket.close();
      // console.log('a7a a7a a7a')
    }
    EventBus.$off("Link");
    EventBus.$off("newfen");
    EventBus.$off("Control");
  },
  methods: {
    remountStockFish() {
      this.showStockfish = false;
      setTimeout(() => {
        this.showStockfish = true;
      }, 100);
    },
    emitcontrol(data) {
      EventBus.$emit('Control',data)
			console.log(data)
    },
    async PlayMoveFromFEN(FEN) {
      if (this.CurrentMove == this.MovesArray.length - 1) {
        await this.sendchessmove(FEN);
        await this.MovesArray.push(FEN);
        await this.CurrentMove++;
      } else {
        await this.DeletTheOldLine();
        await this.sendchessmove(FEN);
        await this.MovesArray.push(FEN);
        await this.CurrentMove++;
      }
      // EventBus.$emit("boradfen",FEN)
    },
    DeletTheOldLine() {
      for (var i = this.MovesArray.length - 1; i > this.CurrentMove; i--) {
        this.MovesArray.pop();
      }
    },
    async UndoTheFen() {
      if (this.CurrentMove > 0) {
        await this.CurrentMove--;
        await this.sendchessmove(this.MovesArray[this.CurrentMove]);
        EventBus.$emit("boradfen", this.MovesArray[this.CurrentMove]);
      }
    },
    async RedoTheFen() {
      if (this.CurrentMove < this.MovesArray.length - 1) {
        await this.CurrentMove++;
        await this.sendchessmove(this.MovesArray[this.CurrentMove]);
        EventBus.$emit("boradfen", this.MovesArray[this.CurrentMove]);
      }
    },
    checkandconnect() {
      if (userid && livedata.data().iceServers) {
        this.connect();
        EventBus.$on("newfenAndmove", fen => {
          this.PlayMoveFromFEN(fen[0]);
        });
        EventBus.$on("Control", async data => {
          if (data == "next") {
            await this.RedoTheFen();
          } else if (data == "back") {
            await this.UndoTheFen();
          }
        });
        EventBus.$on("Control", async data => {
          if (data == "next") {
            await currentStamp++;
            var e = await this.moves[currentStamp];

            await EventBus.$emit("boradfen", e);
            this.sendchessmove(e);
            console.log(this.timestamps);
          } else if (data == "back") {
            await currentStamp--;
            e = await this.moves[currentStamp];
            await EventBus.$emit("boradfen", e);

            this.sendchessmove(e);

            console.log(this.timestamps);
          }
        });
      } else {
        alert("Error: There are no data ");
      }
    },
    async connect() {
      let self = this;
      this.messages = [];
      if (mypeer) {
        await mypeer.destroy();
        //  console.log('ddd')
      }
      if (socket) {
        socket.close();
        // console.log('a7a a7a a7a')
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
      await socket.emit("joined-room", this.room, userid);

      const myvideo = document.getElementById("recordervideo");
      myvideo.muted = true;
      navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: true
        })
        .then(stream => {
          stopcam = function() {
            stream.getTracks().forEach(function(track) {
              track.stop();
            });
          };
          socket.on("userconnected", async userId => {
            console.log(userId);
            var userName = await this.GetUserNameFromId(userId);
            this.UsersArray.push({ id: userId, name: userName });
            const call = mypeer.call(userId, stream);
            mypeer.on("error", e => {
              console.log(e);
            });
            console.log("calling", call);
          });
          myvideo.srcObject = stream; // stream --> camera    Myvideo ==> <video id="video" ></video>

          myvideo.addEventListener("loadedmetadata", () => {
            myvideo.play();
            self.live = true;
            console.log(self.live);
          });
        });
      socket.on("chat-message", data => {
        this.messages.push(data);
        console.log(data);
      });
      socket.on("userdisconnected", data => {
        // this.messages.push(data)
        console.log("left the stream", data);
        var idindex = this.UsersArray.findIndex(x => x.id == data);
        if (idindex > -1) {
          this.UsersArray.splice(idindex, 1);
        }
      });
    },
    sendmessage() {
      if (socket && this.message != "") {
        socket.emit("send-chat-message", {
          message: this.message,
          name: "The Instructor"
        });
        this.messages.push({ message: this.message, name: "The Instructor" });
        this.message = "";
      }
    },
    sendchessmove(fen) {
      if (socket) {
        socket.emit("send-chess-move", fen);
      }
    },
    sendEngineShowOrHide(data) {
      if (socket) {
        socket.emit("HideOrShowTheChessEngine", data);
      }
    },
    async GetUserNameFromId(ID) {
      var nna;
      await firebase
        .firestore()
        .collection("Users")
        .doc(ID)
        .get()
        .then(doc => {
          nna =
            doc.data().FirstName.toString() +
            " " +
            doc.data().LastName.toString();
          console.log(nna);
        });
      return nna.toString();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sendmessage {
  margin-left: 2vw;
  position: absolute;
  bottom: 0px;
}
.sendmessage input {
  font-family: "Raleway", sans-serif;
  font-weight: lighter;
  border: 1px solid #cac7c7;
  border-radius: 6px;
  height: 22px;
  font-size: 1vw;
}
p {
  margin: 5px 0px 5px 10px;
  font-family: "QuickSand", sans-serif;
  font-weight: bold;
  color: black;
}
#SmallHeader {
  border-bottom: 3px solid white;
  font-size: 1.3rem;
}
h2 {
  margin: 2px 0px 10px 2px;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  color: black;
  font-size: 1.7rem;
}
.Productive {
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: white;
}
.ChessBoard {
  padding-top: 2px;
  padding-left: 3px;
  width: 100%;
  /* background-color: tomato; */
  height: 100%;
  background-color: #00112c;
}
.CourseStream {
  display: flex;
  flex-direction: column;
  width: 49.4%;
  /* background-color: turquoise; */
}
.VideoPlayer {
  height: 400px;
  /* background-color:violet; */
  /* border-bottom: 3px solid grey; */
}
.CourseData {
  display: flex;
  height: 45%;
  width: 100%;
  /* background-color: yellowgreen; */
}
.TimeStamps {
  position: relative;
  width: 50%;
  background-color: #1daca8;
  border-radius: 10px;
  /* background-color: aqua; */
}
.Messages {
  height: 100px;
  /* background-color: green; */
  overflow-y: scroll;
  overflow-wrap: break-word;
}
.sendmessage {
  height: 20%;
  /* background-color: red; */
}
.sendmessage input {
  font-family: "Raleway", sans-serif;
  font-weight: lighter;
  border: 1px solid #cac7c7;
  border-radius: 12px;
  padding-left: 5px;
  height: 22px;
  font-size: 1vw;
  outline: none;
  width: 250px;
  overflow-wrap: break-word;
}
#SmallHeader {
  border-bottom: 3px solid white;
  font-size: 1.3rem;
}
.Chat {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #1daca8;
  border-radius: 10px;
  overflow: auto;
  /* background-color: aqua; */
}
.Engine {
  width: 50%;
  height: 100%;
}
/* button {
  height: 30px;
  width: 150px;
  border: none;
  outline: none;
  border-radius: 1.2rem;
  font-size: 0.9rem;
  font-family: "Raleway", sans-serif;
  background-color: #022a68;
  color: white;
  margin-top: 5px;
} */
</style>
