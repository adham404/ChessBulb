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
import ChessSnapshot from "./modules/Sheemy/ChessSanpshot"
import UserInfo from "./modules/UserData/UserInfo"
import Courses from "./modules/Sheemy/Courses"
import UserFollowers from "./modules/UserData/UserFollowers"
import Academies from "./modules/Sheemy/Academies"

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        Stories,
        Academies,
        ChessSnapshot,
        UserInfo,
        UserFollowers,
        Courses
    }
})
