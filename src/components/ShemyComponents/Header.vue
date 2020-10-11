<template>
  <div style="display: flex;">
      <!-- TODO add IMG of user  (5min)
      TODO add (User.FullName) beside the image (3MIN)
      TODO add (User.Bio) under the the Name -->
      <div style="border:1px solid #ccc; margin-right:10px;">User Icon</div>
      <div style="border:1px solid #ccc; margin-right:10px;">
      <div>UserName</div>
      <div style="border:1px solid #ccc;">UserBio</div>
      </div>

  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data:function()
  {
    return{
      UserID:"",
      UserName:"",
      UserBio:""
    }
  },
  mounted()
  {
    this.GetUserID();
    this.GetUserData();
  },
  methods:{
    async GetUserID()
    {
      let self = this;
      await firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
        self.UserID = user.uid;
				// User is signed in.
			} else {
				console.log("No User Signed in")
		// No user is signed in.
			}
      })
      this.GetUserData();		

    },
    GetUserData()
    {
      var Uid = this.UserID
      var db = firebase.firestore()
      var DBRef = db.collection("Users").doc(Uid);
      DBRef.get().then((query) => {
        if (query.exists) 
        {
          this.UserName = query.data().FirstName + " " + query.data().LastName 
        }
        else{
          console.log("No Doc here");
        }
      }).catch((error) => {
        console.log("Error Getting Doc: "+ error);
      })
    }
  }
  // props:[UserName, UserBio]
    //TODO Get User Object from firestore using the UserID
}
</script>

<style>

</style>