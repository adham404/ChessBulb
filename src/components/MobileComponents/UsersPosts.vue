<template>
  <div>
    <!-- <keep-alive> -->
    <Post
      v-for="(item, index) in Posts"
      :key="index"
      :Match="item"
      :UserId="UserId"
    />

  </div>
</template>

<script>
import firebase from "firebase";
import {mapGetters } from "vuex";
import Post from "@/components/MobileComponents/Post.vue";
// import { EventBus } from "@/main.js";
export default {
    data(){
        return{
            Posts:[],
            UserId:""
        }
    },
    components:{
        Post
    },
    methods:{
        
    },
    computed:{
        ...mapGetters(['GetVisitngFlagForUsers','GETUserID','GetCurrentVisitorProfileData'])
    },
    mounted()
    {
        var db = firebase.firestore()
        if(this.GetVisitngFlagForUsers)
        {
            db.collection("Matches").where("UserId", "==", this.GetCurrentVisitorProfileData.UserId).get().then((doc) => {
                doc.forEach((doc) => {
                    this.Posts.push(doc.data());
                })
            })
            this.UserId = this.GetCurrentVisitorProfileData.UserId
        }
        else
        {
            db.collection("Matches").where("UserId", "==", this.GETUserID).get().then((doc) => {
                doc.forEach((doc) => {
                    this.Posts.push(doc.data());
                })
            })
            this.UserId = this.GETUserID;
        }
    }
};
</script>

<style scoped></style>
