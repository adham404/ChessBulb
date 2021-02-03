<template>
  <div>
    <!-- <v-row class="px-8 mt-1">
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
    </v-row> -->

    <SearchEngine SearchIndex="Academies" :ShowFilters="false"></SearchEngine>
    <AcademyCard
      v-for="(AcademyData, x) in GetAllAcademies"
      :AcademyData="AcademyData"
      :key="x"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import AcademyCard from "@/components/MobileComponents/AcademyCard";
import SearchEngine from "../MarawanComponents/SearchEngine"
import firebase from "firebase"
import {EventBus} from "../../main"

export default {
  components: {
    AcademyCard,
    SearchEngine
  },
  data()
  {
    return{
      Academies:[]
    }
  },
  methods: {
    ...mapActions(["FetchAllAcademies"]),
    ...mapMutations(['SetAcademiesDataToTheGeneralArray']),
  async FetchIdsQuick(ids)
    {
      this.Academies = [];
      var db = firebase.firestore();
      ids.forEach( async id => {
        await db.collection("Academies")
          .doc(id)
          .get()
          .then(doc => {
            this.Academies.push(doc.data());
          });
      });
      this.SetAcademiesDataToTheGeneralArray(this.Academies);
    }
  },
  async mounted() {
    //Fetch All Academies
    EventBus.$on("TheSearchResult", (ids) => {
      console.log("Hey:  "+ ids);
      this.FetchIdsQuick(ids)
    })

    // await this.FetchAllAcademies();
  },
  computed: {
    ...mapGetters(["GetAllAcademies"])
  }
};
</script>

<style scoped></style>
