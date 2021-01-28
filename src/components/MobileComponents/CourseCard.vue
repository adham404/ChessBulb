<template>
    <div class="my-8">
        <v-sheet>
      <v-row class="my-1 px-1" height="200">
        <v-img
          lazy-src="@/assets/Academy2.jpg"
          max-height="150"
          max-width="100%"
          src="@/assets/Academy2.jpg"
        ></v-img>
      </v-row>
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
          <v-rating
            hover
            length="5"
            size="20"
            value="3"
            readonly="true"
          >

          </v-rating>
          <v-btn xs class="text-capitalize primary" height="25" @click="() => {$router.push('/CoursePage')}">Open</v-btn>
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