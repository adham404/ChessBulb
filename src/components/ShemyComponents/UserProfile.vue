<template>
    <div>
        <div class="Container">
            <div @click="() => this.Clicked = !this.Clicked" class="UserImageAndSignOut">
                <img :src="GetImgUrl()" alt="">
                <!-- <div>{{GETUserID}}</div> -->
                <div v-show="Clicked && !Fetched">
                    <button @click="() => {
                            this.$refs.input1.click();
                        }">Update</button>
                    <input @change="BrowsePhoto" type="file" enctype="multipart/form-data" style="display: none" accept="image/*" ref="input1">
                    <button @click="Remove">Remove</button>
                </div>
                <div v-show="Fetched">
                    <button @click="UploadPhoto">Save</button>
                        <button @click="Discard">
                            Discard
                        </button>
                </div>
            </div>
            <div class="Bio">
                <div class="TextBox Shadow">
                    <h3>{{CurrentUserData.FirstName}} {{CurrentUserData.LastName}}</h3>
                    <p v-if="!ShowBioEdit" @click="EditBio">{{CurrentUserData.UserBio}}</p>
                    <div v-if="ShowBioEdit">
                        <textarea v-model="BioData" style="width:300px; height:50px; resize:none;  font-family:'Raleway', sans-serif;"  maxlength="140" name="" id="" cols="30" rows="10"></textarea>
                        <button @click="SaveBio">Save Bio</button>
                    </div>
                </div>

            </div>
            <div class="Buttons">
                <button v-if="!VisitorFlag && IsInstructor" @click="MyCourses">My Courses</button>
                <button v-if="!VisitorFlag" @click="PurchasedCourses">Purchased Courses</button>
                <button v-if="!VisitorFlag" @click="GoToAcademies">Joined Academies</button>
                <button @click="MyPost">My Posts</button>
                <button v-if="VisitorFlag && !FollowingState" @click="Follow">Follow</button>
                <button v-if="VisitorFlag && FollowingState" @click="UnFollow">UnFollow</button>
                <button v-if="!VisitorFlag" @click="GoToExplore">Find Players</button>
                <button v-if="!VisitorFlag" @click="SignOut">Sign Out &#128549;</button>
                <button v-if="!VisitorFlag" @click="UpdatePass">Update Password</button>
                <button v-if="VisitorFlag" @click="Back">Go Back to my Profile</button>
            </div>

        </div>
        <div>

        </div>
        <div v-if="CurrentComponent == 'NewsFeed'" class="ContainerPosts">
            <component :FollowingIDs="FollowingID" :ClickedUserId="UserID" :Personal="true" :General="false" :allAcademies="false" :is="CurrentComponent"></component>

        </div>
        <div v-if="!(CurrentComponent == 'NewsFeed')">
            <component :FollowingIDs="FollowingID" :ClickedUserId="UserID" :Personal="true" :General="false" :allAcademies="false" :is="CurrentComponent"></component>
        </div>
        <!-- <FindPlayers/> -->
        
    </div>
</template>

<script>
import firebase from "firebase"
import UpdatePass from "../ShemyComponents/UpdatePass"
import FindPlayers from "../MarawanComponents/FindPlayers";
import Courses from "../ShemyComponents/Courses";
import MyCourses from "../MarawanComponents/MyCourses";
import CreatedCourses from "../ShemyComponents/CreatedCourses";
import Academies from "../SadekComponents/Academy/Academies";
import NewsFeed from "../SadekComponents/NewsFeed/NewsFeed";
import {EventBus} from "../../main";
import {mapGetters, mapActions} from "vuex"

    export default {
        name: "Profile",
        data:function()
        {
            return{
                // UserLogged:true,
                IsInstructor:false,
                // UserID:"",
                CurrentUserData:"",
                // UserData:"",
                // UserName:"",
                Clicked:false, //Boolean Indicator when profile pic is clicked
                Fetched:false, //Boolean Indicator when profile pic is fetched
                Upload:false, //Boolean Indicator whether to upload pic or not
                Url:"", //Img Url property
                PicData:"", //Profile Pic Data
                FollowingState: false, //Boolean Indicator If You are following the user
                BioData: "",
                ShowBioEdit:false,
                // Followed: false,
                // FollowedUserID:"",
                // FollowerUserID:"",
                VisitorFlag:false,
                // UpdatedID:"",
                // FollowingID:[],
                CourseIDs:["7C5NPltqtKoSxj3DHiMw","Rzm0wk6rOQhERY52V6uM","cRveFm5Iw74E0i7nWIp6"],
                // FollowerID:"",
                CurrentComponent:"FindPlayers"
            }
        },
        props:['id','Visitor','ComponentSent', 'Type'],
        computed:{
            ...mapGetters(['GetProfilePicUrl', 'GETUserID','GETUserFULLDATA','GetVisitorProfilePic','GetVisitorData','GetUserFollowingList','GetThisUserFollowingState'])
        },
        methods:{
            ...mapActions(['fetchProfilePic','fetchUserInfo','fetchVisitorProfilePic','UploadProfilePic','RemoveProfilePic','fetchUserFollowingData','CheckFollowing','UnFollowThisProfile','FollowThisProfile']),
            async GetUserData(id)
            {
                        console.log("The user id is: "+ id);
                        let self = this
                            var db = firebase.firestore();
                            var DBref = db.collection("Users").doc(id);
                            await DBref.get().then((query) => {
                                self.UserData = query.data();
                                self.BioData = query.data().UserBio;
                            })
                            this.CheckInstructor();
                            // User is signed in.
            },
            BrowsePhoto(e)
            {
                //Fetch File object and preview it before uploading
                this.PicData = e.target.files;
                let reader = new FileReader();
                reader.onload = (e) => {
                    this.Url = e.target.result;
                }
                console.log("Pic data is: ",this.PicData[0]);
                reader.readAsDataURL(this.PicData[0]);
                console.log("the Url is: "+ this.Url);
                this.GetImgUrl();
                this.Fetched = true;
            },
            async UploadPhoto()
            {
                //Upload Photo to firebase cloud storage
                var PhotoData = { //Object to hold the photo info
                    Url:"",
                    FileObject:""
                }
                PhotoData.Url = "UserProfilePics/" + this.id + "/" + this.PicData[0].name + ".jpg";
                PhotoData.FileObject = this.PicData[0]
                await this.UploadProfilePic(PhotoData);
                //TODO Progress Loading Bar 
                //DONE Trigger Action to get the uploaded profile pic
                await this.fetchProfilePic();
                this.Url =  await this.GetProfilePicUrl;
                this.GetImgUrl();
                this.Fetched = false;                
            },
            Discard()
            {
                this.Url = "";
                this.Fetched = false;
                this.GetImgUrl();
            },
            async Remove()
            {
                await this.RemoveProfilePic()
                this.Url = this.GetProfilePicUrl;
                this.GetImgUrl();
            },
            GetImgUrl()
            {
                return this.Url || require('@/assets/ProfilePic.jpg');
            },
            EditBio()
            {
                this.ShowBioEdit = true;
            },
            UpdatePass()
            {
                this.CurrentComponent = "UpdatePass"
            },
            SaveBio()
            {
                var db = firebase.firestore();
                var DBRef = db.collection("Users").doc(this.UserID);
                DBRef.update({
                    UserBio: this.BioData
                })
                alert("Bio Edit Successfully");
                this.ShowBioEdit = false;
                this.GetUserData(this.UserID);

            },
            async CreateOrder()
            {
                //TODO Get UserID
                let self = this;
                await firebase.auth().onAuthStateChanged(function(user) {
                  if (user) {
                      self.UserID = user.uid;
                // User is signed in.
                      } else {
                          console.log("No user now")
                    // No user is signed in.
                      }
                });
                //TODO Loop Over 3 CourseIDs
                var db = firebase.firestore();
                var DBref = db.collection("CourseOrders");
                for (let i = 0; i < this.CourseIDs.length; i++) {
                    DBref.doc(this.CourseIDs[i]).set({
                       CourseId: this.CourseIDs[i],
                       DateOfOrder: "Right Now",
                       PaymentAmount: 20,
                       UserId: this.UserID 
                    })
                }
                //TODO Create 4 CourseOrders for the 4 CourseIDs Default with UserID blank
                //TODO Update the 4 CourseOrders with the current userID
            
            },
            PurchasedCourses()
            {
                // EventBus.$emit("PurchasedCourses");
                this.CurrentComponent = "MyCourses";
            },
            Back()
            {
            //New Code--------------
            //Fetch the Original User Data when am back at me profile
            this.CurrentUserData = this.GETUserFULLDATA;
            this.Url = this.GetProfilePicUrl;
            this.GetImgUrl();
            //----------------------
            // this.UserMount();
            this.VisitorFlag = false;
            this.CurrentComponent = "FindPlayers"
            this.$router.push({path: `/profile/${this.GETUserID}`, params: {id: this.GETUserID}})
            },
            MyCourses()
            {
                this.CurrentComponent = "CreatedCourses";
                // EventBus.$emit("MyCourses");
            },
            GoToAcademies()
            {
                this.CurrentComponent = "Academies";
                // EventBus.$emit("MyAcademies");
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
            Follow()
            {
                this.FollowThisProfile(this.CurrentUserData.UserId);
                this.GetUserFollowingList.forEach((id) => {
                    if(this.CurrentUserData.UserId == id)
                    {
                        this.FollowingState = true
                    }
                })
            },
            UnFollow()
            {
                this.UnFollowThisProfile(this.CurrentUserData.UserId);
                this.FollowingState = false
            },
            SignOut()
            {
                const auth = firebase.auth();
                auth.signOut();
                alert("the User ID right now is " + this.UserID);
                EventBus.$emit("LoggedIn", false);
                this.$router.push('/SignUp')                
            },
        },
        async mounted()
        {
            //Fetch Orignal User Data
            await this.fetchUserInfo();
            this.CurrentUserData = this.GETUserFULLDATA;
            await this.fetchProfilePic();
            this.Url = this.GetProfilePicUrl;
            //Fetch User Following Data
            await this.fetchUserFollowingData();
            console.log("Url Recieved from Get: "+ this.Url);
            this.GetImgUrl();
            
            //IF you are visiting Someone Profile Fetch his data 
            await EventBus.$on("ProfileVisited",async () => {
                this.CurrentUserData = this.GetVisitorData; //Assign Vsisted User Data to The Current User Data
                await this.fetchVisitorProfilePic();
                this.Url = this.GetVisitorProfilePic;
                console.log("Url Recieved from Get: "+ this.Url);
                this.GetImgUrl();
                
                this.VisitorFlag = true;
                this.CurrentComponent = "NewsFeed";
                this.CheckFollowing(this.GetUserFollowingList); //Check Whether am i following this guy or not
                this.Followed = this.GetThisUserFollowingState  //Boolean state to indicate whether am following this guy or not                                      
            })
            //Fetch Current User Data
            // console.log("ID recieved from state: ",await this.GETUserID)
            this.CurrentComponent = this.$route.query.Type;
            let query = Object.assign({}, this.$route.query);
            delete query.Type;
            this.$router.replace({ query });
            // this.$router.replace(this.$route.query.Type, null);
            if (this.CurrentComponent == "") {
                this.CurrentComponent == "FindPlayers";
            }            
        },
        components:{
            FindPlayers,
            Courses,
            Academies,
            NewsFeed,
            MyCourses,
            UpdatePass,
            CreatedCourses            
        }
    }
</script>

<style scoped>
    .ContainerPosts{
        width: 990px;
        margin: auto;
    }
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