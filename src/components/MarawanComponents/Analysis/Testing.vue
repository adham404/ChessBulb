<template>
  <div>
    hahahhaha
    <button @click="add">go pop</button>
    <button @click="getpost">get post</button>
    <button @click="testingap">يا رب</button>
  </div>
</template>

<script>
import AddAnalysis from "./AddAnalysis";
// import getAnalysis from "./GetAnalysis";
import firebase from "firebase";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      stored: {
        first_post: {},
      },
    };
  },
  async mounted() {
    var datapath = await firebase
      .firestore()
      .collection("Matches")
      .doc("Match-d7d49")
      .collection("Comments")
      .get();
    console.log(await datapath.empty);
  },
  computed: {
    ...mapGetters(["GetTheAnalysisLineForMove"]),
  },
  methods: {
    ...mapActions(["fetchPostCommentsMove"]),
    add() {
      var datapath = firebase
        .firestore()
        .collection("Matches")
        .doc("Match-d3149")
        .collection("Comments")
        .doc("1")
        .collection("Comments")
        .doc("HGZqhxs19rmdEhw2Dejy");
      var add = AddAnalysis(datapath, "nested comment45 Pog!!");
      add.add();
    },
    async getpost() {
      // var Analysis = await getAnalysis("Match-d7d49");
      // console.log(await Analysis.getMainlineComments());
      console.log(this.GetTheAnalysisLineForMove)
    },
    async testingap() {
      await this.fetchPostCommentsMove({ 0: "Match-d3149", 1: "1" });
      
      var doc = await this.GetTheAnalysisLineForMove
      console.log(doc);
    },
  },
};
</script>

<style></style>
