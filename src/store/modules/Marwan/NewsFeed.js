import firebase from "firebase";

const state = {
  Posts: [],
  PostsData: [],
  IsPostesFetched: false
};

const getters = {
  GetPosts: state => state.PostsData
};

const mutations = {
  AddNewPost: (state, data) => state.PostsData.push(data)
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
        await PostsIds.forEach(async PostId => {
          var PostIdDoc = await PostId.data();
          var post = await firebase
            .firestore()
            .collection("Matches")
            .doc(PostIdDoc.docId)
            .get();
          await commit("AddNewPost", await post.data());
        });
        state.IsPostesFetched = true;
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
