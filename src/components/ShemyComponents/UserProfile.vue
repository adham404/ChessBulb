<template>
    <div>
        <div class="Container">
            <div class="UserImageAndSignOut">
                <img src="@/assets/ProfilePic.jpg" alt="">
            </div>
            <div class="UserBio">
                <div class="TextBox Shadow">
                    <h3>Adham Elshafei</h3>
                    <p>I was a great player in a lot of tournaments</p>
                </div>

            </div>
            <div class="Buttons">
                <button>My Courses</button>
                <button>Joined Academies</button>
                <button>My Posts</button>
                <button>Find Players</button>
                <button>Sign Out &#128549;</button>


            </div>

        </div>
        <FindPlayers/>
        
    </div>
</template>

<script>
    import FindPlayers from '@/components/MarawanComponents/FindPlayers.vue'
    export default {
        components:{
            FindPlayers
        }
    }
</script>

<style scoped>
    h3{
        margin: 0px;
        margin-bottom: 2px;
        font-weight: normal;
    }
    p{
        margin: 0px;
        font-weight: bold;

    }
    .Shadow{
		-webkit-box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
		-moz-box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
		box-shadow: 0px 0px 21px -10px rgba(0,0,0,1);
    }
    .TextBox{
        width: 95%;
        height: 110px;
        background-color: white;
        border-radius: 12px;
        padding-top: 10px;
        padding-left: 10px;
        color: black;
        font-family: 'Raleway', sans-serif;
    }
    img{
    height: 110px;
    width: 110px;
    border-radius: 110px;
    }
    .Container{
        display: flex;
        width: 90%;
        height: 200px;
        /* background-color: aqua; */
        margin-left: 2%;
    }
    .UserImageAndSignOut{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 20%;
        height: 100%;
        /* background-color: red; */
    }
    .UserBio{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60%;
        height: 100%;
        /* background-color: royalblue; */
    }
    .Buttons{
        justify-content: space-evenly;
        width: 20%;
        height: 100%;
        display: flex;
        flex-direction: column;
        /* background-color: purple; */
    }
    button{
		height: 35px;
		width: 180px;
		border: none;
		outline: none;
		border-radius: 1.2rem;
		font-size: 0.8rem;
		font-family: 'Raleway', sans-serif;
		background-color: #022A68;
		color: white;
	}

</style>