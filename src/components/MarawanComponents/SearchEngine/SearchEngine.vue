<template>
  <div class="SearchEngine">
    <input type="text" id="SearchEngine" placeholder="Search" v-model="qurey" />
    <!-- <input type="submit" value="search" @click="search" /> -->
    <svg
      @click="search"
      xmlns="http://www.w3.org/2000/svg"
      width="35.997"
      height="36.004"
      viewBox="0 0 35.997 36.004"
    >
      <path
        id="Icon_awesome-search"
        data-name="Icon awesome-search"
        d="M35.508,31.127l-7.01-7.01a1.686,1.686,0,0,0-1.2-.492H26.156a14.618,14.618,0,1,0-2.531,2.531V27.3a1.686,1.686,0,0,0,.492,1.2l7.01,7.01a1.681,1.681,0,0,0,2.384,0l1.99-1.99a1.7,1.7,0,0,0,.007-2.391Zm-20.883-7.5a9,9,0,1,1,9-9A8.995,8.995,0,0,1,14.625,23.625Z"
        fill="#fff"
      />
    </svg>
    <div class="Filter" v-if="ShowFilters">
            <input type="checkbox" v-model="checkedFilters" value="Difficulty:Beginner" id="Beginner">
            <label for="Beginner">Beginner</label>
            <input type="checkbox" v-model="checkedFilters" value="Difficulty:Intermediate" id="Intermediate">
            <label for="Intermediate">Intermediate</label>
            <input type="checkbox" v-model="checkedFilters" value="Difficulty:Advanced" id="Advanced">
            <label for="Advanced">Advanced</label>
    </div>
  </div>
</template>

<script>
// import firebase from 'firebase'
//firebase functions:config:set algolia.app=6QLSJPKZLF algolia.key=73c12cce64ff2c58497bac33bc843859
import algoliasearch from "algoliasearch/lite";
import { EventBus } from "@/main.js";
var index;
export default {
  props: ["ShowFilters", "SearchIndex"],
  async mounted() {
    const client = await algoliasearch(
      "6QLSJPKZLF",
      "3cd07d257f7f35161891483bda18ed92"
    );
    if (this.SearchIndex) {
      index = await client.initIndex(this.SearchIndex);
    }
    EventBus.$on("SearchIndex", (ind) => {
      index = client.initIndex(ind);
    });
  },
  data() {
    return {
      checkedFilters: [],
      qurey: "",
    };
  },
  methods: {
    async search() {
      var options = "";
      this.checkedFilters.forEach((i, index) => {
        options += index == this.checkedFilters.length - 1 ? i : i + " OR ";
      });
      // console.log(options)
      var val = await index.search(this.qurey, {
        filters: options,
      });
      var res = [];
      // console.log(val)
      await val.hits.forEach((doc) => {
        res.push(doc.objectID);
      });
      await console.log(res);
      EventBus.$emit("TheSearchResult", res);
    },
  },
};
</script>

<style scoped>
.Filter {
  margin-left: 30px;
}
label {
  margin-right: 10px;
  font-family: "Quicksand", sans-serif;
  font-weight: lighter;
  font-size: 1.25rem;
}
#SearchEngine {
  display: flex;
  border-radius: 0.8rem;
  padding-left: 0.5rem;
  border: none;
  outline: none;
  height: 2rem;
  width: 25%;
  align-items: center;
}
.SearchEngine {
  display: flex;
  justify-content: center;
  width: 100%;
}
.SearchEngine svg {
  margin-left: 0.5rem;
  height: 1.8rem;
  align-self: center;
}
</style>
//TODO create search filde (3min) //TODO create search bottoms(5min) //TODO add
funcation for querying (5min) //TODO get the name of the colection to scearch
in(5min) //TODO get the querying data (5min) //TODO search the data from the
input(4min) //TODO return the searched data (4min) //FIXME how to use Algolia
(30min)
