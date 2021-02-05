<template>
<div>
  <v-sheet height="86vh">
    <v-row no-gutters justify="center"  >
      <v-col class="ml-3 mt-10">
        <v-icon color="green"  size="250">
          mdi-check-bold
        </v-icon>
      </v-col>
    </v-row>
    <v-row no-gutters justify="center" >
      <p class="text-subtitle-1 font-weight-bold text-justify text-center">
        The Purchase has been done successfully
      </p>
      <p class="text-subtitle-1 font-weight-bold text-justify text-center">
        Your Product will be added to your items shortly
      </p>
      
    </v-row>
  </v-sheet>
</div>
</template>

<script>
// import firebase from "firebase"
export default {
  async mounted() {
    console.log(this.$route.params.sessionid);
  }
};
</script>

<style></style>
