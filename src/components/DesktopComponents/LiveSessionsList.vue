<template>
  <div>
    <LiveCard
      v-for="(LiveData, x) in GetLiveCardsForTheAcademy"
      :LiveData="LiveData"
      :key="x"
    ></LiveCard>
  </div>
</template>

<script>
import LiveCard from "./Marwan/LiveCardForAdmin";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    LiveCard
  },
  methods: {
    ...mapActions(["FetchLiveCardDataForDashboard"])
  },
  mounted() {
    this.FetchLiveCardDataForDashboard();
  },
  computed: {
    ...mapGetters(["GetLiveCardsForTheAcademy"])
  }
};
</script>

<style></style>
