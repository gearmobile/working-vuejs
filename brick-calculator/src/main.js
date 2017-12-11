// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'
import store from './store'
import colors from './utils/colors' // => color scheme
import { i18n } from './pluigns/vue-i18n'

Vue.use(Vuetify, {
  theme: {
    // primary: colors.primary,
    primary: colors.color05,
    // secondary: colors.secondary,
    secondary: colors.color06,
    accent: colors.accent,
    error: colors.error,
    info: colors.info,
    success: colors.success,
    warning: colors.warning,
    uno: colors.color01,
    duo: colors.color02,
    tre: colors.color03,
    quattro: colors.color04
    // cinque: colors.color05,
    // sei: colors.color06
  }
}
)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  store,
  i18n,
  template: '<App/>',
  components: { App },
  created () {
    this.$store.dispatch('getRUBRate')
  }
}).$mount('#app')
