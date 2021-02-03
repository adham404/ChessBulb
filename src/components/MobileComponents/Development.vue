<template>
  <div>
    <!-- <StoryScreen/> -->
    <!-- <ProfilePage/> -->
    <!-- <AddCard/> -->
    <!-- <Stories/> -->
    <!-- <NewsFeed/> -->
    <!-- <CourseList/> -->
    <!-- <CoursePage/> -->
    <!-- <AddSnapshot/> -->
    <!-- <AddPost/> -->
    <!-- <CourseStreaming/> -->
    <!-- <LiveViewer/> -->
  </div>
</template>

<script>
import firebase from "firebase";
// import ProfilePage from "@/components/MobileComponents/ProfilePage"
// import CoursePage from "@/components/MobileComponents/CoursePage"
// import CourseList from "@/components/MobileComponents/CourseList.vue"
// import AddCard from "@/components/MobileComponents/AddCard"
// import Stories from "@/components/MobileComponents/Stories.vue"
// import NewsFeed from "@/components/MobileComponents/Newsfeed.vue"
// import StoryScreen from "@/components/MobileComponents/StoryScreen.vue"
// import AddSnapshot from "@/components/MobileComponents/AddSnapshot"
// import AddPost from "@/components/MobileComponents/AddPost"
// import CourseStreaming from "@/components/MobileComponents/CourseStreaming"
// import LiveViewer from "@/components/MobileComponents/LiveViewer"
export default {
  components: {
    // ProfilePage
    // Stories,
    // AddCard,
    // NewsFeed
    // CourseList
    // CoursePage
    // StoryScreen
    // AddSnapshot
    // AddPost
    // CourseStreaming
    // LiveViewer
  },
  data() {
    return {
      links: ["About", "Posts", "Courses"],
      component: "InstructorPageAboutText"
    };
  },
  methods: {
    SignOut() {
      const auth = firebase.auth();
      auth.signOut();
      alert("the User ID right now is " + this.UserID);
      this.$router.push("/SignUp");
    }
  }
};
</script>
