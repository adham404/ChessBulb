<template>
  <div id="app">
    <div v-if="!productive" id="social">
      <Header/>
      <router-view/>
    </div>
    <div v-if="productive" id="productive">
      <SideBar/>
      <router-view/>
    </div>
  </div>

</template>

<script>
import SideBar from '@/components/SideBar.vue'
import Header from '@/components/Header.vue'
import { EventBus } from "@/main";
export default {
  data(){
    return{
      productive: false,
    }
  },
  components: {
    SideBar,
    Header
  },
   mounted() {
    EventBus.$on("Toggle", data => {
      this.productive = data
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
