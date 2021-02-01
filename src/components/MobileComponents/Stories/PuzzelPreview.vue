<template>
  <div>
    <v-sheet class="mt-8 py-3">
      <v-row class="mt-1 mb-1" justify="center">
        <v-col>
          <ChessBoardDisplay v-if="ShowSolution" id="1" />
          <ChessBoardInput v-if="!ShowSolution" id="2" />
        </v-col>
      </v-row>
      <v-row class="mb-1 mt-1" justify="center">
        <v-btn cols="2" @click="emitcontrol('back')">
          <v-icon>
            fa-caret-left
          </v-icon>
        </v-btn>
        <v-btn cols="2" @click="emitcontrol('next')">
          <v-icon>
            fa-caret-right
          </v-icon>
        </v-btn>
        <v-btn cols="2" @click="emitcontrol('first')">
          <v-icon>
            fa-backward
          </v-icon>
        </v-btn>
        <v-btn cols="2" @click="emitcontrol('end')">
          <v-icon>
            fa-forward
          </v-icon>
        </v-btn>
      </v-row>
      <v-row class="mb-1 mt-1" justify="center">
        <v-btn cols="2" @click="ShowSolution = !ShowSolution">
          {{ ShowSolution ? "Hide Solution" : "Show Solution" }}
          <v-icon right>
            {{ ShowSolution ? "mdi-eye-off" : "mdi-eye" }}
          </v-icon>
        </v-btn>
      </v-row>

      <div v-if="ShowSolution" style="height: 200px; overflow-y: scroll">
        <v-sheet
          color="primary"
          width="95%"
          class="ml-2 mt-2 mb-2 px-2"
          rounded="lg"
          v-for="(Line, index) in TheStoryData.Moves"
          :key="index"
          @click="changeline(index)"
        >
          <span class="text-h6" style="color: white"
            >Line {{ index + 1 }} {{ CurrentLine == index ? "*" : "" }}</span
          >
          <br />
          <MovePreviewOutput
            key="index"
            :moves="Line.Moves"
            :startpos="TheStoryData.StartingFen"
            :activeLine="CurrentLine == index"
          />
        </v-sheet>
      </div>
      <div v-if="!ShowSolution" style="height: 200px; overflow-y: scroll">
        <v-sheet
          color="primary"
          width="95%"
          class="ml-2 mt-2 mb-2 px-2"
          rounded="lg"
          min-height="30%"
        >
          <span class="text-h6" style="color: white"></span>
          <MovePreviewInput :startpos="TheStoryData.StartingFen" />
        </v-sheet>
        <v-row class="mb-1 mt-1" justify="center">
          <v-btn cols="2" @click="CheckSlution">
            Submit Solution
            <v-icon right>
              mdi-chess-rook
            </v-icon>
          </v-btn>
        </v-row>
        <v-alert
          v-if="ShowRightMassage"
          width="95%"
          class="ml-2 mt-2 mb-2 px-2"
          type="success"
          justify="center"
          >Your Solution Was Right
        </v-alert>
        <v-alert
          v-if="ShowWrongMassage"
          width="95%"
          class="ml-2 mt-2 mb-2 px-2"
          type="error"
          justify="center"
          >Your Solution Was Wrong
        </v-alert>
      </div>
    </v-sheet>
  </div>
</template>

<script>
import MovePreviewOutput from "@/components/MobileComponents/MovePreview/MovePreviewOutput.vue";
import MovePreviewInput from "@/components/MobileComponents/MovePreview/MovePreviewInput.vue";
import ChessBoardDisplay from "@/components/MobileComponents/ChessBoardDisplay";
import ChessBoardInput from "@/components/MobileComponents/ChessBoardInput.vue";
//import { EventBus1 } from "@/main.js";
import { EventBus } from "../../../main";
export default {
  components: {
    ChessBoardDisplay,
    ChessBoardInput,
    MovePreviewOutput,
    MovePreviewInput
  },
  props: ["TheStoryData"],
  data() {
    return {
      //EventBus : EventBus1,
      CurrentLine: 0,
      ShowSolution: false,
      TheSolution: null,
      SolutionAlertMessage: null,
      ShowRightMassage: false,
      ShowWrongMassage: false
    };
  },
  mounted() {
    EventBus.$on("MovesPreviewList", data => {
      this.TheSolution = data;
    });
  },
  beforeDestroy() {
    EventBus.$off("MovesPreviewList");
  },
  methods: {
    emitcontrol(data) {
      EventBus.$emit("Control", data);
      //console.log(data)
    },
    changeline(index) {
      //console.log('pop in line',index)
      this.CurrentLine = index;
    },
    CheckSlution() {
      var BreakException = {};
      var myline = JSON.stringify(this.TheSolution);
      try {
        this.TheStoryData.Moves.forEach(line => {
          var sline = JSON.stringify(line.Moves);
          if (myline == sline) {
            this.SolutionAlert(true);
            throw BreakException;
          } else {
            this.SolutionAlert(false);
          }
        });
      } catch (e) {
        if (e !== BreakException) throw e;
      }
    },
    SolutionAlert(res) {
      if (res) {
        this.ShowRightMassage = true;
        setTimeout(() => {
          this.ShowRightMassage = false;
        }, 3000);
      } else {
        this.ShowWrongMassage = true;
        setTimeout(() => {
          this.ShowWrongMassage = false;
        }, 2000);
      }
    }
  }
};
</script>

<style></style>
