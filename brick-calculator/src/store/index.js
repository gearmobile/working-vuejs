import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  mask: '#########',
  counter: 1,
  opening: {
    length: null,
    width: null
  }
}

const mutations = {
  'INCREASE_COUNTER' (state) {
    if (state.counter < 10) {
      state.counter += 1
    }
  },
  'DECREASE_COUNTER' (state) {
    if (state.counter > 1) {
      state.counter -= 1
    }
  }
}

const actions = {
  increaseCounter ({ commit }) {
    commit('INCREASE_COUNTER')
  },
  decreaseCounter ({ commit }) {
    commit('DECREASE_COUNTER')
  }
}

const getters = {
  getMask (state) {
    return state.mask
  },
  getCounter (state) {
    return state.counter
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
