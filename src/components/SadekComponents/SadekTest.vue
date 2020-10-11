<template>
	<div>
		<router-link to="/PostGame">Post Game</router-link>
						<keep-alive><NewsFeed :Match="Match"/></keep-alive>
	</div>
</template>

<script>
import NewsFeed from "./NewsFeed/NewsFeed"
import firebase from "firebase"
export default {
	name: "Sadek",
	data(){
		return{
		Match:null
		}
	},
	components: {
		NewsFeed
	},
	mounted() {
		let self = this;
		firebase
			.firestore()
			.collection("Matches")
			.where("MatchId", "==", "Match-5047c")
			.get()
			.then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					self.Match = doc.data();
					console.log(self.Match);
				});
			});
	},
};
</script>