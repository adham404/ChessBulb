<template>
  <div>
      <!-- DONE add div containing VideoPlayer that is playing (CourseVideo) (20min) -->
      <video
      id="myVideo"
      class="video-js vjs-default-skin"
      playsinline
      @play="TimeUpdate"
      >
      <source :src="video" type="video/mp4" />
      </video>
      <p>معلش بنعالج ال انستراكتور بتاعنا</p>
      <!-- <p>{{this.VideoID}}</p> -->
      <button @click="GetCurrentTime">Get Current Time</button>
      <button @click="BeginVideo">Begin</button>
      <button @click="EndVideo">End</button>
      <div>TimeStamp Review Goes Here:</div>
      <TimeStampDisplay :ID="VID"></TimeStampDisplay>
      <div style="display: flex">
          <button>Download PGN</button>
          <button>Rate this Course</button>
      </div>
  </div>
</template>

<script>
//DONE Assign EventBus (1min) 
//DONE Assign Firebase (1min) 
import {EventBus} from "../../main";
import firebase from "firebase"
import videojs from "video.js"
import 'video.js/dist/video-js.css'
import TimeStampDisplay from "../ShemyComponents/TimeStampDisplay";
export default {
    //TODO Assign Data Properties in the vue data object which are (video(U), VideoRef(O), VideoCounter(I), player(O), options(o) VideoRecordPGNObject(A)) (1min)
    data:function()
    {
      return{
                player: '',
                options: {
                    controls: true,
                    autoplay: false,
                    fluid: false,
                    oncontextmenu: false,
                    loop: false,
                    width: 500,
                    height: 500,
                    controlBar: {
                        volumePanel: true
                    },
                },
                video:"",
                VideoRef:""
        }
    },
    components:{
        TimeStampDisplay
    },
    props:["VID"],
    methods:{
        async GetVideoLink()
        {
        // console.log("assurance: "+ ID);
        var StorageRef = firebase.storage();
        this.VideoRef = StorageRef.ref(`Courses/${this.VID}.mp4`);
        let self = this;
        let response = await self.VideoRef.getDownloadURL().then(function(url) {
        self.video = url;
        }).catch(function(error) {
            console.log("error downloading: "+ error);
        // Handle any errors
        });
        self.player = videojs('#myVideo', self.options);
        console.log(response);
        },
        TimeUpdate()
        {
            this.player.on('timeupdate', ()=>{
            console.log('the time was updated to: ' + this.player.currentTime());
            EventBus.$emit("SendTime",this.player.currentTime());
        });
        },
        GetCurrentTime()
        {
            console.log(this.player.currentTime());
        // this.player.currentTime(5);
        },
        BeginVideo()
        {
            this.player.currentTime(0);
        },
        EndVideo()
        {
            this.player.currentTime(25);
        },
        ComunicateWithTimeStamp()
        {
            EventBus.$emit("TimeStamp",this.VID);
        },
        TimeRecieve()
        {
            EventBus.$on("Navigate",(time) => {
                this.player.currentTime(time);
            })
        }
    },
        //TODO Declare Mounted Property (1min)
    mounted(){
        this.GetVideoLink();
        this.ComunicateWithTimeStamp();
        this.TimeRecieve()
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose();
        }
        }
}
</script>

<style>

</style>