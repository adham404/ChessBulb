<template>
    <div class = "white">
        <svg id="Group_56" data-name="Group 56" xmlns="http://www.w3.org/2000/svg" width="250" height="80.001" viewBox="0 0 151 40.001" class="ml-1">
          <path id="Icon_awesome-lightbulb" data-name="Icon awesome-lightbulb" d="M5.441,25.734a1.813,1.813,0,0,0,.3,1l.968,1.455A1.812,1.812,0,0,0,8.221,29h3.5a1.812,1.812,0,0,0,1.509-.809l.968-1.455a1.812,1.812,0,0,0,.3-1l0-2.172H5.438ZM0,9.968a9.913,9.913,0,0,0,2.467,6.558,16.277,16.277,0,0,1,2.957,5.18c0,.015,0,.029.006.044h9.076c0-.015,0-.029.006-.044a16.277,16.277,0,0,1,2.957-5.18A9.966,9.966,0,1,0,0,9.968ZM9.968,5.437A4.536,4.536,0,0,0,5.437,9.968a.906.906,0,0,1-1.812,0A6.351,6.351,0,0,1,9.968,3.625a.906.906,0,0,1,0,1.812Z" transform="translate(3 11.001)" fill="#215679"/>
          <text id="Chessbulb" transform="translate(0 32)" font-size="32" font-family="Quicksand-Regular, Quicksand"><tspan x="0" y="0">Chessbulb</tspan></text>
        </svg>
        <v-container rounded class="pt-0">
            <h1 class=" font-weight-normal text-h2 mt- pl-2 mb-2 pb-2 pt-0" style="color: #215679;">Sign Up</h1>
            <span class="text-subtitle-1 ml-2 mb-10">Already have an account? <a href="/Login">Login.</a></span>
            <v-text-field
            label="First name"
            outlined
            rounded
            v-model="FirstName"
            >hello</v-text-field>
            <v-text-field
            label="Last name"
            outlined
            rounded
            v-model="LastName"
            >hello</v-text-field>
            <v-text-field
            label="Email"
            outlined
            rounded
            v-model="UserEmail"
            ></v-text-field>
            <v-text-field
            label="Password"
            outlined
            rounded
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show2 ? 'text' : 'password'"
            @click:append="show2 = !show2"
            v-model="UserPassword"
            ></v-text-field>
            <v-text-field
            label="Confirm Password"
            background-color="white"
            outlined
            rounded
            class = "pb-0"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            @click:append="show1 = !show1"
            v-model="ConfirmPassword"
            ></v-text-field>
            <v-row >
              <v-checkbox
              v-model="checkbox"
              class="mt-0 ml-4"
            ></v-checkbox>
              <span class="text-subtitle-2 mt-1">
                I agree to <a href="javascript:void(0);" id="privacy">privacy policy and terms and conditions</a>
              </span>
            </v-row>
            <v-row justify="center">
              <v-btn class="mb-5 primary text-h6" cols= "12" x-large width="90%" @click="SignUp">Sign Up</v-btn>
            </v-row>
            <v-row align="center" justify="space-around">
              <span class="text-h6" cols="4">Or Login with</span>
              <v-btn fab cols = "3" flat class="primary" @click="gSignUp"> <v-icon>mdi-google</v-icon></v-btn>
              <v-btn  cols = "3" flat height="50" width="170" class="primary"> <v-icon left>fa-chess-knight</v-icon> Lichess</v-btn>
            </v-row>
        </v-container>
        <v-dialog
      v-model="dialog"
      width="500"
      activator= "#privacy"
    >
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Click Me
        </v-btn>
      </template> -->

      <v-card>
        <v-card-title class="headline grey lighten-2">
          Privacy Policy
        </v-card-title>

        <v-card-text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false; checkbox = true"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
       

    </div>
</template>

<script>
    //DONE Assign Firebase (1min)
import firebase from "firebase";
import {EventBus} from "../../main";
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
        show1: false,
        show2: false,
        dialog: false,
        checkbox: false,
      }
    },
    mounted()
    {
      this.CheckUser();
    },
    methods:{
      //DONE Define SignUp function (1min)
      async SignUp()
      {
        // this.UserValidate = this.ValidateInput();
        //DONE use firebase auth to sign up user account using the following data properties (FirstName, LastName, UserEmail, UserPassword) (20MIN)
        if(this.ValidateInput())
        {
          alert("Sign Up Succesfull");
          const auth = firebase.auth();
            await auth.createUserWithEmailAndPassword(this.UserEmail,this.UserPassword).catch((error) =>{
            alert(error.message);
            })
            let self = this;
            await auth.onAuthStateChanged((user)=>{
              if(user)
              {
              self.UserID = user.uid;
              }
              else{
                console.log("User is out");
              }
            // console.log("The Best ID is "+ this.UserID);
            })
            if (this.UserID != "") {
              this.CreateUserDoc();
              }
        }
      },
      async CreateUserDoc()
      {
        var data = {
        Email: this.UserEmail,
        FirstName: this.FirstName,
        LastName: this.LastName,
        }
        const Test = firebase.functions().httpsCallable('CreateDocs-CreateDocs');
        await Test(data).then(result => {
          console.log('data is: ', result.data);
        }).catch(error => {
          console.log('Error is ',error);
        }) 
        this.$router.push('/Home')
        EventBus.$emit("LoggedIn",true);
      },
      async gSignUp()
      {
        var provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly')
        provider.setCustomParameters({
        'login_hint': 'user@example.com'
        });

        await firebase.auth()
          .signInWithPopup(provider)
          .then((result) => {
            var credential = result.credential;
            console.log("User Credential is: ", credential);
            var token = credential.accessToken
            console.log("User access token is: ", token);
            var user = result.user
            this.FirstName = user.displayName
            this.LastName = ""
            this.Email = user.email
            console.log("User Data is: ", user);            
          }).catch((error) => {
                // Handle Errors here.
                console.log("Error Code is: ", error.code)
                console.log("Error Message is: ", error.message)
                // The email of the user's account used.
                console.log("Error email is: ", error.email)
                // The firebase.auth.AuthCredential type that was used.
                console.log("Error Credential msg is: ", error.credential)       
                // ...
          })
          this.CreateUserDoc()

        
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
      // CheckUser() //Check User Authentication when directed to signup
      // {
			// let self = this;
			// firebase.auth().onAuthStateChanged(function(user) {
			// if (user) {
      //   EventBus.$emit("LoggedIn",true);
      //   self.$router.push('/development')
			// 	// User is signed in.
			// } else {
			// 	console.log("New User")
      //   // No user is signed in.
			// }
			// });		
      // }
    }
}
</script>