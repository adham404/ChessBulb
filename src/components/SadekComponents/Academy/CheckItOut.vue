<template>
	<div>
		<div class="HeaderAcademy">
			<div class="LeftHeaderAcademy">
				<img src="../../../assets/AcademyPic.jpg" alt="" />
				<!-- //(Done) make a paragraph for displaying the academy name (2 minutes) -->
				<h1>{{ Academy.AcademyName }}</h1>
			</div>
			<div class="RightHeaderAcademy">
				<!-- //(Done) make Course button @click Course function (2 minutes) -->
				<button class="Shadow" @click="courses">Courses</button>
				<!-- //(Done) make LiveSessions Button @click Live function (2 minutes) -->
				<button class="Shadow" @click="live">Live Sessions</button>
				<!-- //(Done) make About button @click about functoin (2 minutes) -->
				<button class="Shadow" @click="about">About</button>
			</div>
		</div>
		<svg
			id="LineSvg"
			xmlns="http://www.w3.org/2000/svg"
			width="2095"
			height="4"
			viewBox="0 0 2095 4"
		>
			<line
				id="Line_15"
				data-name="Line 15"
				x2="2095"
				transform="translate(0 2)"
				fill="none"
				stroke="#fff"
				stroke-width="4"
			/>
		</svg>
		<!-- //(DONE) make Component flag for switching between the (LiveSessions
		Component), (Course Component) and (About Component) passing data (5
		minutes) -->
		<component :is="ComponentName" :Academy="Academy" :AcademiesId="AcademiesId" :notEnrolled="notEnrolled" ></component>
	</div>
</template>

<script>
//(Done) importing the (LiveSessions Component) (2 minutes)
import LiveSessions from "./LiveSessions";
//(Done) importing the (Course Component)(2 minutes)
import Courses from "../../ShemyComponents/Courses";
//(Done) importing the (About Component) (2 minutes)
import About from "./About";
import { EventBus } from "@/main";
export default {
	name: "AcademyPage",
	//(done) make the component object (3 minutes)
	components: {
		About,
		LiveSessions,
		Courses,
	},
	//(Done) use query to get the academy data (2 minutes)
	data() {
		return {
			Academy: this.$route.query.Academy,
			notEnrolled:this.$route.query.notEnrolled,
			AcademiesId:this.$route.query.AcademiesId,
			ComponentName: "About",
		};
	},

	methods: {
		//(Done) About function: change the ComponentName to About (5 minutes)
		about() {
			EventBus.$emit("about");
		},
		//(Done) Live function: change the ComponentName to LiveSeesions (5 minutes)
		live() {
			EventBus.$emit("live");
		},
		//(Done) course function: change the ComponentName to Course (5 minutes)
		courses() {
			EventBus.$emit("courses");
		},
	},
	mounted() {
		EventBus.$on("about", () => {
			this.ComponentName = "About";
		});
		EventBus.$on("live", () => {
			this.ComponentName = "LiveSessions";
		});
		EventBus.$on("courses", () => {
			this.ComponentName = "Courses";
		});
	},
};
</script>

/*TODO use the css ids from tettra (3 minutes) */
<style scoped src = "@/assets/CSS/CheckItOut.css" />
//TODO Testing Time (15 minutes)
//Expected Time (60 minutes)