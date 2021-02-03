<template>
  <div>
    <v-sheet class="px-3 pt-3 text-subtitle-2 font-weight-light" height="600">
      <span>
        {{ GetAcademyDataProfile.About }}
      </span>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["GetAcademyDataProfile"])
  }
};
</script>

<style scoped></style>
