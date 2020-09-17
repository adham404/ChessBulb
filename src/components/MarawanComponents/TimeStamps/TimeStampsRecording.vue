<template>
  <div>
      <div v-for="(i,index) in timestamps" :key="index" >
          <div>{{formattime(i.time)}} : {{i.event}}</div>
      </div>
  </div>
</template>

<script>
import { EventBus } from '@/main';
const {stopwatch} = require('durations');
var recording = false ;
var currentStamp = -1 ;
export default {
     data:()=>{
     return{
       timestamps : [],
       clock:null
  }},
  mounted(){
      console.log(this.timestamps.length -1)
      EventBus.$on("newfenAndmove",async move =>{
          if(recording){
              
              if(currentStamp < this.timestamps.length -1){
                  currentStamp = await  this.timestamps.length -1
                  console.log('pog')
              }else{
                 await currentStamp++
              }
              
              await this.addatimestamp(move)
              
          }
          
      });
      
    this.clock = stopwatch()
    EventBus.$on('StartRecording',()=>{
        recording = true
        this.timestamps =[]
        this.clock.reset()
        this.clock.start()
        EventBus.$emit('boardactive',true)
    });
    EventBus.$on('StopRecording',()=>{
        recording = false
        this.clock.stop()
        EventBus.$emit('boardactive',false)
        EventBus.$emit('TimeStamp',this.timestamps)

    });
    EventBus.$on('PuseRecording',()=>{
        recording = false
        this.clock.stop()
        EventBus.$emit('boardactive',false)

    });
    EventBus.$on('ResumeRecording',()=>{
        recording = true
        this.clock.start()
        EventBus.$emit('boardactive',true)
    });
    EventBus.$on("Control", async (data) => {
      
      if (data == "next") {
          await currentStamp++
          var e = await this.timestamps[currentStamp].fen
          
          await EventBus.$emit("boradfen", e)
          await this.addatimestamp([e,'Redo'])
          console.log(this.timestamps)
      }else if(data == "back"){
          await currentStamp--
          e = await this.timestamps[currentStamp].fen
          await EventBus.$emit("boradfen", e)
          await this.addatimestamp([e,'Undo'])
          console.log(this.timestamps)
      }
    });
  },
  methods:{
      addatimestamp(e){
          var newst = {
              time : this.clock.duration().seconds() ,
              event : e[1],
              fen : e[0]
          }
          this.timestamps.push(newst)
      },
      formattime(time){
          var date = new Date(0);
          date.setSeconds(time); // specify value for SECONDS here
          var timeString = date.toISOString().substr(11, 8);
          return timeString
      }
  }

}
</script>

<style>

</style>