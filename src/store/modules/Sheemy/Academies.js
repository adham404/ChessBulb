import firebase from "firebase";

const state = {
  AllAcademies: [],
  AcademyProfileData: "",
  IsAllAcademiesDataFetched: false,
  ThisAcademyLiveCards: []
};

const getters = {
  GetAllAcademies: state => state.AllAcademies,
  GetAcademyDataProfile: state => state.AcademyProfileData,
  GetAcademyLiveCards: state => state.ThisAcademyLiveCards
};

const mutations = {
  SetAcademiesDataToTheGeneralArray(state, data) {
    state.AllAcademies = [];
    state.AllAcademies = data;
  }
};

const actions = {
  async FetchAllAcademies({ state }) {
    if (!state.IsAllAcademiesDataFetched) {
      var db = firebase.firestore();
      await db
        .collection("Academies")
        .get()
        .then(snap => {
          snap.forEach(doc => {
            state.AllAcademies.push(doc.data());
          });
        });
      state.IsAllAcademiesDataFetched = true;
    }
  },
  async FetchAcademyProfileData({ state }, id) {
    state.AllAcademies.forEach(data => {
      if (data.AcademyId == id) {
        state.AcademyProfileData = data;
      }
    });
  },
  async FetchAllLiveCardsForThisVistedAcademies({ state }) {
    state.ThisAcademyLiveCards = [];
    var db = firebase.firestore();
    await db
      .collection("Lives")
      .get()
      .then(snap => {
        snap.forEach(doc => {
          if (doc.data().AcademyId == state.AcademyProfileData.AcademyId) {
            state.ThisAcademyLiveCards.push(doc.data());
          }
        });
      });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
