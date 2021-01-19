<template>

	<div>
		<SearchEngine SearchIndex="Academies"/>
		<!-- <button @click="CreateBlankAcademy(0)">Create a ToEnroll Academy doc</button>
		<button @click="CreateBlankAcademy(1)">Create an Enrolled Academy doc</button> -->
		<button @click="CreateBlankAcademy(-1)">Create an owned Academy doc</button>
		<p v-if="getMyAcademies.length" style="color:white">------------My Academies-----------</p> 
		<div v-for="Academy in getMyAcademies" :key="Academy.id">
				<AcademiesCard
					:Academy="Academy"
					:Owner="true"
				/>
		</div>
		<p style="color:white">------------Academies To Enroll-----------</p>
		<div v-for="Academy in getToEnrollAcademies" :key="Academy.id">
				<AcademiesCard
					:Academy="Academy"
					:Enroll="true"
				/>
		</div>		
		<p style="color:white">------------Enrolled Academies-----------</p>
		<div v-for="Academy in getEnrolledAcademies" :key="Academy.id">
				<AcademiesCard
					:Academy="Academy"
					:Enroll="true"
				/>
		</div>				
	</div>

</template>
<script>
import {mapGetters, mapActions} from "vuex"
import SearchEngine from "../../MarawanComponents/SearchEngine/SearchEngine";
import AcademiesCard from "./AcademiesCard";
export default {
	name: "Academies",
	components: {
		AcademiesCard,
		SearchEngine,
	},
	methods:
	{
		...mapActions(['CreateBlankAcademy','FetchAllAcademies']),
	},
	computed:{
		...mapGetters(['getEnrolledAcademies','getToEnrollAcademies','getMyAcademies'])
	},
	async mounted() {
		this.FetchAllAcademies()
	}
};

</script>
/*TODO use the css ids from tettra (3 minutes) */
<style scoped src = '@/assets/CSS/Academies.css'/>

//TODO Testing Time (10 minutes)
//TODO Expected Time (32 minutes)