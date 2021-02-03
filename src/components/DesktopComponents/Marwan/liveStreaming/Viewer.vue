<template>
  <div class="Productive">
    <div v-if="Mounted" class="ChessBoard">
      <ChessBoardDisplay id = 'id'  />
    </div>

    <div class="CourseStream">
      
        <video class="VideoPlayer" id="fffd" ></video>
        <!-- <h2>The sicillian najdorf by Mostafa Hamido</h2> -->
        
      <!-- <button v-if="!live" @click="connect">Reconnect</button> -->
      <div class="CourseData">
        
        <div class="Chat">
          <h2 id="SmallHeader">Chat</h2>
          <div class="Messages"  v-chat-scroll="{always: false, smooth: true}">
            <p v-for="(i,index) in messages" :key="index" >{{i.name}} : {{i.message}}</p>
          </div>          
          <div class="sendmessage" >
            
            
              <!-- <ChessBoardInput v-if="ShowChatBoard" id="fhefhefh" style="position:absolute;width: 200px; bottom: 0;right:0"  /> -->
              <input type="text" v-model="message" v-on:keyup.enter = "sendmessage">
            
            
          <button @click="sendmessage" >Send</button>
          <button @click="ShowChatBoard = !ShowChatBoard" >Show Board</button>
          </div>          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChessBoardDisplay from '@/components/MarawanComponents/ChessBoard/ChessBoardDisplay'
// import ChessBoardInput from "@/components/MarawanComponents/ChessBoard/ChessBoardInput"
import {EventBus} from "@/main.js"
import firebase from "firebase"
var userid ; 
import io from "socket.io-client";
import Peer from 'peerjs';
var mypeer
var socket ;
var iceServer;
var livedata ;
var username ;
export default {
  components:{
    ChessBoardDisplay,
    // ChessBoardInput,
  },
  
  data(){
    return{
      uid : null ,
      room : null,
      message: null,
      messages:[],
      live : false,
      Mounted: false,
      ShowChatBoard:false,
      ShowOrhideEngine: true,
    }
  },
   async mounted(){
     setTimeout(() => {this.Mounted = true}, 1000)
          iceServer = {}
       let self = this
        await firebase.auth().onAuthStateChanged(async function(user) {
           if (user) {
               userid = user.uid
               self.uids = user.uid
               var currentlive =  self.$route.params.id
                livedata = await firebase.firestore().collection('Lives').doc(currentlive).get()
                var userdata = await firebase.firestore().collection('Users').doc(userid).get()
                username = userdata.data().FirstName + " " + userdata.data().LastName
                console.log(livedata.data())
               self.room =  currentlive
               if(livedata.data().iceServers){
                   
                   iceServer.stun = await livedata.data().iceServers[0].url
                   iceServer.turn = await livedata.data().iceServers[1].url
                   iceServer.username = await livedata.data().iceServers[1].username
                   iceServer.credential = await livedata.data().iceServers[1].credential
                   console.log(iceServer)
               }else{
                   console.log('error: iceServer Not ready yet')
               }
               if(userid && livedata.data().iceServers){
          console.log('connecting ...')
          self.connect()
        }else{
          alert('missing data ')
        }
               
               
           }else{
               console.log('login')
           }
        });
        
         setTimeout(() => {
      EventBus.$emit("Toggle", true);
    }, 100);
    EventBus.$on("Link", (link) => {
      this.$router.push({ path: link });
    });
  },
  destroyed(){
    EventBus.$emit("Toggle", false);
   
    
  },
  async beforeDestroy () {
    if(mypeer){
            mypeer.destroy();
          //  console.log('ddd')
        }
      if(socket){
        
        await socket.emit('left-room', this.uids)
        await socket.close()
        // console.log('a7a a7a a7a')
      }
    EventBus.$off('Link')
 },
  methods:{
    async connect(){
      this.messages = []
        if(mypeer){
           await mypeer.destroy();
        }
        if(socket){
         
      await  socket.close()
        
      }
      var url = "livechessbulbdd.herokuapp.com"
        // var url = "localhost"
     mypeer = await new Peer( userid,{
            host : url , 
            secure:true,
       port : 443,
       path : '/peerjs/myapp',
  config: {'iceServers': [
     { url: iceServer.stun },
   { url: iceServer.turn,
    username: iceServer.username,
     credential : iceServer.credential 
     }
  ]} /* Sample servers, please use appropriate ones */
})
    console.log(mypeer)
    socket = await io('https://livechessbulbdd.herokuapp.com')
    await socket.emit('joined-room',this.room, userid)
    await mypeer.on('call',async call=>{
        console.log('fdwd')
        await call.answer()
        this.live = true
        console.log('answer')
        await call.on('stream', async userVideoStream => {
        var vv = await document.getElementById('fffd')
        vv.srcObject = userVideoStream
      await vv.addEventListener('loadedmetadata',()=>{
        var promise = vv.play()
        if (promise !== undefined) {
  promise.then( () => {
    // Autoplay started!
    console.log('playinng')
  }).catch(() => {
    console.log('notplaying ')
    vv.setAttribute("controls","controls")
    // Autoplay was prevented.
    // Show a "Play" button so that user can start playback.
  });
}
      })
    })
    },e =>{console.log(e)});
     socket.on('chat-message', data => {
      this.messages.push(data)
      console.log(data)
      })
     socket.on('chess-move', data => {
      EventBus.$emit('displayboardfen',data)
      console.log(data)
      })
     socket.on('HideOrShowTheEngine', data => {
      this.ShowOrhideEngine = data ; 
      })
    },
       sendmessage(){
      if(socket && this.message != '' ){
        socket.emit('send-chat-message', {message : this.message, name : username})
        this.messages.push({message : this.message, name : username})
        this.message = ''
      }
     
    }
  },
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.Messages{
  height: 82%;
  /* background-color: green; */
  overflow-y: scroll;
  overflow-wrap: break-word;
}
.sendmessage{
  height: 10%;
  /* width: 90%;
  display: flex;
  justify-content: space-between; */
  
  /* background-color: red; */
}
#inputchat{
  position: relative;
  height: 22px;
  width: 400px;
}
.sendmessage input{
  
   font-family: "Raleway", sans-serif;
  font-weight: lighter;
  border: 1px solid #cac7c7;
  border-radius: 12px;
  padding-left: 5px;
  height: 22px;
  font-size: 1vw;
  outline: none;
  width: 400px;
  overflow-wrap: break-word;
}
p{
  margin: 5px 0px 5px 10px;
  font-family: 'QuickSand', sans-serif;
  font-weight: bold;
  color: black;
}
button{
		height: 30px;
		width: 75px;
		border: none;
		outline: none;
		border-radius: 1.2rem;
		font-size: 0.9rem;
		font-family: 'Raleway', sans-serif;
		background-color: #022A68;
		color: white;
	}
#SmallHeader{
  border-bottom: 3px solid white;
  font-size: 1.3rem;
}
h2{
  margin: 2px 0px 10px 2px;
  font-family: 'Raleway', sans-serif;
  font-weight: 600;
  color: black;
  font-size: 1.7rem;
}
.Productive{
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: white;
  overflow-x: hidden;
}
.ChessBoard{ 
  padding-top: 2px;
  padding-left: 3px; 
  width: 49%;
  /* background-color: tomato; */
  background-color:  #00112c;
}
.CourseStream{
  display: flex;
  flex-direction: column;
  width: 51%;
  /* background-color: turquoise; */
}
.VideoPlayer{
  height: 55%;
  /* background-color:violet; */
  /* border-bottom: 3px solid grey; */
}
.CourseData{
  display: flex;
  height: 45%;
  width: 100%;
  /* background-color: yellowgreen; */
}
.Chat{
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color:#1DACA8 ;
  border-radius: 10px;
  overflow: auto;
  /* background-color: aqua; */
}

</style>
