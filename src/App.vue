<template>
  <div id="app">
    <div v-if="!productive" id="social">
      <Header/>
      <router-view/>
    </div>
    <div v-if="productive" id="productive">
      <router-view/>
      <SideBar/>
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
