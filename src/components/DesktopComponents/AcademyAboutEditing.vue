<template>
  <div>
    <v-textarea
      solo
      name="input-7-4"
      label="Solo textarea"
      v-model="AcademyBio"
      :disabled="!Editing"
      flat
      rows = "8"
    ></v-textarea>
    <v-row justify="end" class="px-8">
      <v-btn rounded color="primary" v-if="Editing" @click="Edit">
        Save
      </v-btn>
      <v-btn
        rounded
        color="primary"
        v-if="!Editing"
        @click="Editing = !Editing"
      >
        Edit
      </v-btn>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      Editing: false,
      AcademyBio: ""
    };
  },
  mounted() {
    this.AcademyBio = this.GetAcademyData.About;
  },
  computed: {
    ...mapGetters(["GetAcademyData"])
  },
  methods: {
    ...mapActions(["EditMyAcademyBio"]),
    Edit() {
      this.EditMyAcademyBio(this.AcademyBio);
      this.Editing = !this.Editing;
    }
  }
};
</script>

<style scoped></style>
