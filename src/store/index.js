import Vuex from "vuex"
import Vue from "vue"
import Stories from "./modules/Marwan/Stories"
Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        Stories,
    }
})