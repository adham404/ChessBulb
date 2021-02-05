import firebase from "firebase";
import Vue from "vue";
const state = {
  NumberOfPosts : 0,
  Posts: [],
  ExpectedPosts: 1,
  PostsData: [],
  IsPostesFetched: false
};

const getters = {
  GetPosts: state => state.PostsData,
  GetPostsLength: state => state.ExpectedPosts,
  GetIsPostedFetched: state => state.IsPostesFetched
};

const mutations = {
  AddNewPost: (state, data) => {
    state.NumberOfPosts++
    Vue.set(state.PostsData ,state.NumberOfPosts,data  )
  }  //state.PostsData.push(data)
};

const actions = {
  async fetchPostsFromDP({ commit, state }) {
    await firebase.auth().onAuthStateChanged(async user => {
      if (user && !state.IsPostesFetched) {
        var PostsIds = await firebase
          .firestore()
          .collection("Users")
          .doc(user.uid)
          .collection("NewsFeed")
          .orderBy("Time", "desc")
          .get(); //.collection("NewsFeed").orderBy("Time", "desc")
          state.ExpectedPosts = await PostsIds.size
          //alert(PostsIds.size)
        await PostsIds.forEach(async PostId => {
          var PostIdDoc = await PostId.data();
          var post = await firebase
            .firestore()
            .collection("Matches")
            .doc(PostIdDoc.docId)
            .get();
          await commit("AddNewPost", await post.data());
          await console.log("ss")
        });
        state.IsPostesFetched = await true;
        //await console.warn("finished getting posts",state.NumberOfPosts)
      }
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
