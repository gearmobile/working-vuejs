import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import _ from 'lodash'

const root = 'http://localhost:3000'

Vue.use(Vuex)

const state = {
  points: [],
  order: [],
  material: 'brick',
  additional: []
}

const mutations = {
  'SUM_ORDER' (state) {
    //
  },
  'INIT_DATA' (state) {
    axios.get(root + '/electric')
      .then(res => {
        state.points = res.data
      })
      .catch(err => console.log(err))
  },
  // ADD ORDER
  'ADD_ORDER' (state, payload) {
    const sample = _.find(state.order, el => {
      return el.id === payload.order.name
    })
    if (sample) {
      sample.quantity = payload.value
    } else {
      const order = {
        id: payload.order.name,
        title: payload.order.title,
        quantity: payload.value
      }
      if (state.material === 'brick') {
        order.price = payload.order.priceBrick
      }
      if (state.material === 'concrete') {
        order.price = payload.order.priceConcrete
      }
      if (state.material === 'wood') {
        order.price = payload.order.priceWood
      }
      if (state.material === 'blocks') {
        order.price = payload.order.priceBlocks
      }
      if (state.material === 'drywall') {
        order.price = payload.order.priceDrywall
      }
      state.order.push(order)
    }
  },
  // REMOVE ORDER
  'REMOVE_ORDER' (state, payload) {
    const sample = _.find(state.order, el => {
      return el.id === payload.order.name
    })
    if (sample.quantity >= payload.value) {
      sample.quantity -= (sample.quantity - payload.value)
    }
  },
  'SET_MATERIAL' (state, payload) {
    state.material = payload
  },
  'SET_ADDITIONAL' (state, payload) {
    Vue.set(state.additional, payload, !state.additional[payload])
  },
  'CLEAR_ORDER' (state) {
    state.order.length = 0
    state.additional = _.fill(Array(3), null)
    state.material = 'brick'
  },
  'CLEAR_SWITCH' (state) {
    state.order.length = 0
    state.additional = _.fill(Array(3), null)
  }
}

const actions = {
  initData ({ commit }) {
    commit('INIT_DATA')
  },
  addOrder ({ commit }, payload) {
    commit('ADD_ORDER', payload)
  },
  removeOrder ({ commit }, payload) {
    commit('REMOVE_ORDER', payload)
  },
  clearOrder ({ commit }) {
    commit('CLEAR_ORDER')
  },
  clearSwitch ({ commit }) {
    commit('CLEAR_SWITCH')
  },
  setMaterial ({ commit }, payload) {
    commit('SET_MATERIAL', payload)
  },
  setAdditional ({ commit }, payload) {
    commit('SET_ADDITIONAL', payload)
  }
}

const getters = {
  getData (state) {
    return state.points
  },
  getMaterial (state) {
    return state.material
  },
  getAdditional (state) {
    return state.additional
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store
