// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'

import Vuetify from 'vuetify'

import App from './App'
import router from './router'
import store from './store'
import * as firebase from 'firebase'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAadNrm5igszUCg5d6zv-dC03hS387dfUs',
      authDomain: 'meetup-app-1062e.firebaseapp.com',
      databaseURL: 'https://meetup-app-1062e.firebaseio.com',
      projectId: 'meetup-app-1062e',
      storageBucket: 'meetup-app-1062e.appspot.com',
      messagingSenderId: '57079436689'
    })
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLogiExistingUser', user)
      }
    })
    this.$store.dispatch('loadMeetupsFromFirebase')
  }
})

app.$mount('#app')
