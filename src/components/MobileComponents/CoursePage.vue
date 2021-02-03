<template>
  <div>
    <CourseCard :order="order" :preview="false" />
    <!-- <button @click="test">hey test</button> -->
    <v-sheet class="px-2 mb-3">
      <span class="text-h6">Course description</span>
      <br />
      <span class="text-subtitle-2 font-weight-normal">
        {{ GetListOfCourses[order].privileges }}
      </span>
      <v-btn
        v-if="GetCoursePlayingFlag"
        xs
        class="text-capitalize primary"
        height="25"
        @click="
          () => {
            $router.push({
              path: `/CourseStreaming/${GetListOfCourses[order].CourseId}`,
              query: { CourseID: GetListOfCourses[order].CourseId }
            });
          }
        "
        >Open</v-btn
      >
      <v-btn v-if="!GetCoursePlayingFlag" @click="Purchase()">purchase</v-btn>
    </v-sheet>
    <span class="text-h6" style="color: white">Reviews and Ratings</span>
    <v-divider size="5" color="white"> </v-divider>
    <v-sheet
      v-for="(Review, x) in GetReviewsOfThisParticularCourse"
      :key="x"
      class="mb-8 mt-5"
    >
      <v-row>
        <v-col cols="2">
          <v-avatar class="ml-2">
            <img
              src="@/assets/ProfilePic2.jpg"
              alt=""
              style="object-fit: cover"
            />
          </v-avatar>
        </v-col>
        <v-col cols="9">
          <span class="text-h6 ml-3"
            >{{ Review.FirstName }} {{ Review.LastName }}</span
          >
          <v-textarea
            solo
            name="input-7-4"
            placeholder="Add a comment"
            flat
            readonly
            :value="Review.Comment"
          >
          </v-textarea>
          <v-rating
            hover
            length="5"
            size="20"
            :value="Review.NumberOfStars"
            readonly="true"
          >
          </v-rating>
        </v-col>
      </v-row>
    </v-sheet>
    <v-sheet class="my-8">
      <v-row>
        <v-col cols="2">
          <v-avatar class="ml-2">
            <img
              src="@/assets/ProfilePic2.jpg"
              alt=""
              style="object-fit: cover"
            />
          </v-avatar>
        </v-col>
        <v-col cols="9">
          <span class="text-h6 ml-3">{{ GETUserFullName }}</span>
          <v-textarea
            solo
            name="input-7-4"
            placeholder="Add a comment"
            flat
            v-model="Review"
          >
          </v-textarea>
          <v-rating hover length="5" size="20" value="3" v-model="Rate">
          </v-rating>
          <v-btn
            rounded
            color="primary"
            @click="submit"
            class="text-capitalize mx-auto"
            >submit</v-btn
          >
        </v-col>
      </v-row>
    </v-sheet>
    <!-- <v-row>
            <v-col>
                <v-avatar>
                    <img src="@/assets/ProfilePic2.jpg" alt="">
                </v-avatar>
            </v-col>
            <v-col>
                <v-sheet>
                    <v-textarea
                    solo
                    name="input-7-4"
                    placeholder = "Add a comment"
                    flat
                    >
                    </v-textarea>
                    <v-rating
                        hover
                        length="5"
                        size="20"
                        value="3"
                    >
                    </v-rating>
                </v-sheet>
            </v-col>
        </v-row> -->
  </div>
</template>

<script>
import CourseCard from "@/components/MobileComponents/CourseCard";
import { mapMutations, mapGetters, mapActions } from "vuex";

export default {
  components: {
    CourseCard
  },
  data() {
    return {
      order: 0,
      Review: "",
      Rate: 0
    };
  },
  methods: {
    ...mapActions([
      "FetchAllReviewsForThisCourse",
      "SubmitReviewForThisCourse",
      "CanIPLayThisCourse",
      "fetchUserInfo"
    ]),
    Purchase() {
      this.$router.push({
        path: `/Purchase/${this.GetListOfCourses[this.order].PriceId}`,
        query: { ProductID: this.GetListOfCourses[this.order].PriceId }
      });
    },
    ...mapMutations(["SetTheOrderOfThisCourseAccordingToItsID"]),
    test() {
      this.fetchUserInfo();
    },
    async submit() {
      //Submit Your Review
      if (this.Review == "" && this.Rate == 0) {
        alert("Fill Your Rate Correctly before you submit");
      } else {
        var ReviewData = {
          Review: this.Review,
          Rate: this.Rate,
          CourseId: this.$route.query.CourseID
        };
        console.log("Review Data: " + ReviewData.Review);
        await this.SubmitReviewForThisCourse(ReviewData);
        //TODO Professional Popup that your rate have benn successfully Posted
        this.Review = "";
        this.Rate = 0;
        await this.FetchAllReviewsForThisCourse(this.$route.query.CourseID);

        //TODO Clear Rate and Refetch all the Reviews all again
      }
    }
  },
  computed: {
    ...mapGetters([
      "GetTheOrderOfThisCourseInTheList",
      "GetListOfCourses",
      "GETUserFullName",
      "GetCoursePlayingFlag",
      "GetReviewsOfThisParticularCourse"
    ])
  },
  mounted() {
    //Fetch the Course Data
    console.log("Course ID: " + this.$route.query.CourseID);
    //Fetch Course Purchase Validaty
    this.CanIPLayThisCourse(this.GetListOfCourses[this.order].PriceId);
    this.SetTheOrderOfThisCourseAccordingToItsID(this.$route.query.CourseID);
    this.order = this.GetTheOrderOfThisCourseInTheList;
    //Fetch The Course Reviews
    this.FetchAllReviewsForThisCourse(this.$route.query.CourseID);
  }
};
</script>

<style scoped></style>
