<template>
	<div>
		<SearchEngine/>
		<div v-for="n in 20" :key="n">
			<LiveSessionCard/>
		</div>
		
	</div>
</template>

<script>
	import LiveSessionCard from '@/components/SadekComponents/Academy/LiveSessionCard.vue'
	import SearchEngine from '@/components/MarawanComponents/SearchEngine/SearchEngine.vue'
	export default {
		components: {
			LiveSessionCard,
			SearchEngine
		}
	}
</script>

<style scoped>

</style>