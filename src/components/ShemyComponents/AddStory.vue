<template>
  <div>
      <!-- TODO Add One Dynamic Component that Swap Between [PositionSetup] & [PostStoryContent] according to the PositionSetupFlag property(2min)  -->
      <component :is="CurrentComponent"></component>
      
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
        CurrentComponent:"PositionSetup"
      }
    },
    components:{
      PositionSetup,
      PostStoryContent
    },
    //DONE set up a mounted method (1min)
    mounted(){
      //DONE Inside mounted method ... Recieve Signal from EventBus from the [PositionSetup] and assign it to the PositionSetupFlag property(2min)
    EventBus.$on("PositionIsSet", (flag)=>{
        if(flag)
        {
          this.CurrentComponent = "PostStoryContent"
        }
    })
    }
}
</script>

<style>
/* TODO import Styling script from Documentation and Adjust the Component (5min) */
</style>

//TODO Total Time is (11min)