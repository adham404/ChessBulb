<template>
<div v-if="getStories" style="width:100%">
    <StoryPreview style="width:100%" v-if="getCurrentStory.Type=='Move'" :moves="getCurrentStory"  ></StoryPreview>
    <storypuzzel style="width:100%"  v-if="getCurrentStory.Type=='Puzzle' " :moves="getCurrentStory"  ></storypuzzel>
    <AddStorypreview style="width:100%"  v-if="getCurrentStory.Type=='add' "   ></AddStorypreview>
</div>
        
</template>

<script>
// import firebase from "firebase"
import { mapActions,mapGetters } from "vuex"
import StoryPreview from "./Stortypreview"
import storypuzzel from "./storypuzzel"
import AddStorypreview from "./AddStorypreview"
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
        storypuzzel,
        AddStorypreview
    },
    computed:{
        ...mapGetters(['getStories',"getStoriesbyindex","getCurrentStory"]),
    },
    async created(){
        
    },
    data(){
        return{

        }
    },
    async mounted(){
        //if the data is not here get it from firebase 
        if(this.getStories.lenght == 0){
           await this.fetchStories()
           console.log("fetch Story from stories window")
        }

        //moving between the stories 
        EventBus.$on('moveStory',data =>{
             if(data == 'lift'){
                 this.MoveToPrevioustStory();
             }else if(data == 'right'){
                 this.MoveToNextStory();
             }
         });
        //showing side bar
        setTimeout(() => {EventBus.$emit("Toggle", true);}, 100);
        //links in the side bar
        EventBus.$on("Link", (link) => {
            this.$router.push({ path: link });
        });
    },
    beforeDestroy () {
    EventBus.$off('Link')
    EventBus.$off('moveStory')
 },
    destroyed() {
    EventBus.$emit("Toggle", false);
  },
    methods:{
        ...mapActions(["fetchStories","MoveToNextStory","MoveToPrevioustStory"]),  
    }

}
</script>


<style>

</style>