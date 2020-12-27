import firebase from "firebase";


const state = {
    Stories : null,
    currentindex:0,
    cureentStory:null,
}
const getters = {
    getStories:(state)=>(state.Stories),
    getStoriesbyindex:(state)=>(index)=>(state.Stories[index]),
    getCurrentStory:(state)=>(state.Stories[state.currentindex]),
}
const mutations = {
    SetStories: (state,newstories) => {
         newstories.unshift({Type:'add'})
        state.Stories = newstories} ,
    incrementStoryIndex:(state)=>(state.currentindex++),
    descrementStoryIndex:(state)=>(state.currentindex--),
    SetStoriesIndexToNumber:(state,indexnumber)=>(state.currentindex = indexnumber)
}
const actions = {
    async SetStoriesIndexTo({commit},indexnumber){
        await commit("SetStoriesIndexToNumber",indexnumber)
       
    },
    MoveToNextStory({commit,state}){
        if(state.currentindex< state.Stories.length-1){
            commit("incrementStoryIndex")
        }
    },
    MoveToPrevioustStory({commit,state}){
        if(state.currentindex>0){
            commit("descrementStoryIndex")
        }
    },
    async fetchStories({commit}){
        
        await firebase.auth().onAuthStateChanged(async function(user) {
            if (user) {
                // console.log('user:'+ user.uid)
               
                var followingdata = await firebase.firestore().collection('Follows').doc(user.uid).get()
                var followingUsers = await followingdata.data().Following
                var fetchedstories = [];
                await followingUsers.forEach(async fuser =>{
                    var userstories =  await firebase.firestore().collection("ChessStories").where("UserID","==",fuser).get()
                    await userstories.forEach(async doc =>{
                       await fetchedstories.unshift(doc.data())
                        
                    })
            })
            await console.log(fetchedstories)
            
            await commit('SetStories', fetchedstories);
            
            } else {
                console.log('log in')
               
            }
        });
        
        
    }
}

export default {
    state,
    getters,
    actions,
    mutations,
}
