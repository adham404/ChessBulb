import firebase from "firebase";
import UserInfo from"./UserInfo";
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
    UsersTillTheSearchEngineWorksFine:[],
    IfUsersTillTheSearchEngineWorksFineFetched:false,
    VisitorProfileData:"",
    UserListCardData:[],
    CurrentVisitorProfileId:""
}

const getters = {
    GetUserFollowersList:(state)=> state.UserFollowers,
    GetUserFollowingList:(state)=> state.FollowingTheUser,
    GetTenUsersTillTheSearchEngineWorksFine:(state) => (state.UsersTillTheSearchEngineWorksFine ? state.UsersTillTheSearchEngineWorksFine.slice(7, 15) : []),
    GetCurrentVisitorProfileData:(state) => (state.VisitorProfileData),
    GetUsersDataforUserListCards:(state) => (state.UserListCardData)
}

const mutations = {
    MapUserFollowsDataToState:(state,data)=>{
        state.UserFollowers = data.Followers
        state.FollowingTheUser = data.Following
    },
    SetCurrentVisitorProfileId:(state,data) => {
        state.CurrentVisitorProfileId = data;
    },
    SetVisitorProfileData:(state,data) => {
        // state.UsersTillTheSearchEngineWorksFine.forEach((doc) => {
        //     if(doc.UserId == state.CurrentVisitorProfileId)
        //     {
        //         state.VisitorProfileData = doc;
        //     }
        // })
        state.VisitorProfileData = data; 
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
    },
    async FollowThisProfile({dispatch},id)
    {
        var db = firebase.firestore();
        var user = await firebase.auth().currentUser
        //Update in My Following......
        await db.collection("Follows").doc(user.uid).update({
            Following : firebase.firestore.FieldValue.arrayUnion(id)
        })
        //Update in His Followers
        await db.collection("Follows").doc(id).update({
            Followers : firebase.firestore.FieldValue.arrayUnion(user.uid)
        })
        dispatch("fetchUserFollowingData");
        //Thank You :-)
    },
    async UnFollowThisProfile({dispatch},id)
    {
        var db = firebase.firestore();
        var user = await firebase.auth().currentUser
        //Update in My Following......
        await db.collection("Follows").doc(user.uid).update({
            Following : firebase.firestore.FieldValue.arrayRemove(id)
        })
        //Update in His Followers
        await db.collection("Follows").doc(id).update({
            Followers : firebase.firestore.FieldValue.arrayRemove(user.uid)
        })
        dispatch("fetchUserFollowingData");
    },
    async fetchUsersTillTheSearchEngineWorksFine({state})
    {
        var db = firebase.firestore()
       if(!state.IfUsersTillTheSearchEngineWorksFineFetched)
       {
            await db.collection("Users").get().then((snap) => {
                snap.forEach((doc) => {
                if(doc.data().UserID != UserInfo.state.Uid)
                {
                    state.UsersTillTheSearchEngineWorksFine.push(doc.data());
                }
                })
            })
            state.IfUsersTillTheSearchEngineWorksFineFetched = true;
       }
    },
    async fetchUsersFromSearchEngine({state},ids)
    {
        state.UserListCardData = []
        var db = firebase.firestore();
        ids.forEach((id) => {
            db.collection("Users").doc(id).get().then((doc) => {
                state.UserListCardData.push(doc.data());
            })
        })
    }
}


export default {
    state,
    getters,
    actions,
    mutations,
}