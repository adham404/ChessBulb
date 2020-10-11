<template>
    <div>
        <div class="Container">
            <div class="UserImageAndSignOut">
                <img src="@/assets/ProfilePic.jpg" alt="">
            </div>
            <div class="Bio">
                <div class="TextBox Shadow">
                    <h3>{{UserData.FirstName}} {{UserData.LastName}}</h3>
                    <p>{{UserData.UserBio}}</p>
                </div>

            </div>
            <div class="Buttons">
                <button v-if="!VisitorFlag && IsInstructor" @click="MyCourses">My Courses</button>
                <button v-if="!VisitorFlag" @click="PurchasedCourses">Purchased Courses</button>
                <button v-if="!VisitorFlag" @click="GoToAcademies">Joined Academies</button>
                <button @click="MyPost">My Posts</button>
                <button v-if="VisitorFlag && !Followed" @click="Follow">Follow</button>
                <button v-if="VisitorFlag && Followed" @click="UnFollow">UnFollow</button>
                <button v-if="!VisitorFlag" @click="GoToExplore">Find Players</button>
                <button v-if="!VisitorFlag" @click="SignOut">Sign Out &#128549;</button>
                <button v-if="VisitorFlag" @click="Back">Go Back to my Profile</button>
                <button @click="CreateOrder">Create Course Orders</button>
            </div>

        </div>
        <component :FollowingIDs="FollowingID" :is="CurrentComponent"></component>
        <!-- <FindPlayers/> -->
        
    </div>
</template>

<script>
import firebase from "firebase"
import FindPlayers from "../MarawanComponents/FindPlayers";
import Courses from "../ShemyComponents/Courses";
import MyCourses from "../MarawanComponents/MyCourses";
import CreatedCourses from "../ShemyComponents/CreatedCourses";
import Academies from "../SadekComponents/Academy/Academies";
import NewsFeed from "../SadekComponents/NewsFeed/NewsFeed";
import {EventBus} from "../../main";
    export default {
        data:function()
        {
            return{
                UserLogged:true,
                IsInstructor:false,
                UserID:"",
                UserData:"",
                UserName:"",
                Followed: false,
                FollowedUserID:"",
                FollowerUserID:"",
                VisitorFlag:false,
                UpdatedID:"",
                FollowingID:[],
                FollowerID:"",
                CurrentComponent:"FindPlayers"
            }
        },
        props:['id','Visitor'],
        methods:{
            async GetUserData(id)
            {
                        console.log("The user id is: "+ id);
                        let self = this
                            var db = firebase.firestore();
                            var DBref = db.collection("Users").doc(id);
                            await DBref.get().then((query) => {
                                self.UserData = query.data();
                            })
                            this.CheckInstructor();                
                            // User is signed in.
            },
            CreateOrder()
            {
                
            },
            PurchasedCourses()
            {
                EventBus.$emit("PurchasedCourses");
                this.CurrentComponent = "MyCourses";
            },
            ForceUpdate()
            {
                this.$forceUpdate();
            },
            Back()
            {
            this.UserMount();
            this.VisitorFlag = false;
            this.CurrentComponent = "FindPlayers"
            this.$router.push({path: `/profile/${this.UserID}`, params: {id: this.UserID}})
            console.log("User ID is: "+ this.UserID);
            },
            MyCourses()
            {
                this.CurrentComponent = "CreatedCourses";
                EventBus.$emit("MyCourses");
            },
            GoToAcademies()
            {
                this.CurrentComponent = "Academies";
                EventBus.$emit("MyAcademies");
            },
            MyPost()
            {
                this.CurrentComponent = "NewsFeed";
                // EventBus.$emit("MyPosts");
            },
            GoToExplore()
            {
                this.CurrentComponent = "FindPlayers";
                // EventBus.$emit("MyPosts");
            },
            async Follow()
            {
        this.FollowedUserID = this.UserData.UserId;
        let self = this;
        await firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                self.FollowerUserID = user.uid; 
                                // User is signed in.
            } else {
                console.log("No User Signed in")
                    // No user is signed in.
                }
        
            })
        var db = firebase.firestore();
        var DBref = db.collection("Follows").doc(this.FollowedUserID); //Update Follower in Followed User
        DBref.update({
          Followers: firebase.firestore.FieldValue.arrayUnion(this.FollowerUserID)  
        })
        var DBref2 = db.collection("Follows").doc(this.FollowerUserID); //Update Following in Follower User
        DBref2.update({
          Following: firebase.firestore.FieldValue.arrayUnion(this.FollowedUserID)  
        })
        this.Followed = true;
        alert("You Followed Him");  
            },
            async UnFollow()
            {
       this.FollowedUserID = this.UserData.UserId;
        let self = this;
        await firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                self.FollowerUserID = user.uid; 
                                // User is signed in.
            } else {
                console.log("No User Signed in")
                    // No user is signed in.
                }
        
            })
        var db = firebase.firestore();
        var DBref = db.collection("Follows").doc(this.FollowedUserID); //Update Follower in Followed User
        DBref.update({
          Followers: firebase.firestore.FieldValue.arrayRemove(this.FollowerUserID)  
        })
        var DBref2 = db.collection("Follows").doc(this.FollowerUserID); //Update Following in Follower User
        DBref2.update({
          Following: firebase.firestore.FieldValue.arrayRemove(this.FollowedUserID)  
        })
        this.Followed = false;
        alert("You UnFollowed Him");          

            },
            SignOut()
            {
                const auth = firebase.auth();
                auth.signOut();
                alert("the User ID right now is " + this.UserID);
                EventBus.$emit("LoggedIn", false);
                this.$router.push('/SignUp')                
            },
            CheckInstructor()
            {
                console.log("am here");
                console.log("The Instructor Flag is: "+ this.UserData.Instructor);
                if (this.UserData.Instructor == true) {
                    this.IsInstructor = true;
                }
                else
                {
                    this.IsInstructor = false;
                }
            },
            async UserMount()
            {
                let self = this;
                await firebase.auth().onAuthStateChanged(async function(user) {
                    if (user) {
                        self.UserID = user.uid;
                        self.GetUserData(self.UserID);
                        // self.CheckInstructor();
                                // User is signed in.
                    } else {
                    console.log("No User Signed in")
                    // No user is signed in.
                        }
                        })                                    
            },
            async GetFollowingIDs()
            {
                let self =this;
                await firebase.auth().onAuthStateChanged(async function(user) {
                    if (user) {
                        self.UserID = user.uid;
                                // User is signed in.
                    } else {
                    console.log("No User Signed in")
                    // No user is signed in.
                        }                
            })
                    var db = firebase.firestore();
                    var DBref = db.collection("Follows").doc(this.UserID)
                    await DBref.get().then((query)=>{
                        this.FollowingID = query.data().Following;
                    })
                    // EventBus.$emit("SendFollowingIDs",this.FollowingID);

            }

        },
        async mounted()
        {
            this.GetFollowingIDs(); //Get Following IDs from the user Doc in database
            EventBus.$emit("SendFollowersID",this.FollowingID);
            await EventBus.$on("VisitProfile",(VisitorData) => {
                this.UserData = VisitorData;
                this.VisitorFlag = true;
                this.CurrentComponent = "Posts";
                for (let i = 0; i < this.FollowingID.length; i++) {
                    if (this.UserData.UserId == this.FollowingID[i]) {
                        this.Followed = true;
                    }
                }                               
            })
            if (!this.VisitorFlag) {
                this.UserMount();
            }
        },
        components:{
            FindPlayers,
            Courses,
            Academies,
            NewsFeed,
            MyCourses,
            CreatedCourses            
        }
    }
</script>

<style scoped>
    h3{
        margin: 0px;
        margin-bottom: 2px;
        font-weight: normal;
    }
    p{
        margin: 0px;
        font-weight: bold;

    }
    .Shadow{
		-webkit-box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
		-moz-box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
		box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
    }
    .TextBox{
        width: 95%;
        height: 110px;
        background-color: white;
        border-radius: 12px;
        padding-top: 10px;
        padding-left: 10px;
        color: black;
        font-family: 'Raleway', sans-serif;
    }
    img{
    height: 110px;
    width: 110px;
    border-radius: 110px;
    }
    .Container{
        display: flex;
        width: 90%;
        height: 200px;
        /* background-color: aqua; */
        margin-left: 2%;
    }
    .UserImageAndSignOut{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 20%;
        height: 100%;
        /* background-color: red; */
    }
    .Bio{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60%;
        height: 100%;
        /* background-color: royalblue; */
    }
    .Buttons{
        justify-content: space-evenly;
        width: 20%;
        height: 100%;
        display: flex;
        flex-direction: column;
        /* background-color: purple; */
    }
    button{
		height: 35px;
		width: 180px;
		border: none;
		outline: none;
		border-radius: 1.2rem;
		font-size: 0.8rem;
		font-family: 'Raleway', sans-serif;
		background-color: #022A68;
		color: white;
	}
</style>