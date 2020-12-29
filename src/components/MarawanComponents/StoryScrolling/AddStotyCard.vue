<template>
<div>
  <p class="StoryName">Add Story</p>
  
      
      <router-link to="PostStory"><div id="contaner">
        <img id="iconadd" src="@/assets/plus.svg" alt="">
        </div></router-link>
  
</div>
</template>

<script>
export default {
    
    components:{
        
    },
    mounted(){
        
    }

}
</script>

<style scoped>
#iconadd{
  width: 70px;
  margin: 25px;
  
}
#contaner{
    height: 120px;
width: 120px;
border-radius: 5px;
margin-left: 15px;
background-color: white;
}
.StoryName{
    color: white;
    text-decoration: none;
    font-family: 'Quicksand', sans-serif;
    font-size: 0.9rem;
    text-align: center;
}
</style>