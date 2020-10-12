<template>
  <div >
    <div v-for="(i, s) in Matches" :key="s">
      <NewsFeedView :Match="i" :UserId="UserId" />
    </div>
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
  data() {
    return {
		showi: false , 
      UserId: "",
      Following: [],
      Matches: [],
      matdata: [],
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
	if(self.UserId){
		var followdata = await firebase
          .firestore()
          .collection("Follows")
          .doc(self.UserId)
          .get();

        console.log(followdata.data().Following);
        self.Following = followdata.data().Following;

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
            // self.Matches.push(doc.data());
            // console.log(self.Matches);
          });
          
		});
		// this.showi = true
		console.log("all data is here");
		this.Matches = this.matdata
	}
  },
};
</script>

<style scoped></style>
