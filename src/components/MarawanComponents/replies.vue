<template>
  <div>
    <v-bottom-sheet scrollable v-model="sheet">
      <v-card>
        <v-card-title height="20px" class="py-0">
          <v-row class="my-1">
            <v-btn text @click="sheet = !sheet">
              <v-icon> fa-arrow-left </v-icon>
            </v-btn>
          </v-row>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-3" style="height: 70vh">
          <comment
            v-for="(i, index) in CurrentComments"
            :key="index"
            :Data="i"
          />
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-btn fab text>
            <v-icon> fa-chess-board </v-icon>
          </v-btn>
          <v-text-field
            @keydown="
              e => {
                if (e.which === 13) {
                  addreplay;
                }
              }
            "
            rounded
            background-color="grey lighten-2"
            width="300px"
            type="text"
            v-model="comment_text"
          >
          </v-text-field>
          <v-btn @click="Addr" fab text>
            <v-icon> fa-paper-plane </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
import AddComment from "./AddAnalysis";
import comment from "./comment";
import { EventBus } from "@/main.js";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters([
      "GetTheAnalysisbyPath",
      "GETUserFullName",
      "GETUserID",
      "GetProfilePicUrl",
      "GetTheAnalysisLineForMove"
    ]),
    CurrentComments: function() {
      if (this.currentline) {
        var comments = this.GetTheAnalysisbyPath(this.getpath());
        return comments.Comments;
      } else {
        return null;
      }
    }
  },
  data() {
    return {
      sheet: false,
      SendData: null,
      currentline: null,
      CurrentPath: null,
      comment_text: ""
    };
  },
  components: {
    comment
  },
  //props:["sheet"],
  mounted() {
    EventBus.$on("ShowReplies", async data => {
      if (!this.sheet) {
        this.sheet = true;
      }
      this.comment_text = "";
      this.SendData = await data.Comments;
      this.CurrentPath = await data.jsonPath;
      this.currentline = await data.the_Firebase_path;
      //console.log("return Function Test", this.GetTheAnalysisbyPath( await this.getpath()))
    });
    EventBus.$on("ReplyToComment", data => {
      if (!this.sheet) {
        this.sheet = true;
      }
      this.comment_text = "";
      this.SendData = data.Comments;
      //this.CurrentPath =  data.jsonPath
      this.currentline = data.the_Firebase_path;
    });
  },
  beforeDestroy() {
    EventBus.$off("ShowReplies");
    EventBus.$off("ReplyToComment");
  },
  methods: {
    ...mapActions(["AddComment"]),
    getpath() {
      var postPath = this.currentline.path.split("/");
      postPath.splice(2, 1);
      postPath.shift();
      console.log(postPath);
      return postPath;
    },
    async addreplay() {
      if (this.comment_text) {
        var UserData = {
          name: this.GETUserFullName,
          uid: this.GETUserID,
          Photo: this.GetProfilePicUrl
        };
        await AddComment(this.currentline, UserData, this.comment_text);
        console.log("Comment Posted");
        this.comment_text = "";
      }
    },
    async Addr() {
      if (this.comment_text) {
        var UserData = await {
          name: this.GETUserFullName,
          uid: this.GETUserID,
          Photo: this.GetProfilePicUrl
        };
        var paylod = await {
          UserData: UserData,
          Current_Line: this.currentline,
          Text: this.comment_text
          //path: this.CurrentPath.push("Comments")
        };
        await this.AddComment(paylod);
        console.log("commentadded", this.GetTheAnalysisLineForMove);
      }
    }
  },
  watch: {
    GetTheAnalysisLineForMove: function() {
      alert("the replays has updatet ");
    }
  }
};
</script>

<style></style>
