import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  mask: '#########',
  counter: 1,
  opening: [
    { width: null, height: null, id: 1 }
  ]
}

const mutations = {
  'INCREASE_COUNTER' (state) {
    if (state.counter < 10) {
      state.counter += 1
      state.opening.push({
        width: null,
        heght: null,
        id: state.counter
      })
    }
  },
  'DECREASE_COUNTER' (state, payload) {
    if (state.counter > 1) {
      // state.counter -= 1
      // console.log(state.opening.indexOf(item))
      // console.log(item)
      const el = state.opening.splice(state.opening[payload - 1], 1)
      console.log(el)
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
