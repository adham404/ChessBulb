import firebase from "firebase";
/*
    DATA HERE
    LIST OF Purchased Coursers 
    LIST OF Subscribed Acadymies
*/
/*
    Todo:-
    DONE fetch Purchased Coursers 
    DONE map data to states 
    DONE fetch Subscribed Acadymies 
    DONE map data to states
    DONE get Purchased Coursers 
    DONE get Subscribed Acadymies 
    
*/
const state = {
  IsUserAcadmiesDataFethched: false,
  UserSubedAcadmies: [],
  IsUserCoursesDataFethched: false,
  UserBoughtCourses: []
};

const getters = {
  GetUserBoughtCoursers: state => state.UserBoughtCourses,
  GetUserSubedAcadmies: state => state.UserSubedAcadmies
};

const mutations = {
  AddUserSubedAcademy: (state, indata) => {
    state.UserSubedAcadmies.push(indata);
  },

  UserAcadmiesDataIsFethched: () => {
    state.IsUserAcadmiesDataFethched = true;
  },

  AddUserBoughtCourse: (state, indata) => {
    state.UserBoughtCourses.push(indata);
  },

  UserCoursesDataIsFethched: () => {
    state.IsUserCoursesDataFethched = true;
  }
};

const actions = {
  async fetchUserSubscribedAcadmies({ commit, state }) {
    var user = await firebase.auth().currentUser;
    if (user && !state.IsUserAcadmiesDataFethched) {
      // var DBUserDoc = await firebase.firestore().collection('Follows').doc(user.uid).get()
      firebase
        .firestore()
        .collection("AcademyEnrollments")
        .where("UserId", "==", user.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            commit("AddUserSubedAcademy", doc.data().AcademyId);
          });
          commit("UserAcadmiesDataIsFethched");
        });
    }
  },
  async fetchUserBoughtCourses({ commit, state }) {
    var user = await firebase.auth().currentUser;
    if (user && !state.IsUserCoursesDataFethched) {
      // var DBUserDoc = await firebase.firestore().collection('Follows').doc(user.uid).get()
      firebase
        .firestore()
        .collection("CourseOrders")
        .where("UserId", "==", user.uid)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            commit("AddUserBoughtCourse", doc.data().CourseId);
          });
          commit("UserCoursesDataIsFethched");
        });
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
