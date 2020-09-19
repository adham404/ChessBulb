<template>
  <div>
      <!-- FIXME add div containing VideoPlayer that is playing (CourseVideo) (20min) -->
      <!-- <videoPlayer
        :options="playerOptions"      
        class="video-player-box"
        :playsinline="true"
        ref="videoPlayer"
        
        customEventName="customstatechangedeventname"
        @play="onPlayerPlay($event)"
        @pause="onPlayerPause($event)"
        @ended="onPlayerEnded($event)"
        @waiting="onPlayerWaiting($event)"
        @playing="onPlayerPlaying($event)"
        @loadeddata="onPlayerLoadeddata($event)"
        @timeupdate="onPlayerTimeupdate($event)"
        @canplay="onPlayerCanplay($event)"
        @canplaythrough="onPlayerCanplaythrough($event)"

        @statechanged="playerStateChanged($event)"
        @ready="playerReadied"
      ></videoPlayer> -->
      <video
      id="myVideo"
      class="video-js vjs-default-skin"
      playsinline
      >
      <source :src="video" type="video/mp4" />
      </video>
      <!-- <video controls>
      <source src="../../assets/Test.mp4" type="video/mp4" />
      </video> -->
  </div>
</template>

<script>
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
                gsRef:""
        }
    },
    mounted(){
        var StorageRef = firebase.storage();
        this.VideoRef = StorageRef.ref('Courses/Course1.mp4');
        let self = this;
        self.VideoRef.getDownloadURL().then(function(url) {
        // `url` is the download URL for 'images/stars.jpg'
        console.log("The Url is: "+url);
        self.video = url.toString();
        console.log("The Url again is: "+ self.video);
        self.player = videojs('#myVideo', self.options);
        }).catch(function(error) {
            console.log("error downloading: "+ error);
        // Handle any errors
        });
        //TODO Assign EventBus (1min) 
        //TODO Assign Firebase (1min) 
        //TODO Declare Mounted Property (1min)
        //TODO Recievng (CourseID) from props (2min)
        //FIXME Recieve (CourseVideo) from Firebase Cloud storage using CourseID (20min)
        //FIXME Recieve (VideoRecordPGNObject) from Firebase Cloud storage using CourseID (5min)
        //TODO if(VideoRecordPGNObject[VideoCounter].Time == CourseVideo.currentTime){ send VideoRecordPGNObject[VideoCounter].Move using EventBus signal to [Streaming] and increment (VideoCounter)} (5min)
    },
    components:{
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