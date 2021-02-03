<template>
  <div>
    <v-sheet>
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
          <span class="text-h6">Mostafa Hamido</span>
          <br />
          <span class="text-caption">Ace chess player and coach 😉</span>
          <br />
          <v-btn xs class="text-capitalize primary" height="25">follow</v-btn>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import { EventBus } from "@/main.js";
export default {
  data: () => ({
    links: ["Academies", "Courses", "Posts", "Following"]
  }),
  methods: {
    emitevent(link) {
      EventBus.$emit("ChangeComponent", link);
    }
  }
};
</script>

<style scoped></style>
