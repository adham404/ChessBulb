import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'
import VueClipboard from 'vue-clipboard2'
VueClipboard.config.autoSetContainer = true // add this line
import {SquareSpinner} from 'vue-spinners'
import VueChatScroll from 'vue-chat-scroll'
import store from "./store"
Vue.use(VueChatScroll)
Vue.component('square', SquareSpinner)
Vue.use(VueClipboard)

export const EventBus  = new Vue();

Vue.use(firebase)
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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')