<template>
  <div>
      <!-- FIXME add div containing VideoPlayer that is playing (CourseVideo) (20min) -->
      <video
      class="video-js"
      controls
      ref="videoPlayer"
      >
      <source src="../../assets/Test.mp4" type="video/mp4" />
      </video>
      <!-- <video controls>
      <source src="../../assets/Test.mp4" type="video/mp4" />
      </video> -->
  </div>
</template>

<script>
import * as VideoPlayer from "video.js"

export default {
    //TODO Assign Data Properties in the vue data object which are (CourseVideo(V), CourseID(S), VideoCounter(I), VideoRecordPGNObject(A)) (1min)
    data:function()
    {
      return{
        VideoSrc:"../../assets/Test.mp4",
        player: null,
        options: {
          type: Object,
          default() {
                return {};
            }
        }
      }
    },
     mounted() {
        this.player = VideoPlayer(this.$refs.videoPlayer, this.options, function onPlayerReady() {
            console.log('onPlayerReady', this);
        })
    },
    beforeDestroy() {
        if (this.player) {
            this.player.dispose()
        }
    }
//TODO Assign EventBus (1min) 
    //TODO Assign Firebase (1min) 
    //TODO Declare Mounted Property (1min)
    //TODO Recievng (CourseID) from props (2min)
    //FIXME Recieve (CourseVideo) from Firebase Cloud storage using CourseID (20min)
    //FIXME Recieve (VideoRecordPGNObject) from Firebase Cloud storage using CourseID (5min)
    //TODO if(VideoRecordPGNObject[VideoCounter].Time == CourseVideo.currentTime){ send VideoRecordPGNObject[VideoCounter].Move using EventBus signal to [Streaming] and increment (VideoCounter)} (5min)
}
</script>

<style>

</style>