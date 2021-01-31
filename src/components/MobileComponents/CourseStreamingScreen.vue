<template>
    <div>
        <div style="height: 250px; width: 100%">
            <VideoPlayer :VID = '$route.query.CourseID' />
        </div>
        <v-row>
            <v-col cols="8">
                <v-sheet class="px-2 py-2">
                    <ChessBoardDisplay id = "1"/>
                </v-sheet>
            </v-col>
            <v-col align-self="center">
                <v-btn @click="Close" class="white text-capitalize mb-2 ml-1" rounded>
                    Close
                </v-btn>
                <v-btn rounded class="text-capitalize" id="Review">
                    Review
                </v-btn>
            </v-col>
        </v-row>
        <TimeStamps :ID = '$route.query.CourseID'></TimeStamps>
        <!-- <v-row justify="space-around" class="px-2 mt-1">
            <v-sheet  rounded="lg" width="45%" class="px-2" height="200px" >
                <span class="text-subtitle-2 text-decoration-underline">TimeStamps</span>
                <br>
                <div style="overflow-y: scroll; height: 80%">
                    <div  v-for="n in 10" :key="n" >
                    <span class="text-caption">stamp</span>
                    <br>
                    </div>
                </div>
            </v-sheet>
            <v-sheet  rounded="lg" width="45%" height="200px" class="px-2">
                <span class="text-subtitle-2 text-decoration-underline">Stockfish</span>
                <br>
                <div style="overflow-y: scroll; height: 80%">
                    <div  v-for="n in 10" :key="n" >
                    <span class="text-caption">move score</span>
                    <br>
                    </div>
                </div>
            </v-sheet>
        </v-row> -->
        <v-dialog
      v-model="dialog"
      width="500"
      activator= "#Review"
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
                    placeholder = "Add a review"    
                    flat
                    v-model="Review"
                    >
                    </v-textarea>
            </v-col>
        </v-row>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-rating
                        hover
                        length="5"
                        size="20"
                        value="3"
                        v-model="Rate"
                    >

                    </v-rating>
          <v-btn
            color="primary"
            @click="submit"
            flat
            rounded
            width="100"
          >
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </div>
</template>

<script>
import VideoPlayer from "@/components/MobileComponents/VideoPlayer"
import ChessBoardDisplay from "@/components/MobileComponents/ChessBoardDisplay"
import TimeStamps from "@/components/MobileComponents/TimeStamps"
import {mapActions} from "vuex"

export default {
        data(){
            return{
                dialog: false,
                CourseID:"",
                Review:"",
                Rate:0
                }
        },
        components: {
            VideoPlayer,
            ChessBoardDisplay,
            TimeStamps
        },
        methods:{
            ...mapActions(['SubmitReviewForThisCourse']),
            Close()
            {
                this.$router.push({path: `/CoursePage/${this.$route.query.CourseID}`, query:{CourseID: this.$route.query.CourseID}})
            },
            async submit()
            {
                if(this.Review == "" && this.Rate == 0)
                {
                    alert("Fill Your Rate Correctly before you submit");
                }
                else
                {
                    var ReviewData = {
                        Review: this.Review,
                        Rate: this.Rate,
                        CourseId: this.$route.query.CourseID
                    }
                    console.log("Review Data: "+ ReviewData.Review);
                    await this.SubmitReviewForThisCourse(ReviewData);
                    this.dialog = false;
                    //TODO Professional Popup that your rate have benn successfully Posted
                    //TODO Clear Rate and Refetch all the Reviews all again
                }

            }
        },
        mounted()
        {
            this.CourseID = this.$route.query.CourseID;
            console.log("Course ID: "+ this.$route.query.CourseID);
        }
    }
</script>

<style scoped>

</style>