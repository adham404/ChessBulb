<template>
  <div class="mt-4">
    <v-sheet>
      <v-row class="my-1 px-1" height="200">
        <v-skeleton-loader width="100%" height="150px" type="image" ></v-skeleton-loader>
      </v-row>
      <v-row class="mt-1 px-1 pb-1">
        <v-col cols="3">
         <v-skeleton-loader class="ml-4 mt-4"  type="avatar"></v-skeleton-loader>
        </v-col>
        <v-col cols="9">
          <v-skeleton-loader class="mt-4"  width="100" type="text" ></v-skeleton-loader>
          
          <v-skeleton-loader class="mt-3"  width="100" type="text" ></v-skeleton-loader>
          
          <v-skeleton-loader type="button"></v-skeleton-loader
          >
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>