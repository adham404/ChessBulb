<template>
  <div>
    <LiveCard v-for="(LiveData,x) in GetAcademyLiveCards" :LiveData="LiveData" :key="x"></LiveCard>      
  </div>
</template>

<script>
import LiveCard from "./LiveCard"
import {mapActions,mapGetters} from "vuex"


export default {
    computed:{
        ...mapGetters(['GetAcademyLiveCards'])
    },
    components:{
        LiveCard
    },
    methods:{
        ...mapActions(['FetchAllLiveCardsForThisVistedAcademies'])
    },
    mounted()
    {
        //Fethc All Live Cards for this specific academy
        this.FetchAllLiveCardsForThisVistedAcademies()
    }
}
</script>

<style>

</style>