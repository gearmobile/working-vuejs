import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  mask: '#########',
  counter: 1,
  opening: [
    { width: null, height: null }
  ]
}

const mutations = {
  'INCREASE_COUNTER' (state) {
    if (state.counter < 10) {
      state.counter += 1
      state.opening.push({
        width: null,
        heght: null
      })
    }
  },
  'DECREASE_COUNTER' (state, payload) {
    if (state.counter > 1) {
      state.counter -= 1
      state.opening.splice((payload - 1), 1)
    }
  }
}

const actions = {
  increaseCounter ({ commit }) {
    commit('INCREASE_COUNTER')
  },
  decreaseCounter ({ commit }, payload) {
    commit('DECREASE_COUNTER', payload)
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
