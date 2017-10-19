import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  mask: '#########'
}

const getters = {
  getMask (state) {
    return state.mask
  }
}

const store = new Vuex.Store({
  state,
  getters
})

export default store
