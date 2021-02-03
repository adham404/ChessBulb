import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import firebase from "firebase";
import VueChatScroll from 'vue-chat-scroll';




Vue.use(VueChatScroll);

Vue.use(firebase);
var firebaseConfig = {
  apiKey: "AIzaSyDdsjuIqIrD415e2ILt_zPs9E0ikPT5Mug",
  authDomain: "chessbulb.firebaseapp.com",
  databaseURL: "https://chessbulb.firebaseio.com",
  projectId: "chessbulb",
  storageBucket: "chessbulb.appspot.com",
  messagingSenderId: "705955795201",
  appId: "1:705955795201:web:40b3bc3d302b4eaa304b00",
  measurementId: "G-2Q9Q1ECL7M"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

Vue.config.productionTip = false;

export const EventBus = new Vue();

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
