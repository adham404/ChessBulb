<template>
  <div class="Container">
      <!-- DONE Add One Dynamic Component that Swap Between [PositionSetup] & [PostStoryContent] according to the PositionSetupFlag property(2min)  -->
      <component :FenObject="FenObject" :is="CurrentComponent"></component>
      
  </div>
</template>

<script>
    //DONE Assign EventBus method (1min)
    import {EventBus} from "../../main"
    import PositionSetup from "../ShemyComponents/PositionSetup";
    import PostStoryContent from "../ShemyComponents/PostStoryContent"; 
export default {
    data: function()
    {
      return{
        CurrentComponent:"PositionSetup",
        FenObject:""
      }
    },
    components:{
      PositionSetup,
      PostStoryContent
    },
    //DONE set up a mounted method (1min)
    mounted(){
    //DONE Inside mounted method ... Recieve Signal from EventBus from the [PositionSetup] and assign it to the PositionSetupFlag property(2min)
    EventBus.$on("PositionIsSet", ()=>{
          this.CurrentComponent = "PostStoryContent"
    })
    EventBus.$on("SendPosition", (Fen) => {
        this.FenObject = Fen
    })
    EventBus.$on("ResetPosition", () => {
        this.CurrentComponent = "PositionSetup";
    })
    }
}
</script>

<style scoped>
.Container{
	display: flex;
	height: 100vh;
	width: 100%;
}
/* TODO import Styling script from Documentation and Adjust the Component (5min) */
</style>

//TODO Total Time is (11min)