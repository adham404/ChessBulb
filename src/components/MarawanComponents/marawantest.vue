<template>
  <div>
      <h1>Welcome to Marwan Testing Page</h1>
      <p> if your name is Shemy please leave the page </p>
      <StockFish />
  </div>
</template>

<script>
import StockFish from '@/components/MarawanComponents/StockFish.vue'

export default {
    components:{
        StockFish,
    },

}
</script>

<style>
div{
    color: white;
}

</style>