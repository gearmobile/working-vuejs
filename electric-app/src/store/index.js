import Vue from 'vue'
import Vuex from 'vuex'
import emptyArray from '../utils/emptyArray'

Vue.use(Vuex)

const state = {
  points: [
    {
      min: 0,
      max: 10,
      step: 1,
      title: 'Квадратура помещения',
      priceWork: 10,
      priceMaterial: 10,
      name: 'area'
    },
    {
      min: 0,
      max: 10,
      step: 1,
      title: 'Розетки (220 V)',
      priceWork: 11,
      priceMaterial: 11,
      name: 'socket'
    },
    {
      min: 0,
      max: 10,
      step: 1,
      title: 'Розетки ТВ',
      priceWork: 12,
      priceMaterial: 12,
      name: 'tv'
    },
    {
      min: 0,
      max: 10,
      step: 1,
      title: 'Розетки телефон, интернет',
      priceWork: 13,
      priceMaterial: 13,
      name: 'phone'
    },
    {
      min: 0,
      max: 10,
      step: 1,
      title: 'Выключатели',
      priceWork: 14,
      priceMaterial: 14,
      name: 'switch'
    },
    {
      min: 0,
      max: 10,
      step: 1,
      title: 'Люстра, светильник, бра',
      priceWork: 15,
      priceMaterial: 15,
      name: 'bra'
    },
    {
      min: 0,
      max: 10,
      step: 1,
      title: 'Точечный свет',
      priceWork: 16,
      priceMaterial: 16,
      name: 'light'
    }
  ],
  selectAdditional: [
    {
      label: 'Звонок',
      value: 'bell',
      priceWork: 100,
      priceMaterial: 100
    },
    {
      label: 'Заземление',
      value: 'grounding',
      priceWork: 110,
      priceMaterial: 110
    },
    {
      label: 'Щиток в подъезде',
      value: 'flapEntrance',
      priceWork: 120,
      priceMaterial: 120
    },
    {
      label: 'Щиток в помещении',
      value: 'flapIndoors',
      priceWork: 130,
      priceMaterial: 130
    }
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
  additional: [],
  discount: 10
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
  getMaterialRatio (state, getters) { // коэффициент трудозатрат в зависимости от материала
    const result = state.selectMaterial.find(el => el.value === getters.getMaterial)
    return result.ratio
  },
  // ------------------------
  // СТОИМОСТЬ МАТЕРИАЛОВ
  // ------------------------
  getCostMaterialMain (state) { // стоимость основных материалов
    const result = state.order.reduce((total, currentIndex) => {
      return total + currentIndex.quantity * currentIndex.priceMaterial
    }, 0)
    return result
  },
  getCostMaterialAdditional (state, getters) { // стоимость дополнительных материалов
    let result = 0
    getters.getAdditional.forEach((item) => {
      const sample = state.selectAdditional.find(el => el.value === item)
      result += sample.priceMaterial
    })
    return result
  },
  getCostMaterialCommon (state, getters) { // стоимость всех материалов
    return getters.getCostMaterialMain + getters.getCostMaterialAdditional
  },
  // ------------------------
  // СТОИОМСТЬ РАБОТ
  // ------------------------
  getCostMaterialMainWork (state, getters) { // стоимость работы с основными материалами
    const result = state.order.reduce((total, currentIndex) => {
      return total + currentIndex.quantity * (currentIndex.priceWork * getters.getMaterialRatio)
    }, 0)
    return result
  },
  getCostMaterialAdditionalWork (state, getters) { // стоимость работы с дополнительными материалами
    let result = 0
    getters.getAdditional.forEach((item) => {
      const sample = state.selectAdditional.find(el => el.value === item)
      result += sample.priceWork
    })
    return result
  },
  getCostCommonWork (state, getters) { // стоимость всех работ
    return getters.getCostMaterialMainWork + getters.getCostMaterialAdditionalWork
  },
  getCostCommonWorkDiscount (state, getters) { // скидка 10 процентов от общей стоимости работ
    return getters.getCostCommonWork * (state.discount / 100)
  },
  getCostCommonWorkWithDiscount (state, getters) { // стоимость всех работ с учетом скидки
    return getters.getCostCommonWork - getters.getCostCommonWorkDiscount
  },
  // ------------------------
  // ОБЩАЯ СТОИМОСТЬ
  // ------------------------
  getCostTotal (state, getters) { // стоимость работы и материалов
    return getters.getCostMaterialCommon + getters.getCostCommonWorkWithDiscount
  },
  // ------------------------
  //
  // ------------------------
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
