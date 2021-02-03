import firebase from "firebase";
/* 
    DATA HERE
    -First Name
    -Last Name
    -Full Name
    -User ID
    -Bio
    -Email
    -IS Instractor ?

*/
/*
    Todo :- 
    DONE fetch user data from db
    DONE map data to states 
    create getters
        DONE get UID
        DONE get first name 
        DONE get last name
        DONE get full name
        DONE get Email
        DONE Bio 
    for future :-
    DO Acations for changing name,bio and Email 
*/
const state = {
  IsUserInfoFetched: false,
  IsUserpicFetched: false,
  FULLDATA: null,
  Uid: null,
  FirstName: "",
  ProfilePicUrl: "",
  ProfilePicPath: "",
  LastName: "",
  FullName: "",
  Email: null,
  Bio: "",
  IsInstructor: false
};

const getters = {
  GETUserFULLDATA: state => state.FULLDATA,
  GETUserID: state => state.Uid,
  GETUserFirstName: state => state.FirstName,
  GETUserLastName: state => state.LastName,
  GETUserFullName: state => state.FullName,
  GETUserEmail: state => state.Email,
  GETUserBio: state => state.Bio,
  GETUserIsInstructor: state => state.IsInstructor,
  GetProfilePicUrl: state => state.ProfilePicUrl
};

const mutations = {
  MapUserDataToState: (state, UserData) => {
    state.Uid = UserData.UserId;
    state.FirstName = UserData.FirstName;
    state.LastName = UserData.LastName;
    state.FullName = UserData.FirstName + " " + UserData.LastName;
    state.Email = UserData.Email;
    state.Bio = UserData.UserBio;
    state.ProfilePicPath = UserData.UserPhoto;
    state.IsInstructor = UserData.Instructor;
  },
  ClearAllUserDataField: state => {
    state.FULLDATA = null;
    state.FirstName = "";
    state.Email = "";
    state.LastName = "";
    state.FullName = "";
    state.Bio = "";
    state.ProfilePicUrl = "";
  },
  SetUserProfilePic: (state, url) => (state.ProfilePicUrl = url),
  SETUSERINFOFULLDATA: (state, DATA) => {
    state.FULLDATA = DATA;
  },
  UserInfoIsFetched: state => {
    state.IsUserInfoFetched = true;
  }
};

const actions = {
  async fetchUserInfo({ commit, state, dispatch }) {
    var user = await firebase.auth().currentUser;
    console.log("Hey up here: " + user.uid);
    if (user && !state.IsUserInfoFetched) {
      console.log("Hey down here: " + user.uid);
      var DBUserDoc = await firebase
        .firestore()
        .collection("Users")
        .doc(user.uid)
        .get();
      await commit("MapUserDataToState", DBUserDoc.data());
      await commit("SETUSERINFOFULLDATA", DBUserDoc.data());
      commit("UserInfoIsFetched");
      await dispatch("fetchProfilePic");
    }
  },
  async fetchProfilePic({ state, commit }) {
    if (state.IsUserInfoFetched && !state.IsUserpicFetched) {
      var StorageRef = firebase.storage().ref();
      if (state.ProfilePicPath) {
        var PicRef = StorageRef.child(state.ProfilePicPath);
        //fetch Downloadable url from Cloud Storage
        await PicRef.getDownloadURL().then(url => {
          commit("SetUserProfilePic", url);
        });
      }

      state.IsUserpicFetched = true;
    }
  },
  async RemoveProfilePic({ state }) {
    var StorageRef = firebase.storage().ref();
    var db = firebase.firestore();
    //Remove it from storage
    if (state.ProfilePicPath != "") {
      var desertRef = StorageRef.child(state.ProfilePicPath);
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
    db.collection("Users")
      .doc(state.Uid)
      .update({
        UserPhoto: ""
      });
    state.ProfilePicUrl = "";
  },
  async SaveProfileSettingDataEdit({ state }, data) {
    var db = firebase.firestore();
    await db
      .collection("Users")
      .doc(state.Uid)
      .update({
        FirstName: data.FirstName,
        LastName: data.LastName,
        UserBio: data.UserBio
      });
    alert("Data Updated Successfully");
  },
  async UploadProfilePic({ state, dispatch }, photodata) {
    var StorageRef = firebase.storage().ref();
    //Remove Old Photo From Cloud Storage if it exists
    dispatch("RemoveProfilePic");

    // Upload New One
    state.ProfilePicPath = photodata.Url;
    var db = firebase.firestore();
    var ImageRef = StorageRef.child(photodata.Url);
    await ImageRef.put(photodata.FileObject)
      .then(snap => {
        alert("Profile Updated Sucessfully: ");
        console.log("succesffully uploaded: " + snap);
      })
      .catch(err => {
        console.log("Error uploading: " + err);
      });
    await db
      .collection("Users")
      .doc(state.Uid)
      .update({
        UserPhoto: photodata.Url
      });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
