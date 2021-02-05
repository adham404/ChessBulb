<template>
  <div>
    <div><video id="recorder" ref="recorder"></video></div>
    <p>{{ status }}</p>
    <div>
      <v-btn rounded id="btnstart" v-on:click="startrecord">START RECORD</v-btn>
      <v-btn rounded id="btnstop" v-on:click="stoprecord">STOP</v-btn>
      <v-btn rounded id="btnstop" v-on:click="puserecording">PaUSE</v-btn>
      <v-btn  rounded id="btnstop" v-on:click="resumerecording">RESUME</v-btn>
    </div>
  </div>
</template>

<script>
import { EventBus } from "@/main";
let mediaRecorder;
//  let blobrecorded
var stopcam;
export default {
  data: () => {
    return {
      url: null,
      clock: null,
      status: null
    };
  },
  destroyed() {
    stopcam();
  },
  mounted() {
    this.status = "NOT RECORDING";
    let constraintObj = {
      audio: true,
      video: {
        facingMode: "user",
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 480, ideal: 720, max: 1080 }
      }
    };
    // width: 1280, height: 720  -- preference only
    // facingMode: {exact: "user"}
    // facingMode: "environment"

    //handle older browsers that might implement getUserMedia in some way
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
      navigator.mediaDevices.getUserMedia = function(constraintObj) {
        let getUserMedia =
          navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia) {
          return Promise.reject(
            new Error("getUserMedia is not implemented in this browser")
          );
        }
        return new Promise(function(resolve, reject) {
          getUserMedia.call(navigator, constraintObj, resolve, reject);
        });
      };
    } else {
      navigator.mediaDevices
        .enumerateDevices()
        .then(devices => {
          // devices.forEach(device=>{
          //     console.log(device.kind.toUpperCase(), device.label);
          //     //, device.deviceId
          // }
          // )
          return devices;
        })
        .catch(err => {
          console.log(err.name, err.message);
        });
    }

    navigator.mediaDevices
      .getUserMedia(constraintObj)
      .then(function(mediaStreamObj) {
        stopcam = function() {
          mediaStreamObj.getTracks().forEach(function(track) {
            track.stop();
          });
        };
        //connect the media stream to the first video element
        let video = document.getElementById("recorder");
        video.muted = true;
        if ("srcObject" in video) {
          video.srcObject = mediaStreamObj;
        } else {
          //old version
          video.src = window.URL.createObjectURL(mediaStreamObj);
        }

        video.onloadedmetadata = function() {
          //show in the video element what is being captured by the webcam
          video.play();
        };
        mediaRecorder = new MediaRecorder(mediaStreamObj);
        let chunks = [];
        mediaRecorder.ondataavailable = function(ev) {
          chunks.push(ev.data);
        };
        mediaRecorder.onstop = () => {
          let blob = (blob = new File(chunks, "video.mp4", {
            type: "video/mp4",
            lastModified: new Date()
          }));
          // let blob = new Blob(chunks, { 'type' : 'video/webm' });
          chunks = [];
          // let videoURL = window.URL.createObjectURL(blob);
          EventBus.$emit("newvideo", blob);
          // blobrecorded = blob
          // console.log(videoURL) ;
          // document.getElementById("mp4_src").src = videoURL ;
          // document.getElementById("myVideo").load();
        };
      })
      .catch(function(err) {
        console.log(err.name, err.message);
      });
  },

  methods: {
    startrecord() {
      if (mediaRecorder.state == "inactive") {
        this.status = "RECORDING";
        EventBus.$emit(
          "boradfen",
          "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        );
        mediaRecorder.start();
        console.log(mediaRecorder.state);
        EventBus.$emit("StartRecording");
      }
    },
    stoprecord() {
      if (mediaRecorder.state != "inactive") {
        this.status = "NOT RECORDING";
        mediaRecorder.stop();
        console.log(mediaRecorder.state);
        EventBus.$emit("StopRecording");
      }
    },
    puserecording() {
      if (mediaRecorder.state != "inactive") {
        this.status = "NOT RECORDING";
        mediaRecorder.pause();
        console.log(mediaRecorder.state);
        EventBus.$emit("PuseRecording");
      }
    },
    resumerecording() {
      if (mediaRecorder.state != "inactive") {
        this.status = "NOT RECORDING";
        mediaRecorder.resume();
        console.log(mediaRecorder.state);
        EventBus.$emit("ResumeRecording");
      }
    }
  }
};
</script>

<style scoped>
#recorder {
  width: 100% !important;
  height: 200px !important;
}
p {
  margin: 5px 0px 5px 10px;
  font-family: "QuickSand", sans-serif;
  font-weight: bold;
  color: black;
}
video {
  -webkit-transform: scaleX(-1);
  transform: scaleX(-1);
}
</style>

//DONE make a flow chart //TODO create video tag(3min) //TODO add a funcation to
handle camera requaset(5min) //TODO handel camera requaste erros(5min) //TODO
get camera feed(5min) //TODO add start fucation(2min) //TODO start display
camera feed(5min) //TODO start recording(3min) //TODO add get move func(2min)
//TODO trigger get move when chessboard changes(10min) //TODO get move and time
(5mim) //TODO add move and time to timestamps obj(5min) //TODO add pause
funcation(5min) //TODO add rusme funcation(5min) //TODO add stop funcation(5min)
//TODO create the mp4 file (3min)
