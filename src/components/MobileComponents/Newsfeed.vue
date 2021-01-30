<template>
    <div>
      <!-- <keep-alive> -->
        <Post v-for="(item, index) in Matches" :key="index" :Match="item" :UserId="UserId" />             

      <!-- </keep-alive> -->
      <h1>hello</h1>
      <!-- <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Click Me
        </v-btn>
      </template> -->
        <v-dialog
      v-model="dialog"
      width="500"
      activator= "#share"
    >

      <v-card class="py-3" rounded="lg">

  
        <v-row>
            <v-col cols = "2">
                <v-avatar class="ml-2">
                    <img src="@/assets/ProfilePic2.jpg" alt="" style="object-fit: cover">
                </v-avatar>
            </v-col>
            <v-col cols="9" >
                    <v-textarea
                    solo
                    name="input-7-4"
                    placeholder = "Add a comment"
                    flat
                    >
                    </v-textarea>
            </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="dialog = false"
            flat
            rounded
            width="100"
          >
            Share
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-bottom-sheet v-model="sheet" scrollable >
      <!-- <v-sheet
        class="text-center"
        height="100vh"
      > -->
      
        
        
        <v-card height = "80vh">
          <v-card-title height = "20px" class="py-0">
        <v-row class="my-1">
          <v-btn
          text
          @click="sheet = !sheet"
          >
            <v-icon>
              fa-arrow-left
            </v-icon>
          </v-btn>
        </v-row>
      </v-card-title>
      <v-divider></v-divider>
          <v-card-text  class="mt-3">
            <div v-for="n in 1" :key = "n">
              <v-row>
            <v-col cols = "2">
                <v-avatar class="ml-2">
                    <img src="@/assets/ProfilePic2.jpg" alt="" style="object-fit: cover">
                </v-avatar>
            </v-col>
            <v-col cols="9" >
                    <v-textarea
                    solo
                    name="input-7-4"
                    placeholder = "Add a comment"
                    flat
                    readonly
                    background-color="grey lighten-2"
                    rounded = "xl"
                    class="text-subtitle-1"
                    value = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, quos amet velit quis fuga veniam ipsam nesciunt error ut incidunt illo! Reprehenderit, sapiente sequi optio eos deleniti culpa voluptatum earum.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus eos non voluptates! Consequuntur expedita consequatur, iure asperiores veniam ex maxime amet! Unde, ducimus rem. Aperiam aliquam asperiores tenetur similique pariatur.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, enim praesentium aliquam nemo, eaque explicabo illum, doloremque ab cupiditate incidunt quidem dignissimos ratione. Animi molestias corporis cupiditate. Blanditiis, eum beatae."
                    >
                    
                    </v-textarea>

            </v-col>
            </v-row>
            <v-btn text v-if="!SeeReplies" @click="SeeReplies = !SeeReplies">
              <span class="text-capitalize">See Replies</span>
            </v-btn>
              <div v-if="SeeReplies">
                  <v-row justify="end" class="pr-10" v-for="n in 2" :key = "n" >
            <v-col cols = "2">
                <v-avatar class="ml-2">
                    <img src="@/assets/ProfilePic2.jpg" alt="" style="object-fit: cover">
                </v-avatar>
            </v-col>
            <v-col cols="8" >
                    <v-textarea
                    solo
                    name="input-7-4"
                    flat
                    readonly
                    background-color="grey lighten-2"
                    rounded = "xl"
                    class="text-subtitle-1"
                    value = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, quos amet velit quis fuga veniam ipsam nesciunt error ut incidunt illo! Reprehenderit, sapiente sequi optio eos deleniti culpa voluptatum earum.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus eos non voluptates! Consequuntur expedita consequatur, iure asperiores veniam ex maxime amet! Unde, ducimus rem. Aperiam aliquam asperiores tenetur similique pariatur.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, enim praesentium aliquam nemo, eaque explicabo illum, doloremque ab cupiditate incidunt quidem dignissimos ratione. Animi molestias corporis cupiditate. Blanditiis, eum beatae."
                    >
                    
                    </v-textarea>

            </v-col>

          </v-row>
              </div>
            </div>
            <!-- <v-row v-for="n in 10" :key = "n">
            <v-col cols = "2">
                <v-avatar class="ml-2">
                    <img src="@/assets/ProfilePic2.jpg" alt="" style="object-fit: cover">
                </v-avatar>
            </v-col>
            <v-col cols="9" >
                    <v-textarea
                    solo
                    name="input-7-4"
                    placeholder = "Add a comment"
                    flat
                    readonly
                    background-color="grey lighten-2"
                    rounded = "xl"
                    class="text-subtitle-1"
                    value = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique, quos amet velit quis fuga veniam ipsam nesciunt error ut incidunt illo! Reprehenderit, sapiente sequi optio eos deleniti culpa voluptatum earum.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Temporibus eos non voluptates! Consequuntur expedita consequatur, iure asperiores veniam ex maxime amet! Unde, ducimus rem. Aperiam aliquam asperiores tenetur similique pariatur.
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Blanditiis, enim praesentium aliquam nemo, eaque explicabo illum, doloremque ab cupiditate incidunt quidem dignissimos ratione. Animi molestias corporis cupiditate. Blanditiis, eum beatae."
                    >
                    
                    </v-textarea>

            </v-col>
            </v-row> -->
            
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions >
            <v-btn fab text>
                <v-icon>
                  fa-chess-board
                </v-icon>
              </v-btn>
              <v-text-field
                rounded
                background-color = "grey lighten-2"
                width = "300px"
                type="text"
                browser-autocomplete="new-password"
              >
              </v-text-field>
              <v-btn fab text>
                <v-icon >
                  fa-paper-plane
                </v-icon>
              </v-btn>

          </v-card-actions>
        </v-card>
              

          
      <!-- </v-sheet> -->
    </v-bottom-sheet>
    </div>
</template>

<script>
import firebase from "firebase"
import Post from "@/components/MobileComponents/Post.vue"
import {EventBus} from "@/main.js"
    export default {
        data: () => ({
      showi: false , 
      UserId: "",
      Following: [],
      Matches: [],
      matdata: [],
      BrilliantUsers: [],
      NewsFeedStatus:'<p>No Chess Games in here yet. &#128531</p>',
      dialog: false,
      sheet: false,
      SeeReplies: false,
  }),
  components: {
      Post
  },
  async created() {
      let self = this;
//____________________________________________________Check if user is logged in
      await firebase.auth().onAuthStateChanged(async function (user) {
          if (user) {
              console.log(user.uid);
              self.UserId = user.uid;

          } else {
              console.log("no log in");
          }
      });
// ______________________________________________________Get people user is following and UserID_________________________________________________________________________________
      if(self.UserId){
          var followdata = await firebase
          .firestore()
          .collection("Follows")
          .doc(self.UserId)
          .get();

          console.log(followdata.data().Following);
          self.Following = followdata.data().Following;
          self.Following.push(self.UserId);

          await self.Following.forEach(async (user) => {
              // let self = this;
              var match = await firebase
              .firestore()
              .collection("Matches")
              .where("UserId", "==", user)
              .get();

              await match.forEach((doc) => {
                  console.log(doc.data());
                  self.matdata.push(doc.data());
                  self.NewsFeedStatus = ''; 
                  // self.Matches.push(doc.data());
                  // console.log(self.Matches);
              });
          });
// _______________________________________________________________________
          console.log("all data is here",this.matdata);
          // var num = this.matdata.length;
          // console.log("Number of matches in homepage is: "+ num);
          this.Matches = this.matdata
      }



//__________________________________________________Get Match posts of followed users
    //   if (self.Personal) {
    //       self.Following = []
    //       self.Following.push(self.ClickedUserId)
    //       await self.Following.forEach(async (user) => {
          

    //       var match = await firebase
    //       .firestore()
    //       .collection("Matches")
    //       .where("UserId", "==", user)
    //       .get();



    //       await match.forEach((doc) => {
    //           console.log(doc.data());
    //           self.NewsFeedStatus = '';
    //           // self.matdata.push(doc.data());
    //           self.Matches.push(doc.data());
    //           // console.log(self.Matches);
    //       });
    //       });
    //   }
//___________________________________________________________________
  },
  mounted(){
      EventBus.$on("OpenShare", (flag) => {
          this.dialog = flag
      })
      EventBus.$on("OpenCommentSheet", (data) => {
        this.sheet = data
      })
  }
    }
</script>

<style scoped>

</style>