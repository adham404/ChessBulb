// import Vue from "vue";
// import Vuex from "vuex";

// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {}
// });

import Vuex from "vuex"
import Vue from "vue"
import Stories from "./modules/Marwan/Stories"
Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        Stories,
    }
})
