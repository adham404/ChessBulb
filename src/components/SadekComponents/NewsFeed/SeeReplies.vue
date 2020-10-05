<template>
	<div>
		<div>
			<p>{{ Line.name }}</p>
			<p>{{ Line.PGN }}</p>
		</div>
		<!-- //TODO loop through the anlayse (2 minutes) -->
		<div v-if="key">
			<div v-for="i in keys" :key="i">
				<div v-for="j in Line.Analyze[i].length" :key="j">
					<!-- //TODO Paragraph tag for the line user name (1 minute) -->
					<p>{{ Line.Analyze[i][j - 1].name }}</p>
					<p>{{ Line.Analyze[i][j - 1].PGN }}</p>
					<button @click="SeeLine(Line.Analyze[i][j - 1])">
						See Replies
					</button>
					<button @click="Reply(Line.Analyze[i][j - 1])">
						Reply
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
//TODO import AnalysisLine Component (2 minutes)
//TODO import EventBus (1 minutes)
import { EventBus } from "@/main";
export default {
	//TODO use props to get the data specified for this component (3 minutes)
	props: ["Line"],
	data() {
		return {
			keys: [],
			key: false,
		};
	},
	//TODO see line Function, EventBus.$emit to (Analyze Component) with data to switch to (AnalysisLines Component)
	methods: {
		SeeLine(ref) {
			EventBus.$emit("Analyze", ref);
		},
		Reply(ref) {
			EventBus.$emit("Reply", ref);
		},
	},
	//DONE check if the line have Analyze key or not
	mounted() {
		if ("Analyze" in this.Line) {
			this.key = true;
			this.keys = Object.keys(this.Line.Analyze);
			console.log((this.keys = Object.keys(this.Line.Analyze)));
		} else {
			this.key = false;
		}
	},
};
</script>

<style scoped>
/*TODO use the css ids from tettra (2 minutes) */
</style>
//TODO Testing Time (1 day)
//TODO Expected Time (1 day + 30 minutes)