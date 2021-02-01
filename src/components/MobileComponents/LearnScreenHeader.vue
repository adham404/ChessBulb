<template>
  <div>
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
import { EventBus } from "@/main.js";
export default {
  data: () => ({
    links: ["Courses"]
  }),
  methods: {
    emitevent(link) {
      EventBus.$emit("ChangeComponent", link);
    }
  }
};
</script>

<style scoped></style>
