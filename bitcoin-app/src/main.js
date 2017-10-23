import Vue from 'vue'
import router from './router'

import {
  Vuetify,
  VApp,
  // VNavigationDrawer,
  // VFooter,
  // VList,
  VBtn,
  // VIcon,
  VToolbar,
  VGrid
  // transitions
} from 'vuetify'

import App from './App.vue'

Vue.use(Vuetify, {
  components: {
    VApp,
    // VNavigationDrawer,
    // VFooter,
    // VList,
    VBtn,
    // VIcon,
    VToolbar,
    VGrid
    // transitions
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
