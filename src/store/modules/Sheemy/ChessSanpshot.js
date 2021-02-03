import firebase from "firebase";
import UserData from "../UserData/UserInfo";

const state = {
  ChessBoardStartingPositionForSnapshots: "",
  TheChessBoardPositionIsValidate: false,
  PostType: "Move"
};

const mutations = {
  SetStartingPositionForSnapShot(state, data) {
    state.ChessBoardStartingPositionForSnapshots = data;
  },
  SetChessBoardPositionValidationStatus(state, data) {
    state.TheChessBoardPositionIsValidate = data;
  },
  SetSnapshotPostingType(state, data) {
    state.PostType = data;
  }
};

const actions = {
  async PostThisPuzzleSnapShotToTheDatabase({ state }, data) {
    var currentUser = UserData.state.FULLDATA;
    console.log("Hey: " + currentUser);
    var db = firebase.firestore();
    var objectdummy = {};
    var StoryRef = await db.collection("ChessStories").add(objectdummy);
    var StoryID = StoryRef.id;
    var ArrayToSend = [];
    var TimeOfCreation = new Date();
    for (let i = 0; i < data.ChessMoveObject.length; i++) {
      var WhiteLength = data.ChessMoveObject[i].WhiteMoves.length;
      // var BlackLength = data.ChessMoveObject[i].BlackMoves.length;
      var BlackMove = "";
      for (let j = 0; j < WhiteLength; j++) {
        var WhiteMove = data.ChessMoveObject[i].WhiteMoves[j];
        data.ChessMoveObject[i].Moves.push(WhiteMove);
        BlackMove = data.ChessMoveObject[i].BlackMoves[j];
        if (BlackMove != null) {
          data.ChessMoveObject[i].Moves.push(BlackMove);
        }
      }
      var MovesObject = "";
      MovesObject = {
        Moves: data.ChessMoveObject[i].Moves,
        Line: data.ChessMoveObject[i].Line
      };
      ArrayToSend.push(MovesObject);
    }
    console.log("ID of Story created is: " + StoryID);
    console.log("The ID from state is: " + currentUser.UserId);
    //   console.log("The Explanation of the Story is: "+ this.StoryExplanation);
    await db
      .collection("ChessStories")
      .doc(StoryID)
      .set({
        Moves: ArrayToSend,
        TimeOfCreation: TimeOfCreation,
        StoryExplanation: data.Description,
        Type: state.PostType,
        StartingFen: state.ChessBoardStartingPositionForSnapshots,
        UserName: currentUser.FirstName + " " + currentUser.LastName,
        StoryID: StoryID,
        UserPhoto: currentUser.UserPhoto,
        UserID: currentUser.UserId
      });
    alert("your Story has been Posted Successfully");
  }
};

const getters = {
  GetChessBoardStartingPositionForSnapshots(state) {
    return state.ChessBoardStartingPositionForSnapshots;
  },
  GetValidatyChessBoardPosition(state) {
    return state.TheChessBoardPositionIsValidate;
  },
  GetSnapshotPostingType(state) {
    return state.PostType;
  }
};

export default {
  state,
  mutations,
  getters,
  actions
};
