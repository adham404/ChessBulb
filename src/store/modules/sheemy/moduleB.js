const store = ({
    state:{
        counter:0
    },
    mutations:{
        incrementB(state)
        {
            state.counter++
        }
    },
    getters:{
        getCount()
        {
            return state.counter
        }
    }
})

export default store;