import Vue from 'vue'
import router from './router'
import store from './store/'

import {
  Vuetify,
  VApp,
  VBtn,
  VIcon,
  VDataTable,
  VToolbar,
  VCard,
  VGrid
} from 'vuetify'

import App from './App.vue'

Vue.use(Vuetify, {
  theme: {
    primary: '#f44336',
    secondary: '#e91e63',
    accent: '#9c27b0',
    error: '#673ab7',
    info: '#3f51b5',
    success: '#2196f3',
    warning: '#03a9f4'
  },
  components: {
    VApp,
    VBtn,
    VIcon,
    VDataTable,
    VToolbar,
    VCard,
    VGrid
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    store.dispatch('getData')
  }
}).$mount('#app')
