import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import isEmpty from '../utils/isEmpty'

Vue.use(Vuex)

const state = {
  mask: '###',
  maskOpening: '#',
  hintText: 'Целое число',
  masonry: [
    { name: 'Кладка в 0,5 кирпича', value: '0.5' },
    { name: 'Кладка в 1 кирпич', value: '1' },
    { name: 'Кладка в 1,5 кирпича', value: '1.5' },
    { name: 'Кладка в 2 кирпича', value: '2' },
    { name: 'Кладка в 2,5 кирпича', value: '2.5' }
  ],
  seam: [
    { name: 'Без учета растворного шва', value: 0 },
    { name: 'С учетом растворного шва толщиной 5 мм', value: 5 },
    { name: 'С учетом растворного шва толщиной 10 мм', value: 10 },
    { name: 'С учетом растворного шва толщиной 15 мм', value: 15 },
    { name: 'С учетом растворного шва толщиной 20 мм', value: 20 }
  ],
  bricks: [
    { name: 'Одинарный (250×120×65 мм)', value: 'одинарный', length: 250, width: 120, height: 65, price: 7 },
    { name: 'Полуторный (250×120×88 мм)', value: 'полуторный', length: 250, width: 120, height: 88, price: 14 },
    { name: 'Двойной (250×120×140 мм)', value: 'двойной', length: 250, width: 120, height: 140, price: 21 },
    { name: 'ЕВРО (250×85×65 мм)', value: 'ЕВРО', length: 250, width: 85, height: 65, price: 28 }
  ],
  building: {
    length: null,
    width: null,
    height: null
  },
  opening: [
    {
      width: null,
      height: null
    }
  ],
  openingValueMax: 5,
  openingValueMin: 1,
  openingValueMaxStatus: false,
  openingText: '',
  order: {
    masonry: '0.5',
    brick: 'одинарный',
    seam: 0
  }
}

const mutations = {
  'SET_MASONRY' (state, payload) {
    state.order.masonry = payload
  },
  // SEAM SECTION
  'SET_SEAM' (state, payload) {
    state.order.seam = payload
  },
  'RESET_SEAM_VALUE' (state) {
    state.order.seam = 0
  },
  // BRICK SECTION
  'SET_BRICK' (state, payload) {
    state.order.brick = payload
  },
  'RESET_BRICK_VALUE' (state) {
    state.order.brick = 'одинарный'
  },
  // BUILDING SECTION
  'SET_LENGTH' (state, payload) {
    if (payload === '') {
      state.building.length = null
    } else {
      state.building.length = payload
    }
  },
  'SET_WIDTH' (state, payload) {
    if (payload === '') {
      state.building.width = null
    } else {
      state.building.width = payload
    }
  },
  'SET_HEIGHT' (state, payload) {
    if (payload === '') {
      state.building.height = null
    } else {
      state.building.height = payload
    }
  },
  // OPENING SECTION
  'ADD_COMPONENT' (state) {
    if (state.opening.length < state.openingValueMax) {
      state.openingValueMaxStatus = false
      state.openingText = ''
      state.opening.push({
        width: null,
        height: null
      })
    } else {
      state.openingValueMaxStatus = true
      state.openingText = 'Вы добавили максимальное количество проемов'
    }
  },
  'REMOVE_COMPONENT' (state, payload) {
    if (state.opening.length > state.openingValueMin) {
      state.openingValueMaxStatus = false
      state.openingText = ''
      state.opening.splice(payload, 1)
    } else {
      state.openingValueMaxStatus = true
      state.openingText = 'Последний проем удалить нельзя'
    }
  },
  'SET_OPENING_WIDTH' (state, payload) {
    if (payload.value === '') {
      state.opening[payload.index].width = null
    } else {
      state.opening[payload.index].width = payload.value
    }
  },
  'SET_OPENING_HEIGHT' (state, payload) {
    if (payload.value === '') {
      state.opening[payload.index].height = null
    } else {
      state.opening[payload.index].height = payload.value
    }
  },
  'CLOSE_ALERT' (state) {
    state.openingValueMaxStatus = false
  },
  'RESET_OPENING_FIELDS' (state) {
    const arr = state.opening
    if (arr.length > 1) {
      for (let i = arr.length; i > 1; i -= 1) {
        arr.pop()
      }
    }
    arr.forEach(el => {
      el.width = null
      el.height = null
    })
  }
}

const actions = {
  closeAlert ({ commit }) {
    commit('CLOSE_ALERT')
  },
  setMasonry ({ commit }, payload) {
    commit('SET_MASONRY', payload)
  },
  // SEAM SECTION
  setSeam ({ commit }, payload) {
    commit('SET_SEAM', payload)
  },
  resetSeamValue ({ commit }) {
    commit('RESET_SEAM_VALUE')
  },
  // BRICK SECTION
  setBrick ({ commit }, payload) {
    commit('SET_BRICK', payload)
  },
  resetBrickValue ({ commit }) {
    commit('RESET_BRICK_VALUE')
  },
  // BUILDING SECTION
  setLength ({ commit }, payload) {
    commit('SET_LENGTH', payload)
  },
  setWidth ({ commit }, payload) {
    commit('SET_WIDTH', payload)
  },
  setHeight ({ commit }, payload) {
    commit('SET_HEIGHT', payload)
  },
  clearBuildingFields ({ commit, dispatch }) {
    dispatch('setLength', null)
    dispatch('setWidth', null)
    dispatch('setHeight', null)
  },
  // OPENING SECTION
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
  },
  resetFieldsOpening ({ commit }) {
    commit('RESET_OPENING_FIELDS')
  }
}

const getters = {
  // MASONRY SECTION
  getMasonry (state) {
    return state.masonry
  },
  getMasonryCurrent (state) {
    return state.order.masonry
  },
  // SEAM SECTION
  getSeam (state) {
    return state.seam
  },
  getSeamCurrent (state) {
    return state.order.seam
  },
  // BRICK SECTION
  getBrick (state) {
    return state.bricks
  },
  getBrickCurrent (state) {
    return state.order.brick
  },
  // BUILDING SECTION
  getBuildingLength (state) {
    return state.building.length
  },
  getBuildingWidth (state) {
    return state.building.width
  },
  getBuildingHeight (state) {
    return state.building.height
  },
  checkFieldsBuilding (state) {
    return state.building.width !== null && state.building.height !== null && state.building.length !== null
  },
  // MASK SECTION
  getMask (state) {
    return state.mask
  },
  getMaskCounter (state) {
    return state.mask.length
  },
  getMaskOpening (state) {
    return state.maskOpening
  },
  getHintText (state) {
    return state.hintText
  },
  // OPENING SECTION
  getOpeningText (state) {
    return state.openingText
  },
  getOpeningStatus (state, getters) {
    return state.openingValueMaxStatus || getters.checkCommonLess
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
  },
  checkFieldsOpening (state) {
    return state.opening.every(el => {
      return el.height !== null && el.width !== null
    })
  },
  // CALCULATIONS SECTION
  getSelectedBrick (state) {
    const result = _.find(state.bricks, { 'value': state.order.brick })
    return result
  },
  getSeamWidth (state) {
    return state.order.seam / 1000
  },
  getSquareLengthHeight (state, getters) {
    const result = (getters.getSelectedBrick.length / 1000 + getters.getSeamWidth) * (getters.getSelectedBrick.height / 1000 + getters.getSeamWidth)
    return result
  },
  getSquareWidthHeight (state, getters) {
    const result = (getters.getSelectedBrick.width / 1000 + getters.getSeamWidth) * (getters.getSelectedBrick.height / 1000 + getters.getSeamWidth)
    return result
  },
  // OUTPUT SECTION
  getBricksQuantity (state, getters) {
    let result = null
    switch (state.order.masonry) {
      case '0.5':
        result = Math.ceil(1 / getters.getSquareLengthHeight)
        break
      case '1':
        result = Math.ceil(1 / getters.getSquareWidthHeight)
        break
      case '1.5':
        result = Math.ceil(1 / getters.getSquareLengthHeight) + Math.ceil(1 / getters.getSquareWidthHeight)
        break
      case '2':
        result = (Math.ceil(1 / getters.getSquareWidthHeight)) * 2
        break
      case '2.5':
        result = Math.ceil(1 / getters.getSquareLengthHeight) + (Math.ceil(1 / getters.getSquareWidthHeight)) * 2
        break
    }
    result = (getters.getAreaCommon - getters.getAreaOpening) * result
    return result
  },
  getAreaCommon (state, getters) {
    if (_.isNil(state.building.length) && _.isNil(state.building.width) && _.isNil(state.building.height)) {
      return null
    }
    const result = ((_.toNumber(state.building.length) + _.toNumber(state.building.width)) * 2) * _.toNumber(state.building.height)
    return result
  },
  getAreaOpening (state) {
    return state.opening.reduce((total, currentIndex) => {
      return total + isEmpty(currentIndex.width) * isEmpty(currentIndex.height)
    }, 0)
  },
  checkCommonLess (state, getters) {
    const common = getters.getAreaCommon === null ? 0 : getters.getAreaCommon
    if (common !== 0 && common / 2 <= getters.getAreaOpening) {
      state.openingText = 'Площадь проемов не должна превышать общую площадь строения'
      return true
    } else {
      state.openingText = ''
      return false
    }
  },
  getBricksCost (state, getters) {
    return getters.getBricksQuantity * getters.getSelectedBrick.price
  }
}

const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})

export default store
