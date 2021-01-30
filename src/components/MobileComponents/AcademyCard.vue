<template>
    <div class="mt-4">
    <v-sheet>
      <v-row class="my-1 px-1" height="200">
        <v-img
          lazy-src="@/assets/ChessAcademy.jpg"
          max-height="150"
          max-width="100%"
          src="@/assets/ChessAcademy.jpg"
        ></v-img>
      </v-row>
      <v-row class="mt-1 px-1 pb-1">
        <v-col>
          <v-avatar size="70" cols= "2" class="mx-0 px-0">
            <img src="img\icons\pexels-pixabay-220453.jpg" alt="" style="object-fit: cover">
          </v-avatar>
        </v-col>
        <v-col cols="9">
          <span class="text-h6">{{AcademyData.AcademyName}}</span>
          <br>
          <span class="text-caption">established a very long time ago</span>
          <br>
          <v-btn xs class="text-capitalize primary"  height="25" @click="AcademyVisit">Open</v-btn>
        </v-col>
      </v-row>
    </v-sheet>
    </div>
</template>

<script>
    import {mapActions} from "vuex"
    export default {
        data: () => ({
    }),
    props:['AcademyData'],
    methods:{
      ...mapActions(['FetchAcademyProfileData']),
      AcademyVisit()
      {
        this.FetchAcademyProfileData(this.AcademyData.AcademyId)
        this.$router.push('/Academies/AcademyPage');
      }
    },
    async mounted()
    {
    }

        
    }
</script>

<style scoped>

</style>