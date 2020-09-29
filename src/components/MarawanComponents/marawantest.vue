<template>
  <div>
   <router-link to="/Purchase/f0oTA57O4GxJOpdWV29I" >CheckOut</router-link>
   <button @click="Academy">add Academy</button>
   <button @click="gg">update Academy</button>
   <router-view></router-view>
  </div>
</template>

<script>


import firebase from "firebase"
export default {
  data(){
    return{
      filters: true
    }
  },
  methods:{
    async Academy(){
      const aca =  await firebase.firestore().collection("Academies").doc();
      const add = await aca.set({
        About : "The best academy",
        AboutOwner:"the best in the game",
        AcademyId: aca.id,
        AcademyName:"Marwan Academy" ,
        FacebookLink:"link",
        Image:"https://i.kym-cdn.com/photos/images/newsfeed/001/357/190/e68.jpg",
        OwnerName:"Marwan ",
        Phone:"012364567",
        Price:5,
        PriceId:null
      })
      console.log(add)
    },
    async gg(){
      var gd = await firebase.firestore().collection('AcademyEnrollments').doc("123456789").update({
         active : true
         })
         console.log(gd)
    }
  }
  
    
  
  
};
</script>

<style>
div {
  color: white;
}
</style>
