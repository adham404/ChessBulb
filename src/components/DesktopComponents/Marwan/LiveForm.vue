<template>
  <div>
    <v-row  style="width :90%" class="mx-auto py-5 " justify="center" align="center">
      <v-col>
        <v-row>
          <v-text-field
        
          outlined
        rounded
          v-model="LiveTitle"
          label="Live Title"
          
          ></v-text-field>
        </v-row>
        
        <v-row>
          <v-datetime-picker
        
          light
          v-model="LiveDate"
          
          
          
          >
           <template slot="dateIcon">
             <v-icon>
               mdi-calendar-range
             </v-icon>
             
           </template>
           <template slot="timeIcon">
             <v-icon>
               mdi-clock-outline
             </v-icon>
             
           </template>
          </v-datetime-picker>
        </v-row>
        <v-row>
          <v-textarea
        
          
          v-model="LiveDescription"
          label="Live Description"
         
          
          ></v-textarea>
        </v-row>
        <v-row justify="center" align="center">
          <v-btn light @click="addlive" >
            Submit
            
          </v-btn>
        </v-row>
      </v-col>

    </v-row>
  </div>
</template>

<script>
//DONE Assign Firebase (1min)
import firebase from "firebase";
import { mapGetters } from "vuex";
// import DatetimePicker from 'vuetify-datetime-picker'
// import { EventBus } from "@/main.js";
export default {
  components:{
    // DatetimePicker
  },
  //DONE Assign Data Properties in the vue data object which are (UserEmail(S), UserPassword(S)) (1min)
  data: function() {
    return {
      LiveTitle: "",
      LiveDescription: "",
      LiveDate: ""
    };
  },
  computed: {
    ...mapGetters(["GetAcademyData", "GETUserFullName", "GetProfilePicUrl"])
  },
  //DONE define Login Function (1min)
  methods: {
    async addlive() {
      if (
        this.LiveTitle != "" &&
        this.LiveDescription != "" &&
        this.LiveDate != ""
      ) {
        var db = await firebase.firestore();
        var doc = await db.collection("Lives").doc();

        doc.set({
          AcademyId: this.GetAcademyData.AcademyId,
          AcademyName: this.GetAcademyData.AcademyName,
          InstractorName: this.GETUserFullName,
          InstractorPic: this.GetProfilePicUrl,
          LiveDate: firebase.firestore.Timestamp.fromDate(
            new Date(this.LiveDate)
          ),
          LiveDescription: this.LiveDescription,
          status: "OffLine",
          id: doc.id,
          LiveTitle: this.LiveTitle
        });
        console.log("added");
      }
    }
  }
};
</script>

<style scoped>
/* .Shadow {
  -webkit-box-shadow: 0px 0px 21px -10px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 0px 21px -10px rgba(0, 0, 0, 1);
  box-shadow: 0px 0px 21px -10px rgba(0, 0, 0, 1);
}
.Container {
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
} */
</style>

//TODO Total Time to finish Component 39min
