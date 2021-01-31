<template>
      <div>
        <v-row class="px-8 mt-1">
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
        </v-row>
        <ProfileCard v-for="(data,x) in GetTenUsersTillTheSearchEngineWorksFine" :FollowerData="data" :key = "x"/>        
    </div>
</template>

<script>
import ProfileCard from "./ProfileCard"
import {mapActions, mapGetters} from "vuex"

export default {
components:{
    ProfileCard
},
computed:{
    ...mapGetters(['GetTenUsersTillTheSearchEngineWorksFine'])
},
methods:{
    ...mapActions(['fetchUsersTillTheSearchEngineWorksFine'])
},
async mounted()
{
    //In General Case I Have all the Ids of ChessPlayers so I am Going to Fetch them till the algolia function works fine
    await this.fetchUsersTillTheSearchEngineWorksFine();
}   
}
</script>

<style>

</style>