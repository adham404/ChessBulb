<template>
  <div class="Productive">
    <div class="ChessBoard">
      <ChessBoardDisplay id = 'id' />
    </div>

    <div class="CourseStream">
      
        <video class="VideoPlayer" id="fffd" ></video>
        <!-- <h2>The sicillian najdorf by Mostafa Hamido</h2> -->
        
      <!-- <button v-if="!live" @click="connect">Reconnect</button> -->
      <div class="CourseData">
        
        <div class="TimeStamps">
          <h2 id="SmallHeader">Chat</h2>
          <p v-for="(i,index) in messages" :key="index" >{{i.name}} : {{i.message}}</p>
          <div class="sendmessage">
            <input type="text" v-model="message" >
          <button @click="sendmessage" >Send</button>
          </div>
          
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import ChessBoardDisplay from '@/components/MarawanComponents/ChessBoard/ChessBoardDisplay'

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
    ChessBoardDisplay
  },
  
  data(){
    return{
      uid : null ,
      room : null,
      message: null,
      messages:[],
      live : false
    }
  },
   async mounted(){
          iceServer = {}
       let self = this
        await firebase.auth().onAuthStateChanged(async function(user) {
           if (user) {
               userid = user.uid
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
  beforeDestroy () {
    if(mypeer){
            mypeer.destroy();
          //  console.log('ddd')
        }
      if(socket){
        socket.close()
        // console.log('a7a a7a a7a')
      }
    EventBus.$off('Link')
 },
  methods:{
    async connect(){
      this.messages = []
        if(mypeer){
            mypeer.destroy();
        }
        if(socket){
        socket.close()
        
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
        await call.on('stream', userVideoStream => {
        var vv = document.getElementById('fffd')
        vv.srcObject = userVideoStream
      vv.addEventListener('loadedmetadata',()=>{
        vv.play()
      })
    })
    },e =>{console.log(e)});
     socket.on('chat-message', data => {
      this.messages.push(data)
      console.log(data)
      })
     socket.on('chess-move', data => {
      EventBus.$emit('displayboardfen',data)
      // console.log(data)
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
.sendmessage{
  position: absolute; 
  bottom: 0px;
}
.sendmessage input{
   font-family: "Raleway", sans-serif;
  font-weight: lighter;
  border: 1px solid #cac7c7;
  border-radius: 6px;
  height: 22px;
  font-size: 1vw;
}
p{
  margin: 5px 0px 5px 10px;
  font-family: 'QuickSand', sans-serif;
  font-weight: bold;
  color: black;
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
}
.ChessBoard{ 
  padding-top: 2px;
  padding-left: 3px; 
  width: 50.6%;
  /* background-color: tomato; */
  background-color:  #00112c;
}
.CourseStream{
  display: flex;
  flex-direction: column;
  width: 49.4%;
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
.TimeStamps{
  position: relative; 
  width: 100%;
  background-color:#1DACA8 ;
  border-radius: 10px;
  overflow: auto;
  /* background-color: aqua; */
}

</style>
