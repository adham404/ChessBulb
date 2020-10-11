<template>
  <div>
      <h1 id="StoriesWindowHeader">Chess Snapshots</h1>
      <div class="StoriesWindow" >
          <div  v-for="(story,index) in Stories" :key="index" >
              <router-link :to="{ name: 'Stories' ,params: { data: Stories , current: index  }}" >
                  <StoryCard class="ProfileImage"  :startpos="story.StartingFen" :chessid='story.StoryID' ></StoryCard>
              </router-link>
          
            </div>
      </div>
      
  </div>
</template>

<script>
import StoryCard from "./StoryCard"
import firebase from "firebase"
export default {
    components:{
        StoryCard
    },
    data(){
        return{
          Stories : []  
        }
    },
    async mounted(){
        let self = this
        self.Stories = [];
        await firebase.auth().onAuthStateChanged(async function(user) {
            if (user) {
                console.log('user:'+ user.uid)
                var followingdata = await firebase.firestore().collection('Follows').doc(user.uid).get()
                var followingUsers = await followingdata.data().Following
                console.log(followingUsers)
                await followingUsers.forEach(async fuser =>{
                    var userstories =  await firebase.firestore().collection("ChessStories").where("UserID","==",fuser).get()
                    userstories.forEach(doc =>{
                        self.Stories.push(doc.data())
                    })
                })
            } else {
                console.log('log in')
               
            }
        });
        console.log(self.Stories)
    }

}
</script>

<style>
#StoriesWindowHeader{
    margin-left: 37%;
    margin-top: 5px;
    font-family: 'Quicksand', sans-serif;
    font-weight: lighter;
}
.ProfileImage{
height: 100px;
width: 100px;
border-radius: 5px;
margin-left: 10px;
}
.StoriesWindow{
display: flex;
flex-direction: row;
justify-content: flex-start;
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
