import Vuex from "vuex"
import Vue from "vue"
import Stories from "./modules/Marwan/Stories"
import Academies from "./modules/sheemy/Academies"

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        Stories,
        Academies
    }
})