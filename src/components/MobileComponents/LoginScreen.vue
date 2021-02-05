<template>
  <div class="white">
    <svg
      id="Group_56"
      data-name="Group 56"
      xmlns="http://www.w3.org/2000/svg"
      width="250"
      height="80.001"
      viewBox="0 0 151 40.001"
      class="ml-1"
    >
      <path
        id="Icon_awesome-lightbulb"
        data-name="Icon awesome-lightbulb"
        d="M5.441,25.734a1.813,1.813,0,0,0,.3,1l.968,1.455A1.812,1.812,0,0,0,8.221,29h3.5a1.812,1.812,0,0,0,1.509-.809l.968-1.455a1.812,1.812,0,0,0,.3-1l0-2.172H5.438ZM0,9.968a9.913,9.913,0,0,0,2.467,6.558,16.277,16.277,0,0,1,2.957,5.18c0,.015,0,.029.006.044h9.076c0-.015,0-.029.006-.044a16.277,16.277,0,0,1,2.957-5.18A9.966,9.966,0,1,0,0,9.968ZM9.968,5.437A4.536,4.536,0,0,0,5.437,9.968a.906.906,0,0,1-1.812,0A6.351,6.351,0,0,1,9.968,3.625a.906.906,0,0,1,0,1.812Z"
        transform="translate(3 11.001)"
        fill="#215679"
      />
      <text
        id="Chessbulb"
        transform="translate(0 32)"
        font-size="32"
        font-family="Quicksand-Regular, Quicksand"
      >
        <tspan x="0" y="0">Chessbulb</tspan>
      </text>
    </svg>
    <v-container rounded class="pt-0">
      <h1
        class=" font-weight-normal text-h2 mt- pl-2 mb-2 pb-2 pt-0"
        style="color: #215679;"
      >
        Login
      </h1>
      <span class="text-subtitle-1 ml-2 mb-10"
        >Don't have an account? <a @click="GoSignUp">Sign Up.</a></span
      >
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
      <span @click="ForgotPass" class="text-h8" cols="3">Forgot Password?</span>
      <v-row justify="center">
        <v-btn
          class="mb-5 primary text-h6"
          cols="12"
          x-large
          :loading = "bottomLodding"
          width="90%"
          @click="Login"
          >Login</v-btn
        >
      </v-row>
      <v-row align="center" justify="space-around">
        <span class="text-h6" cols="4">Or Login with</span>
        <v-btn fab cols="3" flat class="primary" @click="gSignUp">
          <v-icon>mdi-google</v-icon></v-btn
        >
        <v-btn cols="3" flat height="50" width="170" class="primary">
          <v-icon left>fa-chess-knight</v-icon> Lichess</v-btn
        >
      </v-row>
    </v-container>

    <!-- Show all Login Popups for user -->
    <v-dialog v-model="dialog" width="500">
      <v-card class="py-3" rounded="lg">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-card-text>
            {{ LoginError }}
            <!-- Login Details are missing! -->
          </v-card-text>
          <v-btn
            color="primary"
            @click="dialog = false"
            flat
            rounded
            width="100"
          >
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-------------------------------------------->

    <v-dialog v-model="dialo" width="500" activator="#privacy">
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
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="
              dialog = false;
              checkbox = true;
            "
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "firebase";
import { EventBus } from "@/main.js";
export default {
  //DONE Assign Data Properties in the vue data object which are (UserEmail(S), UserPassword(S)) (1min)
  data: function() {
    return {
      show2: false,
      UserEmail: "",
      UserPassword: "",
      dialog: false,
      LoginError: "",
      ErrorMessage: "",
      UserID: "",
      LoginCorrect: false,
       bottomLodding : false
    };
  },
  //DONE define Login Function (1min)
  methods: {
    GoSignUp() {
      this.$router.push("/SignUp");
    },
    async Login() {
      this.LoginCorrect = this.Validate();
      if (this.LoginCorrect) {
         this.bottomLodding = true
        //DONE use firebase Auth to login using the two data properties (UserEmail) and (UserPassword) (25min)
        const auth = firebase.auth();
        let self = this;
        auth
          .signInWithEmailAndPassword(this.UserEmail, this.UserPassword)
          .catch(error => {
            this.dialog = true;
            this.LoginError = error.message;
            console.log(error.message);
             this.bottomLodding = false
          });
        await auth.onAuthStateChanged(user => {
          if (user) {
            self.ErrorMessage = "";
            this.$router.push("/");
            console.log("Welcome in " + user.uid);
            EventBus.$emit("LoggedIn", true);
            // self.ErrorMessage = "";
            self.UserID = user.uid;
          } else {
            // alert("");
            setTimeout(function() {
               this.bottomLodding = false
              console.log("Working on it");
              this.dialog = true;
              this.LoginError = "Wrong Email entered or password";
              // this.dialog4 = true;
              self.ErrorMessage = "Wrong email entered or password";
            }, 2000);
            console.log("Enter");
          }
        });
        // if (self.UserID  == "") {
        // }
        // else
        // {
        // }
      }
    },
    async ForgotPass() {
      if (this.UserEmail) {
        await firebase
          .auth()
          .sendPasswordResetEmail(this.UserEmail)
          .then(() => {
            // alert(
            //   "Password reset email was sent to your email " + this.UserEmail
            // );
            this.dialog = true;
            this.LoginError =
              "Password reset email was sent to your email " + this.UserEmail;
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        // alert("Please fill in your email to send you a reset pass email");
        this.dialog = true;
        this.LoginError =
          "Please fill in your email to send you a reset pass email";
      }
    },
    Validate() {
      if (this.UserEmail == "" || this.UserPassword == "") {
        // alert("Please fill in the missing content");
        this.dialog = true;
        this.LoginError = "Please fill in the missing content";

        return false;
      } else {
        return true;
      }
    },
    CheckAuth() {
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          console.log("Current User Logged in is: ");
          console.log(user.email);
          console.log(user.uid);
          // User is signed in.
        } else {
          console.log("Bateee5");
          // No user is signed in.
        }
      });
    },
    async gSignUp() {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
      provider.setCustomParameters({
        login_hint: "user@example.com"
      });

      await firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          var credential = result.credential;
          console.log("User Credential is: ", credential);
          var token = credential.accessToken;
          console.log("User access token is: ", token);
          var user = result.user;
          this.FirstName = user.displayName;
          this.LastName = "";
          this.Email = user.email;
          console.log("User Data is: ", user);
        })
        .catch(error => {
          // Handle Errors here.
          console.log("Error Code is: ", error.code);
          console.log("Error Message is: ", error.message);
          // The email of the user's account used.
          console.log("Error email is: ", error.email);
          // The firebase.auth.AuthCredential type that was used.
          console.log("Error Credential msg is: ", error.credential);
          // ...
        });
      this.CreateUserDoc();
    }
  }
};
</script>

<style scoped></style>
