<template>
    <div>
        <h1>Please Login</h1>
        <!-- DONE Create Two input fields one for Email and one for password and assign them to (UserEmail) and (UserPassword) (5MIN) -->
        <div style="display:flex; flex-direction:column; width:50%;">
        <label for="Email">Email:</label>
        <input v-model="UserEmail" type="email" name="" id="Email">
        <label for="Password">Password</label>
        <input v-model="UserPassword" type="password" name="" id="Password">
        <!-- DONE Create 'Login' button and assign the button to the function {Login} (2min) -->
        <button @click="Login">Login</button>
        </div>
    </div>
</template>

<script>
//DONE Assign Firebase (1min) 
import firebase from "firebase";
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
                    console.log("Welcome in " + user.uid);
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

<style>
      /* TODO import Styling script from Documentation and Adjust the Component (5min) */
</style>

//TODO Total Time to finish Component 39min