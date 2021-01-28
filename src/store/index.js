import Vuex from "vuex"
import Vue from "vue"
import Stories from "./modules/Marwan/Stories"
import Academies from "./modules/sheemy/Academies"

import UserInfo from "./modules/UserData/UserInfo"
import UserFollowers from "./modules/UserData/UserFollowers"
import UserPurchasing from "./modules/UserData/UserPurchasing"
import Analysis from "./Analysis/Analysis"
import Search from "./modules/sheemy/Search"
import VisitProfile from "./modules/UserData/VisitProfile"

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        Stories,
        VisitProfile,
        Academies,
        UserInfo,
        UserFollowers,
        UserPurchasing,
        Analysis,
        Search
    }
})