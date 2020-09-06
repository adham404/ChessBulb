<template>
	<div>
		<!-- //(Done) make a paragraph tag for displaying the About data (2 minutes) -->
		<h3 id="TextCenter">{{ Academy.About }}</h3>
	</div>
</template>

<script>
export default {
	//(Done) use props to get the data (3 minutes)
	name: "About",
	props: ["Academy"],
};
</script>

/*TODO use the css ids from tettra (3 minutes) */
<style scoped src ="@/assets/CSS/AcademiesCard.css"/>
//TODO Testing Time (5 minutes)
//TODO Expected Time (15 minutes)