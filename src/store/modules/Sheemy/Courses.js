import firebase from "firebase";
import UserInfo from "../UserData/UserInfo";

const state = {
  Courses: [],
  CoursesListFetched: false,
  InstructorDataRecords: 0,
  InstructorData: [],
  InstructorDataFetched: false,
  CanIPLayThisCourse: false,
  Reviews: [],
  CourseOrder: 0
};

const getters = {
  GetListOfCourses(state) {
    return state.Courses;
  },
  GetCoursePlayingFlag(state) {
    return state.CanIPLayThisCourse;
  },
  GetInstructorData(state) {
    return state.InstructorData;
  },
  GetTheOrderOfThisCourseInTheList(state) {
    return state.CourseOrder;
  },
  GetReviewsOfThisParticularCourse(state) {
    return state.Reviews;
  }
};

const mutations = {
  SetTheOrderOfThisCourseAccordingToItsID(state, id) {
    var count = 0;
    state.Courses.forEach(doc => {
      if (doc.CourseId == id) {
        state.CourseOrder = count;
      }
      count++;
    });
  },
  SetCoursesDataToTheGeneralArray(state, data) {
    state.Courses = [];
    state.Courses = data;
  }
};

const actions = {
  async FetchAllCourses({ state }) {
    if (!state.CoursesListFetched) {
      var db = firebase.firestore();
      await db
        .collection("Courses")
        .get()
        .then(data => {
          data.forEach(doc => {
            state.Courses.push(doc.data());
          });
          state.CoursesListFetched = true;
        });
      console.log("from State here Courses are: " + state.Courses);
    }
  },
  async CanIPLayThisCourse({ state }, id) {
    state.CanIPLayThisCourse = false;
    var user = await firebase.auth().currentUser;
    var db = firebase.firestore();
    console.log("Am testing: "+ user.uid+ " and "+ id);

    // await db.collection("CourseOrders").get().then((doc) => {
    //   doc.forEach((doc) => {
    //     if(doc.data().CourseId == id && doc.data().UserId == user.uid)
    //     {
    //       console.log(doc.data());
    //       console.log(id);
    //       state.CanIPLayThisCourse = true;
    //       console.log("Match Happensss")
    //     }
    //   })
    // })

    await db
      .collection("CourseOrders")
      .where("UserId", "==", user.uid)
      .where("CourseId", "==", id)
      .get().then(doc => {
        doc.forEach((doc) => {
          if(doc.exists)
          {
            state.CanIPLayThisCourse = true;
            console.log("Match Happen");
          }
        })
        // if (doc.exists()) {
        // }
      })

  },
  async FetchAllReviewsForThisCourse({ state }, id) {
    state.Reviews = [];
    var db = firebase.firestore();
    await db
      .collection("Reviews")
      .get()
      .then(snaps => {
        snaps.forEach(doc => {
          if (doc.data().CourseId == id) {
            state.Reviews.push(doc.data());
          }
        });
      });
  },
  async SubmitReviewForThisCourse({ state }, data) {
    console.log("am here: " + data.Review);
    console.log("Shit to work: " + state.CourseOrder);
    var dummyobject = {};
    var TimeOfCreation = new Date();
    var db = firebase.firestore();
    var ReviewRef = await db.collection("Reviews").add(dummyobject);
    console.log("Review to delete: " + ReviewRef.id);
    await db
      .collection("Reviews")
      .doc(ReviewRef.id)
      .set({
        AcademyId: "",
        Comment: data.Review,
        CourseId: data.CourseId,
        DateOfReview: TimeOfCreation,
        FirstName: UserInfo.state.FirstName,
        LastName: UserInfo.state.LastName,
        NumberOfStars: data.Rate,
        ReviewId: ReviewRef.id,
        UserID: UserInfo.state.Uid
      });
    alert("Review submitted sucessfully");
  },
  async FetchCourseInstructorData({ state }, id) {
    if (!state.InstructorDataFetched) {
      var db = firebase.firestore();
      await db
        .collection("Users")
        .doc(id)
        .get()
        .then(doc => {
          state.InstructorData.push(doc.data());
        });
      state.InstructorDataFetched = true;
    }
  }
};

export default {
  actions,
  getters,
  mutations,
  state
};
