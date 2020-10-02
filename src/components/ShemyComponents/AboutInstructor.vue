<template>
    <div class="AboutInstructorData">
        <img src="@/assets/ProfilePic.jpg" alt="">
        <h2>AboutInstructor:</h2>
        <p>The instructor is really great he initiated
             three tournaments and won three gold medals for three different players and has
              an amazing crowd of really good players
        </p>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.AboutInstructorData{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-family: 'QuickSand',sans-serif;
    color: black;
    font-weight: lighter;
    margin-left: 15px;
}
p{
    margin: 5px;
    font-size: 1.5rem;
}
h2{
    margin: 5px;
    font-size: 1.7rem;
}
img{
    width: 100px;
    height: 100px;
    border-radius: 100px;
}

</style>