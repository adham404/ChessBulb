<template>
  <div>
  <v-sheet height="86vh">
    <v-row no-gutters justify="center"  >
      <v-col class="ml-10 mt-10  pl-7"  >
        <v-icon   color="red" right  size="250">
          mdi-close-octagon
        </v-icon>
      </v-col>
    </v-row>
    <v-row no-gutters justify="center" >
      <p class="text-subtitle-1 font-weight-bold text-justify text-center">
        The Purchase has been Canceled
      </p>
      <!-- <p class="text-subtitle-1 font-weight-bold text-justify text-center">
        Your Product will be added to your items shortly
      </p> -->
      
    </v-row>
  </v-sheet>
</div>
</template>

<script>
export default {
  mounted() {
    console.log(this.$route.params.sessionid);
  }
};
</script>

<style></style>
