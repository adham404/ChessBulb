<template>
    <div>
    <v-sheet class="my-8">
      <v-row class="mt-1 px-1 pb-1">
        <v-col>
          <v-avatar size="70" cols= "2" class="mx-0 px-0">
            <img src="@/assets/ProfilePic2.jpg" alt="" style="object-fit: cover">
          </v-avatar>
          <span class="text-caption ml-2">Mostafa</span>
        </v-col>
        <v-col cols="9">
          <span class="text-h6">The sicilian najdorf</span>
          <br>
          <span class="text-caption">by Mostafa Hamido (instructor at Smouha Chess Academy)</span>
          <br>
          <span class="text-subtitle-1">starts on 27th of may at 12:30pm</span>
          <v-btn xs class="text-lowercase primary" height="25" @click="() => {$router.push('/LiveViewer')}">join room</v-btn>
        </v-col>
      </v-row>
    </v-sheet>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>