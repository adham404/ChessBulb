<template>
  <div>
    <input type="text" placeholder="Add Comment" v-model="comment">
    <button @click="share">Share</button>
    <button @click="copy()">Copy Link</button> 
    <input style="display:none;" type="text" :value="link" ref="link">
    <!-- <span style="display:none;" id="l">{{link}}</span> -->
  </div>
</template>

<script>
//TODO importing FIREBASE (2 minutes)
import firebase from "firebase";
export default {
  name:"Share",
  props:["MatchId"],
  data() {
    return {
      UserId:"123456789",
      ShareId:null,
      comment:"",
      link:"http://localhost:8080/Posts/" + this.MatchId
    }
  },
  methods:{
    copy () {
        var copyText = this.$refs.link;
      /* Select the text field */
      copyText.select();
      /* Copy the text inside the text field */
      document.execCommand("copy");
      /* Alert the copied text */
      alert("Link is copied");
        },
    generateUID() {
			this.ShareId = "Share-";
			var d = new Date().getTime(); //Timestamp
			var d2 =
				(performance && performance.now && performance.now() * 1000) ||
				0; //Time in microseconds since page-load or 0 if unsupported
			for (var i = 0; i < 5; i++) {
				var r = Math.random() * 16; //random number between 0 and 16
				if (d > 0) {
					//Use timestamp until depleted
					r = (d + r) % 16 | 0;
				} else {
					//Use microseconds since page-load if supported
					r = (d2 + r) % 16 | 0;
				}
				this.ShareId = this.ShareId + r.toString(16);
			}
		},
    share(){
      this.generateUID()
      firebase
					.firestore()
					.collection("Shares")
					.doc(this.ShareId)
					.set({
						MatchId: this.MatchId,
						ShareId:this.ShareId,
            UserId: this.UserId,
            Comment:this.comment
					});
    },
  },
};
</script>

<style scoped>
/*TODO using the css ids from tettra (2 minutes) */
</style>
//TODO Testing Time (10 minutes)
//TODO Expected Time (52 minutes)