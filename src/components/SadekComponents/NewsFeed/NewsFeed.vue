<template>
  <div >
    <!-- <div v-for="(i, s) in Matches" :key="s"> -->
      <h3 v-html="NewsFeedStatus"></h3>
      <NewsFeedView v-for="(item, index) in Matches" :key="index" :Match="item" :UserId="UserId"  />
    <!-- </div> -->
  </div>
</template>

<script>
import firebase from "firebase";
import NewsFeedView from "./NewsFeedView";
export default {
//   name: "NewsFeedView",
  components: {
    NewsFeedView,
  },
  props: ["ClickedUserId","Personal", "General"],
  data() {
    return {
		showi: false , 
      UserId: "",
      Following: [],
      Matches: [],
      matdata: [],
      BrilliantUsers: [],
      NewsFeedStatus:'<p>No Chess Games in here yet. &#128531</p>'
    };
  },
  async mounted() {
    let self = this;
    await firebase.auth().onAuthStateChanged(async function (user) {
      if (user) {
        console.log(user.uid);
        self.UserId = user.uid;
        
      } else {
        console.log("no log in");
      }
    });
	// this.Matches = this.matdata
	if(self.General&&self.UserId){
		var followdata = await firebase
          .firestore()
          .collection("Follows")
          .doc(self.UserId)
          .get();

        console.log(followdata.data().Following);
        self.Following = followdata.data().Following;
        self.Following.push(self.UserId)

        await self.Following.forEach(async (user) => {
          // let self = this;
          var match = await firebase
            .firestore()
            .collection("Matches")
            .where("UserId", "==", user)
            .get();

          await match.forEach((doc) => {
            console.log(doc.data());

            self.matdata.push(doc.data());
            self.NewsFeedStatus = '';
            // self.Matches.push(doc.data());
            // console.log(self.Matches);
          });
          
		});
		// this.showi = true
    console.log("all data is here",this.matdata);
    // var num = this.matdata.length;
    // console.log("Number of matches in homepage is: "+ num);
    this.Matches = this.matdata
  }
  if (self.Personal) {
    self.Following = []
    self.Following.push(self.ClickedUserId)
    await self.Following.forEach(async (user) => {
          // let self = this;
          var match = await firebase
            .firestore()
            .collection("Matches")
            .where("UserId", "==", user)
            .get();

          await match.forEach((doc) => {
            console.log(doc.data());
            self.NewsFeedStatus = '';
            // self.matdata.push(doc.data());
            self.Matches.push(doc.data());
            // console.log(self.Matches);
          });
          
		});
    
  }
  },

};
</script>

<style scoped>
h3{
    margin-left: 37%;
    margin-top: 100px;
    font-family: 'Quicksand', sans-serif;
    font-weight: lighter;
    color: white;
}
</style>
