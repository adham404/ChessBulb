<template>
<div>
  <div class="Containerim">
    <div class="SignUpHeader">
      <h1>Create Instructor Profile</h1>
      <!-- <div id="SubHeader">Already have an account?<router-link to="/Login"><span>Login</span></router-link></div> -->
    </div>
    <div id="error">{{ error }}</div>
    <div style="display: flex; flex-direction: column; width: 50%" class="Form">
      <label for="Email">Email</label>
      <input
        type="email"
        id="Email"
        :class="errors.email"
        v-model="instructor.email"
      />
      <label for="w3review">A few words about yourself</label>
      <textarea
        :class="errors.info"
        id="w3review"
        v-model="instructor.info"
        name="w3review"
        cols="30"
        rows="10"
      ></textarea>
      <label for="PhoneNumber">Phone Number</label>
      <input
        id="PhoneNumer"
        :class="errors.phone"
        type="tel"
        name="phone"
        pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
        v-model="instructor.phone"
      /><br />
      <button @click="validate" value="Register as an instructor">
        Register as an instructor
      </button>
    </div>
  </div>
</div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      error: "",
      instructor: {
        email: "",
        info: "",
        phone: "",
      },
      loggedin: false,
      errors: {
        email: "ok",
        info: "ok",
        phone: "ok",
      },
      userid: null,
    };
  },
  mounted() {
    var user = firebase.auth().currentUser;

    if (user) {
      this.userid = user.uid;
      this.error = "";
      // User is signed in.
      this.loggedin = true;
    } else {
      this.loggedin = false;
      this.error = "Please Login First";
    }
  },
  methods: {
    validate() {
      var go = 0;
      this.errors.email = this.instructor.email.length >= 5 ? "ok" : "error";
      this.errors.info = this.instructor.info.length >= 5 ? "ok" : "error";
      this.errors.phone = this.instructor.phone.length >= 5 ? "ok" : "error";
      console.log(this.errors);
      for (var i in this.errors) {
        if (this.errors[i] == "ok") {
          go += 1;
        }
      }
      if (go == 3 && this.loggedin) {
        this.submit();
      }
    },
    async submit() {
      await firebase.firestore().collection("Users").doc(this.userid).update({
        Instructor: true,
        AboutInstructor: this.instructor.info,
        InstructorEmail: this.instructor.email,
        InstructorPhone: this.instructor.phone,
      });
    },
  },
};
</script>

<style scoped>
.error {
  border: red 2px solid;
}
.ok {
  border: white;
}
.Shadow {
  -webkit-box-shadow: 0px 0px 21px -10px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 0px 21px -10px rgba(0, 0, 0, 1);
  box-shadow: 0px 0px 21px -10px rgba(0, 0, 0, 1);
}
.Containerim {
  width: 530px;
  height: 550px;
  background-color: white;
  margin: auto;
  border-radius: 5px;
  margin-top: 20px;
}
.SignUpHeader {
  height: 25%;
  width: 96%;
  margin: auto;
  border-radius: 5px;
  background-color: #022a68;
  padding-left: 5px;
  font-family: "Quicksand", sans-serif;
  font-weight: lighter;
}
h1 {
  font-family: "Quicksand", sans-serif;
  font-weight: lighter;
  margin: 10px 0px 5px 0px;
  font-size: 3rem;
}
#SubHeader {
  margin: 1px 0px 5px 0px;
}
.Form {
  margin: auto;
  color: black;
  margin-top: 50px;
}
input {
  margin: 1px 0px 20px 0px;
  font-family: "Raleway", sans-serif;
  font-weight: lighter;
  border: 1px solid #cac7c7;
  border-radius: 6px;
  height: 22px;
}
label {
  font-family: "Raleway", sans-serif;
  font-weight: lighter;
}
button {
  height: 35px;
  width: 150px;
  border: none;
  outline: none;
  border-radius: 1.2rem;
  font-size: 0.9rem;
  font-family: "Raleway", sans-serif;
  background-color: #022a68;
  color: white;
  margin: auto;
}
button:hover {
  -webkit-box-shadow: 0px 0px 21px -10px rgb(3, 80, 143);
  -moz-box-shadow: 0px 0px 21px -10px rgb(3, 80, 143);
  box-shadow: 0px 0px 21px -10px rgb(3, 80, 143);
  background-color: #044bb6;
}
a {
  text-decoration: none;
  color: white;
}
a:hover {
  color: #044bb6;
}
</style>
//TODO create html inputs (10min) 
//TODO create data object (5min)
//TODO link the object to the ui(5min)
//TODO Validate the input (20min)
//TODO display errors(10min)
//TODO Verify phone number(15min)
//TODO save data in firebase firestore(5min)
//TODO