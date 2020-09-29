<template>
  <div>
      <router-view></router-view>
  </div>
</template>

<script>
import firebase from "firebase"
import { loadStripe } from '@stripe/stripe-js';
var stripePromise = loadStripe('pk_test_51GxIWeC7X3YpNau3ctZKcMgsMjexF4GBs9aFmF0O6NDacFWfonAXZ3txdVQpTs15iDJ7rQH2G3uk5YQGMcTN4ExJ00MLwC9DVY');
export default {
    async mounted(){      
            const stripe = await stripePromise;
            const createsetion = await firebase.functions().httpsCallable('stripe_sessions_functions-createcheckoutsub');
            var data =  await firebase.firestore().collection('Academies').doc(this.$route.params.id).get()
            console.log(data.data())
            createsetion({id:data.data().PriceId}).then(res =>{
                console.log(res.data)
                stripe.redirectToCheckout({ sessionId: res.data });
            }).catch(e=>{
                console.log(e.code)
                console.log(e.massage)
                console.log(e.details)
            })
            console.log(this.$route.params.id)
        
    }

}
</script>

<style>

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
