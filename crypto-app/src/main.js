require('../node_modules/vuetify/src/stylus/app.styl')

import Vue from 'vue'
import router from './router'
import store from './store'
import {
  Vuetify,
  VApp,
  VBtn,
  VIcon,
  VGrid,
  VCard,
  VDataTable,
  VToolbar,
  transitions
} from 'vuetify'
import App from './App.vue'

Vue.use(Vuetify, {
  components: {
    VApp,
    VBtn,
    VIcon,
    VGrid,
    VCard,
    VDataTable,
    VToolbar,
    transitions
  },
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82b1ff',
    error: '#ff5252',
    info: '#2196f3',
    success: '#4caf50',
    warning: '#ffc107'
  }
})

new Vue({
  router,
  store,
  created () {
    store.dispatch('getData')
  },
  render: h => h(App)
}).$mount('#app')
