<template>
  <div>
    <v-sheet class="my-8">
      <v-row class="mt-1 px-1 pb-1">
        <v-col>
          <v-avatar size="70" cols="2" class="mx-0 px-0">
            <img
              :src="
                LiveData.InstractorPic
                  ? LiveData.InstractorPic
                  : '/img/icons/pexels-pixabay-220453.jpg'
              "
              alt=""
              style="object-fit: cover"
            />
          </v-avatar>
          <!-- <span class="text-caption ml-2">{}</span> -->
        </v-col>
        <v-col cols="9">
          <span class="text-h6">{{ LiveData.LiveTitle }}</span>
          <br />
          <span class="text-caption"
            >by {{ LiveData.InstractorName }} (instructor at
            {{ LiveData.AcademyName }})</span
          >
          <br />
          <span class="text-subtitle-1"
            >starts on {{ LiveData.LiveDate.toDate().toDateString() }}</span
          >
          <v-btn
            :loading="loading"
            :disabled="loading"
            xs
            class="red"
            height="25"
            @click="StartStreaming"
            >Go Live</v-btn
          >
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  props: ["LiveData"],
  data() {
    return {
      loading: false
    };
  },
  methods: {
    StartStreaming() {
      this.loading = true;
      console.log(this.LiveData.id);
      var StartLive = firebase
        .functions()
        .httpsCallable("liveturnserver-StratLive");
      StartLive({ liveid: this.LiveData.id })
        .then(s => {
          console.log(s);
          this.$router.push("/Streamer/" + this.LiveData.id);
        })
        .catch(e => {
          alert("error");
          this.loading = false;
          console.log(e);
        });
    }
  }
};
</script>

<style scoped></style>
