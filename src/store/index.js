import Vuex from "vuex"
import Vue from "vue"
import Stories from "./modules/Marwan/Stories"
import UserInfo from "./modules/UserData/UserInfo"
import UserFollowers from "./modules/UserData/UserFollowers"
import UserPurchasing from "./modules/UserData/UserPurchasing"
import Analysis from "./Analysis/Analysis"
Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        Stories,
        UserInfo,
        UserFollowers,
        UserPurchasing,
        Analysis,
    }
})