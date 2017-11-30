/* ============
* Vue i18n
* ============
*/

import Vue from 'vue'
import Vue18n from 'vue-i18n'
import locales from '../locale'

Vue.use(Vue18n)

export const i18n = new Vue18n({
  locale: 'russian',
  fallbackLocale: 'russian',
  messages: locales
})

export default { i18n }
