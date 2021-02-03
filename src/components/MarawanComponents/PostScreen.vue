<template>
  <v-content fluid fixed>
    <v-sheet fixed>
      <v-row>
        <v-col>
          <MovePreview :startpos="startfen" :moves="moves" />
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row class="mt-3">
        <v-col>
          <v-sheet scrollable min-height="66.7vh">
            <Comment
              v-for="(i, index) in ShowComments"
              :key="index"
              :Data="i"
            />
          </v-sheet>
        </v-col>
      </v-row>
    </v-sheet>
    <v-app-bar>
      <v-divider></v-divider>
      <v-row>
        <v-col cols="1">
          <v-btn fab text>
            <v-icon>
              fa-chess-board
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="9">
          <v-text-field
            v-model="comment_text"
            rounded
            background-color="grey lighten-2"
            type="text"
          >
          </v-text-field>
        </v-col>

        <v-col cols="1">
          <v-btn fab text @click="Addr">
            <v-icon>
              fa-paper-plane
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-app-bar>
    <Replies :sheet="sheet" />
  </v-content>
</template>

<script>
//import ChessBoardDisplay from "@/components/MobileComponents/ChessBoardDisplay"
import MovePreview from "./MovePreviewOutput";
import firebase from "firebase";
import Comment from "./comment";
import Replies from "./replies";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    MovePreview,
    Comment,
    Replies
  },
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
    // ShowComments:function(){
    //   if(this.GetTheAnalysisLineForMove){
    //     var matchid = "Match-d3149"
    //     var data1 = this.GetTheAnalysisLineForMove[matchid]

    //     return data1[1].Comments
    //   }else{
    //     return []
    //   }

    // }
  },
  data() {
    return {
      startfen: "rnbqkbnr/pppppppp/8/8/6P1/8/PPPPPP1P/RNBQKBNR w - - 0 1",
      moves: ["f3", "f6", "Nh3", "Nh6", "g5"],
      showboard: false,
      showinierboard: false,
      sheet: false,
      ShowComments: [],
      SendData: null,
      currentline: null,
      CurrentPath: null,
      comment_text: ""
    };
  },
  async mounted() {
    await this.getCommentForIndex();
    console.warn("hi from Post");
    // console.log("ww", this.GetTheAnalysisLineForMove.Match-d3149[1].Comments)
  },
  watch: {
    showboard: function() {
      setTimeout(() => {
        this.showinierboard = this.showboard;
      }, 50);
    }
  },
  methods: {
    ...mapActions(["fetchPostCommentsMove", "AddComment"]),
    getpath() {
      var postPath = this.currentline.path.split("/");
      postPath.splice(2, 1);
      postPath.shift();
      console.log(postPath);
      return postPath;
    },
    async getCommentForIndex() {
      await this.fetchPostCommentsMove({ 0: "Match-d3149", 1: "1" });
      var matchid = "Match-d3149";
      var data1 = this.GetTheAnalysisLineForMove[matchid];
      this.ShowComments = data1[1].Comments;
      console.log("hi", this.ShowComments);
      this.comment_text = "";
      this.currentline = firebase
        .firestore()
        .collection("Matches")
        .doc("Match-d3149")
        .collection("Comments")
        .doc("1");
      console.log("path is not defiend", this.currentline);
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
  }
};
</script>

<style></style>
