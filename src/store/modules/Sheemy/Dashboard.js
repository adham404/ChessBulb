import firebase from "firebase";

const state = {
  AreYouInstructor: false,
  FirstTimeLoggedIn: true,
  MyAcademyData: "",
  AcademyProfilePath:"",
  AcademyCoverPath:"",
  AcademyProfileUrl:"",
  AcademyCoverUrl:"",
  HandlerID: "",
  LiveSessions: []
};

const mutations = {};

const getters = {
  GetIAmInstructor: state => state.AreYouInstructor,
  GetFirstTimeLoggedIn: state => state.FirstTimeLoggedIn,
  GetAcademyData: state => state.MyAcademyData,
  GetLiveCardsForTheAcademy: state => state.LiveSessions,
  GetAcademyProfileUrl: state => state.AcademyProfileUrl,
  GetAcademyCoverUrl: state => state.AcademyCoverUrl,
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
  async FetchAcademyPhotos({state})
  {
      var StorageRef = firebase.storage().ref();
      var PicRef
      if (state.AcademyProfilePath) {
        //Get Academy Profile First
        PicRef = StorageRef.child(state.AcademyProfilePath);
        //fetch Downloadable url from Cloud Storage
        await PicRef.getDownloadURL().then(url => {
            state.AcademyProfileUrl = url;
        });
      }
      if(state.AcademyCoverPath)
      {
        //Get Academy Profile First
        PicRef = StorageRef.child(state.AcademyCoverPath);
        //fetch Downloadable url from Cloud Storage
        await PicRef.getDownloadURL().then(url => {
            state.AcademyCoverUrl = url;
        });
      }

      state.IsUserpicFetched = true;
  },
  async RemovePic({state}, flag)
  {
    var StorageRef = firebase.storage().ref();
    var db = firebase.firestore();
    var desertRef
    if(flag)
    {
      //Remove it from storage
      if (state.AcademyProfilePath != "") {
        desertRef = StorageRef.child(state.AcademyProfilePath);
        // Delete the file
        await desertRef
          .delete()
          .then(() => {
            console.log("Deleted Successfully");
            // File deleted successfully
          })
          .catch(error => {
            console.log("Some Error " + error);
            // Uh-oh, an error occurred!
          });
      }
      //Remove Profile Pic from db
      db.collection("Academies")
        .doc(state.MyAcademyData.AcademyId)
        .update({
          AcademyProfile:""
          });
      state.AcademyProfileUrl = "";
    }
    else{
      //Remove it from storage
      if (state.AcademyCoverPath != "") {
        desertRef = StorageRef.child(state.AcademyCoverPath);
        // Delete the file
        await desertRef
          .delete()
          .then(() => {
            console.log("Deleted Successfully");
            // File deleted successfully
          })
          .catch(error => {
            console.log("Some Error " + error);
            // Uh-oh, an error occurred!
          });
      }
      //Remove Profile Pic from db
      db.collection("Academies")
        .doc(state.MyAcademyData.AcademyId)
        .update({
          AcademyCover:""
          });
      state.AcademyCoverUrl = "";
    }

  },
  async UploadAcademyPic({state,dispatch}, photodata)
  { 
    var StorageRef = firebase.storage().ref();
    var db = firebase.firestore();
    //Remove Old Photo From Cloud Storage if it exists
    dispatch("RemovePic",photodata.PhotoType);
    if(photodata.PhotoType)
    {
      // Upload New One
      state.AcademyProfilePath = photodata.Url;
      var ImageRef = StorageRef.child(photodata.Url);
      await ImageRef.put(photodata.FileObject)
        .then(snap => {
          alert("Academy Profile Updated Sucessfully: ");
          console.log("succesffully uploaded: " + snap);
        })
        .catch(err => {
          console.log("Error uploading: " + err);
        });
      await db
        .collection("Academies")
        .doc(state.MyAcademyData.AcademyId)
        .update({
          AcademyProfile: photodata.Url
        });
    }
    else
    {
      // Upload New One
      state.AcademyCoverPath = photodata.Url;
      var ImageRef2 = StorageRef.child(photodata.Url);
      await ImageRef2.put(photodata.FileObject)
        .then(snap => {
          alert("Academy Profile Updated Sucessfully: ");
          console.log("succesffully uploaded: " + snap);
        })
        .catch(err => {
          console.log("Error uploading: " + err);
        });
      await db
        .collection("Academies")
        .doc(state.MyAcademyData.AcademyId)
        .update({
          AcademyCover: photodata.Url
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
            state.AcademyProfilePath = state.MyAcademyData.AcademyProfile
            state.AcademyCoverPath = state.MyAcademyData.AcademyCover
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
