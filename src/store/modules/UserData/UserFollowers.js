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
    SearchedUsers:[],
    IamFollowingThisFollowerCard:false,
    IsUserFollowDataFetched : false,
    IsSearchedPlayerDataFetched: false
}

const getters = {
    GetUserFollowersList:(state)=> state.UserFollowers,
    GetUserFollowingList:(state)=> state.FollowingTheUser,
    GetSearchedPlayers:(state)=> state.SearchedUsers,
    GetFollowerCardFollowingState:(state) => state.IamFollowingThisFollowerCard
}

const mutations = {
    MapUserFollowsDataToState:(state,data)=>{
        state.UserFollowers = data.Followers
        state.FollowingTheUser = data.Following
    },
    CheckForFollowingStateOfThisProfileCard:(state,data) => {
        state.FollowingTheUser.forEach((id) => {
            if(id == data)
            {
                state.IamFollowingThisFollowerCard = true;
            }
        })
    },
    UserFollowDataIsFetched:(state)=>   {state.IsUserFollowDataFetched=true},
}

const actions = {
    async fetchUserFollowingData({commit,state}){
        console.log("am here bitch");
        var user = await firebase.auth().currentUser
        if(user && !state.IsUserFollowDataFetched ){
            var DBUserDoc = await firebase.firestore().collection('Follows').doc(user.uid).get()
            commit("MapUserFollowsDataToState",DBUserDoc.data())
            commit("UserFollowDataIsFetched")
        }
    },
    async fetchSearchedPlayersData({state}, SearchedFollowers){ //Fetch Searched players data to be shown in FindPlayers
        state.SearchedUsers = [];
        // console.log("The Array containing Searched users ids: ",SearchedFollowers);
        // SearchedFollowers.forEach((id) => {
        //     state.SearchedUsers.push(id);
        // })
        var db = firebase.firestore();
        var UserRef = db.collection("Users")
        var user = await firebase.auth().currentUser
        // if(user){
        // }
        var count = 0;
        for (let i = 0; i < SearchedFollowers.length; i++) {
            var id = SearchedFollowers[i];
            await UserRef.doc(id).get().then((doc) => {
                if(doc.data().UserId != user.uid)
                {
                    console.log("doc number: ",count++);
                    state.SearchedUsers.push(doc.data()); 
                }
            })         
        }
        console.log("Array Have become: "+ state.SearchedUsers);
        state.IsSearchedPlayerDataFetched = true;
    },
    async FollowThisProfile({dispatch,commit},id)
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
        commit("CheckForFollowingStateOfThisProfileCard",id);
        //Thank You :-)
    },
    async UnFollowThisProfile({dispatch,commit},id)
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
        commit("CheckForFollowingStateOfThisProfileCard",id);
    }
}


export default {
    state,
    getters,
    actions,
    mutations,
}