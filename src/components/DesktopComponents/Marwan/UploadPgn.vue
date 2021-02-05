//DONE create html input (2mmin) //DONE create upload file in html (2min) //DONE
make the file uploader accepet pgn only (10min) //DONE how to make file input
accepet a file type (15min) //DONE upload file to firebase (3min)
<template>
  <div>
    <input type="file" ref="pgninput" accept=".pgn,.txt" style="display:none" />
    <v-btn rounded @click="chossfile">Upload Pgn</v-btn>
  </div>
</template>

<script>
import { EventBus } from "@/main.js";
var input;
export default {
  mounted() {
    input = this.$refs["pgninput"];
    input.onchange = e => {
      // getting a hold of the file reference
      var file = e.target.files[0];

      // setting up the reader
      var reader = new FileReader();
      reader.readAsText(file, "UTF-8");

      // here we tell the reader what to do when it's done reading...
      reader.onload = readerEvent => {
        var content = readerEvent.target.result; // this is the content!
        console.log(content);
        EventBus.$emit("PgnUploaded", content);
      };
    };
  },
  methods: {
    chossfile() {
      input.click();
    }
  }
};
</script>

<style></style>
