import Vue from 'vue'
import Vuex from 'vuex'
import emptyArray from '../utils/emptyArray'

Vue.use(Vuex)

const state = {
  points: [
    { min: 0, max: 10, step: 1, title: 'Квадратура помещения', price: 10, name: 'area' },
    { min: 0, max: 10, step: 1, title: 'Розетки (220 V)', price: 11, name: 'socket' },
    { min: 0, max: 10, step: 1, title: 'Розетки ТВ', price: 12, name: 'tv' },
    { min: 0, max: 10, step: 1, title: 'Розетки телефон, интернет', price: 13, name: 'phone' },
    { min: 0, max: 10, step: 1, title: 'Выключатели', price: 14, name: 'switch' },
    { min: 0, max: 10, step: 1, title: 'Люстра, светильник, бра', price: 15, name: 'bra' },
    { min: 0, max: 10, step: 1, title: 'Точечный свет', price: 16, name: 'light' }
  ],
  selectAdditional: [
    { label: 'Звонок', value: 'bell', price: 100 },
    { label: 'Заземление', value: 'grounding', price: 110 },
    { label: 'Щиток в подъезде', value: 'flapEntrance', price: 120 },
    { label: 'Щиток в помещении', value: 'flapIndoors', price: 130 }
  ],
  selectMaterial: [
    { label: 'Кирпич', value: 'brick', ratio: 1 },
    { label: 'Бетон', value: 'concrete', ratio: 1.2 },
    { label: 'Дерево', value: 'wood', ratio: 1.1 },
    { label: 'Блоки', value: 'blocks', ratio: 1.4 },
    { label: 'Гипсокартон', value: 'drywall', ratio: 0.8 }
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
    if (sample && sample.quantity > payload.value) {
      sample.quantity -= payload.step
    } else {
      state.order.splice(state.order.indexOf(payload), 1) // => not working
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
  getCostTotal (state, getters) {
    const result = state.order.reduce((total, currentIndex) => {
      return total + currentIndex.quantity * (currentIndex.price * getters.getMaterialRatio)
    }, 0)
    return result
  },
  getCostAdditional (state, getters) {
    let totalCost = 0
    getters.getAdditional.forEach((item) => {
      const sample = state.selectAdditional.find(el => el.value === item)
      totalCost += (sample.price * getters.getMaterialRatio)
    })
    return totalCost
  },
  getCostCommon (state, getters) {
    return getters.getCostTotal + getters.getCostAdditional
  },
  getMaterialRatio (state, getters) {
    const result = state.selectMaterial.find(el => el.value === getters.getMaterial)
    return result.ratio
  },
  getSupport (state) {
    return state.selectAdditional
  },
  getSelectMaterial (state) {
    return state.selectMaterial
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
