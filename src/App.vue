<template>
  <div id="app">
    <div v-if="!productive&&LoggedIn" id="social">
      <Header/>
      <router-view/>
    </div>
    <div v-if="productive&&LoggedIn" id="productive">
      <router-view/>
      <SideBar/>
    </div>
    <div v-if="!LoggedIn">
      <router-view/>
    </div>
  </div>

</template>

<script>
import SideBar from '@/components/Skeleton/SideBar.vue'
import Header from '@/components/Skeleton/Header.vue'
import firebase from "firebase";
import { EventBus } from "@/main";
export default {
  data(){
    return{
      productive: false,
      LoggedIn: false,
    }
  },
  methods:
  {
    CheckUserAuth()
    {
  let self = this ;
  firebase.auth().onAuthStateChanged(function(user) { 
      if (user) {
      // User is signed in.
      self.LoggedIn = true;
    } else {
    // No user is signed in.
    }
});
    }
  },
  components: {
    SideBar,
    Header
  },
   mounted() {
    this.CheckUserAuth()
    EventBus.$on("Toggle", data => {
      this.productive = data
    });
    EventBus.$on("LoggedIn", data => {
      this.LoggedIn = data
    });
}
}
</script>

<style>
  #app{
    /* background-color: #00112C; */
  }
  #productive{
    display: flex;
  }
</style>
