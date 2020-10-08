<template>
    <div>
        
        <button @click="move1" >Next </button>
        <button @click="move2" >Back </button>
        <StoryPreview :moves="moves"  ></StoryPreview>
        
    </div>
</template>

<script>
// import firebase from "firebase"
import StoryPreview from "./Stortypreview"
import { EventBus } from "@/main.js";

//TODO make a story div(5min)
//TODO add it in v for(3min)
//TODO get following users id array(5min)
//TODO get storys ids and put it to an array(5min) 
//TODO load user profile photo for each story(5min)
//TODO add route to add story (3min)
//TODO add route to each story (3min)
//TODO route storys cards to display story window(3min)
export default {
    components:{
        StoryPreview,
    },
    data(){
        return{
            boardfen : null,
            boardfen2 : null,
            moves : 'feff',
            startpos : '',
            Stories: [],
            currentstory : null,
        }
    },
     mounted(){
         setTimeout(() => {
      EventBus.$emit("Toggle", true);
    }, 100);
    EventBus.$on("Link", (link) => {
      this.$router.push({ path: link });
    });
        console.log(this.$route.params.data)
        // console.log(this.$route.params.current)
        var data = this.$route.params.data
        var current = this.$route.params.current
        this.currentstory = current
        this.moves = data[current]
    //    console.log(this.moves)
    },
    destroyed() {
    EventBus.$emit("Toggle", false);
  },
    methods:{
         move1(){
        
        var data = this.$route.params.data
        if(this.currentstory <  data.length-1 ){
            this.currentstory += 1
            this.moves = data[this.currentstory]
        }
        
        },
        move2(){
            if(this.currentstory > 0){
                   var data = this.$route.params.data
        
        this.currentstory -= 1
        this.moves = data[this.currentstory]
            }
        
        },
        
    }

}
</script>


<style>

</style>