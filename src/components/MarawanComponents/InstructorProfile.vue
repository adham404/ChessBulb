<template>
    <div>
        <div class="Container">
            <div class="SignUpHeader">
                <h1>Create Instructor Profile</h1>
                <!-- <div id="SubHeader">Already have an account?<router-link to="/Login"><span>Login</span></router-link></div> -->
            </div>
            <!-- DONE Create Two input fields one for Email and one for password and assign them to (UserEmail) and (UserPassword) (5MIN) -->
            <div style="display:flex; flex-direction:column; width:50%;" class="Form">
            <label for="Email">Email</label>
            <input v-model="UserEmail" type="email" name="" id="Email">
            <label for="Password">A few words about yourself</label>
            <!-- <input v-model="UserPassword" type="password" name="" id="Password"> -->
            <textarea name="" id="Password" cols="30" rows="10"></textarea>
            <label for="PhoneNumber">Phone Number</label>
            <input v-model="UserPassword"  name="" id="PhoneNumer">
            <!-- DONE Create 'Login' button and assign the button to the function {Login} (2min) -->
            <button @click="Login">Create</button>
            </div>
        </div>
    </div>
</template>

<script>
//DONE Assign Firebase (1min) 
import firebase from "firebase";
import {EventBus} from "@/main.js"
export default {
    //DONE Assign Data Properties in the vue data object which are (UserEmail(S), UserPassword(S)) (1min)
    data: function()
    {
        return{
            UserEmail:"",
            UserPhone:"",
            LoginCorrect:false
        }
    },
//DONE define Login Function (1min)
    methods:{
        Login()
        {
        this.LoginCorrect = this.Validate();
        if(this.LoginCorrect)
        {            
            //DONE use firebase Auth to login using the two data properties (UserEmail) and (UserPassword) (25min)
                const auth = firebase.auth();
                auth.signInWithEmailAndPassword(this.UserEmail,this.UserPassword).catch((error) =>{
                    console.log(error.message);
                })
                auth.onAuthStateChanged((user)=>{
                    console.log("Welcome in " + user.uid);
                    this.$router.push('/Home')
                    EventBus.$emit("LoggedIn", true)
                })

        }    
        },
        Validate(){
            if(this.UserEmail == "" || this.UserPassword == "")
            {
                alert("Please fill in the missing content")
                return false;
            }
            else{
                return true;
            }
        }
    }

}
</script>

<style scoped>
.Shadow{
		-webkit-box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
		-moz-box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
		box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
}
.Container{
  width: 530px;
  height: 550px;
  background-color: white;
  margin: auto;
  border-radius: 5px;
  margin-top: 20px;
}
.SignUpHeader{
  height: 25%;
  width: 96%;
  margin: auto;
  border-radius: 5px;
  background-color:#022A68;
  padding-left: 5px;
  font-family: 'Quicksand',sans-serif;
  font-weight: lighter;
}
h1{
  font-family: 'Quicksand',sans-serif;
  font-weight: lighter;
  margin: 10px 0px 5px 0px;
  font-size: 3rem;
}
#SubHeader{
  margin: 1px 0px 5px 0px;
}
.Form{
  margin: auto;
  color: black;
  margin-top: 50px;
}
input{
  margin: 1px 0px 20px 0px;
  font-family: 'Raleway', sans-serif;
  font-weight: lighter;
  border: 1px solid #cac7c7;
  border-radius: 6px;
  height: 22px;
}
label{
  font-family: 'Raleway', sans-serif;
  font-weight: lighter;
}
button{
		height: 35px;
		width: 150px;
		border: none;
		outline: none;
		border-radius: 1.2rem;
		font-size: 0.9rem;
		font-family: 'Raleway', sans-serif;
		background-color: #022A68;
    color: white;
    margin: auto;
}
button:hover{
    -webkit-box-shadow: 0px 0px 21px -10px rgb(3, 80, 143);
		-moz-box-shadow: 0px 0px 21px -10px rgb(3, 80, 143);
    box-shadow: 0px 0px 21px -10px rgb(3, 80, 143);
    background-color: #044bb6;
}
a{
  text-decoration: none;
  color: white;
}
a:hover{
  color:#044bb6;
}
</style>

//TODO Total Time to finish Component 39min