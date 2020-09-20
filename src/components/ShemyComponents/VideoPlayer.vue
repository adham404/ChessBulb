<template>
  <div>
      <!-- FIXME add div containing VideoPlayer that is playing (CourseVideo) (20min) -->
      <video
      id="myVideo"
      class="video-js vjs-default-skin"
      playsinline
      >
      <source :src="video" type="video/mp4" />
      </video>
      <p>معلش بنعالج ال انستراكتور بتاعنا</p>
      <!-- <p>{{this.VideoID}}</p> -->
      <button @click="SkipFive">Jump To Five Second in video</button>
      <button @click="BeginVideo">Begin</button>
      <button @click="EndVideo">End</button>
      <!-- <video controls>
      <source src="../../assets/Test.mp4" type="video/mp4" />
      </video> -->
  </div>
</template>

<script>
// import {EventBus} from "../../main";
import firebase from "firebase"
import videojs from "video.js"
import 'video.js/dist/video-js.css'

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
                VideoSrc:"",
                VideoRef:"",
                gsRef:"",
                IDVIDEO:""
        }
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
        SkipFive()
        {
            this.player.currentTime(5);
        },
        BeginVideo()
        {
            this.player.currentTime(0);
        },
        EndVideo()
        {
            this.player.currentTime(25);
        }
    },
    mounted(){
        this.GetVideoLink();
        // EventBus.$on("VideoPlayer",(ID)=>{
        //     console.log("ID Recieved for de video is: "+ ID);
        // })
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

<style>

</style>