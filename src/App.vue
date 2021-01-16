<template>
  <v-app>
    <v-main class="Desktop">
      <router-view name="Desktop"/>
    </v-main>
    <v-main class="Mobile">
      <router-view name="Mobile"/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  
  name: "App",

  data: () => ({
    //
  })
};
</script>

<style lang="css" scoped>
  @media only screen and (max-width: 930px) {
  .Desktop{
    display: none;
    height: 100vh;
  }
  .Mobile{
    display: block;
  }
}
@media only screen and (min-width: 920px) {
  .Desktop{
    display: block;
  }
  .Mobile{
    display: none;
  }
}
</style>
