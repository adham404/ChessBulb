<template>
        <div>
    <v-sheet class="mt-8">
      <v-row>
        <v-col cols="3">
          <v-skeleton-loader class="ml-2" type="avatar" ></v-skeleton-loader>
        </v-col>
        <v-col cols="6">
          <v-skeleton-loader class="mt-3" type="text"></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row  class="mt-2 mb-1 ml-4">
        <v-skeleton-loader width="90vw" type="text"></v-skeleton-loader>
      </v-row>
      <v-row class="mt-1 mb-1" justify="center">
        <v-col>
          <v-skeleton-loader class="ma-auto" width="97vw" type="image" ></v-skeleton-loader>
        </v-col>
      </v-row>
      <v-row class="mb-1 mt-1" justify="center">
        <v-skeleton-loader type="button" ></v-skeleton-loader>
        <v-skeleton-loader type="button" ></v-skeleton-loader>
        <v-skeleton-loader type="button" ></v-skeleton-loader>
        <v-skeleton-loader type="button" ></v-skeleton-loader>
      </v-row>
      <v-sheet
        
        width="95%"
        class="ml-2 mt-2 mb-2 px-2"
        rounded="lg"
      >
       <v-skeleton-loader width="207vw" type="heading" ></v-skeleton-loader>
      </v-sheet>
      
      <v-row class="mt-1 mb-1" justify="space-between">
        <v-skeleton-loader class="ml-6" width="30vw" type="text" ></v-skeleton-loader>
        <v-skeleton-loader class="mr-6" width="30vw" type="text" ></v-skeleton-loader>
      </v-row>
      
      <v-row class="mt-1 mb-1" justify="space-around">
        <v-col cols="3" >
        <v-skeleton-loader block type="button"></v-skeleton-loader>
        </v-col >
        <v-col cols="3" >
        <v-skeleton-loader block type="button"></v-skeleton-loader>
        </v-col >
        <v-col cols="3" >
        <v-skeleton-loader block type="button"></v-skeleton-loader>
        </v-col >
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