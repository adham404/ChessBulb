<template>
	<div class="AcademyCard">
		<div id="LegoLeft" class="Shadow">
			<div id="LeftBlock">
				<!-- //(Done) make an img tag for the academy photo (2 minutes) -->
				<img src="../../../assets/AcademyPic.jpg" alt="" />
			</div>
			<div id="RightBlock">
				<div id="UpperPiece">
					<!-- //(Done) Make header tag for the Academy Name (2 minutes) -->
					<h2>{{ Academy.AcademyName }}</h2>
					<!-- //(Done) make Check it out button @click run the CheckItOut function (2 minutes) -->
					<router-link
						:to="{
							path: `/Academies/${Academy.AcademyId}`,
							query: { Academy: Academy },
						}"
						><button class="Shadow">
							Check It Out
						</button></router-link
					>
				</div>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="594"
					height="1"
					viewBox="0 0 594 1"
				>
					<line
						id="Line_14"
						data-name="Line 14"
						x2="594"
						transform="translate(0 0.5)"
						fill="none"
						stroke="#707070"
						stroke-width="1"
					/>
				</svg>
				<div id="LowerPiece">
					<h4>
						{{ Academy.About }}
					</h4>
					<router-link
						v-if="notEnrolled"
						:to="{
							name: 'Purchase',
							params: { AcademyId: Academy.AcademyId },
						}"
						id="SendRight"
						><button  class="Shadow">
							Enroll
						</button></router-link
					>
				</div>
			</div>
		</div>
		<div id="LegoRight">
			<img src="../../../assets/ProfilePic.jpg" alt="NO PHOTO" />
			<h3 id="Center">About the Owner:</h3>
			<h3 id="TextCenter">
				{{ Academy.AboutOwner }}
			</h3>
		</div>
	</div>
</template>
<script>
// import firebase from "firebase";
export default {
	name: "AcademiesCard",
	//(Done) use props for getting the passed data (3 minutes)
	props: ["Academy", "allAcademies", "AcademiesId"],
	data() {
		return {
			notEnrolled: false,
		};
	},
	mounted() {
		if (this.allAcademies) {
			for (let index = 0; index < this.AcademiesId.length; index++) {
				if (this.AcademiesId[index] != this.Academy.AcademyId) {
					this.notEnrolled = true;
				}
			}
		}
	},
};
</script>

/*TODO use the css ids from tettra (3 minuts) */
<style scoped src ="@/assets/CSS/AcademiesCard.css"/>

//TODO Testing Time (10 minutes)
//TODO Expected Time (36 minutes)