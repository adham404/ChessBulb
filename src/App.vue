<template>
  <v-app>
    <Header v-if = "ShowHeader"/>
    <v-main  class="primary Desktop">
      <router-view name="Desktop"/>
    </v-main>
    <v-main  class="primary Mobile">
      <router-view name="Mobile"/>
    </v-main>
  </v-app>
</template>

<script>
import Header from '@/components/MobileComponents/Header.vue'
import firebase from "firebase";
export default {
  
  name: "App",

  data: () => ({
    ShowHeader: false
    //
  }),
  components:{
    Header
  },
  created() {
    let self = this;
    firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
          console.log("Current User Logged in is: ")
          console.log(user.email);
          console.log(user.uid);
          self.$router.push('/development')
          self.ShowHeader = true
				// User is signed in.
            } 
        else {
        console.log("Bateee5")
        self.ShowHeader = false
        self.$router.push('/Login')
		// No user is signed in.
			}

        })
  }
};
</script>

<style lang="css" scoped>
  @media only screen and (max-width: 930px) {
  .Desktop{
    display: none;
    height: 100vh;
  }
  .Mobile{
    display: block;
  }
}
@media only screen and (min-width: 920px) {
  .Desktop{
    display: block;
  }
  .Mobile{
    display: none;
  }
}
</style>
