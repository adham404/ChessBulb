<template>
  <div class="mt-3">
    <v-sheet>
      <v-row class="mb-1 px-1" height="200">
        <v-img
          lazy-src="@/assets/ChessAcademy.jpg"
          max-height="150"
          max-width="100%"
          src="@/assets/ChessAcademy.jpg"
        ></v-img>
      </v-row>
      <v-row class="mt-1 px-1 pb-1">
        <v-col>
          <v-avatar size="70" cols="2" class="mx-0 px-0">
            <img
              src="img\icons\pexels-pixabay-220453.jpg"
              alt=""
              style="object-fit: cover"
            />
          </v-avatar>
        </v-col>
        <v-col cols="9">
          <span class="text-h6">{{ GetAcademyDataProfile.AcademyName }}</span>
          <br />
          <span class="text-caption">established a very long time ago</span>
          <br />
          <v-btn @click="Enroll" xs class="text-capitalize primary" height="25"
            >enroll</v-btn
          >
        </v-col>
      </v-row>
    </v-sheet>
    <v-divider> </v-divider>
    <v-tabs
      centered
      color="white"
      class="px-0"
      background-color="white"
      slider-color="primary"
    >
      <v-layout justify-center class="px-0" size="10">
        <v-tab
          v-for="link in links"
          :key="link"
          class="mx-0 px-0"
          retain-focus-on-click="false"
          @click="emitevent(link)"
        >
          <!-- <v-icon size = "28" color="primary">{{link}}</v-icon> -->
          <span style="color: black">{{ link }}</span>
        </v-tab>
      </v-layout>
    </v-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { EventBus } from "@/main.js";
export default {
  data: () => ({
    links: ["About", "Live sessions", "Posts", "Courses"]
  }),
  methods: {
    emitevent(link) {
      EventBus.$emit("ChangeComponent", link);
    },
    Enroll() {
      this.$router.push({
        path: `/Subscribe/${this.GetAcademyDataProfile.PriceId}`,
        query: { ProductID: this.GetAcademyDataProfile.PriceId }
      });
    }
  },
  computed: {
    ...mapGetters(["GetAcademyDataProfile"])
  }
};
</script>

<style scoped></style>
