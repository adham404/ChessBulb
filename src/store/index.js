// import Vue from "vue";
// import Vuex from "vuex";

// Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {},
//   mutations: {},
//   actions: {},
//   modules: {}
// });

import Vuex from "vuex";
import Vue from "vue";
import Stories from "./modules/Marwan/Stories";
import NewsFeed from "./modules/Marwan/NewsFeed";
import ChessSnapshot from "./modules/Sheemy/ChessSanpshot";
import UserInfo from "./modules/UserData/UserInfo";
import Courses from "./modules/Sheemy/Courses";
import UserFollowers from "./modules/UserData/UserFollowers";
import Academies from "./modules/Sheemy/Academies";
import Dashboard from "./modules/Sheemy/Dashboard";
import Analysis from "./modules/Marwan/Analysis/Analysis";
import DatetimePicker from 'vuetify-datetime-picker'
// import 'vuetify-datetime-picker/src/stylus'
Vue.use(DatetimePicker)
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    Stories,
    Dashboard,
    Academies,
    ChessSnapshot,
    UserInfo,
    UserFollowers,
    Courses,
    NewsFeed,
    Analysis
  }
});
