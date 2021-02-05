<template>
  <div>
  <v-sheet class="pt-16" height="86vh">
    <v-row class=" height:86vh pt-16"  no-gutters justify="center" align="center"  >
      <v-col class="mt-15 mb-10" cols="3">
        <v-progress-circular
      indeterminate
      color="primary"
      :size="100"
      :width="15"
      
    ></v-progress-circular>
      </v-col>
    </v-row>
    <v-row no-gutters justify="center" >
      <p class="text-subtitle-1 font-weight-bold text-justify text-center">
        You will be redirected To Checkout shortly
      </p>
      <!-- <p class="text-subtitle-1 font-weight-bold text-justify text-center">
        Your Product will be added to your items shortly
      </p> -->
      
    </v-row>
  </v-sheet>
</div>
</template>

<script>
import firebase from "firebase";
import { loadStripe } from "@stripe/stripe-js";
var stripePromise = loadStripe(
  "pk_test_51GxIWeC7X3YpNau3ctZKcMgsMjexF4GBs9aFmF0O6NDacFWfonAXZ3txdVQpTs15iDJ7rQH2G3uk5YQGMcTN4ExJ00MLwC9DVY"
);
export default {
  async mounted() {
    const stripe = await stripePromise;
    const createsetion = await firebase
      .functions()
      .httpsCallable("stripe_sessions_functions-createcheckoutsub");
    createsetion({ id: this.$route.params.id })
      .then(res => {
        console.log(res.data);
        stripe.redirectToCheckout({ sessionId: res.data });
      })
      .catch(e => {
        console.log("error");
        console.log(e.code);
        console.log(e.massage);
        console.log(e.details);
      });
    console.log(this.$route.params.id);
  }
};
</script>

<style></style>
