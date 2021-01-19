import Vuex from "vuex"
import Vue from "vue"
import Stories from "./modules/Marwan/Stories"
import Academies from "./modules/sheemy/Academies"

import UserInfo from "./modules/UserData/UserInfo"
import UserFollowers from "./modules/UserData/UserFollowers"
import UserPurchasing from "./modules/UserData/UserPurchasing"

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        Stories,
        Academies,
        UserInfo,
        UserFollowers,
        UserPurchasing,
    }
})