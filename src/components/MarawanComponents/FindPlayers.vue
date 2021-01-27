<template>
    <div>
        <SearchEngine SearchIndex="Users" />
        <FollowerCard  v-for="(Data,x) in FollowersData" :key="x" :FollowerID="GetUserFollowingList" :FollowerData="Data" />
        <!-- <div   >
        </div> -->
    </div>
</template>

<script>
    import SearchEngine from '@/components/MarawanComponents/SearchEngine/SearchEngine'
    import FollowerCard from "../MarawanComponents/FollowerCard"
    import firebase from "firebase";
    import {EventBus} from "../../main";
    import {mapActions, mapGetters} from "vuex";

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
            SearchedPlayers: [], //Array Containing Searched Players IDs
            UserID:"",
            FollowingID:[],
            FollowedIDs:[]
          }
        },
        computed:{      
            ...mapGetters(['GetSearchedPlayers','GetUserFollowingList','GetSearchedIDs']),
          },
        methods:{
            ...mapActions(['fetchSearchedPlayersData','fetchUserFollowingData']),
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
            })           },
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
        },
        Recieve()
        {
            //TODO 
                console.log("Array Recieved From algolia/state signal: "+ this.GetSearchedIDs);
                this.fetchSearchedPlayersData(this.GetSearchedIDs) //Fetch Searched Players data from the ID recieved from the algolia signal
                this.fetchUserFollowingData();
        }
        },
        async mounted()
        {
            await EventBus.$on("TheSearchResult", async res => {

                    console.log("The value recieved: "+ res);
                    this.FollowersID = res;
                    console.log("The Followed Fellas are: "+ this.FollowedIDs);
                    this.FollowersData = [];
                    this.GetFollowersData();
                    // self.SearchedPlayers = res;
                    //TODO inticipated Problem with re fetching here
                });
        }
    }
</script>


<style scoped>

</style>