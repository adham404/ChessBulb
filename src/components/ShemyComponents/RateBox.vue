<template>
    <div class="AddReview">
      <div class="UserImage">
        <img src="@/assets/ProfilePic.jpg" alt="">
      </div>
      <div class="ReviewBox">
        <div class="ActualReview">
          <textarea v-model="RatingComment" name="Review" id="" cols="55" rows="7"></textarea>
        </div>
        <div class="RatingButton">
          <div class="rating" id="Addrating">
                        <svg v-for="Star in 5" :key="Star" :style="StarStyle[Star]" @mouseover="StarClicked(Star)"  @click="StarClicked(Star)" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 15.751 15.113">
                            <path id="Icon_awesome-star" data-name="Icon awesome-star" d="M8.016.489l-1.8,3.645L2.2,4.721a.881.881,0,0,0-.487,1.5L4.618,9.06,3.93,13.065a.88.88,0,0,0,1.277.928l3.6-1.891,3.6,1.891a.881.881,0,0,0,1.277-.928L12.993,9.06,15.9,6.224a.881.881,0,0,0-.487-1.5l-4.022-.586L9.6.489A.882.882,0,0,0,8.016.489Z" transform="translate(-0.93 0.501)"  stroke-width="1"/>
                        </svg>
          </div>
          <button @click="AddReview">Add Review</button>
        </div>
      </div>
    </div>  
</template>

<script>
import firebase from "firebase";
import { EventBus } from '../../main';
export default {
data: function()
{
    return{
        StarStyle:[
          {
            stroke:"#000",
            fill:"#000",
            cursor:"pointer"
          },
          {
            stroke:"#000",
            fill:"#000",
            cursor:"pointer"
          },
          {
            stroke:"#000",
            fill:"#000",
            cursor:"pointer"
          },
          {
            stroke:"#000",
            fill:"#000",
            cursor:"pointer"
          },      
          {
            stroke:"#000",
            fill:"#000",
            cursor:"pointer"
          },
          {
            stroke:"#000",
            fill:"#000",
            cursor:"pointer"
          }
],
        rating: 5,
        RatingValue:0,
        RatingComment:"",
        Rate:{
            AcademyId:"12345678",
            Comment:"This Course isn't great at all i hate it so much",
            CourseId:"",
            DateOfReview:"15 Sep 2020 at 11:11:43 UTC+2",
            FirstName:"chester",
            LastName:"bennington",
            NumberOfStars: 3,
            ReviewId:"",
            UserID:""          
        },
        UserID:"",
        ReviewID:"",
        FirstName:"",
        LastName:""

    }
},
props:['CourseID'],
methods:{
    StarClicked(Star)
    {
      for (let i = 0; i <= 5; i++) {
        this.StarStyle[i].fill = "black";        
      }
      this.RatingValue = Star;
      for (let i = 0; i <= Star; i++) {
        this.StarStyle[i].fill = "#022A68";
        console.log("Star Clicked at pos: "+ i);
      } 
    },
    CheckComment()
    {
      if (this.RatingComment != "" && this.RatingValue != 0) {
        return true
      }
      else
      {
        return false
      }
    },
    ClearRate()
    {
      this.RatingComment = "";
      for (let i = 0; i <= 5; i++) {
        this.StarStyle[i].fill = "black";        
      }
    },
     async AddReview()
     {
          if (this.CheckComment()) {            
            console.log("Course ID is: "+ this.CourseID);
            var Db = firebase.firestore();
            var DbRef = await Db.collection("Reviews").add(this.Rate);
            this.ReviewID = DbRef.id;
            // var CurrentDate = ""
            // CurrentDate = new Date();
            // this.Rate.ReviewId = ReviewId;
            // this.Rate.CourseId = this.CourseID;
            let self = this
            await firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
            // User is signed in.
            self.UserID = user.uid;
            } else {
            alert("Moshkela");
            console.log("Bateee5")
        // No user is signed in.
        }
        });		
            var db = firebase.firestore();
            var docRef = db.collection("Users").doc(this.UserID)
            await docRef.get().then((query)=>{
                if(query.exists)
                {
                  this.FirstName = query.data().FirstName;
                  this.LastName = query.data().LastName;
                }
                else
                {
                    console.log("No Doc in here");
                }
            }).catch((error)=>{
                console.log("Error getting document: ", error);
            });            
            Db.collection("Reviews").doc(this.ReviewID).set({
              AcademyId:"12345678",
              Comment: this.RatingComment,
              CourseId: this.CourseID,
              DateOfReview: "15 Sep 2020 at 11:11:43 UTC+2",
              FirstName:this.FirstName,
              LastName:this.LastName,
              NumberOfStars: this.RatingValue,
              ReviewId: this.ReviewID,
              UserID: this.UserID          
            });
            this.ClearRate();
            EventBus.$emit("RateDone");
       }
      }
}
}
</script>

<style scoped>
  .RatingButton{
    width: 30%;
    /* background-color: blue; */
  }
  .ActualReview{
    width: 70%;
  }
  textarea{
    height: 100%;
    width: 10%;
    all: unset;
    color: black;
    font-size: 1rem;
    font-family: 'Raleway',sans-serif;
    padding-left: 5px;
    padding-top: 5px;
    overflow-wrap: break-word;
  }
  h2{
    font-family: 'Raleway', sans-serif;
    border-bottom: 3px solid grey;
    color: white;
  }
  p{
    margin: 0px;
    color: white;
    font-weight: lighter;
  }
  img{
    height: 40px;
    width: 40px;
    border-radius: 30px;
  }
  .SingleReview{
    display: flex;
    flex-direction: row;
    margin-bottom: 15px;
  }
  .NameDate{
    display: flex;
    flex-direction: row;
    margin-top: 10px;
    margin-bottom: 10px;
    font-family: 'Raleway',sans-serif;
    font-size: 1.5rem;

  }
  .rating{
    margin-left: 1rem;
    display: flex;
  }
  .rating svg{
    width: 15px;
    margin-right: 5px;
    fill: white;
    border-color: white;
  }
  .NameDateRating{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 15px;
    padding-right: 15px;
  }
  .Review{
    padding-left: 15px;
    font-family: 'Raleway', sans-serif;
  }
  .AddReview{
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  .ReviewBox{
    display: flex;
    flex-direction: row;
    background-color: white;
    width: 90%;
    height: 150px;
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 10px;
  }
  .RatingButton{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-top: 5px;
    padding-bottom: 5px;
    align-items: flex-end;
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
    margin-right: 5px;
    cursor: pointer;
  }
</style>