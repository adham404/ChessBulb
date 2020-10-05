<template>
	<div>
		<!-- //Done loop through the AnalysisLines (3 minutes) -->
		<div v-for="L in Line[Move].length" :key="L">
			<!-- //Done paragraph tag for line name (3 minutes) -->
			<p>{{ Line[Move][L - 1].name }}</p>

			<!-- //TODO using the (PGNReview Component)passing the pgn of a line
			@click expand (3 minutes) -->
			<p>{{ Line[Move][L - 1].PGN }}</p>

			<!-- //Done See Replies Icon @click See Replies function (3 minutes) -->
			<!-- //Done Reply Icon @click Reply function (3 minutes) -->
			<button @click="SeeReplies(Line[Move][L - 1])">See Replies</button>
			<button @click="Reply(Line[Move][L - 1])">Reply</button>
		</div>
	</div>
</template>

<script>
//TODO import PGNReview
import { EventBus } from "@/main";
export default {
	//Done using props getting the match object (3 minutes)
	props: ["Line", "MainLine", "Move"],

	//Done See Replies functoin: EventBus.$emit "see reply" passing the move number and index of line to the (Analyze Component) (5 minutes)
	//Done Reply functoin: EventBus.$emit "reply: passing the move number and index of line to the (Analyze Component) (5 minutes)
	methods: {
		SeeReplies(ref) {
			EventBus.$emit("SeeReplies", ref);
		},
		Reply(ref) {
			EventBus.$emit("Reply", ref);
		},
	},
	//TODO in "mounted" get from the (PGNReview Component) by EventBus.$on the move number, and then loop through the lines in this moves and assign the object to the AnalysisLines variable (10 minutes)
};
</script>

<style scoped>
/*TODO using the css ids from tettra (2 minutes)*/
</style>
//FIXME Testing the boabab library (1 day)
//TODO Testing Time (20 minutes)
//TODO Expected Time (1 day + 60 minutes)