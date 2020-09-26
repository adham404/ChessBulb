<template>
  <div>
   Marwan Fouda was here 
   <search :ShowFilters="filters" SearchIndex="Courses" />
  </div>
</template>

<script>

import search from "@/components/MarawanComponents/SearchEngine/SearchEngine.vue"

export default {
  data(){
    return{
      filters: true
    }
  },
  components:{
    search
  }
  
  
};
</script>

<style>
div {
  color: white;
}
</style>
