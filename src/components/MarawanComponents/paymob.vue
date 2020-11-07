<template>
  <div>
      paymob.....
      <iframe v-if="show"  :src="iframesrc" frameborder="0"></iframe>
      <button @click="paymobe" >Buyxxxxxx</button>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  data(){
    return{
      iframesrc : '',
      show : false , 
    }
  },
  methods:{
    paymobe(){
      let self = this
      var paymobdunc = firebase.functions().httpsCallable('paymob-createorder');
      paymobdunc({id: "6qq7fDrYEZMATrJXVLN9"}).then(function(result) {
  // Read result of the Cloud Function.
  console.log(result)
  self.show = true
  self.iframesrc = "https://accept.paymob.com/api/acceptance/iframes/111548?payment_token=" + result.data.payment_id
  // ...
}).catch(function(e){
  console.log(e)
});
    }
  }

}
</script>

<style scoped>
iframe{
    width: 90vw;
    height: 100vw;
}

</style>