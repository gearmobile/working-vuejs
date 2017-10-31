import Vue from 'vue'
import Vuex from 'vuex'
import emptyArray from '../utils/emptyArray'

Vue.use(Vuex)

const state = {
  points: [
    { min: 0, max: 10, step: 1, title: 'Квадратура помещения', price: 10, name: 'area', value: null },
    { min: 0, max: 10, step: 1, title: 'Розетки (220 V)', price: 11, name: 'socket', value: null },
    { min: 0, max: 10, step: 1, title: 'Розетки ТВ', price: 12, name: 'tv', value: null },
    { min: 0, max: 10, step: 1, title: 'Розетки телефон, интернет', price: 13, name: 'phone', value: null },
    { min: 0, max: 10, step: 1, title: 'Выключатели', price: 13, name: 'switch', value: null },
    { min: 0, max: 10, step: 1, title: 'Люстра, светильник, бра', price: 14, name: 'bra', value: null },
    { min: 0, max: 10, step: 1, title: 'Точечный свет', price: 15, name: 'light', value: null }
  ],
  order: [],
  material: 'brick',
  additional: []
}

const mutations = {
  'ADD_ORDER' (state, payload) {
    const sample = state.order.find(el => el.name === payload.name)
    if (!sample) {
      const orderNew = {
        name: payload.name,
        title: payload.title,
        price: payload.price,
        quantity: payload.value
      }
      state.order.push(orderNew)
    } else {
      sample.quantity += payload.step
    }
  },
  'REMOVE_ORDER' (state, payload) {
    const sample = state.order.find(el => el.name === payload.name)
    if (sample.quantity > payload.value) {
      sample.quantity -= payload.step
    } else {
      state.order.splice(state.order.indexOf(payload), 1)
    }
  },
  'SET_MATERIAL' (state, payload) {
    emptyArray(state.order)
    emptyArray(state.additional)
    state.material = payload
  },
  'CLEAR_ORDER' (state) {
    emptyArray(state.order)
    state.material = 'brick'
  },
  'CLEAR_SWITCH' (state) {
    emptyArray(state.order)
  },
  'SET_ADDITIONAL' (state, payload) {
    state.additional = payload
  }
}

const actions = {
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
