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

        <v-sheet class="white " height="100" width="100%" rounded="lg" elevation="5">
            <v-row class="ml-1 text-subtitle-1 font-weight-bold">
                <span>Choose course difficulty for further filtering</span>
            </v-row>
            <v-row  justify="space-around">
                <v-checkbox
                v-model="checkbox"
                label= "Beginner"
                ></v-checkbox>
                <v-checkbox
                v-model="checkbox"
                label= "Intermediate"
                ></v-checkbox>
                <v-checkbox
                v-model="checkbox"
                label= "Advanced"
                ></v-checkbox>
            </v-row>
            
        </v-sheet>
        
        <CourseCard v-for="n in 10" :key = "n"/>
    </div>
</template>

<script>
import CourseCard from "@/components/MobileComponents/CourseCard"
    export default {
        components: {
            CourseCard
        }
        
    }
</script>

<style scoped>

</style>