<template>
  <div>
    <CourseForm  />
    <!-- <div    v-if="!form" > -->
    <!-- </div> -->










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
           <VideoRecording />
          </v-sheet>
          
        </v-row>
        <v-row class = "mt-7">
          <UploadPgn />
          <PostCourse />
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
              <StockFish ></StockFish>
            </v-row>
            <div style="height: 250px;">
              <TimeStampsRecording  />
            </div>
            


            <!-- <v-card width="90%">
              <v-card-title height="20px" class="py-0">
                <v-row class="my-1">
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
            </v-card> -->
          </v-col>
        </v-row>
      </v-col>
    </v-row>









  </div>
</template>

<script>
/*eslint-disable*/
import { EventBus } from "@/main.js";
import StockFish from "@/components/MarawanComponents/StockFish.vue"
import ChessBoardInput from "../ChessBoardPointer.vue"
import VideoRecording from "./VideoRecording.vue";
import UploadPgn from "./UploadPgn.vue";
import PostCourse from "./PostCourse.vue";
import CourseForm from "./CourseForm.vue";
import TimeStampsRecording from "./TimeStamps/TimeStampsRecording.vue";
export default {
  data(){
    return{
      form:true,
      Mounted: false,
    }
  },
  components: {
    ChessBoardInput,
    VideoRecording,
    TimeStampsRecording,
    UploadPgn,
    CourseForm,
    PostCourse,
    StockFish
  },
  
  mounted() {
    setTimeout(() => {this.Mounted = true}, 200)
    this.form = true
    var formdata ;
    setTimeout(() => {
      EventBus.$emit("Toggle", true);
    }, 100);
    EventBus.$on("Link", (link) => {
      this.$router.push({ path: link });
    });
    EventBus.$on("CourseForm", (data) => {
      formdata = data
      this.form = false
    });
    EventBus.$on('gitTheForm',()=>{
      console.log('we want the form ')
      EventBus.$emit('CourseForm',formdata)
    })
  },
  methods: {},
  destroyed() {
    EventBus.$emit("Toggle", false);
  },
  emitcontrol(data) {
      EventBus.$emit('Control',data)
			console.log(data)
    },
  //TODO Assign Data Properties in the vue data object which are (CourseData(O), ChessPGN(s)) (2min)
  //TODO define UploadPgn function (1min)
  //FIXME Upload PGN file from the user's internal storage and validate it and assign it to (ChessPGN) and send it to [ChessBoard] (20min)
  //TODO define PostCourse function (1min)
  //TODO Upload Fen object with timestamp to cloud firestore and Upload Course Video to Cloud Storage (10min)
};
</script>

<style scoped>
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
  height: 40%;
  width: 100%;
  /* background-color: yellowgreen; */
}
.TimeStamps{
  width: 50%;
  background-color:#1DACA8 ;
  border-radius: 10px;
  /* background-color: aqua; */
}
.ChessEngine{
  width: 50%;
  background-color:#0487af;
  border-radius: 10px;
  /* background-color: blueviolet; */
}

</style>

//TODO finish component total time 53min

<!-- TODO add [ChessBoard] to the left (2min) -->
<!-- TODO add [VideoRecording] to the right (2min)  -->
<!-- TODO add (CourseData.Title) under the [VideoRecording] (2min)  -->
<!-- TODO add [PGNReview] under (CourseData.Title) (2min) -->
<!-- TODO add Two buttons one of them 'Upload Pgn' the other is 'Post Course' (2min) -->
<!-- TODO assign {UploadPgn} and {PostCourse} to the buttons (2min) -->
