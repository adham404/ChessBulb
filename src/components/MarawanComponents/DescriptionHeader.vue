//TODO create html skalton (5min)
//TODO get the user id (2min)
//TODO get user name and photo from firebase firestore(5min)
//TODO add func for story(2min)
//TODO  get story id (2min)
//TODO  get story description(2min)
//TODO add func for user profile(2min)
//TODO  get user bio (2min)

<template>
  <div>
      <img v-bind:src="headerimg" alt="description header img ">
      <div>{{headerbio}}</div>
  </div>
</template>

<script>
import {EventBus} from '@/main.js'
export default {
    props:['img','bio'],
     data(){
        return{
            headerimg : null,
            headerbio :null
            
        }
    },
    mounted(){
        this.headerimg = this.img
        this.headerbio = this.bio
        EventBus.$on('DescriptionHeader', ({ img1, bio1}) =>{
           
           this.headerimg = img1
           this.headerbio = bio1
            
        })
    }
}
</script>

<style>

</style>