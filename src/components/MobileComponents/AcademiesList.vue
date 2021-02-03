<template>
  <div>
    <v-row class="px-8 mt-1">
      <v-text-field
        height="40"
        color="white"
        background-color="white"
        rounded
        placeholder="search for a course by instructor or topic"
        type="text"
      ></v-text-field>
      <v-icon right color="white">
        fa-search
      </v-icon>
    </v-row>

    <AcademyCard
      v-for="(AcademyData, x) in GetAllAcademies"
      :AcademyData="AcademyData"
      :key="x"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import AcademyCard from "@/components/MobileComponents/AcademyCard";
export default {
  components: {
    AcademyCard
  },
  methods: {
    ...mapActions(["FetchAllAcademies"])
  },
  async mounted() {
    //Fetch All Academies
    await this.FetchAllAcademies();
  },
  computed: {
    ...mapGetters(["GetAllAcademies"])
  }
};
</script>

<style scoped></style>
