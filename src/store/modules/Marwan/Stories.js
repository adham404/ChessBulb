import firebase from "firebase";


const state = {
    Stories : [],
    currentindex:0,
    cureentStory:null,
}
const getters = {
    getStories:(state)=>(state.Stories),
    getFirst7Stories:(state)=>(state.Stories ? state.Stories.slice(0, 7) : []),
    getStoriesbyindex:(state)=>(index)=>(state.Stories[index]),
    getCurrentStory:(state)=>(state.Stories[state.currentindex]),
}
const mutations = {
    ResetStories:(state)=>(state.Stories=[]),
    SetStories: (state,newstories) => {
         newstories.unshift({Type:'add'})
        state.Stories = newstories} ,
    AddStory: (state,newstory) =>{
        state.Stories.push(newstory)
    },
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
    async fetchStories({commit,}){
        await commit("ResetStories")
        await commit("AddStory",{Type:'add'})
        console.log("fetchStories")
        var user = await firebase.auth().currentUser
                var followingdata = await firebase.firestore().collection('Follows').doc(user.uid).get()
                var followingUsers = await followingdata.data().Following
                await followingUsers.unshift(user.uid)
                var fetchedstories = [];
                await followingUsers.forEach(async fuser =>{
                    var userstories =  await firebase.firestore().collection("ChessStories").where("UserID","==",fuser).get()
                    await userstories.forEach(async doc =>{
                       await fetchedstories.unshift(doc.data())
                       await commit("AddStory",doc.data())
                        
                    })
            })
            
            // await console.log(fetchedstories)
            
            // await commit('SetStories', fetchedstories);
            
         
        
        
    },
}

export default {
    state,
    getters,
    actions,
    mutations,
}
