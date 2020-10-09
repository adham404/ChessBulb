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
import { EventBus } from "@/main";
export default {
  data(){
    return{
      productive: true,
      LoggedIn: true,
    }
  },
  components: {
    SideBar,
    Header
  },
   mounted() {
    // EventBus.$on("Toggle", data => {
    //   this.productive = data
    // });
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
