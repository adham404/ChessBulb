<template>
    <div>
        <div height = "300" class="Container">
            <div class="mt-3 Stories">
                <v-sheet class="primary mt-2 ml-2" height="200" width="150"  rounded = "lg" elevation="4">
                    <v-icon class="ml-13 mt-12" size="50" color="white">
                        fa-plus
                    </v-icon>
                    <v-spacer></v-spacer>
                    <span class = "text-subtitle-1 font-weight-light ml-5" style = "color: white">Add a snapshot</span>
                </v-sheet>
                <div class="Story">
                    <v-sheet class="primary mt-2 ml-2" height="200" width="200"  rounded = "lg" elevation="4" v-for="(story,index) in getFirst7Stories" :key="index" v-on:click="SetStoriesIndexTo(index)">
                    <router-link  v-if="story.Type !='add'"   :to="{ name: 'Snapshots' }" >
                        <StoryCard   class="ProfileImage mt-1"  :startpos="index" :chessid='story.StoryID'></StoryCard>
                        <v-row justify="center" align="center" class="pt-2">
                            <v-avatar size="30" class = "mb-0">
                            <img src="img\icons\pexels-pixabay-220453.jpg" alt="" style="object-fit: cover">
                            </v-avatar>
                            <p class="StoryName mb-0 ml-1 text-caption">{{story.UserName ? story.UserName : ''}}</p>
                        </v-row>
                    </router-link> 
                    </v-sheet>
                </div>
            </div>
            <v-btn width="95%" class="ml-3 text-subtitle-1 font-weight-bold text-capitalize">Open all snapshots</v-btn>
        </div>
    </div>
</template>

<script>
import StoryCard from "@/components/MobileComponents/StoryCard"
import firebase from "firebase"
import { mapActions,mapGetters } from "vuex"
export default {
    data: () => ({
    }),
    components: {
        StoryCard
        },
    computed:{
        ...mapGetters(['getStories','getFirst7Stories'])
    },
    methods: {
        ...mapActions(["fetchStories","SetStoriesIndexTo"])
    },
    async created(){
        
        // setTimeout (async () =>{
        let self = this
        // var executed = false;
        //  if (!executed) {
        
        //     executed = true;
            await firebase.auth().onAuthStateChanged(async function(user) {
            if (user && self.getStories.length == 0) {
                // console.log('user:'+ user.uid)
                
            console.log("story header is created")
            await self.fetchStories()
                } 
        });
    },
}
</script>

<style lang="css" scoped>
.Container{
  height: 270px;
  width: 100%;
  background-color: white
}
.Story{
  width: 50px;
  height: 220px;
  display: flex;
}
.Stories{
  width: 100%;
  height: 220px;
  overflow-x: scroll;
  background-color: white;
  display: flex;
  overflow-x: scroll;
}
.Stories::-webkit-scrollbar {
  display: none;
  scrollbar-width: none;
}
a{
    text-decoration: none;
}
.StoryName{
    color: white;
    text-decoration: none;
    text-align: center;
}
.ProfileImage{
height: 130px;
width: 150px;
border-radius: 5px;
margin-left: 5px;
}
</style>