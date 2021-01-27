
const state = {
    SearchedIDs: []
}

const mutations = {
    SetSearchedIDs:(state,Ids) => {
        state.SearchedIDs = [];
        state.SearchedIDs = Ids
    }
}
const getters = {
    GetSearchedIDs:(state) => (state.SearchedIDs)
}

export default {
    state,
    mutations,
    getters
}