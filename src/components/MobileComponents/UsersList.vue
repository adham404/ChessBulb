<template>
      <div>
        <!-- <v-row class="px-8 mt-1">
            <v-text-field
            height="40"
            color="white"
            background-color = "white"
            rounded
            placeholder = "search for a ChessPlayer to expand your network"
            type="text"
          ></v-text-field>
          <v-icon right color="white">
              fa-search
          </v-icon>
        </v-row> -->
        <SearchEngine SearchIndex="Users" :ShowFilters="false"></SearchEngine>
        <ProfileCard v-for="(data,x) in UserDataList" :FollowerData="data" :key = "x"/>        
    </div>
</template>

<script>
import ProfileCard from "./ProfileCard"
import SearchEngine from "../MarawanComponents/SearchEngine"
import firebase from "firebase"
import {mapActions, mapGetters} from "vuex"
import { EventBus } from '../../main'

export default {
components:{
    ProfileCard,
    SearchEngine
},
computed:{
    ...mapGetters(['GetTenUsersTillTheSearchEngineWorksFine','GetUsersDataforUserListCards'])
},
data()
{
    return{
        UserDataList:[]
    }
},
methods:{
    ...mapActions(['fetchUsersTillTheSearchEngineWorksFine','fetchUsersFromSearchEngine']),
    GetUserData(ids)
    {
        this.UserDataList = [];
        var db = firebase.firestore();
        ids.forEach((id) => {
            db.collection("Users").doc(id).get().then((doc) => {
                this.UserDataList.push(doc.data());
            })
        })
    }
},
beforeDestroy(){
    EventBus.$off();
},
async mounted()
{
    await EventBus.$on("TheSearchResult", async (res) => {
        this.GetUserData(res);
        // console.log("Hey Look What i have recieved: "+ res);
        // await this.fetchUsersFromSearchEngine(res);
    });
    //In General Case I Have all the Ids of ChessPlayers so I am Going to Fetch them till the algolia function works fine
}   
}
</script>

<style>

</style>