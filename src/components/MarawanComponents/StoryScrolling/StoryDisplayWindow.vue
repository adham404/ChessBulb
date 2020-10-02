<template>
    <div class="StoriesWindow" >
        <div v-for="n in 9" :key="n" >
            <img class="ProfileImage" src="../../../assets/ProfilePic.jpg" alt="">
        </div>

    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .ProfileImage{
		height: 100px;
		width: 100px;
		border-radius: 5px;
        margin-left: 10px;
	}
    .StoriesWindow{
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
    }

</style>