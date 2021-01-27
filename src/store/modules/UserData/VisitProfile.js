import firebase from "firebase"

const state = {
    VisitorData:"",
    VisitorProfilePic:"",
    DoIFollowYou:false
}

const mutations = {
    SetVisitorData:(state,data) => {
        state.VisitorData = data;
    },
    SetVisitorProfilePic:(state,url) => {
        state.VisitorProfilePic = url;
    }
}

const actions = {
    async fetchVisitorProfilePic({state,commit}){
        var Url = ""
        await firebase.firestore().collection('Users').doc(state.VisitorData.UserId).get().then((doc) => {
            Url = doc.data().UserPhoto
        })
        var StorageRef = firebase.storage().ref();
        var PicRef = StorageRef.child(Url);
        //fetch Downloadable url from Cloud Storage
        if(Url != "null" && Url != "")
        {
            await PicRef.getDownloadURL().then((url) => {
                console.log("Url is: "+ url);
                commit("SetVisitorProfilePic",url); 
            })
        }        

    },
    CheckFollowing({state},following)
    {
        following.forEach((id) => {
            if(state.VisitorData.UserId == id)
            {
                state.DoIFollowYou = true
            }
        })
    }
}

const getters = {
 GetVisitorProfilePic(state)
 {
    return state.VisitorProfilePic;
 },
 GetThisUserFollowingState(state)
 {
    return state.DoIFollowYou
 },
 GetVisitorData(state)
 {
    return state.VisitorData;
 },
}

export default {
    getters,
    actions,
    mutations,
    state
}