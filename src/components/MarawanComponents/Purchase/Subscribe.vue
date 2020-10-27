<template>
  <div>
      <square/>
      <h1>Loading your Cart, this will only take a minute...</h1>
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
            createsetion({id:this.$route.params.id}).then(res =>{
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

<style scoped>
h1{
    font-family: 'Raleway', sans-serif;
    margin: auto;
    color: white;
    margin-left: 27%;
}
</style>