<template>
  <div>
      <h1 id="StoriesWindowHeader">Chess Snapshots</h1>
      <div class="StoriesWindow" >
          <div  v-for="(story,index) in getStories" :key="index" v-on:click="SetStoriesIndexTo(index)" >
              <router-link  v-if="story.Type !='add'"   :to="{ name: 'Stories' }" >
                  <p class="StoryName">{{story.UserName ? story.UserName : ''}}</p>
                  <StoryCard   class="ProfileImage"  :startpos="story.StartingFen" :chessid='story.StoryID' ></StoryCard>
              </router-link> 
              <AddStotyCard v-if="story.Type =='add'" ></AddStotyCard>         
            </div>
          <h3 v-html="StoryStatus"></h3>
      </div>
      
  </div>
</template>

<script>
import StoryCard from "./StoryCard"
import AddStotyCard from "./AddStotyCard"
// import firebase from "firebase"
import { mapActions,mapGetters } from "vuex"
export default {
    components:{
        StoryCard,
        AddStotyCard
    },
    computed:{
        ...mapGetters(['getStories'])
    },
    data(){
        return{
          Stories : [],
          StoryExist: "",
        //   StoryStatus:'<p>No Chess Snapshots in here yet. &#128531</p>'
        }
    },
    methods:{
        ...mapActions(["fetchStories","SetStoriesIndexTo"])
    },
    async mounted(){
        let self = this
        self.Stories = []; 
        if(!this.getStories){
           await this.fetchStories()
        }
        self.Stories = await this.getStories
        console.log(this.getStories)
        // await firebase.auth().onAuthStateChanged(async function(user) {
        //     if (user) {
        //         console.log('user:'+ user.uid)
               
        //         var followingdata = await firebase.firestore().collection('Follows').doc(user.uid).get()
        //         var followingUsers = await followingdata.data().Following
        //         console.log(followingUsers)
        //         await followingUsers.forEach(async fuser =>{
        //             var userstories =  await firebase.firestore().collection("ChessStories").where("UserID","==",fuser).get()
        //             await userstories.forEach(doc =>{
        //                 self.Stories.push(doc.data())
        //                 self.StoryStatus='';
        //             })
        //     })
        //     } else {
        //         console.log('log in')
               
        //     }
        // });
        console.log(self.Stories)
    }

}
</script>

<style scoped>
a{
    text-decoration: none;
}
.StoryName{
    color: white;
    text-decoration: none;
    font-family: 'Quicksand', sans-serif;
    font-size: 0.9rem;
    text-align: center;
}
#StoriesWindowHeader{
    margin-left: 37%;
    margin-top: 5px;
    font-family: 'Quicksand', sans-serif;
    font-weight: lighter;
    color: white;
}
h3{
    margin-left: 37%;
    margin-top: 5px;
    font-family: 'Quicksand', sans-serif;
    font-weight: lighter;
    color: white;
}
.ProfileImage{
height: 120px;
width: 120px;
border-radius: 5px;
margin-left: 15px;
}
.StoriesWindow{
display: flex;
flex-direction: row;
justify-content: flex-start;
overflow-x: hidden;
width: 100%;
}

</style>
//TODO get storys ids array(5min)
//TODO if it is null add route to add story (5min)
//TODO add scroll buttoms (5min)
//TODO create a scroll funcation(10min)
//TODO get the current story id (2min)
//TODO get the current story data from database(3min)
//TODO display the data (4min)
//TODO add a funcation to dispaly route to add story if their is no storys lift(5min)
