<template>
  <div>
      <div class="TimeStampPanel">
      <div class="COL">
          <div v-for="(time,x) in timestampSec" v-bind:key="x">
            <div @click="NavigateVideoTime(time)"> {{time}}: </div>  
          </div>
      </div>
      <div class="COL">
          <div v-for="(event,x) in timestampEvent" v-bind:key="x">
            <div @click="NavigateVideoMove(event)"> {{event}} </div>    
          </div>
      </div>
      </div>
  </div>
</template>

<script>
import firebase from "firebase"
import {EventBus} from "../../main";

export default {
    data(){
        return{
        timestampOrginal:[], //timestamp array got from the doc of the course 
        timestampSec:[],  //array for seconds to be shown of the timestamp recieved
        timestampEvent:[], //array for events to be shown of the timestamp recieved
        TimeCounter:0, //The index of the current element of the timestamp array
        TimeLength:true, //Boolean value to stop reshowing the seconds and events when the video is replayed 
        DisplayCounter:-1
}
    },
    props:['ID'],
    methods:{
        async GetTimeStamp() //Get the Timestamp from the course's doc using the ID of the Course
        {
            var db = firebase.firestore();
            var DBref = db.collection('Courses').doc(this.ID)
            await DBref.get().then((query) => {
                if(query.exists)
                {
                    this.timestampOrginal = query.data().TimeStamps
                    console.log("Time Stamp array is: "+ this.timestampOrginal);
                }
                else{
                    console.log("No Doc in here");
                }
            }).catch((error) => {
                console.log("Error Getting Doc: "+ error);
            });
        },
        NavigateVideoMove(Input) //Send the Time of the Move Selected
        {
            for (let Counter = 0; Counter < this.timestampOrginal.length; Counter++) {
                if (Input == this.timestampOrginal[Counter].event) {
                    var SelectedTime = this.timestampOrginal[Counter].time;
                    EventBus.$emit("Navigate", SelectedTime);
                    break;
                }
            }
            // console.log("The Recieved parameter is: "+Input);
        },
        NavigateVideoTime(Input) //Send the Time of the Timestamp Selected
        {
            EventBus.$emit("Navigate",Input);
        },
        DisplayTimeStamp() //Push to the arrays showing the content of the timestamp to the DOM  
        {
            if(this.TimeCounter > this.DisplayCounter)
            {
                this.DisplayCounter = this.TimeCounter
                this.timestampSec.push(this.timestampOrginal[this.TimeCounter].time);
                this.timestampEvent.push(this.timestampOrginal[this.TimeCounter].event);
            }
        },
        SendFenToBoard()
        {
            EventBus.$emit("displayboardfen",this.timestampOrginal[this.TimeCounter].fen);      
        }
    },
    mounted()
    {
        this.GetTimeStamp();
        EventBus.$on("SendTime", (time) => {  //Recieve the Current time playing of the video game
                //Check For synchronization between the timestamp recieved and the current time of the videoplayer
                for (let Counter = 0; Counter < this.timestampOrginal.length; Counter++) {
                    this.TimeCounter = Counter;
                if((this.timestampOrginal[this.TimeCounter].time >= (time - 0.2)) && (this.timestampOrginal[this.TimeCounter].time <= (time + 0.2)))
                {
                    console.log("Match Happend between: "+ this.timestampOrginal[this.TimeCounter].time+" and "+ time);
                    this.DisplayTimeStamp();
                    this.SendFenToBoard();
                    // if(this.TimeLength)
                    // {
                    // }
                    // this.TimeCounter++;
                    // if(this.TimeCounter >= this.timestampOrginal.length)
                    // {
                    //     console.log("TimeStamp finished")
                    //     this.TimeLength = false;
                    //     this.TimeCounter = 0;
                    // }
                    break;
                }            
                }
        })
    }
}
</script>

<style>
.TimeStampPanel{
    display: flex;
}
.COL{
    display: block;
    cursor: pointer;
}
</style>