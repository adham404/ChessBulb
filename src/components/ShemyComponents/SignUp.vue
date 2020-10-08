<template>
  <div>
      <h1>please Sign up</h1>
      <!-- Done create anchor tag that routes to [Login] (2min) -->
      <div>Already have an account?<router-link to="/Login"><span>Login</span></router-link></div>
      <!-- DONE Create Form with 5 input field and assign them to the following data properties (FirstName, LastName, UserEmail, UserPassword, ConfirmPassword) (5min) -->
      <div style="display:flex; flex-direction:column; width:50%;">
      <label for="FirstName">First Name</label>
      <input v-model="FirstName" type="text" name="" id="FirstName">
      <label for="LastName">Last Name</label>
      <input v-model="LastName" type="text" name="" id="LastName">
      <label for="Email">Email</label>
      <input v-model="UserEmail" type="email" name="" id="Email">
      <label for="password">Password</label>
      <input v-model="UserPassword" type="password" name="" id="password">
      <label for="Cpassword">Confirm Password</label>
      <input v-model="ConfirmPassword" type="password" name="" id="Cpassword">
      <!-- DONE Create 'SignUp' button assigned to the function {SignUp} (2min) -->
      <button @click="SignUp">Sign Up</button>
      <div>---------------------------------------------------------</div>
      <button @click="CheckAuth">Check User Credentials</button>
      <div>-----------------------------------------------------------------------------------</div>
      <div>I am Already Signed in i want to sign out</div>
      <button @click="SignOut">Sign Out</button>      
      </div>
  </div>
</template>

<script>
  //DONE Assign Firebase (1min)
import firebase from "firebase";
export default {
  //DONE Assign Data Properties in the vue data object which are (FirstName(S), LastName(S), UserEmail(S), UserPassword(S), ConfirmPassword(S)) (1min)
    data:function(){
      return{
        FirstName:"",
        LastName:"",
        UserEmail:"",
        UserPassword:"",
        ConfirmPassword:"",
        UserValidate:false,
        UserID:"",
        ErrorAuth:""
      }
    },
    methods:{
      //DONE Define SignUp function (1min)
       async SignUp()
      {
        this.UserValidate = this.ValidateInput();
      //DONE use firebase auth to sign up user account using the following data properties (FirstName, LastName, UserEmail, UserPassword) (20MIN)
        if(this.UserValidate)
        {
          alert("Sign Up Succesfull");
          var auth = firebase.auth();
            await auth.createUserWithEmailAndPassword(this.UserEmail,this.UserPassword).catch((error) =>{
              alert(error.message);
              this.ErrorAuth = error;
            })
            // this.CreateAccount();           
            auth.onAuthStateChanged((user)=>{
                if(user)
              {
                console.log("User IS in with email "+ user.email);
                console.log("User IS in with ID "+ user.uid);
                this.UserID = user.uid;
                    var DB = firebase.firestore();
                    var DBref = DB.collection("Users");
                    DBref.doc(this.UserID).set({
                        AcademyInstructor: "false",
                        Email: this.UserEmail,
                        FirstName: this.FirstName,
                        Instructor: false,
                        LastName: this.LastName,
                        Password: this.UserPassword,
                        UserBio: "null",
                        UserId: this.UserID,
                        UserPhoto: "null"
                    })
                            
              }
              else{
                  console.log("No Users here....");
              }
            //TODO create a user field in the user database
            })
        }
        else 
        {
          alert("Enter your Info Correctly");
        }
      },
        //DONE First Check if the (UserPassword) is the same as the (ConfirmPassword) if correct proceed if not check show validation Message (2min)
      ValidateInput()
      {
        if(this.FirstName == "" || this.LastName == "" || this.UserEmail == "" || this.UserPassword == "" || this.ConfirmPassword == "")
        {
          alert("Please Fill in the missing content");
          return false
        }
        else
        {
          if(this.ConfirmPassword == this.UserPassword )
          {
            return true;
          }
          else{
            alert("the Confirm password is not compatiable with your pasword please re-enter your password");
            return false
          }
        }
      },
      CheckAuth()
      {
        			firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				          console.log("Current User Logged in is: ")
          console.log(user.email);
          console.log(user.uid);

				// User is signed in.
			} else {
				console.log("Bateee5")
		// No user is signed in.
			}
			});		
      },
      SignOut()
      {
        const auth = firebase.auth();
        auth.signOut();
        alert("the User ID right now is " + this.UserID);
      },
    }
}
</script>

<style>
      /* TODO import Styling script from Documentation and Adjust the Component (5min) */

</style>

//TODO time to finish the Component (39MIN)