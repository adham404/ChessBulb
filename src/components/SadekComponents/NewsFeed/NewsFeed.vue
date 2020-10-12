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
    async mounted(){
		var self = this;
        await firebase.auth().onAuthStateChanged(function(user) {
	if (user) {
	console.log(user.uid);
	self.UserId = user.uid
	} else {
		console.log("no log in")
	}
  });
		await firebase
			.firestore()
			.collection("Follows")
			.where("UserId", "==", this.UserId)
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					self.Following = doc.data().Following;
					console.log('This is' + self.Following);
				});
      });
     await this.Following.forEach((user) =>{
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