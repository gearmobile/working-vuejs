import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  mask: '#########',
  maskOpening: '##',
  opening: [
    { width: null, height: null }
  ]
}

const mutations = {
  'ADD_COMPONENT' (state) {
    if (state.opening.length < 10) {
      state.opening.push({
        width: null,
        height: null
      })
    }
  },
  'REMOVE_COMPONENT' (state, payload) {
    if (state.opening.length > 1) {
      state.opening.splice(payload, 1)
    }
  },
  'SET_OPENING_WIDTH' (state, payload) {
    state.opening[payload.index].width = payload.value
  },
  'SET_OPENING_HEIGHT' (state, payload) {
    state.opening[payload.index].height = payload.value
  }
}

const actions = {
  addComponent ({ commit }) {
    commit('ADD_COMPONENT')
  },
  removeComponent ({ commit }, payload) {
    commit('REMOVE_COMPONENT', payload)
  },
  setOpeningWidth ({ commit }, payload) {
    commit('SET_OPENING_WIDTH', payload)
  },
  setOpeningHeight ({ commit }, payload) {
    commit('SET_OPENING_HEIGHT', payload)
  }
}

const getters = {
  getMask (state) {
    return state.mask
  },
  getMaskOpening (state) {
    return state.maskOpening
  },
  getOpening (state) {
    return state.opening
  },
  getOpeningWidth (state) {
    return (id) => {
      return state.opening[id].width
    }
  },
  getOpeningHeight (state) {
    return (id) => {
      return state.opening[id].height
    }
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
