<template>
  <div>
    <v-sheet class="primary my-6" rounded = "lg" elevation="3">
      <v-row class="mt-1 px-1 pb-1">
        <v-col>
          <v-avatar size="70" cols="1" class="mx-0 px-0">
            <img
              src="img\icons\pexels-pixabay-220453.jpg"
              alt=""
              style="object-fit: cover"
            />
          </v-avatar>
        </v-col>
        <v-col cols="9">
          <span class="text-Subtitle-2" style="color: white;">Mostafa Hamido</span>
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import { EventBus } from "@/main.js";
export default {
  methods: {
    emitevent(link) {
      EventBus.$emit("ChangeComponent", link);
    }
  }
};
</script>

<style scoped></style>
