<template>
  <div class="SearchEngine">
    <v-row class="px-8 mt-1">
            <v-text-field
            height="40"
            color="white"
            background-color = "white"
            rounded
            placeholder = "search"
            type="text"
            v-model="qurey"
          ></v-text-field>
          <v-icon @click="search" right color="white">
              fa-search
          </v-icon>
        </v-row>
    <div class="Filter" v-if="ShowFilters">
            <v-sheet class="white " height="100" width="100%" rounded="lg" elevation="5">
            <v-row class="ml-1 text-subtitle-1 font-weight-bold">
                <span>Choose course difficulty for further filtering</span>
            </v-row>
            <v-row  justify="space-around">
                <v-checkbox
                v-model="checkedFilters"
                label= "Beginner"
                @change="search"
                ></v-checkbox>
                <v-checkbox
                v-model="checkedFilters"
                label= "Intermediate"
                @change="search"
                ></v-checkbox>
                <v-checkbox
                v-model="checkedFilters"
                label= "Advanced"
                @change="search"
                ></v-checkbox>
            </v-row>
            
        </v-sheet>
    </div>
  </div>
</template>

<script>
// import firebase from 'firebase'
//firebase functions:config:set algolia.app=6QLSJPKZLF algolia.key=73c12cce64ff2c58497bac33bc843859
import algoliasearch from "algoliasearch/lite";
import { EventBus } from "@/main.js";
import {mapMutations} from "vuex";

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
      this.search();
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
    ...mapMutations(['SetSearchedIDs']),
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
      await this.SetSearchedIDs(res);
      EventBus.$emit("TheSearchResult", res);
      EventBus.$emit("ResultOfSearch");
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
  color: white;
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
