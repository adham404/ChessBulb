<template>
    <div style="margin-top: 50px;">
        <div class="Upper">
            <div class="CourseCard">
                <div class="CourseData">
                    <h4 id="Instructor">Garry Kasparov</h4>
                    <h4 id="CourseName">{{Courses.CourseName}}</h4>
                    <div class="rating">
                        <svg v-if="rating >= 1" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 15.751 15.113">
                            <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M8.016.489l-1.8,3.645L2.2,4.721a.881.881,0,0,0-.487,1.5L4.618,9.06,3.93,13.065a.88.88,0,0,0,1.277.928l3.6-1.891,3.6,1.891a.881.881,0,0,0,1.277-.928L12.993,9.06,15.9,6.224a.881.881,0,0,0-.487-1.5l-4.022-.586L9.6.489A.882.882,0,0,0,8.016.489Z" transform="translate(-0.93 0.501)" stroke="#000" stroke-width="1"/>
                        </svg>
                        <svg v-if="rating >= 2" xmlns="http://www.w3.org/2000/svg"  width="100%" height="100%" viewBox="0 0 15.751 15.113">
                            <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M8.016.489l-1.8,3.645L2.2,4.721a.881.881,0,0,0-.487,1.5L4.618,9.06,3.93,13.065a.88.88,0,0,0,1.277.928l3.6-1.891,3.6,1.891a.881.881,0,0,0,1.277-.928L12.993,9.06,15.9,6.224a.881.881,0,0,0-.487-1.5l-4.022-.586L9.6.489A.882.882,0,0,0,8.016.489Z" transform="translate(-0.93 0.501)" stroke="#000" stroke-width="1"/>
                        </svg>
                        <svg v-if="rating >= 3" xmlns="http://www.w3.org/2000/svg"  width="100%" height="100%" viewBox="0 0 15.751 15.113">
                            <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M8.016.489l-1.8,3.645L2.2,4.721a.881.881,0,0,0-.487,1.5L4.618,9.06,3.93,13.065a.88.88,0,0,0,1.277.928l3.6-1.891,3.6,1.891a.881.881,0,0,0,1.277-.928L12.993,9.06,15.9,6.224a.881.881,0,0,0-.487-1.5l-4.022-.586L9.6.489A.882.882,0,0,0,8.016.489Z" transform="translate(-0.93 0.501)" stroke="#000" stroke-width="1"/>
                        </svg>
                        <svg v-if="rating >= 4" xmlns="http://www.w3.org/2000/svg"  width="100%" height="100%" viewBox="0 0 15.751 15.113">
                            <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M8.016.489l-1.8,3.645L2.2,4.721a.881.881,0,0,0-.487,1.5L4.618,9.06,3.93,13.065a.88.88,0,0,0,1.277.928l3.6-1.891,3.6,1.891a.881.881,0,0,0,1.277-.928L12.993,9.06,15.9,6.224a.881.881,0,0,0-.487-1.5l-4.022-.586L9.6.489A.882.882,0,0,0,8.016.489Z" transform="translate(-0.93 0.501)" stroke="#000" stroke-width="1"/>
                        </svg>
                        <svg v-if="rating >= 5" xmlns="http://www.w3.org/2000/svg"  width="100%" height="100%" viewBox="0 0 15.751 15.113">
                            <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M8.016.489l-1.8,3.645L2.2,4.721a.881.881,0,0,0-.487,1.5L4.618,9.06,3.93,13.065a.88.88,0,0,0,1.277.928l3.6-1.891,3.6,1.891a.881.881,0,0,0,1.277-.928L12.993,9.06,15.9,6.224a.881.881,0,0,0-.487-1.5l-4.022-.586L9.6.489A.882.882,0,0,0,8.016.489Z" transform="translate(-0.93 0.501)" stroke="#000" stroke-width="1"/>
                        </svg>                    
                    </div>
                </div>
            </div>
            <div class="CourseDescription">
                <p>
                    {{Courses.privileges}}
                    This will be a short introduction to the course like blabalaldsjfaklfdjasdfk any words will do just filling text here you know that
                     guy who used to smoke alot of weed with bob marley and he felt like everything is falling apar well yeah that is him
                     This will be a short introduction to the course like blabalaldsjfaklfdjasdfk any words will do just filling text here you know that
                     guy who used to smoke alot of weed with bob marley and he felt like everything is falling apar well yeah that is him
                     This will be a short introduction to the course like blabalaldsjfaklfdjasdfk any words will do just filling text here you know that
                     guy who used to smoke alot of weed with bob marley and he felt like everything is falling apar well yeah that is him
                </p>
                <div class="Purchase">
                    <h4>This course is in some state</h4>
                    <router-link v-if="!PurchaseFlag" style="margin-bottom:5px" :to="{
                        path:`/Courses/CourseStreaming/${CoursesID}`,
                        params:{CourseID: CoursesID}
                }">
                <button @click="ToggleHeader">Stream</button>
                </router-link>
                    <router-link v-if="PurchaseFlag" :to="{
                        path: `/Purchase/${CoursePurchase}`,
                        params: {id: CoursePurchase}
                }">
                <button @click="ToggleHeader">Enroll</button>
                </router-link>
                </div>
            </div>
        </div>
        <div class = "Lower">
            <div class="Reviews">
                <Reviews :CourseID = "CoursesID" />
            </div>
            <div class="AboutInstructor">
                <AboutInstructor :InstructorID = "Courses.InstructorId"/>
            </div>
        </div>
    </div>
</template>

<script>
/*eslint-disable*/

import firebase from "firebase";
import { EventBus } from "../../main";
import AboutInstructor from "../ShemyComponents/AboutInstructor"
import Reviews from "../ShemyComponents/Reviews"
import RateCourse from "../ShemyComponents/RateCourse"

export default {
    data: function()
    {
        return{
            rating: 5,
            Courses:{},
            CoursePurchase:"",
            PurchaseFlag: true,
            UserID:"",
            NumberOfStars:[],
            OverallRate:0
        }
    },
    props:["CoursesID"],
    components:{
        AboutInstructor,
        Reviews,
        RateCourse
    },
    mounted()
    {   
        this.RecieveCoursesData();
        this.CheckPurchaseStatus();
        this.GetOverAllRate();
    },
    methods:{
        ToggleHeader(){
            EventBus.$emit('Toggle', true )
        },
        async GetOverAllRate()
        {
            var db = firebase.firestore();
            var DBRef = db.collection("Reviews").where("CourseId", "==", this.CoursesID);
            await DBRef.get().then((query)=> {
                query.forEach((doc) => {
                    this.NumberOfStars.push(doc.data().NumberOfStars);
                })
            })
            var Total = 0;
            this.NumberOfStars.forEach((star)=>{
                Total = Total + star;
            })
            this.OverallRate = Total/this.NumberOfStars.length;
            this.OverallRate = Math.floor(this.OverallRate);
            var DBRef2 = db.collection("Courses").doc(this.CoursesID);
            DBRef2.update({
                Rating: this.OverallRate 
            })
            console.log("Stars array of the course is: "+ this.NumberOfStars);
            console.log("Average of the Rate of this course: "+ this.OverallRate);
        },
        async CheckPurchaseStatus()
        {
        let self = this;
        await firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                self.UserID = user.uid;
            // User is signed in.
            } else {
                console.log("No User Logged In");
            // No user is signed in.
            }
        });
        var db = firebase.firestore();
        var DBRef = db.collection("CourseOrders");
        await DBRef.get().then((query) => {
            query.forEach((doc) => {
                if (doc.data().CourseId == this.CoursesID && doc.data().UserId == this.UserID) {
                    this.PurchaseFlag = false;
                }
            })
        })
        if (this.PurchaseFlag) {
            console.log("You Need to Purchase the Course")
        }
        else
        {
            console.log("You okay go watch the course")
        }
        },
        async RecieveCoursesData()
        {
            var id = this.CoursesID;
            let self = this;
            var db = firebase.firestore();  
            //DONE Recieve and assign (CourseData) from firebase using Passed Course ID returned from the props (10min)
            var docRef = db.collection("Courses").doc(id);
            let response = await docRef.get().then((query)=>{
                if(query.exists)
                {
                    self.Courses = query.data();
                    self.rating = self.Courses.Rating;
                    self.CoursePurchase = self.Courses.PriceId;
                }
                else
                {
                    console.log("No Doc in here");
                }
            }).catch((error)=>{
                console.log("Error getting document: ", error);
            });
            console.log(response);
        }
        
    }
}
</script>

<style scoped>
.Upper{
    display: flex;
    height: 650px;
    /* background-color: green; */
    justify-content: space-around;
}
.CourseDescription{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 45%;
    height: 100%;
    /* background-color: indigo; */
    font-family: 'QuickSand', sans-serif;
    font-weight: lighter;
}
.CourseDescription p{
    font-size: 1.5rem;
    color: white;
    font-weight: lighter;
}
.CourseCard{
    display: flex;
    flex-direction: column-reverse;
    width: 50%;
    height: 100%;
    /* height: 220px; */
    /* width: 210px; */
    border-top-left-radius: 0.4rem ;
    border-top-right-radius: 0.4rem;
    border-bottom-left-radius: 0.7rem;
    border-bottom-right-radius: 0.7rem;
    background: url(../../assets/AcademyPic.jpg);
    background-repeat: no-repeat;
    background-size:cover;
    background-position: center;
    text-decoration: none;
  }
  .CourseData{
    height: 150px;
    background-color: white;
    border-radius: 0.7rem;
  }
  h4{
    margin: 3px;
    margin-left: 1rem;
    font-size: 1.5rem;
    color: black;
  }
  #Instructor{
    font-family: 'Open Sans', sans-serif;
    font-weight: bold;
  
  }
  #CourseName{
    font-family: 'Quick Sand', sans-serif;
    font-weight: lighter;
  }
  .rating{
    margin-left: 1rem;
    display: flex;
  }
  .rating svg{
    width: 30px;
    margin-right: 5px;
    fill: black;
  }
  button{
		height: 35px;
		width: 180px;
		border: none;
		outline: none;
		border-radius: 1.2rem;
		font-size: 1rem;
		font-family: 'Raleway', sans-serif;
		background-color: #022A68;
        color: white;
  }
  .Purchase{
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-bottom: 15px;
  }
  .Purchase h4{
      color: white;
      font-family: 'Quicksand', sans-serif;
      font-weight: lighter;
  }
  .Lower{
      width: 100%;
      /* background-color: teal; */
      margin-bottom: 50px;
      display: flex;
      flex-direction: row;
      justify-content: space-around;
  }
  .Reviews{
      width: 50%;
      /* background-color: black; */
  }
  .AboutInstructor{
      height: 300px;
      width: 45%;
      background-color: white;
      border-radius: 10px;
      margin-top: 20px;
  }
</style>





//TODO Estimated time to finish the component is 61min