import firebase from "firebase";
/*
    DATA HERE
    LIST OF FOLLOWERS 
    LIST OF FOLLOWING 
*/
/*
    Todo:-
    DONE fetch data 
    DONE map data to states
    DONE get followers
    DONE get following 
    for future :-
    DO acation for follow user
    DO acation for unfollow user
*/
const state = {
    UserFollowers : [],
    FollowingTheUser : [],
    IsUserFollowDataFetched : false,
}

const getters = {
    GetUserFollowersList:(state)=> state.UserFollowers,
    GetUserFollowingList:(state)=> state.FollowingTheUser,
}

const mutations = {
    MapUserFollowsDataToState:(state,data)=>{
        state.UserFollowers = data.Followers
        state.FollowingTheUser = data.Following
    },
    UserFollowDataIsFetched:(state)=>{state.IsUserFollowDataFetched=true},
}

const actions = {
    async fetchUserFollowingData({commit,state}){
        var user = await firebase.auth().currentUser
        if(user && !state.IsUserFollowDataFetched ){
            var DBUserDoc = await firebase.firestore().collection('Follows').doc(user.uid).get()
            commit("MapUserFollowsDataToState",DBUserDoc.data())
            commit("UserFollowDataIsFetched")
        }
    }
}


export default {
    state,
    getters,
    actions,
    mutations,
}