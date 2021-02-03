import firebase from "firebase";

const state = {
  AreYouInstructor: false,
  FirstTimeLoggedIn: true,
  MyAcademyData: "",
  HandlerID: "",
  LiveSessions: []
};

const mutations = {};

const getters = {
  GetIAmInstructor: state => state.AreYouInstructor,
  GetFirstTimeLoggedIn: state => state.FirstTimeLoggedIn,
  GetAcademyData: state => state.MyAcademyData,
  GetLiveCardsForTheAcademy: state => state.LiveSessions
};

const actions = {
  async EditMyAcademyBio({ state }, data) {
    if (data != "") {
      var db = firebase.firestore();
      await db
        .collection("Academies")
        .doc(state.MyAcademyData.AcademyId)
        .update({
          About: data
        });
    }
  },
  async FetchLiveCardDataForDashboard({ state }) {
    console.log("live Sa");
    state.LiveSessions = [];
    var db = firebase.firestore();
    await db
      .collection("Lives")
      .where("AcademyId", "==", state.MyAcademyData.AcademyId)
      .get()
      .then(snap => {
        snap.forEach(doc => {
          if (doc.data().AcademyId == state.MyAcademyData.AcademyId) {
            state.LiveSessions.push(doc.data());
            console.log("live Sa");
          }
        });
      });
  },
  async CheckInstructorValidaty({ state }, id) {
    console.log("I am here");
    state.HandlerID = id;
    var db = firebase.firestore();
    await db
      .collection("Users")
      .doc(id)
      .get()
      .then(doc => {
        console.log("Hellooo " + doc.data().FirstName);
        if (doc.data().Instructor == true) {
          state.AreYouInstructor = true;
          state.FirstTimeLoggedIn = false;
        }
      });
  },
  async FetchMyAcademyData({ state }) {
    console.log("Hey wassup: " + state.HandlerID);
    var db = firebase.firestore();
    await db
      .collection("Academies")
      .where("OwnerId", "==", state.HandlerID)
      .get()
      .then(snap => {
        snap.forEach(doc => {
          if (doc.data().OwnerId == state.HandlerID) {
            console.log("Yup");
            state.MyAcademyData = doc.data();
          }
        });
      });
  }
};

export default {
  state,
  mutations,
  getters,
  actions
};
