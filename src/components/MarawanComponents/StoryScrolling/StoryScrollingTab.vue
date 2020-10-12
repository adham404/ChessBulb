<template>
<div style="width:100%">
    <StoryPreview style="width:100%" v-if="moves.Type=='Move'" :moves="moves"  ></StoryPreview>
    <storypuzzel style="width:100%"  v-if="moves.Type=='Puzzle' " :moves="moves"  ></storypuzzel>
</div>
        
</template>

<script>
// import firebase from "firebase"
import StoryPreview from "./Stortypreview"
import storypuzzel from "./storypuzzel"
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
        storypuzzel
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
         EventBus.$on('moveStory',data =>{
             if(data == 'lift'){
                 this.move2();
             }else if(data == 'right'){
                 this.move1()
             }
         })
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
    beforeDestroy () {
    EventBus.$off('Link')
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