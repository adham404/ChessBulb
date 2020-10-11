<template>
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" width="321" height="85" viewBox="0 0 321 85">
            <g id="Group_53" data-name="Group 53" transform="translate(-75 -35)">
                <path id="Icon_awesome-lightbulb" data-name="Icon awesome-lightbulb" d="M11.444,54.13a3.814,3.814,0,0,0,.639,2.108L14.119,59.3A3.811,3.811,0,0,0,17.293,61h7.352a3.811,3.811,0,0,0,3.174-1.7l2.036-3.061a3.811,3.811,0,0,0,.639-2.108l0-4.569H11.438ZM0,20.968A20.851,20.851,0,0,0,5.19,34.762a34.238,34.238,0,0,1,6.22,10.9c0,.031.008.062.013.093H30.514c0-.031.008-.061.013-.093a34.238,34.238,0,0,1,6.22-10.9A20.964,20.964,0,1,0,0,20.968Zm20.968-9.531a9.542,9.542,0,0,0-9.531,9.531,1.906,1.906,0,1,1-3.812,0A13.358,13.358,0,0,1,20.968,7.625a1.906,1.906,0,0,1,0,3.812Z" transform="translate(80.777 57.001)" fill="#1daca8"/>
                <text id="Chessbulb" transform="translate(75 103)" fill="#fff" font-size="68" font-family="Quicksand-Regular, Quicksand"><tspan x="0" y="0">Chessbulb</tspan></text>
            </g>
        </svg>

        <div class="Container">
            <div class="SignUpHeader">
                <h1>Login</h1>
                <div id="SubHeader">Already have an account?<router-link to="/Login"><span>Login</span></router-link></div>
            </div>
            

            <!-- DONE Create Two input fields one for Email and one for password and assign them to (UserEmail) and (UserPassword) (5MIN) -->
            <div style="display:flex; flex-direction:column; width:50%;" class="Form">
            <label for="Email">Email:</label>
            <input v-model="UserEmail" type="email" name="" id="Email">
            <label for="Password">Password</label>
            <input v-model="UserPassword" type="password" name="" id="Password">
            <!-- DONE Create 'Login' button and assign the button to the function {Login} (2min) -->
            <button @click="Login">Login</button>
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
            UserPassword:"",
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
                    this.$router.push('/Home')
                    console.log("Welcome in " + user.uid);
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
  width: 30%;
  height: 500px;
  background-color: white;
  margin: auto;
  border-radius: 5px;
  margin-top: 20px;
}
.SignUpHeader{
  height: 20%;
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
  margin-top: 100px;
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