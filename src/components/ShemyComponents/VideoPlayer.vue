<template>
  <div>
      <!-- FIXME add div containing VideoPlayer that is playing (CourseVideo) (20min) -->
      <video
      id="myVideo"
      class="video-js vjs-default-skin"
      playsinline
      @play="TimeUpdate"
      >
      <source :src="video" type="video/mp4" />
      </video>
      <!-- <p>معلش بنعالج ال انستراكتور بتاعنا</p> -->
      <!-- <p>{{this.VideoID}}</p> -->
      <!-- <button @click="GetCurrentTime">Get Current Time</button>
      <button @click="BeginVideo">Begin</button>
      <button @click="EndVideo">End</button>
      <div>TimeStamp Review Goes Here:</div> -->
      <!-- <TimeStampDisplay :ID="VID"></TimeStampDisplay> -->
      <!-- <video controls>
      <source src="../../assets/Test.mp4" type="video/mp4" />
      </video> -->
  </div>
</template>

<script>
import {EventBus} from "../../main";
import firebase from "firebase"
import videojs from "video.js"
import 'video.js/dist/video-js.css'
// import TimeStampDisplay from "../ShemyComponents/TimeStampDisplay";
// import { videoPlayer } from "vue-video-player"
export default {
    //TODO Assign Data Properties in the vue data object which are (CourseVideo(V), CourseID(S), VideoCounter(I), VideoRecordPGNObject(A)) (1min)
    data:function()
    {
      return{
                player: '',
                options: {
                    controls: true,
                    autoplay: false,
                    fluid: true,
                    aspectRatio: "16:7",
                    oncontextmenu: false,
                    loop: false,
                    controlBar: {
                        volumePanel: true
                    },
                },
                video:"",
                CurrentTime:0,
                VideoSrc:"",
                VideoRef:"",
                gsRef:"",
                IDVIDEO:"",
                
        }
    },
    components:{
        // TimeStampDisplay
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
    mounted(){
        this.GetVideoLink();
        this.ComunicateWithTimeStamp();
        this.TimeRecieve()
        //TODO Assign EventBus (1min) 
        //TODO Assign Firebase (1min) 
        //TODO Declare Mounted Property (1min)
        //TODO Recievng (CourseID) from props (2min)
        //FIXME Recieve (CourseVideo) from Firebase Cloud storage using CourseID (20min)
        //FIXME Recieve (VideoRecordPGNObject) from Firebase Cloud storage using CourseID (5min)
        //TODO if(VideoRecordPGNObject[VideoCounter].Time == CourseVideo.currentTime){ send VideoRecordPGNObject[VideoCounter].Move using EventBus signal to [Streaming] and increment (VideoCounter)} (5min)
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose();
        }
        }
}
</script>

<style scoped>

</style>