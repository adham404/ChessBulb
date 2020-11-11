<template>
  <div class="AcademyCard">
    <div  id="LegoLeft" class="Shadow">
      <div id="LeftBlock">
        <img src="../../../assets/AcademyPic.jpg" alt="">
                    </div>
                    <div id="RightBlock">
                <div id="UpperPiece">
    <h2>{{Live.LiveTitle}}</h2>
    <p>{{date.toLocaleDateString()}}     {{date.toLocaleTimeString()}}</p>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" width="594" height="1" viewBox="0 0 594 1">
                     <line id="Line_14" data-name="Line 14" x2="594" transform="translate(0 0.5)" fill="none" stroke="#707070" stroke-width="1"/>
                </svg>
                <div id="LowerPiece">
    <h4>{{Live.LiveDescription}}</h4>
    <!-- <div v-if="notEnrolled" id="SendRight" class="Shadow">
      <button >Enroll</button>
    </div> -->
    <!-- <div v-else id="SendRight" class="Shadow" > -->
      <!-- <router-link :to="{path:`/LiveViewer/${id}`}"><h2>join</h2></router-link> -->
      <!-- <button>join</button> -->
    <!-- </div> -->    <!-- <p>{{notEnrolled}}</p> -->
    <!-- <p>{{notEnrolled}}</p> -->
    <div id="SendRight">
      <!-- <router-link v-if="notEnrolled == true"  class="Shadow"   :to="{path:`/Purchase/${Academy.PriceId}`}"><button v-if="notEnrolled == true" id="SendRight">Enroll</button></router-link> -->
      <router-link  class="Shadow" :to="{path:`/LiveViewer/${id}`}"><button  id="SendRight">join</button></router-link>

    </div>
    <!-- <div v-if="NotEnrolled" id="SendRight">
            <router-link  class="Shadow" :to="{path:`/LiveViewer/${id}`}"><button id="SendRight">join</button></router-link>
  <button>hhhheu</button>
    </div>  -->


  </div>
  </div>
  </div>
  </div>
</template>

<script>
// import moment from 'moment';
export default {
  //TODO use props to get the data and boolean
  props:["Live","notEnrolled","id","Academy"],
  data() {
    return {
      date:new Date(this.Live.LiveDate),
      Not:null
    }
  },
  mounted() {
    this.data = this.data.toLocaleDateString()
    if(this.notEnrolled == true){
      this.Not = 2;
    }
    else{
      this.Not = 1;
    }
  },
  updated() {
    this.notEnrolled=this.$route.query.notEnrolled
    // console.log(this.notEnrolled)
    // if(this.notEnrolled == true){
    // this.NotEnrolled = true;
    // }
    // else{
    //   this.NotEnrolled = false;
    // }
  },
  //TODO get user id
  //TODO make a boolean variable Enrolled "false" to show if the user is enrolled or not
  //TODO in "mounted" using the userID to know if he's enrolled or not, and update the boolean variable
};
</script>

<style scoped>
p{
  color: black;
  font-family: 'Raleway', sans-serif;
  font-weight: bold;
}
.AcademyCard{
    display: flex;
    width: 70% ;
    /* background-color: white; */
    margin-left: 15%;
    margin-top: 4rem;
    height: 300px;
}
#LegoLeft{
    display: flex;
    width: 100%;
    background-color: white;
    border-radius: 1rem;
}
#LeftBlock{
    display: flex;
    width: 50%;
    /* background-color: teal; */
    border-radius: 1rem;
}
#LeftBlock img{
    object-fit: cover;
    height: 100%;
    width: 100%;
    border-radius: 1rem;
}
#RightBlock{
    width: 50%;
}
#UpperPiece{
    display: flex;
    justify-content: space-between;
    width: 95%;
    align-items: center;
    padding-top: 10px;
}
#UpperPiece h2{
    font-family: 'Raleway', sans-serif;
    margin: 5px;
    color: black;
}
#RightBlock svg{
    width: 400px;
}
button{
    height: 30px;
    width: 100px;
    border: none;
    outline: none;
    border-radius: 1rem;
    font-size: 0.9rem;
    font-family: 'Raleway', sans-serif;
    background-color: #00112c;
    color: white;
}
#LowerPiece {
    display: flex;
    flex-direction: column;
    height: 70%;
    width: 95%;
    justify-content: space-between;
}
#LowerPiece h4{
    font-family: 'Raleway', sans-serif;
    margin: 7px;
    color: black;
}
#SendRight{
    margin-left: auto;
}
.Shadow{
    -webkit-box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
    -moz-box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
    box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
}
button:hover{
    cursor: pointer;
}
</style>