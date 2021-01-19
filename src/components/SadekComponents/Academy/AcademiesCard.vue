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
					<button @click="CheckItOut" class="Shadow">
							Check It Out
					</button>
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
					<button v-if="Enroll" @click="Purchase"  class="Shadow">
							Enroll
						</button>
					<button class="Shadow" @click="Dashboard" v-if="Owner">
						Dashboard 
					</button>
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
	props: ["Academy","Enroll","Owner"],
	methods:{
		Dashboard()
		{
			var id = this.Academy.AcademyId
			console.log("Data in here: "+this.Academy);
			this.$router.push({path:`/Dashboard/${id}`, query:{id: id}});				
		},
		CheckItOut()
		{
		var id = this.Academy.AcademyId
		this.$router.push({path:`/Academies/${id}`, query:{id: id}});				
		},
		Purchase()
		{
			this.$router.push({path:`/Purchase/${this.Academy.PriceId}`, query:{id: this.Academy.PriceId}});				
		}
	}
};
</script>

/*TODO use the css ids from tettra (3 minuts) */
<style scoped src ="@/assets/CSS/AcademiesCard.css"/>

//TODO Testing Time (10 minutes)
//TODO Expected Time (36 minutes)