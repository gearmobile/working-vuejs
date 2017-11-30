// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import store from './store'
import { i18n } from './pluigns/vue-i18n'

Vue.use(Vuetify, {
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82b1ff',
    error: '#ff5252',
    info: '#2196f3',
    success: '#4caf50',
    warning: '#ffc107'
  }
}
)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  i18n,
  template: '<App/>',
  components: { App }
}).$mount('#app')
