<template>
    <div>
        <SearchEngine SearchIndex="Users" />
        <FollowerCard  v-for="(Data,x) in FollowersData" :key="x" :FollowerID="FollowingIDs" :FollowerData="Data" />
        <!-- <div   >
        </div> -->
    </div>
</template>

<script>
    import SearchEngine from '@/components/MarawanComponents/SearchEngine/SearchEngine'
    import FollowerCard from "../MarawanComponents/FollowerCard"
    import firebase from "firebase";
    import {EventBus} from "../../main";    
    export default {
        components: {
            SearchEngine,
            FollowerCard
        },
        props:['FollowingIDs'],
        data:function()
        {
          return {
            FollowersData:[],
            FollowersID: [],
            UserID:"",
            FollowingID:[],
            FollowedIDs:[]
          }
        },
        methods:{
            async GetFollowersData()
            {
                
                let self = this
                await firebase.auth().onAuthStateChanged(async function(user) {
                if (user) {
                self.UserID = user.uid;
                    var db = firebase.firestore();
                    for (let i = 0; i < self.FollowersID.length; i++) {
                        var FollowerID = self.FollowersID[i];
                        var DBref = db.collection("Users").doc(FollowerID);                        
                    await DBref.get().then((query) => {
                        if (query.data().UserId != self.UserID) {
                            self.FollowersData.push(query.data());                            
                        }
                      }).catch((error) => {
                        console.log("Error Getting Doc: "+error);
                    })                
                    }
                    // User is signed in.
                } else {
                    console.log("No User Signed in")
            // No user is signed in.
                }
            })
                
            },
            async GetUserAuth()
            {
                let self =this;
                await firebase.auth().onAuthStateChanged(async function(user) {
                    if (user) {
                        self.UserID = user.uid;
                                // User is signed in.
                    } else {
                    console.log("No User Signed in")
                    // No user is signed in.
                        }                
            })
        }
        },
        mounted()
        {
            EventBus.$on("TheSearchResult", async res => {
                    console.log("The value recieved: "+ res);
                    this.FollowersID = res;
                    // await this.GetUserAuth();
                    // var db = firebase.firestore();
                    // var DBref = db.collection("Follows").doc(this.UserID)
                    // DBref.get().then((query)=>{
                    //     this.FollowingID = query.data().Following;
                    // })
                    // console.log("The Following IDs: "+ this.FollowingID);
                    // for (let i = 0; i < this.FollowersID.length; i++) {
                    //     for (let j = 0; j < this.FollowingID.length; j++) {
                    //         if (this.FollowersID[i] == this.FollowingID[j]) {
                    //             this.FollowedIDs.push(this.FollowersID[i]);
                    //         }
                    //     }
                    // }
                    console.log("The Followed Fellas are: "+ this.FollowedIDs);
                    this.FollowersData = [];
                    this.GetFollowersData();
                })
        }
    }
</script>


<style scoped>

</style>