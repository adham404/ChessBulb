<template>
  <v-app>
    <div style="height: 45px; background-color: white" v-if="ShowTitle">
      <v-row class="px-3 my-1">
        <v-icon
          left
          color="primary"
          class="ml-1 Mobile"
          v-if="true"
          @click="$router.go(-1)"
        >
          fa-arrow-left
        </v-icon>
        <svg
          id="Group_56"
          data-name="Group 56"
          xmlns="http://www.w3.org/2000/svg"
          width="180"
          height="35"
          viewBox="0 0 151 40.001"
          class="ml-0"
        >
          <path
            id="Icon_awesome-lightbulb"
            data-name="Icon awesome-lightbulb"
            d="M5.441,25.734a1.813,1.813,0,0,0,.3,1l.968,1.455A1.812,1.812,0,0,0,8.221,29h3.5a1.812,1.812,0,0,0,1.509-.809l.968-1.455a1.812,1.812,0,0,0,.3-1l0-2.172H5.438ZM0,9.968a9.913,9.913,0,0,0,2.467,6.558,16.277,16.277,0,0,1,2.957,5.18c0,.015,0,.029.006.044h9.076c0-.015,0-.029.006-.044a16.277,16.277,0,0,1,2.957-5.18A9.966,9.966,0,1,0,0,9.968ZM9.968,5.437A4.536,4.536,0,0,0,5.437,9.968a.906.906,0,0,1-1.812,0A6.351,6.351,0,0,1,9.968,3.625a.906.906,0,0,1,0,1.812Z"
            transform="translate(3 11.001)"
            fill="#215679"
          />
          <text
            id="Chessbulb"
            transform="translate(0 32)"
            font-size="32"
            font-family="Quicksand-Regular, Quicksand"
          >
            <tspan x="0" y="0">Chessbulb</tspan>
          </text>
        </svg>
      </v-row>
    </div>

    <Header v-if="ShowHeader" class="Mobile" />
    <v-main v-if="!MobileDevice" class="primary Desktop">
      <router-view name="Desktop" />
    </v-main>
    <v-main v-if="MobileDevice" :class="classname">
      <router-view name="Mobile" />
    </v-main>
  </v-app>
</template>

<script>
import Header from "@/components/MobileComponents/Header.vue";
import firebase from "firebase";
import { mapActions } from "vuex";
export default {
  name: "App",

  data: () => ({
    MobileDevice : false
    //
  }),
  components: {
    Header
  },
  methods: {
    ...mapActions(["fetchUserInfo"])
  },
  created() {
    let self = this;
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
      self.MobileDevice = true
        }

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        self.fetchUserInfo();
        console.log("Current User Logged in is: ");
        console.log(user.email);
        console.log(user.uid);
        // self.$router.push('/development')
        self.ShowHeader = true;
        // User is signed in.
      } else {
        console.log("Bateee5");
        self.ShowHeader = false;
        if(self.$route.fullPath != "/Login" || self.$route.fullPath != "/SignUp"){
           self.$router.push("/Login");
        }
       
        // No user is signed in.
      }
    });
  },
  computed: {
    ShowHeader: function() {
      if (
        this.$route.name == "Profile" ||
        this.$route.name == "SignUp" ||
        this.$route.name == "Login"
      ) {
        return false;
      }
      return true;
    },
    ShowTitle: function() {
      if (this.$route.name == "SignUp" || this.$route.name == "Login") {
        return false;
      }
      return true;
    },
    classname: function() {
      if (this.$route.name == "SignUp" || this.$route.name == "Login") {
        return "white Mobile";
      }
      return "primary Mobile";
    }
  }
};
</script>

<style lang="css" scoped>
/* @media only screen and (max-width: 930px) {
  .Desktop {
    display: none;
    height: 100vh;
  }
  .Mobile {
    display: block;
  }
}
@media only screen and (min-width: 920px) {
  .Desktop {
    display: block;
  }
  .Mobile {
    display: none;
  } */
/* } */
</style>
