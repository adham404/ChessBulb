<template>
  <div class="Container">
	<!-- <router-link :to="{
		path: `/profile/${FollowerData.UserId}`,
        params: {id: FollowerData.UserId, Visitor: true}
	}">
    </router-link> -->
    <div @click="VisitProfile" class="UserImageAndSignOut">
       <img :src="GetImg()" alt="">
    </div>
    <div @click="VisitProfile" class="UserBio">
        <div class="TextBox">
            <h3>{{FollowerData.FirstName}} {{FollowerData.LastName}}</h3>
            <p>{{FollowerData.UserBio}}</p>
        </div>
    </div>
        <div class="Buttons">
            <button v-if="!FollowingState" @click="Follow" class="Shadow">Follow</button>
            <button v-if="FollowingState" @click="UnFollow" class="Shadow">UnFollow</button>
        </div>      
  </div>
</template>

<script>
import { EventBus } from "../../main";
import firebase from "firebase";
import {mapMutations, mapGetters, mapActions} from "vuex";

export default {
props:['FollowerData','FollowerID'],
data:function()
{
    return{
        FollowerUserID:"",
        FollowedUserID:"",
        FollowingState:false,
        Url:"",
        Followed:false,
        FollowingIDS:[]
    }
},
computed:{
    ...mapGetters(['GetUserFollowingList']),
},
methods:{
    ...mapMutations(['SetVisitorData','SetVisitingStatus']),
    ...mapActions(['FollowThisProfile','UnFollowThisProfile']),
    VisitProfile()
    {
        this.SetVisitorData(this.FollowerData); // Assign Follower Data through Vuex state managment
        this.SetVisitingStatus(true) //Visiting status
        EventBus.$emit("ProfileVisited");
        // EventBus.$emit("VisitProfile", this.FollowerData);
        this.$router.push({path: `/profile/${this.FollowerData.UserId}`, params: {id: this.FollowerData.UserId}})
        //----------New Part--------------------------------//
        // var UserID = this.FollowerData.UserId
        //--------------------------------------------------//
        // this.$forceUpdate();
        // this.$router.push('/Home')
    },
    Follow()
    {
        this.FollowThisProfile(this.FollowerData.UserId);
        this.GetUserFollowingList.forEach((id) => {
            if(this.FollowerData.UserId == id)
            {
                this.FollowingState = true;
            }
        })
    },
    UnFollow()
    {
        this.UnFollowThisProfile(this.FollowerData.UserId);
        this.FollowingState = false;
    },
    // async Follow()
    // {
    //     this.FollowedUserID = this.FollowerData.UserId;
    //     let self = this;
    //     await firebase.auth().onAuthStateChanged(function(user) {
    //         if (user) {
    //             self.FollowerUserID = user.uid; 
    //                             // User is signed in.
    //         } else {
    //             console.log("No User Signed in")
    //                 // No user is signed in.
    //             }
        
    //         })
    //     var db = firebase.firestore();
    //     var DBref = db.collection("Follows").doc(this.FollowedUserID); //Update Follower in Followed User
    //     DBref.update({
    //       Followers: firebase.firestore.FieldValue.arrayUnion(this.FollowerUserID)  
    //     })
    //     var DBref2 = db.collection("Follows").doc(this.FollowerUserID); //Update Following in Follower User
    //     DBref2.update({
    //       Following: firebase.firestore.FieldValue.arrayUnion(this.FollowedUserID)  
    //     })
    //     this.Followed = true;
    //     alert("You Followed Him");  
    // },
    // async UnFollow()
    // {
    //    this.FollowedUserID = this.FollowerData.UserId;
    //     let self = this;
    //     await firebase.auth().onAuthStateChanged(function(user) {
    //         if (user) {
    //             self.FollowerUserID = user.uid; 
    //                             // User is signed in.
    //         } else {
    //             console.log("No User Signed in")
    //                 // No user is signed in.
    //             }
        
    //         })
    //     var db = firebase.firestore();
    //     var DBref = db.collection("Follows").doc(this.FollowedUserID); //Update Follower in Followed User
    //     DBref.update({
    //       Followers: firebase.firestore.FieldValue.arrayRemove(this.FollowerUserID)  
    //     })
    //     var DBref2 = db.collection("Follows").doc(this.FollowerUserID); //Update Following in Follower User
    //     DBref2.update({
    //       Following: firebase.firestore.FieldValue.arrayRemove(this.FollowedUserID)  
    //     })
    //     this.Followed = false;
    //     alert("You UnFollowed Him");          
    // },
    // async CheckFollowing()
    // {
    //     for (let i = 0; i < this.FollowerID.length; i++) {
    //         if (this.FollowerData.UserId == this.FollowerID[i]) {
    //             this.Followed = true;                
    //         }
    //     }
    // },
    GetImg(){
        return this.Url || require("@/assets/ProfilePic.jpg");
    }
},
async mounted()
{
    //Get User Photo for each follower from storage
    if(this.FollowerData.UserPhoto != "null" && this.FollowerData.UserPhoto != "")
    {
        var StorageRef = firebase.storage().ref();
        var PicRef = StorageRef.child(this.FollowerData.UserPhoto);
        //fetch Downloadable url from Cloud Storage
        await PicRef.getDownloadURL().then((url) => {
            this.Url = url 
        })
        this.GetImg();
    }
    //Quick Check For Following
    this.GetUserFollowingList.forEach((id) => {
        if(this.FollowerData.UserId == id)
        {
                this.FollowingState = true;
        }
    })
    //Check if we are following this card
    // this.CheckForFollowingStateOfThisProfileCard(this.FollowerData.UserId);
    // console.log("Hey There testing the props data which are: "+ this.FollowerID);
//     EventBus.$on("SendFollowersID", (Data)=> {
//         console.log("I recieved a signal....")
//     })
//    console.log("I am a mounted Card.")
//    this.CheckFollowing(); 
}
}
</script>

<style scoped>
    h3{
        margin: 0px;
        margin-bottom: 2px;
        font-weight: normal;
    }
    p{
        margin: 0px;
        font-weight: bold;

    }
    .Shadow{
		-webkit-box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
		-moz-box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
		box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
    }
    .TextBox{
        width: 95%;
        height: 110px;
        /* background-color: white; */
        /* border-radius: 12px; */
        padding-top: 10px;
        padding-left: 10px;
        color: black;
        font-family: 'Raleway', sans-serif;
    }
    img{
    height: 110px;
    width: 110px;
    border-radius: 110px;
    }
    .Container{
        margin-top: 20px;
        display: flex;
        width: 60%;
        height: 120px;
        border-radius: 12px;
        background-color: white;
        margin-left: 20%;
    }
    .UserImageAndSignOut{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 20%;
        height: 100%;
        /* background-color: red; */
    }
    .UserBio{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60%;
        height: 100%;
        /* background-color: royalblue; */
    }
    .Buttons{
        justify-content: space-evenly;
        width: 20%;
        height: 100%;
        display: flex;
        flex-direction: column;
        /* background-color: purple; */
    }
    button{
		height: 35px;
		width: 180px;
		border: none;
		outline: none;
		border-radius: 1.2rem;
		font-size: 0.8rem;
		font-family: 'Raleway', sans-serif;
		background-color: #022A68;
		color: white;
	}
</style>