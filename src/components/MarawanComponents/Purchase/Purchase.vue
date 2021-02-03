<template>
  <div>
      <square/>
      <h1>Loading your Cart...</h1>
      <router-view></router-view>
  </div>
</template>

<script>
import firebase from "firebase"
import { loadStripe } from '@stripe/stripe-js';
var stripePromise = loadStripe('pk_test_51GxIWeC7X3YpNau3ctZKcMgsMjexF4GBs9aFmF0O6NDacFWfonAXZ3txdVQpTs15iDJ7rQH2G3uk5YQGMcTN4ExJ00MLwC9DVY');
export default {
    async mounted(){
        let self = this
        const stripe = await stripePromise;
        const createsetion = await firebase.functions().httpsCallable('stripe_sessions_functions-createcheckout');
        firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            createsetion({id:self.$route.params.id}).then(res =>{
                console.log(res.data)
                stripe.redirectToCheckout({ sessionId: res.data });
            }).catch(e=>{
                console.log("error")
                console.log(e.code)
                console.log(e.massage)
                console.log(e.details)
            })            
        } else {
           console.log('please login')
        }
        });
        
        
    }

}
</script>

<style scoped>
</style>
//TODO get the object that is will be purchased(5min)
//TODO add a cloud funcation for giveing every user a stripe id(10min)
//TODO add a cloud funcation for savaing the card detaels (15min)
//TODO add a cloud funcation for purchasing an item (15min)
//TODO add a cloud funcation for subscribing  (20min)
//TODO import stripe(5min)
//TODO add a loading eleminent(5min)
//TODO add stripe card element(15min) 
//TODO display the stripe card errors(10min) 
//TODO call the add card funcation(10min)
//TODO get the response(5min)
//TODO display the card erros(15min)
//TODO start the 3d auth if the response 3d(25min) 
//TODO add a cloud funcation for getting the purchsing object again(10min)
//TODO add a cloud funcation for if the purchsing object status is complieted add the item to the user object(20min)
//TODO display any purchasing errors(5min)
