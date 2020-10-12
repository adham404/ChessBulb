<template>
    <div>
        <div v-for="i in Matches" :key="i">
            <NewsFeedView :Match="i" :UserId="UserId"/>

        </div>
    </div>
</template>


<script>
import firebase from "firebase"
import NewsFeedView from "./NewsFeedView"
export default {
    name:"NewsFeedView",
    components:{
        NewsFeedView
    },
    data(){
        return{
            UserId:"",
		Following:[],
            Matches:[]
        }
    },
    mounted(){
        firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
	console.log(user.uid);
	self.UserId = user.uid
	} else {
		console.log("no log in")
	}
  });
		firebase
			.firestore()
			.collection("Follows")
			.where("UserId", "==", this.UserId)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					self.Following.push(doc.data().Following);
					console.log(self.Following);
				});
      });
      this.Following.forEach((user) =>{
        var self = this;
		firebase
			.firestore()
			.collection("Matches")
			.where("UserId", "==", user)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					self.Matches.push(doc.data());
					console.log(self.Matches);
				});
			});
      })
    }
}
</script>


<style scoped>

</style>