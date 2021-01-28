<template>
    <div>
        <v-row class="px-8 mt-1">
            <v-text-field
            height="40"
            color="white"
            background-color = "white"
            rounded
            placeholder = "search for a course by instructor or topic"
            type="text"
          ></v-text-field>
          <v-icon right color="white">
              fa-search
          </v-icon>
        </v-row>
        
        <AcademyCard v-for="n in 10" :key = "n"/>
    </div>
</template>

<script>
import AcademyCard from "@/components/MobileComponents/AcademyCard"
    export default {
        components: {
            AcademyCard
        }
        
    }
</script>

<style scoped>

</style>